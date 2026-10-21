<?php

use App\Models\Page;
use App\Models\User;
use Database\Seeders\RoleSeeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    $this->seed(RoleSeeder::class);
    config(['inertia.testing.page_paths' => [resource_path('js/pages')]]);
});

function cmsUser(string $role): User
{
    $user = User::factory()->create();
    $user->assignRole($role);

    return $user;
}

test('visitantes e colaboradores não acessam a gestão de páginas', function () {
    $this->get('/cms/pages')->assertRedirect('/login');
    $this->actingAs(cmsUser('colaborador'))->get('/cms/pages')->assertForbidden();
    $this->post('/cms/pages', ['title' => 'Teste'])->assertForbidden();
});

test('editor cria e submete, revisor publica, edições preservam a versão pública', function () {
    $editor = cmsUser('editor');
    $revisor = cmsUser('revisor');
    $data = ['title' => 'O Programa', 'slug' => 'o-programa', 'body' => 'Conteúdo aprovado', 'locale' => 'pt_BR'];
    $this->actingAs($editor)->post('/cms/pages', $data)->assertRedirect();
    $page = Page::firstOrFail();
    $this->get('/o-programa')->assertNotFound();
    $this->post("/cms/pages/{$page->id}/transition", ['action' => 'publish'])->assertForbidden();
    $this->actingAs($revisor)->post("/cms/pages/{$page->id}/transition", ['action' => 'publish'])->assertStatus(409);
    $this->put("/cms/pages/{$page->id}", $data)->assertForbidden();
    $this->actingAs($editor)->post("/cms/pages/{$page->id}/transition", ['action' => 'review'])->assertRedirect();
    $this->actingAs($revisor)->post("/cms/pages/{$page->id}/transition", ['action' => 'publish'])->assertRedirect();
    expect($page->fresh()->published_by)->toBe($revisor->id);
    $this->actingAs($editor)->put("/cms/pages/{$page->id}", [...$data, 'body' => 'Alteração privada'])->assertRedirect();
    $this->get('/o-programa')->assertInertia(fn (Assert $response) => $response->component('Cms/PublicPage')->where('content.body', 'Conteúdo aprovado')->missing('page'));
    expect($page->fresh()->status)->toBe('draft');
    $this->actingAs($revisor)->post("/cms/pages/{$page->id}/transition", ['action' => 'archive'])->assertRedirect();
    $this->get('/o-programa')->assertNotFound();
    expect(DB::table('page_events')->where('page_id', $page->id)->count())->toBe(5);
});

test('validação rejeita slug inseguro e não aceita publicação por mass assignment', function () {
    $this->actingAs(cmsUser('editor'));
    $data = ['title' => 'Página', 'slug' => '../admin', 'body' => '<script>alert(1)</script>', 'locale' => 'pt_BR'];
    $this->post('/cms/pages', $data)->assertSessionHasErrors('slug');
    $this->post('/cms/pages', [...$data, 'slug' => 'pagina', 'status' => 'published', 'published_content' => ['body' => 'Exposto']])->assertRedirect();
    expect(Page::firstOrFail()->status)->toBe('draft');
    expect(Page::firstOrFail()->published_content)->toBeNull();
    $this->get('/pagina')->assertNotFound();
});

test('lista filtra por titulo estado e idioma sem expor corpo dos rascunhos', function () {
    $this->actingAs(cmsUser('editor'));
    Page::create(['title' => 'Missão MESC', 'slug' => 'missao', 'body' => 'Privado', 'locale' => 'pt_BR', 'status' => 'review']);
    Page::create(['title' => 'Mission', 'slug' => 'mission', 'body' => 'Private', 'locale' => 'en']);
    $this->get('/cms/pages?q=mesc&status=review&locale=pt_BR')->assertInertia(fn (Assert $page) => $page
        ->component('Cms/Pages')->has('pages.data', 1)->where('pages.data.0.title', 'Missão MESC')
        ->missing('pages.data.0.body')->where('counts.review', 1)->where('filters.q', 'mesc'));
    $this->get('/cms/pages?status=unknown')->assertSessionHasErrors('status');
});

test('blocos validos publicam com formato e mantem versao anterior durante edicao', function () {
    $this->actingAs(cmsUser('admin'));
    $blocks = [
        ['type' => 'heading', 'text' => 'Apresentação'],
        ['type' => 'paragraph', 'text' => 'Conheça o MESC'],
        ['type' => 'quote', 'text' => 'Uma citação'],
        ['type' => 'list', 'text' => "Ensino\nPesquisa", 'ordered' => false],
        ['type' => 'link', 'text' => 'UFF', 'url' => 'https://www.uff.br'],
        ['type' => 'image', 'url' => 'https://www.uff.br/imagem.png', 'alt' => 'Campus UFF', 'caption' => 'Campus'],
        ['type' => 'table', 'caption' => 'Etapas', 'rows' => [['Etapa', 'Ano'], ['Ingresso', '2026']]],
    ];
    $data = ['title' => 'Programa', 'slug' => 'programa', 'body_format' => 'blocks', 'body' => json_encode($blocks), 'locale' => 'pt_BR'];
    $this->post('/cms/pages', $data)->assertSessionHasNoErrors()->assertRedirect();
    $page = Page::firstOrFail();
    $this->post("/cms/pages/{$page->id}/transition", ['action' => 'review'])->assertRedirect();
    $this->post("/cms/pages/{$page->id}/transition", ['action' => 'publish'])->assertRedirect();
    $this->get('/programa')->assertInertia(fn (Assert $response) => $response->component('Cms/PublicPage')->where('content.body_format', 'blocks')->where('content.body', $data['body']));
    $this->put("/cms/pages/{$page->id}", [...$data, 'body' => 'Texto legado', 'body_format' => 'text'])->assertSessionHasNoErrors();
    expect($page->fresh()->body_format)->toBe('text');
    expect($page->fresh()->published_content['body_format'])->toBe('blocks');
});

test('blocos rejeitam links executaveis imagens sem descricao e tabelas invalidas', function (array $blocks) {
    $this->actingAs(cmsUser('editor'))->post('/cms/pages', [
        'title' => 'Página inválida', 'slug' => 'invalida', 'locale' => 'pt_BR',
        'body_format' => 'blocks', 'body' => json_encode($blocks),
    ])->assertSessionHasErrors('body');
    expect(Page::count())->toBe(0);
})->with([
    'script' => [[['type' => 'link', 'text' => 'Clique', 'url' => 'javascript:alert(1)']]],
    'url relativa a protocolo' => [[['type' => 'link', 'text' => 'Clique', 'url' => '//example.com']]],
    'barra invertida' => [[['type' => 'link', 'text' => 'Clique', 'url' => '/\\example.com']]],
    'sem alt' => [[['type' => 'image', 'url' => 'https://example.com/a.png', 'alt' => '', 'caption' => '']]],
    'tabela irregular' => [[['type' => 'table', 'caption' => 'Tabela', 'rows' => [['A', 'B'], ['C']]]]],
    'vazio' => [[]],
    'tipo desconhecido' => [[['type' => 'html', 'text' => '<script>alert(1)</script>']]],
]);

test('CMS reserva enderecos e namespaces existentes do portal', function (string $slug) {
    $this->actingAs(cmsUser('editor'))->post('/cms/pages', [
        'title' => 'Teste', 'slug' => $slug, 'body' => 'Texto', 'locale' => 'pt_BR',
    ])->assertSessionHasErrors('slug');
    expect(Page::count())->toBe(0);
})->with(['contato', 'sobre', 'login', 'logout', 'register', 'dashboard', 'cms', 'pessoas', 'lang', 'up', 'paginas']);

test('reserva rotas futuras e parametros dinamicos sem lista fixa', function () {
    Route::post('/rota-institucional', fn () => 'Institucional');
    Route::get('/{codigo}', fn () => 'Especial')->where('codigo', 'especial-[0-9]+');
    $this->actingAs(cmsUser('editor'));
    foreach (['rota-institucional', 'especial-42'] as $slug) {
        $this->post('/cms/pages', ['title' => 'Teste', 'slug' => $slug, 'body' => 'Texto', 'locale' => 'pt_BR'])
            ->assertSessionHasErrors('slug');
    }
    expect(Page::count())->toBe(0);
});

test('paginas publicadas usam raiz e endereco antigo redireciona sem expor rascunhos', function () {
    Page::create(['title' => 'Teste', 'slug' => 'teste', 'body' => 'Texto', 'locale' => 'pt_BR',
        'published_content' => ['title' => 'Teste', 'body' => 'Texto', 'locale' => 'pt_BR']]);
    Page::create(['title' => 'Privada', 'slug' => 'privada', 'body' => 'Rascunho', 'locale' => 'pt_BR']);
    $this->get('/teste')->assertOk()->assertInertia(fn (Assert $page) => $page->component('Cms/PublicPage'));
    expect(route('pages.show', ['slug' => 'teste'], false))->toBe('/teste');
    $this->get('/paginas/teste')->assertStatus(301)->assertRedirect('/teste');
    $this->get('/privada')->assertNotFound();
    $this->get('/paginas/privada')->assertNotFound();
    $this->get('/endereco-inexistente')->assertNotFound();
    $this->get('/contato')->assertInertia(fn (Assert $page) => $page->component('Contato'));
});

test('pagina antiga em conflito nao pode publicar nem redirecionar para rota institucional', function () {
    $page = Page::create(['title' => 'Conflito', 'slug' => 'contato', 'body' => 'Texto', 'locale' => 'pt_BR', 'status' => 'review',
        'published_content' => ['title' => 'Conflito', 'body' => 'Texto', 'locale' => 'pt_BR']]);
    $this->actingAs(cmsUser('admin'))->post("/cms/pages/{$page->id}/transition", ['action' => 'publish'])
        ->assertSessionHasErrors('slug');
    $this->get('/paginas/contato')->assertNotFound();
    $this->get('/contato')->assertInertia(fn (Assert $response) => $response->component('Contato'));
});
