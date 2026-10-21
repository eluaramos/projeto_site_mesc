<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class PageBlocks implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $blocks = is_string($value) ? json_decode($value, true) : null;
        if (! is_array($blocks) || ! array_is_list($blocks) || count($blocks) < 1 || count($blocks) > 100) {
            $fail('Adicione de 1 a 100 blocos de conteúdo.');

            return;
        }
        foreach ($blocks as $block) {
            if (! is_array($block) || ! $this->validBlock($block)) {
                $fail('Revise os blocos: preencha os textos, use links HTTPS ou internos e descreva as imagens.');

                return;
            }
        }
    }

    private function text(mixed $value): bool
    {
        return is_string($value) && trim($value) !== '' && mb_strlen($value) <= 20000;
    }

    private function url(mixed $value, bool $image = false): bool
    {
        if (! is_string($value) || strlen($value) > 2048 || preg_match('/[\\s\\\\\\\\]/', $value)) {
            return false;
        }
        if ($image && str_starts_with($value, '/images/') && ! str_contains($value, '..')) {
            return true;
        }
        if (! $image && preg_match('#^/(?!/)#', $value)) {
            return true;
        }

        return filter_var($value, FILTER_VALIDATE_URL) !== false && parse_url($value, PHP_URL_SCHEME) === 'https';
    }

    private function validBlock(array $block): bool
    {
        return match ($block['type'] ?? null) {
            'paragraph', 'heading', 'quote' => $this->text($block['text'] ?? null),
            'list' => $this->text($block['text'] ?? null) && is_bool($block['ordered'] ?? null),
            'link' => $this->text($block['text'] ?? null) && $this->url($block['url'] ?? null),
            'image' => $this->url($block['url'] ?? null, true) && $this->text($block['alt'] ?? null) && is_string($block['caption'] ?? null),
            'table' => $this->table($block),
            'card', 'cards', 'carousel', 'stats', 'banner' => $this->layout($block),
            default => false,
        };
    }

    private function layout(array $block): bool
    {
        $type = $block['type'];
        $items = $block['items'] ?? null;
        $limit = in_array($type, ['card', 'banner'], true) ? 1 : ($type === 'carousel' ? 10 : 12);
        if (! is_array($items) || ! array_is_list($items) || count($items) < 1 || count($items) > $limit) {
            return false;
        }
        if (isset($block['title']) && (! is_string($block['title']) || mb_strlen($block['title']) > 200)) {
            return false;
        }
        if ($type === 'cards' && ! in_array($block['columns'] ?? 3, [2, 3, 4], true)) {
            return false;
        }
        foreach ($items as $item) {
            if (! is_array($item) || ! $this->text($item['title'] ?? null) || mb_strlen($item['title']) > 200) {
                return false;
            }
            if ($type === 'stats') {
                if (! $this->text($item['value'] ?? null) || mb_strlen($item['value']) > 50) {
                    return false;
                }

                continue;
            }
            foreach (['text', 'image', 'alt', 'url', 'button', 'icon'] as $field) {
                if (isset($item[$field]) && ! is_string($item[$field])) {
                    return false;
                }
            }
            if (in_array($type, ['card', 'cards'], true) && ! $this->text($item['text'] ?? null)) {
                return false;
            }
            if (isset($item['text']) && mb_strlen($item['text']) > 20000) {
                return false;
            }
            $hasImage = ! empty($item['image']);
            if (in_array($type, ['carousel', 'banner'], true) && ! $hasImage) {
                return false;
            }
            if ($hasImage && (! $this->url($item['image'], true) || ! $this->text($item['alt'] ?? null))) {
                return false;
            }
            if (! empty($item['url']) && ! $this->url($item['url'])) {
                return false;
            }
            if (in_array($type, ['carousel', 'banner'], true) && ! empty($item['url']) && ! $this->text($item['button'] ?? null)) {
                return false;
            }
            if (! in_array($item['icon'] ?? '', ['', 'book', 'target', 'lightbulb', 'graduation', 'flask', 'briefcase', 'users', 'search'], true)) {
                return false;
            }
        }

        return true;
    }

    private function table(array $block): bool
    {
        $rows = $block['rows'] ?? null;
        if (! $this->text($block['caption'] ?? null) || ! is_array($rows) || ! array_is_list($rows) || count($rows) < 2 || count($rows) > 30) {
            return false;
        }
        $columns = is_array($rows[0]) ? count($rows[0]) : 0;
        if ($columns < 1 || $columns > 8) {
            return false;
        }
        foreach ($rows as $row) {
            if (! is_array($row) || ! array_is_list($row) || count($row) !== $columns) {
                return false;
            }
            foreach ($row as $cell) {
                if (! $this->text($cell)) {
                    return false;
                }
            }
        }

        return true;
    }
}
