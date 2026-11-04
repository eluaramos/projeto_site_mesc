<?php

namespace App\Http\Controllers;

use App\Models\Page;
use App\Rules\AvailablePageSlug;
use App\Rules\PageBlocks;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class PageController extends Controller
{
    private function access(Request $request, string $permission): void
    {
        abort_unless($request->user()->can($permission), 403);
    }

    public function index(Request $request)
    {
        $this->access($request, 'paginas.ver');

        $filters = $request->validate([
            'q' => ['nullable', 'string', 'max:200'],
            'status' => ['nullable', Rule::in(['draft', 'review', 'published', 'archived'])],
            'locale' => ['nullable', Rule::in(['pt_BR', 'en'])],
        ]);

        return Inertia::render('Cms/Pages', [
            'pages' => Page::query()->select('pages.*')
                ->addSelect(['last_editor' => DB::table('page_events')->join('users', 'users.id', '=', 'page_events.user_id')
                    ->select('users.name')->whereColumn('page_events.page_id', 'pages.id')->whereIn('page_events.action', ['created', 'updated'])
                    ->orderByDesc('page_events.id')->limit(1)])
                ->when($filters['q'] ?? null, fn ($query, $q) => $query->whereRaw('LOWER(title) LIKE ?', ['%'.mb_strtolower($q).'%']))
                ->when($filters['status'] ?? null, fn ($query, $status) => $query->where('status', $status))
                ->when($filters['locale'] ?? null, fn ($query, $locale) => $query->where('locale', $locale))
                ->orderByDesc('updated_at')->paginate(20)->withQueryString()
                ->through(fn ($page) => $page->only(['id', 'title', 'slug', 'locale', 'status', 'updated_at', 'published_at', 'last_editor'])),
            'filters' => $filters,
            'counts' => Page::selectRaw('status, COUNT(*) as total')->groupBy('status')->pluck('total', 'status'),
            'canEdit' => $request->user()->can('paginas.editar'),
        ]);
    }

    public function create(Request $request)
    {
        $this->access($request, 'paginas.editar');

        return Inertia::render('Cms/EditPage', ['page' => null, 'canEdit' => true, 'canPublish' => false, 'events' => []]);
    }

    public function edit(Request $request, Page $page)
    {
        $this->access($request, 'paginas.ver');

        return Inertia::render('Cms/EditPage', [
            'page' => $page,
            'canEdit' => $request->user()->can('paginas.editar'),
            'canPublish' => $request->user()->can('paginas.publicar'),
            'events' => DB::table('page_events')->leftJoin('users', 'users.id', '=', 'page_events.user_id')->where('page_id', $page->id)->orderByDesc('page_events.id')->limit(20)->get(['page_events.*', 'users.name as user_name']),
        ]);
    }

    public function store(Request $request)
    {
        $this->access($request, 'paginas.editar');
        $data = $this->validated($request);
        $page = DB::transaction(function () use ($request, $data) {
            $page = Page::create($data);
            $this->record($page, $request, 'created');

            return $page;
        });

        return redirect()->route('cms.pages.edit', $page);
    }

    public function update(Request $request, Page $page)
    {
        $this->access($request, 'paginas.editar');
        $data = $this->validated($request, $page);
        DB::transaction(function () use ($request, $page, $data) {
            $page = Page::lockForUpdate()->findOrFail($page->id);
            $page->update([...$data, 'status' => 'draft']);
            $this->record($page, $request, 'updated');
        });

        return back();
    }

    public function transition(Request $request, Page $page)
    {
        $data = $request->validate(['action' => ['required', Rule::in(['review', 'publish', 'archive'])]]);
        $action = $data['action'];
        $this->access($request, $action === 'review' ? 'paginas.editar' : 'paginas.publicar');
        DB::transaction(function () use ($page, $request, $action) {
            $page = Page::lockForUpdate()->findOrFail($page->id);
            abort_unless(match ($action) {
                'review' => $page->status === 'draft',
                'publish' => $page->status === 'review',
                'archive' => $page->published_content !== null,
            }, 409, 'Transição indisponível. Atualize a página.');
            if ($action === 'publish') {
                $request->merge(['slug' => $page->slug]);
                $request->validate(['slug' => [new AvailablePageSlug]]);
                $page->published_content = $page->only(['title', 'body', 'body_format', 'locale']);
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

    public function legacy(string $slug)
    {
        abort_if(AvailablePageSlug::reserved($slug), 404);
        Page::where('slug', $slug)->whereNotNull('published_content')->firstOrFail();

        return redirect()->route('pages.show', ['slug' => $slug], 301);
    }

    public function show(string $slug)
    {
        abort_if(AvailablePageSlug::reserved($slug), 404);
        $page = Page::where('slug', $slug)->whereNotNull('published_content')->firstOrFail();

        return Inertia::render('Cms/PublicPage', ['content' => $page->published_content]);
    }

    private function validated(Request $request, ?Page $page = null): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:200'],
            'slug' => ['required', 'string', 'max:160', 'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/', new AvailablePageSlug, $page ? Rule::in([$page->slug]) : Rule::unique('pages', 'slug')],
            'body_format' => ['sometimes', Rule::in(['text', 'blocks'])],
            'body' => ['required', 'string', 'max:100000', ...($request->input('body_format', 'text') === 'blocks' ? [new PageBlocks] : [])],
            'locale' => ['required', Rule::in(['pt_BR', 'en'])],
        ]) + ['body_format' => 'text'];
    }

    private function record(Page $page, Request $request, string $action): void
    {
        DB::table('page_events')->insert(['page_id' => $page->id, 'user_id' => $request->user()->id, 'action' => $action, 'created_at' => now()]);
    }
}
