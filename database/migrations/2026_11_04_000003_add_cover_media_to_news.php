<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('news', fn (Blueprint $table) => $table->uuid('cover_media_uuid')->nullable());
    }

    public function down(): void
    {
        Schema::table('news', fn (Blueprint $table) => $table->dropColumn('cover_media_uuid'));
    }
};
