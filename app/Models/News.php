<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    protected $table = 'news';

    protected $guarded = ['id'];

    protected function casts(): array
    {
        return ['show_on_home' => 'boolean', 'published_content' => 'array', 'published_at' => 'datetime'];
    }

    public function card(): array
    {
        $content = $this->published_content;

        return ['id' => $this->id, 'slug' => $this->slug, 'published_at' => $this->published_at?->toIso8601String(),
            ...array_intersect_key($content ?? [], array_flip(['title', 'summary', 'category', 'image', 'image_alt', 'locale']))];
    }
}
