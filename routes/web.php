<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\KitchenController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'featured' => \App\Models\Kitchen::with('images')->latest()->take(6)->get(),
        'stats' => [
            'kitchens' => \App\Models\Kitchen::count(),
            'cities' => \App\Models\Kitchen::query()->distinct()->count('city'),
            'bookings' => \App\Models\Booking::count(),
        ],
    ]);
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

        // Incoming booking requests for the owner's kitchens.
        Route::get('booking-requests', [BookingController::class, 'requests'])->name('bookings.requests');
    });

    // Booking creation is restricted to chefs.
    Route::middleware('role:chef')->group(function () {
        Route::get('kitchens/{kitchen}/book', [BookingController::class, 'create'])->name('bookings.create');
        Route::post('bookings', [BookingController::class, 'store'])->name('bookings.store');
        Route::get('my-bookings', [BookingController::class, 'index'])->name('bookings.index');
    });

    // Admin overview.
    Route::middleware('role:admin')->group(function () {
        Route::get('admin', [AdminController::class, 'index'])->name('admin.index');
    });

    // Status transitions (approve/reject by owner, cancel by chef) — authorized in the policy.
    Route::patch('bookings/{booking}', [BookingController::class, 'update'])->name('bookings.update');

    // Keep this after "kitchens/create" so the literal route wins over the wildcard.
    Route::get('kitchens/{kitchen}', [KitchenController::class, 'show'])->name('kitchens.show');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
