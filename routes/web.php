<?php

use App\Http\Controllers\PessoasController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('/sobre', function () {
    return Inertia::render('Sobre');
});

Route::get('/contato', function () {
    return Inertia::render('Contato');
});

/*
|--------------------------------------------------------------------------
| Pessoas
|--------------------------------------------------------------------------
*/

Route::get('/pessoas/docentes', [PessoasController::class, 'docentes'])
    ->name('pessoas.docentes');

Route::get('/pessoas/discentes', [PessoasController::class, 'discentes'])
    ->name('pessoas.discentes');

/*
|--------------------------------------------------------------------------
| Idioma
|--------------------------------------------------------------------------
*/

Route::get('/lang/{locale}', function (string $locale) {
    $supported = ['pt_BR', 'en', 'es'];

    if (in_array($locale, $supported)) {
        Session::put('locale', $locale);
    }

    return redirect()->back();
})->name('lang.switch');
