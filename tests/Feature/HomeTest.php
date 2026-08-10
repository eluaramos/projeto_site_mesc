<?php

use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('página inicial carrega com sucesso', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
});