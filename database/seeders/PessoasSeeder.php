<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PessoasSeeder extends Seeder
{
    public function run(): void
    {
        $now = now();

        $docentes = [
            ['nome' => 'Alessandro Copetti', 'email' => 'alessandro_copetti@id.uff.br', 'grupo' => 'principal', 'ordem' => 1],
            ['nome' => 'Ana Paula Barbosa Sobral', 'email' => 'ana_sobral@id.uff.br', 'grupo' => 'principal', 'ordem' => 2],
            ['nome' => 'Carlos Frederico de Oliveira Barros', 'email' => 'carlosfredericobarros@id.uff.br', 'grupo' => 'principal', 'ordem' => 3],
            ['nome' => 'Dalessandro Soares Vianna', 'email' => 'dalessandrovianna@id.uff.br', 'grupo' => 'principal', 'ordem' => 4],
            ['nome' => 'Dalton Garcia Borges de Souza', 'email' => 'daltonborges@id.uff.br', 'grupo' => 'principal', 'ordem' => 5],
            ['nome' => 'Danilo Artigas da Rocha', 'email' => 'daniloartigas@id.uff.br', 'grupo' => 'principal', 'ordem' => 6],
            ['nome' => 'Edwin Benito Mitacc Meza', 'email' => 'emitacc@id.uff.br', 'grupo' => 'principal', 'ordem' => 7],
            ['nome' => 'Eluã Ramos Coutinho', 'email' => 'eluacoutinho@id.uff.br', 'grupo' => 'principal', 'ordem' => 8],
            ['nome' => 'Flávio Silva Machado', 'email' => 'flaviomachado@id.uff.br', 'grupo' => 'principal', 'ordem' => 9],
            ['nome' => 'Gabriela Braga Fonseca', 'email' => 'gabrielabragafonseca@id.uff.br', 'grupo' => 'principal', 'ordem' => 10],
            ['nome' => 'Graziela Ferreira Guarda', 'email' => 'grazielaguarda@id.uff.br', 'grupo' => 'principal', 'ordem' => 11],
            ['nome' => 'Guido Vaz Silva', 'email' => 'guido_vaz@id.uff.br', 'grupo' => 'principal', 'ordem' => 12],
            ['nome' => 'Iara Tammela', 'email' => 'iaratammela@id.uff.br', 'grupo' => 'principal', 'ordem' => 13],
            ['nome' => 'Leila Weitzel Coelho da Silva', 'email' => 'Leila_weitzel@id.uff.br', 'grupo' => 'principal', 'ordem' => 14],
            ['nome' => 'Leonard Barreto Moreira', 'email' => 'leonardbarreto@id.uff.br', 'grupo' => 'principal', 'ordem' => 15],
            ['nome' => 'Marcilene de Fátima Dianin Vianna', 'email' => 'marcilenedianin@id.uff.br', 'grupo' => 'principal', 'ordem' => 16],
            ['nome' => 'Mateus Carvalho Amaral', 'email' => 'mateus_amaral@id.uff.br', 'grupo' => 'principal', 'ordem' => 17],
            ['nome' => 'Paulo Apicelo de Souza Pereira', 'email' => 'pauloapicelo@id.uff.br', 'grupo' => 'principal', 'ordem' => 18],
            ['nome' => 'Ramon Baptista Narcizo', 'email' => 'ramon_narcizo@id.uff.br', 'grupo' => 'principal', 'ordem' => 19],
            ['nome' => 'Ricardo Luiz Fernandes Bella', 'email' => 'ricardobella@id.uff.br', 'grupo' => 'principal', 'ordem' => 20],
            ['nome' => 'Roberto Gonçalves Pacheco', 'email' => 'robertopacheco@poli.ufrj.br', 'grupo' => 'principal', 'ordem' => 21],
            ['nome' => 'Rodolfo Cardoso', 'email' => 'rodolfo_cardoso@id.uff.br', 'grupo' => 'principal', 'ordem' => 22],
            ['nome' => 'Ana Carolina Ribeiro Duarte Hashimoto', 'email' => 'anahashimoto@id.uff.br', 'grupo' => 'apoio', 'ordem' => 1],
            ['nome' => 'Carlos Bazilio Martins', 'email' => 'carlosbazilio@id.uff.br', 'grupo' => 'apoio', 'ordem' => 2],
            ['nome' => 'Leandro Soares de Sousa', 'email' => 'lsousa@id.uff.br', 'grupo' => 'apoio', 'ordem' => 3],
            ['nome' => 'Paulo Mauricio Tavares Siqueira', 'email' => 'paulomauricio@id.uff.br', 'grupo' => 'apoio', 'ordem' => 4],
        ];

        foreach ($docentes as $docente) {
            DB::table('docentes')->updateOrInsert(
                ['email' => $docente['email']],
                [
                    'nome' => $docente['nome'],
                    'grupo' => $docente['grupo'],
                    'ordem' => $docente['ordem'],
                    'updated_at' => $now,
                    'created_at' => $now,
                ]
            );
        }

        foreach ([2020, 2017] as $ano) {
            DB::table('turmas_discentes')->updateOrInsert(
                ['ano' => $ano],
                ['updated_at' => $now, 'created_at' => $now]
            );
        }

        $turma2020Id = DB::table('turmas_discentes')->where('ano', 2020)->value('id');
        $turma2017Id = DB::table('turmas_discentes')->where('ano', 2017)->value('id');

        $discentes2020 = [
            'Adriano Gouveia Lima Gomes dos Passos',
            'Arthur Neves Fraga Serejo',
            'Diogo Freitas Rodrigues',
            'Douglas de Almeida Martins',
            'Edilson Alzemand Sigmaringa Junior',
            'Gabriella Ramos Lacerda Ferreira',
            'Guilherme Loures Marques Fecher',
            'João Vitor Mussel Canato',
            'Laura Barrios de Barros Rigo',
            'Livia Maria Fragoas Coelho',
        ];

        foreach ($discentes2020 as $index => $nome) {
            DB::table('discentes')->updateOrInsert(
                ['turma_id' => $turma2020Id, 'nome' => $nome],
                [
                    'ordem' => $index + 1,
                    'updated_at' => $now,
                    'created_at' => $now,
                ]
            );
        }

        $discentes2017 = [
            'Andre Gallon Barcelos',
            'Bruna Bittencourt Da Costa Brito',
            'Bruno Acioli De Matos',
            'Claudio Roberto Berton',
            'Eduardo de Oliveira Bürger Monteiro Luiz',
            'Eldis Muniz De Castro',
            'Gioliano Barbosa Bertoni',
            'Heron Felipe Rosas Dos Santos',
            'Hugo Guilherme Andrade Da Silva',
            'Jairo Luciano Dias Alves',
            'Juliana Machado Azevedo De Souza',
            'Livia Viana Rangel',
            'Luana Rodrigues Pizetta Claudino',
            'Luisa Antonioli',
            'Marcio Degasperi De Freitas',
            'Patricia Katsuno Yara Buelmo',
            'Rafael Borgate De Souza Mendes',
            'Raphael Pereira Scudino Borges',
            'Roni Gonçalves Py',
            'Thiago Jose Da Costa Muniz',
        ];

        foreach ($discentes2017 as $index => $nome) {
            DB::table('discentes')->updateOrInsert(
                ['turma_id' => $turma2017Id, 'nome' => $nome],
                [
                    'ordem' => $index + 1,
                    'updated_at' => $now,
                    'created_at' => $now,
                ]
            );
        }

        $this->command?->info('Docentes, turmas e discentes criados/atualizados com sucesso.');
    }
}
