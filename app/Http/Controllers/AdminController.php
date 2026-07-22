<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Kitchen;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    /**
     * Admin overview: all users, kitchens and bookings.
     */
    public function index(): Response
    {
        return Inertia::render('admin/index', [
            'stats' => [
                'users' => User::count(),
                'kitchens' => Kitchen::count(),
                'bookings' => Booking::count(),
                'revenue' => (float) Booking::where('status', 'approved')->sum('total_price'),
            ],
            'users' => User::query()
                ->latest()
                ->get(['id', 'name', 'email', 'role', 'created_at']),
            'kitchens' => Kitchen::query()
                ->with('owner:id,name')
                ->latest()
                ->get(),
            'bookings' => Booking::query()
                ->with(['chef:id,name', 'kitchen:id,name'])
                ->latest()
                ->get(),
        ]);
    }
}
