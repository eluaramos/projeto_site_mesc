<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class PublicImageUrl implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (! is_string($value) || preg_match('/[\\s\\\\\\\\]/', $value)) {
            $fail('Informe uma imagem HTTPS ou um arquivo existente em /images/.');

            return;
        }
        if (str_starts_with($value, '/images/') && ! str_contains($value, '..')) {
            return;
        }
        if (filter_var($value, FILTER_VALIDATE_URL) === false || parse_url($value, PHP_URL_SCHEME) !== 'https') {
            $fail('Informe uma imagem HTTPS ou um arquivo existente em /images/.');
        }
    }
}
