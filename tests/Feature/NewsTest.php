<?php

use App\Models\News;
use App\Models\User;
use Database\Seeders\RoleSeeder;
use Illuminate\Support\Facades\DB;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    $this->seed(RoleSeeder::class);
    config(['inertia.testing.page_paths' => [resource_path('js/pages')]]);
});

function newsActor(string $role): User
{
    $user = User::factory()->create();
    $user->assignRole($role);

    return $user;
}
function newsData(array $changes = []): array
{
    return [...['title' => 'Notícia aprovada', 'slug' => 'noticia-teste', 'summary' => 'Resumo aprovado', 'category' => 'Pesquisa',
        'image' => '/images/lab.png', 'image_alt' => 'Laboratório', 'show_on_home' => true, 'locale' => 'pt_BR',
        'body_format' => 'blocks', 'body' => json_encode([['type' => 'paragraph', 'text' => 'Conteúdo']])], ...$changes];
}

test('gestao de noticias exige login e permissoes em todas as operacoes', function () {
    $news = News::create(newsData());
    $this->get('/cms/news')->assertRedirect('/login');
    $this->actingAs(User::factory()->create())->get('/cms/news')->assertForbidden();
    $this->get('/cms/news/create')->assertForbidden();
    $this->get("/cms/news/{$news->id}/edit")->assertForbidden();
    $this->post('/cms/news', newsData())->assertForbidden();
    $this->put("/cms/news/{$news->id}", newsData())->assertForbidden();
    $this->post("/cms/news/{$news->id}/transition", ['action' => 'archive'])->assertForbidden();
});

test('editor prepara revisor publica e home recebe apenas a versao aprovada', function () {
    $editor = newsActor('editor');
    $revisor = newsActor('revisor');
    $this->actingAs($editor)->get('/cms/news/create')->assertInertia(fn (Assert $page) => $page->component('Cms/EditNews'));
    $this->post('/cms/news', newsData(['published_content' => ['title' => 'Injetado'], 'status' => 'published']))->assertSessionHasNoErrors()->assertRedirect();
    $news = News::firstOrFail();
    $this->get('/')->assertInertia(fn (Assert $page) => $page->has('news', 0));
    $this->get('/noticias/noticia-teste')->assertNotFound();
    $this->post("/cms/news/{$news->id}/transition", ['action' => 'publish'])->assertForbidden();
    $this->actingAs($revisor)->post("/cms/news/{$news->id}/transition", ['action' => 'publish'])->assertStatus(409);
    $this->put("/cms/news/{$news->id}", newsData())->assertForbidden();
    $this->post('/cms/news', newsData())->assertForbidden();
    $this->actingAs($editor)->post("/cms/news/{$news->id}/transition", ['action' => 'review'])->assertRedirect();
    $this->actingAs($revisor)->get("/cms/news/{$news->id}/edit")->assertInertia(fn (Assert $page) => $page->component('Cms/EditNews')->where('page.id', $news->id)->where('canPublish', true)->where('canEdit', false));
    $this->post("/cms/news/{$news->id}/transition", ['action' => 'publish'])->assertRedirect();
    expect($news->fresh()->published_by)->toBe($revisor->id);
    $this->actingAs($editor)->put("/cms/news/{$news->id}", newsData(['title' => 'Título privado', 'summary' => 'Resumo privado', 'image' => '/images/privada.png', 'show_on_home' => false]))->assertSessionHasNoErrors();
    $this->get('/')->assertInertia(fn (Assert $page) => $page->has('news', 1)->where('news.0.title', 'Notícia aprovada')->where('news.0.summary', 'Resumo aprovado')->where('news.0.image', '/images/lab.png')->missing('news.0.body'));
    $this->get('/noticias/noticia-teste')->assertInertia(fn (Assert $page) => $page->component('Cms/PublicNews')->where('content.title', 'Notícia aprovada'));
    $this->actingAs($revisor)->post("/cms/news/{$news->id}/transition", ['action' => 'archive'])->assertRedirect();
    $this->get('/')->assertInertia(fn (Assert $page) => $page->has('news', 0));
    $this->get('/noticias/noticia-teste')->assertNotFound();
    expect(DB::table('news_events')->where('news_id', $news->id)->count())->toBe(5);
});

test('home limita destaques a duas noticias mais recentes e arquivo inclui publicadas sem destaque', function () {
    foreach ([1, 2, 3, 4] as $i) {
        News::create([...newsData(['slug' => "noticia-$i"]), 'title' => 'Rascunho',
            'published_at' => now()->subDays(5 - $i),
            'published_content' => newsData(['title' => "Pública $i", 'show_on_home' => $i !== 4])]);
    }
    News::create(newsData(['slug' => 'rascunho']));
    $this->get('/')->assertInertia(fn (Assert $page) => $page->has('news', 2)->where('news.0.slug', 'noticia-3')->where('news.1.slug', 'noticia-2'));
    $this->get('/noticias')->assertInertia(fn (Assert $page) => $page->component('Cms/PublicNewsIndex')->has('news.data', 4)->where('news.data.0.title', 'Pública 4')->missing('news.data.0.body'));
    $this->get('/noticias/rascunho')->assertNotFound();
    $this->get('/noticias/inexistente')->assertNotFound();
});

test('noticias validam capa descricao campos e slug unico', function () {
    $this->actingAs(newsActor('editor'));
    $this->post('/cms/news', newsData(['image' => 'javascript:alert(1)']))->assertSessionHasErrors('image');
    $this->post('/cms/news', newsData(['image_alt' => '']))->assertSessionHasErrors('image_alt');
    $this->post('/cms/news', newsData(['summary' => '', 'category' => '', 'slug' => '../login']))->assertSessionHasErrors(['summary', 'category', 'slug']);
    $this->post('/cms/news', newsData(['body' => json_encode([['type' => 'html', 'text' => 'x']])]))->assertSessionHasErrors('body');
    $this->post('/cms/news', newsData())->assertSessionHasNoErrors();
    $this->post('/cms/news', newsData())->assertSessionHasErrors('slug');
    $this->get('/cms/news?q=aprovada&status=draft')->assertInertia(fn (Assert $page) => $page->component('Cms/News')->has('pages.data', 1)->missing('pages.data.0.body'));
});

test('colaborador preserva permissoes existentes de redacao sem poder publicar', function () {
    $this->actingAs(newsActor('colaborador'))->post('/cms/news', newsData())->assertSessionHasNoErrors();
    $news = News::firstOrFail();
    $this->post("/cms/news/{$news->id}/transition", ['action' => 'publish'])->assertForbidden();
    $this->get('/dashboard')->assertInertia(fn (Assert $page) => $page->where('auth.user.can_view_news', true));
});
