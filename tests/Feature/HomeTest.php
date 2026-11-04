<?php

use App\Models\User;

test('página inicial carrega com sucesso', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
});

test('barra Brasil fica nas páginas públicas e não aparece na autenticação ou no painel', function () {
    $this->get('/')->assertOk()->assertSee('id="barra-brasil"', false)->assertSee('barra_2.0.js');
    $this->get('/noticias')->assertOk()->assertSee('id="barra-brasil"', false);
    $this->get('/login')->assertOk()->assertDontSee('barra-brasil')->assertDontSee('barra_2.0.js');
    $this->get('/forgot-password')->assertOk()->assertDontSee('barra-brasil');
    $this->actingAs(User::factory()->create())->get('/dashboard')
        ->assertOk()->assertDontSee('barra-brasil')->assertDontSee('barra_2.0.js');
    $this->get('/')->assertOk()->assertSee('id="barra-brasil"', false);
});

test('Inertia recarrega o documento ao trocar entre portal e painel', function () {
    $this->actingAs(User::factory()->create());
    $portal = $this->get('/')->viewData('page')['version'];
    $dashboard = $this->get('/dashboard')->viewData('page')['version'];

    $this->get('/dashboard', ['X-Inertia' => 'true', 'X-Inertia-Version' => $portal])
        ->assertStatus(409)->assertHeader('X-Inertia-Location', url('/dashboard'));
    $this->get('/', ['X-Inertia' => 'true', 'X-Inertia-Version' => $dashboard])
        ->assertStatus(409)->assertHeader('X-Inertia-Location', url('/'));
});
