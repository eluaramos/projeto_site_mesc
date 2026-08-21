<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class SetLocale
{
    public function handle(Request $request, Closure $next)
    {
        $locale = session('locale', $request->get('lang'));

        if ($locale && in_array($locale, ['pt_BR', 'en', 'es'])) {
            app()->setLocale($locale);
            session(['locale' => $locale]);
        } else {
            // fallback para o idioma do navegador, se disponível
            $browserLocale = substr($request->server('HTTP_ACCEPT_LANGUAGE'), 0, 2);
            $locale = match ($browserLocale) {
                'pt' => 'pt_BR',
                'en' => 'en',
                'es' => 'es',
                default => 'pt_BR'
            };
            app()->setLocale($locale);
            session(['locale' => $locale]);
        }

        return $next($request);
    }
}
