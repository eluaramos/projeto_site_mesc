<?php

use App\Models\User;
use Database\Seeders\RoleSeeder;
use Illuminate\Support\Facades\Hash;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    $this->seed(RoleSeeder::class);
    config(['inertia.testing.page_paths' => [resource_path('js/pages')]]);
});

function managedUser(string $role): User
{
    $user = User::factory()->create();
    $user->assignRole($role);

    return $user;
}

test('cadastro publico foi desativado em GET e POST', function () {
    $this->get('/register')->assertNotFound();
    $this->post('/register', ['name' => 'Intruso', 'email' => 'intruso@example.com', 'password' => 'Teste123456789', 'password_confirmation' => 'Teste123456789'])
        ->assertNotFound();
    expect(User::count())->toBe(0);
});

test('visitante precisa autenticar para gerenciar usuarios', function () {
    $this->get('/cms/users')->assertRedirect('/login');
    $this->post('/cms/users')->assertRedirect('/login');
});

test('somente admin acessa todas as operacoes de usuarios', function (string $role) {
    $target = User::factory()->create();
    $actor = managedUser($role);
    $actor->givePermissionTo(['usuarios.ver', 'usuarios.criar', 'usuarios.editar', 'usuarios.deletar']);
    $this->actingAs($actor);
    $this->get('/cms/users')->assertForbidden();
    $this->get('/cms/users/create')->assertForbidden();
    $this->get("/cms/users/{$target->id}/edit")->assertForbidden();
    $this->post('/cms/users')->assertForbidden();
    $this->put("/cms/users/{$target->id}")->assertForbidden();
    $this->delete("/cms/users/{$target->id}")->assertForbidden();
    expect($target->fresh())->not->toBeNull();
    $this->get('/dashboard')->assertInertia(fn (Assert $page) => $page->where('auth.user.is_admin', false));
})->with(['editor', 'revisor', 'colaborador']);

test('admin cria lista busca e edita contas sem expor senha', function () {
    $admin = managedUser('admin');
    $this->actingAs($admin)->get('/cms/users/create')->assertInertia(fn (Assert $page) => $page->component('Cms/EditUser'));
    $data = ['name' => 'Editor MESC', 'email' => 'editor@example.com', 'password' => 'SenhaSegura12345', 'password_confirmation' => 'SenhaSegura12345', 'roles' => ['editor']];
    $this->post('/cms/users', $data)->assertSessionHasNoErrors()->assertRedirect();
    $user = User::where('email', $data['email'])->firstOrFail();
    expect(Hash::check($data['password'], $user->password))->toBeTrue();
    expect($user->hasRole('editor'))->toBeTrue();
    $this->get('/cms/users?q=editor')->assertInertia(fn (Assert $page) => $page->component('Cms/Users')->has('users.data', 1)->missing('users.data.0.password'));
    $this->get("/cms/users/{$user->id}/edit")->assertInertia(fn (Assert $page) => $page->component('Cms/EditUser')->missing('user.password'));
    $oldPassword = $user->password;
    $this->put("/cms/users/{$user->id}", [...$data, 'name' => 'Revisor MESC', 'roles' => ['revisor'], 'password' => '', 'password_confirmation' => ''])
        ->assertSessionHasNoErrors();
    expect($user->fresh()->name)->toBe('Revisor MESC');
    expect($user->fresh()->password)->toBe($oldPassword);
    expect($user->fresh()->hasRole('editor'))->toBeFalse();
    expect($user->fresh()->hasRole('revisor'))->toBeTrue();
    $this->put("/cms/users/{$user->id}", [...$data, 'roles' => ['editor', 'revisor'], 'password' => 'NovaSenha123456', 'password_confirmation' => 'NovaSenha123456'])->assertSessionHasNoErrors();
    expect(Hash::check('NovaSenha123456', $user->fresh()->password))->toBeTrue();
});

test('admin nao exclui a propria conta nem remove seu proprio perfil admin', function () {
    $admin = managedUser('admin');
    $this->actingAs($admin)->delete("/cms/users/{$admin->id}")->assertSessionHasErrors('user');
    $this->put("/cms/users/{$admin->id}", ['name' => $admin->name, 'email' => $admin->email, 'roles' => ['editor']])->assertSessionHasErrors('roles');
    expect($admin->fresh()->hasRole('admin'))->toBeTrue();
});

test('admin exclui outra conta e nao ha cadastro automatico de perfis invalidos', function () {
    $admin = managedUser('admin');
    $target = managedUser('editor');
    $this->actingAs($admin)->delete("/cms/users/{$target->id}")->assertRedirect('/cms/users');
    expect(User::find($target->id))->toBeNull();
    $this->post('/cms/users', ['name' => 'Conta', 'email' => $admin->email, 'password' => '123', 'password_confirmation' => 'outra', 'roles' => ['superadmin']])
        ->assertSessionHasErrors(['email', 'password', 'roles.0']);
});
