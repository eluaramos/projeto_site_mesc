<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class PessoasController extends Controller
{
    /**
     * Página de docentes.
     */
    public function docentes(): Response
    {
        $docentes = DB::table('docentes')
            ->select([
                'id',
                'nome',
                'email',
                'grupo',
                'ordem',
            ])
            ->orderByRaw("
                CASE
                    WHEN grupo = 'principal' THEN 0
                    WHEN grupo = 'apoio' THEN 1
                    ELSE 2
                END
            ")
            ->orderBy('ordem')
            ->orderBy('nome')
            ->get();

        return Inertia::render('Docentes', [
            'docentes' => $docentes,
        ]);
    }

    /**
     * Página de discentes.
     */
    public function discentes(): Response
    {
        $turmas = DB::table('turmas_discentes')
            ->select([
                'id',
                'ano',
            ])
            ->orderByDesc('ano')
            ->get();

        $discentes = DB::table('discentes')
            ->select([
                'id',
                'nome',
                'turma_id',
                'ordem',
            ])
            ->orderBy('ordem')
            ->orderBy('nome')
            ->get()
            ->groupBy('turma_id');

        $turmas = $turmas->map(function ($turma) use ($discentes) {
            return [
                'id' => $turma->id,
                'ano' => $turma->ano,
                'discentes' => $discentes
                    ->get($turma->id, collect())
                    ->values(),
            ];
        });

        return Inertia::render('Discentes', [
            'turmas' => $turmas,
        ]);
    }
}
