<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('docentes', function (Blueprint $table) {
            $table->id();
            $table->string('nome');
            $table->string('email')->unique();
            $table->string('grupo')->index();
            $table->unsignedInteger('ordem')->default(0);
            $table->timestamps();

            $table->index(['grupo', 'ordem']);
        });

        Schema::create('turmas_discentes', function (Blueprint $table) {
            $table->id();
            $table->unsignedSmallInteger('ano')->unique();
            $table->timestamps();
        });

        Schema::create('discentes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('turma_id')
                ->constrained('turmas_discentes')
                ->cascadeOnDelete();
            $table->string('nome');
            $table->unsignedInteger('ordem')->default(0);
            $table->timestamps();

            $table->unique(['turma_id', 'nome']);
            $table->index(['turma_id', 'ordem']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('discentes');
        Schema::dropIfExists('turmas_discentes');
        Schema::dropIfExists('docentes');
    }
};
