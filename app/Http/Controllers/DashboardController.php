<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Models\Page;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke(Request $request)
    {
        $queue = [];
        $user = $request->user();

        if ($user->can('paginas.ver') && $user->can('paginas.publicar')) {
            $count = Page::where('status', 'review')->count();
            if ($count > 0) {
                $queue[] = ['kind' => 'pages', 'count' => $count, 'url' => route('cms.pages.index', ['status' => 'review'], false)];
            }
        }

        if ($user->can('noticias.ver') && $user->can('noticias.publicar')) {
            $count = News::where('status', 'review')->count();
            if ($count > 0) {
                $queue[] = ['kind' => 'news', 'count' => $count, 'url' => route('cms.news.index', ['status' => 'review'], false)];
            }
        }

        return Inertia::render('Dashboard', ['reviewQueue' => $queue]);
    }
}
