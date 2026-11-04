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

    public function publicContent(): array
    {
        $content = $this->published_content ?? [];
        $uuid = $content['cover_media_uuid'] ?? null;
        if ($uuid) {
            $content['image'] = route('news.cover', ['news' => $this->id, 'media' => $uuid], false);
        }

        unset($content['cover_media_uuid']);

        return $content;
    }

    public function card(): array
    {
        $content = $this->publicContent();

        return ['id' => $this->id, 'slug' => $this->slug, 'published_at' => $this->published_at?->toIso8601String(),
            ...array_intersect_key($content ?? [], array_flip(['title', 'summary', 'category', 'image', 'image_alt', 'locale']))];
    }
}
