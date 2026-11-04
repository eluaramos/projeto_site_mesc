<?php

use Illuminate\Support\Facades\DB;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    config(['inertia.testing.page_paths' => [resource_path('js/pages')]]);
});

test('visitantes podem acessar docentes com dados do banco', function () {
    DB::table('docentes')->insert([
        'nome' => 'Docente de Teste',
        'email' => 'docente@example.com',
        'grupo' => 'principal',
        'ordem' => 1,
    ]);

    $this->get('/pessoas/docentes')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Docentes')
            ->has('docentes', 1)
            ->where('docentes.0.nome', 'Docente de Teste')
            ->where('auth.user', null)
        );
});

test('visitantes podem acessar discentes agrupados por turma', function () {
    $turmaId = DB::table('turmas_discentes')->insertGetId(['ano' => 2026]);

    DB::table('discentes')->insert([
        'nome' => 'Discente de Teste',
        'turma_id' => $turmaId,
        'ordem' => 1,
    ]);

    $this->get('/pessoas/discentes')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Discentes')
            ->has('turmas', 1)
            ->where('turmas.0.ano', 2026)
            ->has('turmas.0.discentes', 1)
            ->where('turmas.0.discentes.0.nome', 'Discente de Teste')
            ->where('auth.user', null)
        );
});
