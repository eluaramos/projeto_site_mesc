<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    protected $guarded = ['id'];

    protected function casts(): array
    {
        return ['published_content' => 'array', 'published_at' => 'datetime'];
    }
}
