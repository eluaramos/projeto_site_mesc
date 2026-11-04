<?php

namespace App\Http\Controllers;

use App\Models\Media;
use App\Models\News;
use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\File;
use Inertia\Inertia;
use Throwable;

class MediaController extends Controller
{
    public function index(Request $request)
    {
        abort_unless($request->user()->can('midia.ver'), 403);

        return Inertia::render('Cms/Media', [
            'files' => Media::latest('id')->paginate(20),
            'canUpload' => $request->user()->can('midia.enviar'),
        ]);
    }

    public function store(Request $request)
    {
        abort_unless($request->user()->can('midia.enviar'), 403);
        $data = $request->validate([
            'title' => ['required', 'string', 'max:200'],
            'file' => ['required', File::types(['pdf', 'jpg', 'jpeg', 'png', 'webp'])->max(5120)],
        ]);
        $file = $data['file'];
        $name = Str::limit(basename(str_replace(chr(92), '/', $file->getClientOriginalName())), 240, '');
        $path = $file->store('uploads', 'cms-media');
        abort_if($path === false, 500);

        try {
            Media::create([
                'title' => $data['title'],
                'original_name' => preg_replace('/[[:cntrl:]]/', '', $name) ?: 'arquivo',
                'path' => $path,
                'mime' => $file->getMimeType(),
                'size' => $file->getSize(),
                'uploaded_by' => $request->user()->id,
            ]);
        } catch (Throwable $exception) {
            Storage::disk('cms-media')->delete($path);
            throw $exception;
        }

        return to_route('cms.media.index');
    }

    public function published(string $kind, int $id, Media $media)
    {
        $model = $kind === 'pages' ? Page::class : News::class;
        $content = $model::findOrFail($id)->published_content;
        abort_unless(($content['body_format'] ?? null) === 'blocks' && $media->mime === 'application/pdf', 404);
        $blocks = json_decode($content['body'], true);
        abort_unless(collect($blocks)->contains(fn ($block) => ($block['type'] ?? null) === 'download' && ($block['mediaId'] ?? null) === $media->id), 404);

        return $this->sendFile($media);
    }

    public function previewImage(Request $request, Media $media)
    {
        abort_unless($request->user()->can('midia.ver'), 403);

        return $this->sendImage($media);
    }

    public function publishedCover(News $news, Media $media)
    {
        abort_unless(($news->published_content['cover_media_uuid'] ?? null) === $media->uuid, 404);

        return $this->sendImage($media);
    }

    private function sendImage(Media $media)
    {
        $disk = Storage::disk('cms-media');
        abort_unless(in_array($media->mime, Media::IMAGE_MIMES, true) && $disk->exists($media->path), 404);

        return $disk->response($media->path, null, [
            'Content-Type' => $media->mime,
            'Cache-Control' => 'private, no-store',
            'X-Content-Type-Options' => 'nosniff',
        ]);
    }

    public function download(Request $request, Media $media)
    {
        abort_unless($request->user()->can('midia.ver'), 403);

        return $this->sendFile($media);
    }

    private function sendFile(Media $media)
    {
        $disk = Storage::disk('cms-media');
        abort_unless($disk->exists($media->path), 404);

        return $disk->download($media->path, $media->original_name, [
            'Content-Type' => 'application/octet-stream',
            'Cache-Control' => 'private, no-store',
            'X-Content-Type-Options' => 'nosniff',
        ]);
    }
}
