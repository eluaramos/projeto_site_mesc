<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

class AvailablePageSlug implements ValidationRule
{
    public static function reserved(string $slug): bool
    {
        foreach (Route::getRoutes() as $route) {
            if ($route->getName() === 'pages.show') {
                continue;
            }

            // Reserve existing namespaces too (cms, pessoas, lang, storage...).
            if (explode('/', $route->uri())[0] === $slug) {
                return true;
            }

            // Also respect dynamic routes and their parameter constraints.
            foreach ($route->methods() as $method) {
                if ($route->matches(Request::create('/'.$slug, $method), false)) {
                    return true;
                }
            }
        }

        return false;
    }

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (is_string($value) && self::reserved($value)) {
            $fail('Este endereço está reservado por uma rota do portal. Escolha outro slug.');
        }
    }
}
