<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('news', function (Blueprint $table) {
            $table->id();
            $table->string('slug', 160)->unique();
            $table->string('title', 200);
            $table->string('summary', 500);
            $table->string('category', 80);
            $table->string('image', 2048)->nullable();
            $table->string('image_alt', 1000)->nullable();
            $table->boolean('show_on_home')->default(true);
            $table->string('locale', 5)->default('pt_BR');
            $table->text('body');
            $table->string('body_format')->default('text');
            $table->string('status')->default('draft');
            $table->json('published_content')->nullable();
            $table->timestamp('published_at')->nullable()->index();
            $table->foreignId('published_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });
        Schema::create('news_events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('news_id')->constrained('news')->cascadeOnDelete();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('action');
            $table->timestamp('created_at')->useCurrent();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('news_events');
        Schema::dropIfExists('news');
    }
};
