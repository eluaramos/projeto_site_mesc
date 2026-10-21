<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\PessoasController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\EnsureAdmin;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

Route::get('/paginas/{slug}', [PageController::class, 'legacy'])->name('pages.legacy');
Route::middleware('auth')->prefix('cms')->name('cms.')->group(function () {
    Route::middleware(EnsureAdmin::class)->group(function () {
        Route::resource('users', UserController::class)->except('show');
    });
    Route::resource('news', NewsController::class)->parameters(['news' => 'page'])->except(['show', 'destroy']);
    Route::post('/news/{page}/transition', [NewsController::class, 'transition'])->name('news.transition');
    Route::resource('pages', PageController::class)->except(['show', 'destroy']);
    Route::post('/pages/{page}/transition', [PageController::class, 'transition'])->name('pages.transition');
});

Route::get('/', HomeController::class);
Route::get('/noticias', [NewsController::class, 'publicIndex'])->name('news.index');
Route::get('/noticias/{slug}', [NewsController::class, 'show'])->name('news.show');

Route::get('/sobre', function () {
    return Inertia::render('Sobre');
});

Route::get('/contato', function () {
    return Inertia::render('Contato');
});

Route::get('/pessoas/docentes', [PessoasController::class, 'docentes'])
    ->name('pessoas.docentes');

Route::get('/pessoas/discentes', [PessoasController::class, 'discentes'])
    ->name('pessoas.discentes');

Route::get('/lang/{locale}', function (string $locale) {
    $supported = ['pt_BR', 'en', 'es'];

    if (in_array($locale, $supported)) {
        Session::put('locale', $locale);
    }

    return redirect()->back();
})->name('lang.switch');

Route::match(['get', 'post'], '/register', fn () => abort(404));

// Rotas de autenticação
Route::middleware('guest')->group(function () {

    Route::get('login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('login', [AuthenticatedSessionController::class, 'store']);

    Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])->name('password.request');
    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])->name('password.email');

    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])->name('password.reset');
    Route::post('reset-password', [NewPasswordController::class, 'store'])->name('password.store');
});

// Rota seletora de idiomas da homepage
Route::get('/lang/{locale}', function (string $locale) {
    $supported = ['pt_BR', 'en', 'es'];

    if (in_array($locale, $supported)) {
        Session::put('locale', $locale);
    }

    return redirect()->back();
})->name('lang.switch');

Route::middleware('auth')->group(function () {
    Route::get('verify-email', EmailVerificationPromptController::class)->name('verification.notice');
    Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');
    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
        ->middleware('throttle:6,1')
        ->name('verification.send');

    Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])->name('password.confirm');
    Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);

    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

    // Painel administrativo
    Route::middleware(['auth'])->group(function () {
        Route::get('/dashboard', function () {
            return Inertia::render('Dashboard');
        })->name('dashboard');
    });
});

// As rotas do portal têm precedência sobre páginas do CMS.
Route::get('/{slug}', [PageController::class, 'show'])->where('slug', '[a-z0-9]+(?:-[a-z0-9]+)*')->name('pages.show');
