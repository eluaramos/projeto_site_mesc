<?php

namespace App\Http\Middleware;

use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        // Switching shells requires fresh Blade HTML, not just new Inertia props.
        return parent::version($request).($this->showsGovernmentBar($request) ? ':portal' : ':internal');
    }

    private function showsGovernmentBar(Request $request): bool
    {
        return $request->routeIs('portal.*', 'pessoas.*', 'news.index', 'news.show', 'pages.show');
    }

    public function share(Request $request): array
    {
        $locale = Session::get('locale', 'pt_BR');

        return [
            ...parent::share($request),
            'showGovernmentBar' => $this->showsGovernmentBar($request),
            'pdfOptions' => fn () => $request->routeIs('cms.pages.create', 'cms.pages.edit', 'cms.news.create', 'cms.news.edit')
                && $request->user()?->can('midia.ver')
                ? Media::where('mime', 'application/pdf')->latest('id')->get(['id', 'uuid', 'title', 'original_name', 'size'])
                : [],
            'coverOptions' => fn () => $request->routeIs('cms.news.create', 'cms.news.edit')
                && $request->user()?->can('midia.ver')
                ? Media::whereIn('mime', Media::IMAGE_MIMES)->latest('id')->get(['uuid', 'title', 'original_name'])
                : [],
            'locale' => $locale,
            'translations' => trans('site'),
            'auth' => [
                'user' => $request->user() ? [
                    'id' => $request->user()->id,
                    'name' => $request->user()->name,
                    'email' => $request->user()->email,
                    'roles' => $request->user()->getRoleNames(),
                    'can_view_news' => $request->user()->can('noticias.ver'),
                    'can_view_media' => $request->user()->can('midia.ver'),
                    'is_admin' => $request->user()->hasRole('admin'),
                    'can_view_pages' => $request->user()->can('paginas.ver'),
                    'can_edit_pages' => $request->user()->can('paginas.editar'),
                ] : null,
            ],
        ];
    }
}
