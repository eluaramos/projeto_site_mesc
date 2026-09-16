<?php

namespace Database\Seeders;

use Database\Seeders\PessoasSeeder;
use Database\Seeders\RoleSeeder;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            PessoasSeeder::class,
        ]);
    }
}
