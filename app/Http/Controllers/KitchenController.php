<?php

namespace App\Http\Controllers;

use App\Models\Kitchen;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class KitchenController extends Controller
{
    /**
     * Browse all kitchens (any authenticated user).
     */
    public function index(Request $request): Response
    {
        $kitchens = Kitchen::query()
            ->with('images')
            ->when($request->string('city')->toString(), fn ($query, $city) => $query->where('city', $city))
            ->when($request->string('search')->toString(), fn ($query, $search) => $query->where(
                fn ($q) => $q->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
            ))
            ->latest()
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('kitchens/index', [
            'kitchens' => $kitchens,
            'cities' => Kitchen::query()->select('city')->distinct()->orderBy('city')->pluck('city'),
            'filters' => $request->only(['city', 'search']),
        ]);
    }

    /**
     * Kitchen detail page.
     */
    public function show(Kitchen $kitchen): Response
    {
        return Inertia::render('kitchens/show', [
            'kitchen' => $kitchen->load(['images', 'owner:id,name']),
        ]);
    }

    /**
     * The authenticated owner's kitchens.
     */
    public function mine(Request $request): Response
    {
        return Inertia::render('owner/kitchens/index', [
            'kitchens' => $request->user()->kitchens()->with('images')->latest()->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('owner/kitchens/create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:5000',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:100',
            'hourly_price' => 'required|numeric|min:1|max:99999',
            'images' => 'required|array|min:1|max:5',
            'images.*' => 'image|mimes:jpg,jpeg,png,webp|max:4096',
        ]);

        $kitchen = $request->user()->kitchens()->create($validated);

        foreach ($request->file('images') as $image) {
            $kitchen->images()->create([
                'path' => $image->store('kitchens', 'public'),
            ]);
        }

        return to_route('kitchens.mine')->with('success', 'Kitchen created.');
    }

    public function edit(Kitchen $kitchen): Response
    {
        Gate::authorize('update', $kitchen);

        return Inertia::render('owner/kitchens/edit', [
            'kitchen' => $kitchen->load('images'),
        ]);
    }

    public function update(Request $request, Kitchen $kitchen): RedirectResponse
    {
        Gate::authorize('update', $kitchen);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:5000',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:100',
            'hourly_price' => 'required|numeric|min:1|max:99999',
            'images' => 'nullable|array|max:5',
            'images.*' => 'image|mimes:jpg,jpeg,png,webp|max:4096',
        ]);

        $kitchen->update($validated);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $kitchen->images()->create([
                    'path' => $image->store('kitchens', 'public'),
                ]);
            }
        }

        return to_route('kitchens.mine')->with('success', 'Kitchen updated.');
    }

    public function destroy(Kitchen $kitchen): RedirectResponse
    {
        Gate::authorize('delete', $kitchen);

        foreach ($kitchen->images as $image) {
            Storage::disk('public')->delete($image->path);
        }

        $kitchen->delete();

        return to_route('kitchens.mine')->with('success', 'Kitchen deleted.');
    }
}
