<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::prefix('contacts')->middleware('auth')->controller(ContactController::class)->group( function () {
    Route::get('all','index')->name('contact.index');
    Route::get('contact', 'create')->name('contact.create');
    Route::post('contact', 'store')->name('contact.store');
    Route::get('contact/{contact}/edit', 'edit')->name('contact.edit');
    Route::post('contact/{contact}', 'update')->name('contact.update');
    Route::delete('contact/{contact}', 'destroy')->name('contact.delete');
});

require __DIR__.'/auth.php';
