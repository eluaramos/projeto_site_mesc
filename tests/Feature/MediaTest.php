<?php

use App\Models\Media;
use App\Models\Page;
use App\Models\User;
use Database\Seeders\RoleSeeder;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

test('editor envia mídia privada e somente perfis autorizados baixam', function () {
    $this->seed(RoleSeeder::class);
    Storage::fake('cms-media');
    $editor = User::factory()->create()->assignRole('editor');
    $reviewer = User::factory()->create()->assignRole('revisor');
    $this->post('/cms/media')->assertRedirect('/login');
    $this->actingAs($reviewer)->post('/cms/media')->assertForbidden();
    $this->actingAs($editor)->post('/cms/media', [
        'title' => 'Edital', 'file' => UploadedFile::fake()->createWithContent('edital.pdf', "%PDF-1.4\n%%EOF"),
    ])->assertRedirect('/cms/media');
    $media = Media::sole();
    Storage::disk('cms-media')->assertExists($media->path);
    expect($media->path)->not->toContain('edital');
    $url = route('cms.media.download', $media);
    $this->actingAs($reviewer)->get("/cms/media/{$media->id}/download")->assertNotFound();
    $this->get($url)->assertDownload('edital.pdf');
    $this->actingAs(User::factory()->create())->get($url)->assertForbidden();
    auth()->logout();
    $this->get($url)->assertRedirect('/login');
});

test('upload rejeita conteúdo disfarçado e arquivos acima do limite', function () {
    $this->seed(RoleSeeder::class);
    Storage::fake('cms-media');
    $this->actingAs(User::factory()->create()->assignRole('editor'));
    $fake = UploadedFile::fake()->createWithContent('falso.pdf', '<script>alert(1)</script>');
    foreach ([
        new UploadedFile($fake->getPathname(), 'falso.pdf', 'application/pdf', null, true),
        UploadedFile::fake()->create('grande.pdf', 5121, 'application/pdf'),
    ] as $file) {
        $this->post('/cms/media', ['title' => 'Inválido', 'file' => $file])->assertSessionHasErrors('file');
    }
    expect(Media::count())->toBe(0);
    expect(Storage::disk('cms-media')->allFiles())->toBe([]);
});

test('download público segue o PDF da versão publicada e respeita o arquivamento', function () {
    Storage::fake('cms-media');
    $makePdf = function (string $name) {
        Storage::disk('cms-media')->put($name, '%PDF-1.4');

        return Media::create(['title' => $name, 'original_name' => $name, 'path' => $name, 'mime' => 'application/pdf', 'size' => 8]);
    };
    $old = $makePdf('edital.pdf');
    $new = $makePdf('novo.pdf');
    $body = fn (Media $media) => json_encode([['type' => 'download', 'mediaId' => $media->id, 'text' => 'Baixar edital']]);
    $page = Page::create(['title' => 'Edital', 'slug' => 'edital-pdf', 'locale' => 'pt_BR', 'body_format' => 'blocks', 'body' => $body($old)]);
    $url = fn (Media $media) => route('media.published', ['kind' => 'pages', 'id' => $page->id, 'media' => $media->uuid]);
    $this->get($url($old))->assertNotFound();
    $page->update(['published_content' => $page->only(['title', 'locale', 'body_format', 'body']), 'body' => $body($new)]);
    $this->get("/documentos/pages/{$page->id}/{$old->id}")->assertNotFound();
    $this->get($url($old))->assertDownload('edital.pdf');
    $this->get($url($new))->assertNotFound();
    $page->update(['published_content' => $page->only(['title', 'locale', 'body_format', 'body'])]);
    $this->get($url($old))->assertNotFound();
    $this->get($url($new))->assertDownload('novo.pdf');
    $page->update(['published_content' => null, 'status' => 'archived']);
    $this->get($url($new))->assertNotFound();
});
