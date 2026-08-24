<?php

test('página inicial carrega com sucesso', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
});
