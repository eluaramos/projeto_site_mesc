<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia; // <-- Não esqueça de importar o Inertia no topo

Route::get('/', function () {
    // O nome aqui deve ser o nome exato do seu arquivo .tsx dentro de resources/js/Pages
    return Inertia::render('Home');
});

Route::get('/contato', function () {
    return Inertia::render('Contato');
});
