<?php

use App\Models\Page;
use App\Models\User;
use Database\Seeders\RoleSeeder;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    $this->seed(RoleSeeder::class);
    config(['inertia.testing.page_paths' => [resource_path('js/pages')]]);
    $admin = User::factory()->create();
    $admin->assignRole('admin');
    $this->actingAs($admin);
});

test('blocos de layout podem ser salvos revisados e publicados', function (array $block) {
    $body = json_encode([$block]);
    $this->post('/cms/pages', ['title' => 'Página de teste', 'slug' => 'layout-teste', 'locale' => 'pt_BR', 'body_format' => 'blocks', 'body' => $body])
        ->assertSessionHasNoErrors()->assertRedirect();
    $page = Page::firstOrFail();
    $this->get('/layout-teste')->assertNotFound();
    $this->post("/cms/pages/{$page->id}/transition", ['action' => 'review'])->assertRedirect();
    $this->post("/cms/pages/{$page->id}/transition", ['action' => 'publish'])->assertRedirect();
    $this->get('/layout-teste')->assertInertia(fn (Assert $response) => $response->component('Cms/PublicPage')->where('content.body', $body));
    $this->put("/cms/pages/{$page->id}", ['title' => 'Rascunho alterado', 'slug' => 'layout-teste', 'locale' => 'pt_BR', 'body_format' => 'blocks', 'body' => $body])
        ->assertSessionHasNoErrors();
    expect($page->fresh()->published_content['title'])->toBe('Página de teste');
})->with([
    'card' => [['type' => 'card', 'items' => [['title' => 'Missão', 'text' => 'Texto institucional', 'icon' => 'target', 'url' => '/sobre']]]],
    'grade' => [['type' => 'cards', 'columns' => 2, 'title' => 'O Programa', 'items' => [['title' => 'Missão', 'text' => 'Texto', 'image' => '/images/lab.png', 'alt' => 'Laboratório']]]],
    'carrossel' => [['type' => 'carousel', 'items' => [
        ['title' => 'Programa', 'image' => 'https://example.com/a.jpg', 'alt' => 'Campus', 'url' => '/sobre', 'button' => 'Conheça'],
        ['title' => 'Pesquisa', 'image' => '/images/lab.png', 'alt' => 'Laboratório'],
    ]]],
    'indicadores' => [['type' => 'stats', 'items' => [['title' => 'Ano de referência', 'value' => '2026']]]],
    'banner' => [['type' => 'banner', 'items' => [['title' => 'Programa', 'image' => '/images/banner_01.png', 'alt' => 'Campus']]]],
]);

test('backend rejeita configuracoes inseguras ou incompletas dos blocos de layout', function (array $block) {
    $this->post('/cms/pages', ['title' => 'Teste', 'slug' => 'layout-invalido', 'locale' => 'pt_BR', 'body_format' => 'blocks', 'body' => json_encode([$block])])
        ->assertSessionHasErrors('body');
    expect(Page::count())->toBe(0);
})->with([
    'card vazio' => [['type' => 'card', 'items' => []]],
    'card sem texto' => [['type' => 'card', 'items' => [['title' => 'Teste']]]],
    'item nao objeto' => [['type' => 'cards', 'items' => ['texto']]],
    'icone desconhecido' => [['type' => 'card', 'items' => [['title' => 'Teste', 'text' => 'Texto', 'icon' => '<script>']]]],
    'javascript no card' => [['type' => 'card', 'items' => [['title' => 'Teste', 'text' => 'Texto', 'url' => 'javascript:alert(1)']]]],
    'colunas invalidas' => [['type' => 'cards', 'columns' => 10, 'items' => [['title' => 'Teste', 'text' => 'Texto']]]],
    'imagem sem alt' => [['type' => 'banner', 'items' => [['title' => 'Teste', 'image' => 'https://example.com/a.png', 'alt' => '']]]],
    'imagem data' => [['type' => 'banner', 'items' => [['title' => 'Teste', 'image' => 'data:image/svg+xml,teste', 'alt' => 'Teste']]]],
    'banner sem imagem' => [['type' => 'banner', 'items' => [['title' => 'Teste']]]],
    'link do slide sem rotulo' => [['type' => 'carousel', 'items' => [['title' => 'Teste', 'image' => '/images/a.png', 'alt' => 'Teste', 'url' => '/sobre']]]],
    'indicador sem valor' => [['type' => 'stats', 'items' => [['title' => 'Teste']]]],
    'muitos slides' => [['type' => 'carousel', 'items' => array_fill(0, 11, ['title' => 'Slide', 'image' => '/images/lab.png', 'alt' => 'Lab'])]],
]);
