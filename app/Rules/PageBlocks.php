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
            default => false,
        };
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
