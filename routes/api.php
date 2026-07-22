<?php

use App\Models\Kitchen;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public read-only JSON API (v1)
|--------------------------------------------------------------------------
| The web application itself is served through Inertia (RESTful resource
| routes returning page props). These endpoints additionally expose the
| kitchen catalog as plain JSON for external consumers.
*/

Route::prefix('v1')->group(function () {
    Route::get('kitchens', function (Request $request) {
        return Kitchen::query()
            ->with('images')
            ->when($request->query('city'), fn ($q, $city) => $q->where('city', $city))
            ->when($request->query('search'), fn ($q, $s) => $q->where('name', 'like', "%{$s}%"))
            ->latest()
            ->paginate(12)
            ->withQueryString();
    });

    Route::get('kitchens/{kitchen}', function (Kitchen $kitchen) {
        return $kitchen->load(['images', 'owner:id,name']);
    });
});
