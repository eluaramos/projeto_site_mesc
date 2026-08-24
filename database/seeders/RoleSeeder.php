<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        // Limpa cache de permissões
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // Permissions
        $permissions = [
            // Notícias
            'noticias.ver',
            'noticias.criar',
            'noticias.editar',
            'noticias.deletar',

            // Documentos
            'documentos.ver',
            'documentos.upload',
            'documentos.deletar',

            // Docentes
            'docentes.ver',
            'docentes.criar',
            'docentes.editar',
            'docentes.deletar',

            // Eventos / Agenda
            'eventos.ver',
            'eventos.criar',
            'eventos.editar',
            'eventos.deletar',

            // Usuários (só admin)
            'usuarios.ver',
            'usuarios.criar',
            'usuarios.editar',
            'usuarios.deletar',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Role: admin — acesso total
        $admin = Role::firstOrCreate(['name' => 'admin']);
        $admin->syncPermissions(Permission::all());

        // Role: colaborador — acesso restrito
        $colaborador = Role::firstOrCreate(['name' => 'colaborador']);
        $colaborador->syncPermissions([
            'noticias.ver',
            'noticias.criar',
            'noticias.editar',
            'documentos.ver',
            'documentos.upload',
            'docentes.ver',
            'eventos.ver',
            'eventos.criar',
            'eventos.editar',
        ]);

        $this->command->info('Roles e permissions criados com sucesso.');
    }
}
