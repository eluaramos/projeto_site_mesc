<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    public function handle(Request $request, Closure $next): Response
    {
        $supported = ['pt_BR', 'en', 'es'];
        $locale = Session::get('locale', 'pt_BR');

        if ($request->has('lang') && in_array($request->get('lang'), $supported)) {
            $locale = $request->get('lang');
            Session::put('locale', $locale);
        }

        App::setLocale($locale);

        return $next($request);
    }
}
