<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Media extends Model
{
    public const IMAGE_MIMES = ['image/jpeg', 'image/png', 'image/webp'];

    protected $table = 'media';

    protected $fillable = ['title', 'original_name', 'path', 'mime', 'size', 'uploaded_by'];

    protected $hidden = ['path'];

    protected static function booted(): void
    {
        static::creating(function (Media $media) {
            $media->uuid = (string) Str::uuid();
        });
    }

    public function getRouteKeyName(): string
    {
        return 'uuid';
    }

    public static function downloadUuids(array $content): array
    {
        $blocks = ($content['body_format'] ?? null) === 'blocks' ? json_decode($content['body'], true) : [];

        return self::whereIn('id', collect($blocks)->where('type', 'download')->pluck('mediaId')->filter(fn ($id) => is_int($id)))
            ->where('mime', 'application/pdf')->pluck('uuid', 'id')->all();
    }
}
