<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Rules\PageBlocks;
use App\Rules\PublicImageUrl;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class NewsController extends Controller
{
    private function access(Request $request, string $permission): void
    {
        abort_unless($request->user()->can($permission), 403);
    }

    public function index(Request $request)
    {
        $this->access($request, 'noticias.ver');

        $filters = $request->validate([
            'q' => ['nullable', 'string', 'max:200'],
            'status' => ['nullable', Rule::in(['draft', 'review', 'published', 'archived'])],
            'locale' => ['nullable', Rule::in(['pt_BR', 'en'])],
        ]);

        return Inertia::render('Cms/News', [
            'pages' => News::query()->select('news.*')
                ->addSelect(['last_editor' => DB::table('news_events')->join('users', 'users.id', '=', 'news_events.user_id')
                    ->select('users.name')->whereColumn('news_events.news_id', 'news.id')->whereIn('news_events.action', ['created', 'updated'])
                    ->orderByDesc('news_events.id')->limit(1)])
                ->when($filters['q'] ?? null, fn ($query, $q) => $query->whereRaw('LOWER(title) LIKE ?', ['%'.mb_strtolower($q).'%']))
                ->when($filters['status'] ?? null, fn ($query, $status) => $query->where('status', $status))
                ->when($filters['locale'] ?? null, fn ($query, $locale) => $query->where('locale', $locale))
                ->orderByDesc('updated_at')->paginate(20)->withQueryString()
                ->through(fn ($page) => $page->only(['id', 'title', 'slug', 'locale', 'status', 'updated_at', 'published_at', 'last_editor'])),
            'filters' => $filters,
            'counts' => News::selectRaw('status, COUNT(*) as total')->groupBy('status')->pluck('total', 'status'),
            'canEdit' => $request->user()->can('noticias.editar'),
            'canCreate' => $request->user()->can('noticias.criar'),
        ]);
    }

    public function create(Request $request)
    {
        $this->access($request, 'noticias.criar');

        return Inertia::render('Cms/EditNews', ['page' => null, 'canEdit' => true, 'canPublish' => false, 'events' => []]);
    }

    public function edit(Request $request, News $page)
    {
        $this->access($request, 'noticias.ver');

        return Inertia::render('Cms/EditNews', [
            'page' => $page,
            'canEdit' => $request->user()->can('noticias.editar'),
            'canCreate' => $request->user()->can('noticias.criar'),
            'canPublish' => $request->user()->can('noticias.publicar'),
            'events' => DB::table('news_events')->leftJoin('users', 'users.id', '=', 'news_events.user_id')->where('news_id', $page->id)->orderByDesc('news_events.id')->limit(20)->get(['news_events.*', 'users.name as user_name']),
        ]);
    }

    public function store(Request $request)
    {
        $this->access($request, 'noticias.criar');
        $data = $this->validated($request);
        $page = DB::transaction(function () use ($request, $data) {
            $page = News::create($data);
            $this->record($page, $request, 'created');

            return $page;
        });

        return redirect()->route('cms.news.edit', $page);
    }

    public function update(Request $request, News $page)
    {
        $this->access($request, 'noticias.editar');
        $data = $this->validated($request, $page);
        DB::transaction(function () use ($request, $page, $data) {
            $page = News::lockForUpdate()->findOrFail($page->id);
            $page->update([...$data, 'status' => 'draft']);
            $this->record($page, $request, 'updated');
        });

        return back();
    }

    public function transition(Request $request, News $page)
    {
        $data = $request->validate(['action' => ['required', Rule::in(['review', 'publish', 'archive'])]]);
        $action = $data['action'];
        $this->access($request, $action === 'review' ? 'noticias.editar' : 'noticias.publicar');
        DB::transaction(function () use ($page, $request, $action) {
            $page = News::lockForUpdate()->findOrFail($page->id);
            abort_unless(match ($action) {
                'review' => $page->status === 'draft',
                'publish' => $page->status === 'review',
                'archive' => $page->published_content !== null,
            }, 409, 'Transição indisponível. Atualize a página.');
            if ($action === 'publish') {

                $page->published_content = $page->only(['title', 'summary', 'category', 'image', 'image_alt', 'show_on_home', 'body', 'body_format', 'locale']);
                $page->published_at = now();
                $page->published_by = $request->user()->id;
            }
            if ($action === 'archive') {
                $page->published_content = null;
                $page->published_at = null;
                $page->published_by = null;
            }
            $page->status = ['review' => 'review', 'publish' => 'published', 'archive' => 'archived'][$action];
            $page->save();
            $this->record($page, $request, $action);
        });

        return back();
    }

    public function publicIndex()
    {
        return Inertia::render('Cms/PublicNewsIndex', ['news' => News::whereNotNull('published_content')->orderByDesc('published_at')->orderByDesc('id')->paginate(12)->through(fn ($news) => $news->card())]);
    }

    public function show(string $slug)
    {

        $page = News::where('slug', $slug)->whereNotNull('published_content')->firstOrFail();

        return Inertia::render('Cms/PublicNews', ['content' => $page->published_content, 'publishedAt' => $page->published_at?->toIso8601String()]);
    }

    private function validated(Request $request, ?News $page = null): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:200'],
            'summary' => ['required', 'string', 'max:500'],
            'category' => ['required', 'string', 'max:80'],
            'image' => ['nullable', 'string', 'max:2048', new PublicImageUrl],
            'image_alt' => ['nullable', 'required_with:image', 'string', 'max:1000'],
            'show_on_home' => ['required', 'boolean'],
            'slug' => ['required', 'string', 'max:160', 'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/', $page ? Rule::in([$page->slug]) : Rule::unique('news', 'slug')],
            'body_format' => ['sometimes', Rule::in(['text', 'blocks'])],
            'body' => ['required', 'string', 'max:100000', ...($request->input('body_format', 'text') === 'blocks' ? [new PageBlocks] : [])],
            'locale' => ['required', Rule::in(['pt_BR', 'en'])],
        ]) + ['body_format' => 'text'];
    }

    private function record(News $page, Request $request, string $action): void
    {
        DB::table('news_events')->insert(['news_id' => $page->id, 'user_id' => $request->user()->id, 'action' => $action, 'created_at' => now()]);
    }
}
