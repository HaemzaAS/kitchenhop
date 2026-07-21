<?php

use App\Http\Controllers\KitchenController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Browsing is available to every authenticated user.
    Route::get('kitchens', [KitchenController::class, 'index'])->name('kitchens.index');

    // Kitchen management is restricted to owners.
    Route::middleware('role:owner')->group(function () {
        Route::get('my-kitchens', [KitchenController::class, 'mine'])->name('kitchens.mine');
        Route::get('kitchens/create', [KitchenController::class, 'create'])->name('kitchens.create');
        Route::post('kitchens', [KitchenController::class, 'store'])->name('kitchens.store');
        Route::get('kitchens/{kitchen}/edit', [KitchenController::class, 'edit'])->name('kitchens.edit');
        Route::put('kitchens/{kitchen}', [KitchenController::class, 'update'])->name('kitchens.update');
        Route::delete('kitchens/{kitchen}', [KitchenController::class, 'destroy'])->name('kitchens.destroy');
    });

    // Keep this after "kitchens/create" so the literal route wins over the wildcard.
    Route::get('kitchens/{kitchen}', [KitchenController::class, 'show'])->name('kitchens.show');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
