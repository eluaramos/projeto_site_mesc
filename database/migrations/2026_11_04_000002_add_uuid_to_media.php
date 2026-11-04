<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('media', fn (Blueprint $table) => $table->uuid('uuid')->nullable()->unique());
        DB::table('media')->select('id')->whereNull('uuid')->chunkById(200, function ($rows) {
            foreach ($rows as $row) {
                DB::table('media')->where('id', $row->id)->update(['uuid' => (string) Str::uuid()]);
            }
        });
        Schema::table('media', fn (Blueprint $table) => $table->uuid('uuid')->nullable(false)->change());
    }

    public function down(): void
    {
        Schema::table('media', function (Blueprint $table) {
            $table->dropUnique(['uuid']);
            $table->dropColumn('uuid');
        });
    }
};
