<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('/contato', function () {
    return Inertia::render('Contato');
});

Route::get('/lang/{locale}', function (string $locale) {
    $supported = ['pt_BR', 'en', 'es'];

    if (in_array($locale, $supported)) {
        Session::put('locale', $locale);
    }

    return redirect()->back();
})->name('lang.switch');
