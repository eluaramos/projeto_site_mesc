<?php

namespace App\Http\Controllers;

use App\Models\News;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function __invoke()
    {
        return Inertia::render('Home', ['news' => News::whereNotNull('published_content')
            ->where('published_content->show_on_home', true)
            ->orderByDesc('published_at')->orderByDesc('id')->limit(2)->get()->map(fn ($news) => $news->card())]);
    }
}
