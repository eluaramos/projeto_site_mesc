<?php

use App\Models\Media;
use App\Models\News;
use App\Models\Page;
use App\Models\User;
use Database\Seeders\RoleSeeder;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
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

test('capa da biblioteca só fica pública na versão aprovada da notícia', function () {
    $disk = Storage::fake('cms-media');
    $make = function (string $name) use ($disk) {
        $disk->put($name, 'imagem de teste');

        return Media::create(['title' => $name, 'original_name' => $name, 'path' => $name, 'mime' => 'image/png', 'size' => 15]);
    };
    $first = $make('primeira.png');
    $next = $make('segunda.png');
    $editor = newsActor('editor');
    $reviewer = newsActor('revisor');
    $data = newsData(['image' => null, 'image_alt' => 'Capa', 'cover_media_uuid' => $first->uuid]);
    $this->actingAs($editor)->post('/cms/news', [...$data, 'image_alt' => ''])->assertSessionHasErrors('image_alt');
    $this->post('/cms/news', $data)->assertSessionHasNoErrors();
    $news = News::sole();
    $transition = "/cms/news/{$news->id}/transition";
    $url = fn ($media) => route('news.cover', ['news' => $news->id, 'media' => $media], false);
    $this->get($url($first))->assertNotFound();
    $this->actingAs($reviewer)->get(route('cms.media.image', $first))->assertOk()->assertHeader('Content-Type', 'image/png');
    $this->actingAs($editor)->post($transition, ['action' => 'review'])->assertRedirect();
    $this->actingAs($reviewer)->post($transition, ['action' => 'publish'])->assertRedirect();
    $this->actingAs($editor)->put("/cms/news/{$news->id}", [...$data, 'cover_media_uuid' => $next->uuid])->assertSessionHasNoErrors();
    auth()->logout();
    $this->get(route('cms.media.image', $next))->assertRedirect('/login');
    $this->get($url($first))->assertOk()->assertHeader('Content-Type', 'image/png');
    $this->get($url($next))->assertNotFound();
    $this->get('/')->assertInertia(fn (Assert $page) => $page->where('news.0.image', $url($first)));
    $this->get('/noticias/'.$news->slug)->assertInertia(fn (Assert $page) => $page->where('content.image', $url($first)));
    $this->actingAs($reviewer)->post($transition, ['action' => 'archive'])->assertRedirect();
    $this->get($url($first))->assertNotFound();
});

test('salva notícia com capa enviada pela mídia mesmo com o parágrafo inicial vazio', function () {
    Storage::fake('cms-media');
    $this->actingAs(newsActor('editor'))->post('/cms/media', [
        'title' => 'Capa da notícia',
        'file' => UploadedFile::fake()->createWithContent('capa.png', base64_decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+a9XcAAAAASUVORK5CYII=')),
    ])->assertRedirect('/cms/media');

    $media = Media::sole();
    $data = newsData([
        'image' => '',
        'cover_media_uuid' => $media->uuid,
        'image_alt' => 'Imagem da notícia',
        'body' => json_encode([['type' => 'paragraph', 'text' => '']]),
    ]);

    $this->post('/cms/news', $data)->assertSessionHasNoErrors()->assertRedirect();
    $news = News::sole();
    expect($news->cover_media_uuid)->toBe($media->uuid);
    expect(json_decode($news->body, true))->toBe([]);
    $this->put("/cms/news/{$news->id}", [...$data, 'body' => '[]'])->assertSessionHasNoErrors();
    $this->put("/cms/news/{$news->id}", [...$data, 'body' => json_encode([['type' => 'image', 'url' => 'https://example.com/capa.png']])])
        ->assertSessionHasErrors('body');
});

test('notícia aceita PDF da biblioteca sem texto personalizado no link', function () {
    Storage::fake('cms-media');
    $this->actingAs(newsActor('editor'))->post('/cms/media', [
        'title' => 'Edital', 'file' => UploadedFile::fake()->createWithContent('edital.pdf', "%PDF-1.4\n%%EOF"),
    ])->assertRedirect('/cms/media');

    $pdf = Media::sole();
    $block = ['type' => 'download', 'mediaId' => $pdf->id];
    $data = newsData(['body' => json_encode([['type' => 'paragraph', 'text' => ''], $block])]);
    $this->post('/cms/news', $data)->assertSessionHasNoErrors()->assertRedirect();
    $news = News::sole();
    expect(json_decode($news->body, true))->toBe([$block]);
    $this->put("/cms/news/{$news->id}", [...$data, 'body' => json_encode([[...$block, 'text' => '   ']])])
        ->assertSessionHasNoErrors();
    $this->put("/cms/news/{$news->id}", [...$data, 'body' => json_encode([[...$block, 'mediaId' => $pdf->id + 1]])])
        ->assertSessionHasErrors('body');
});
