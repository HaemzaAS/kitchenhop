<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Kitchen;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $user = $request->user();
        $data = [];

        if ($user->isChef()) {
            $data['chefStats'] = [
                'total' => $user->bookings()->count(),
                'pending' => $user->bookings()->where('status', 'pending')->count(),
                'approved' => $user->bookings()->where('status', 'approved')->count(),
            ];
            $data['recentBookings'] = $user->bookings()
                ->with('kitchen:id,name,city')
                ->latest()
                ->take(5)
                ->get();
        }

        if ($user->isOwner()) {
            $kitchenIds = $user->kitchens()->pluck('id');

            $data['ownerStats'] = [
                'kitchens' => $kitchenIds->count(),
                'pending' => Booking::whereIn('kitchen_id', $kitchenIds)->where('status', 'pending')->count(),
                'revenue' => (float) Booking::whereIn('kitchen_id', $kitchenIds)->where('status', 'approved')->sum('total_price'),
            ];
            $data['recentRequests'] = Booking::query()
                ->with(['chef:id,name', 'kitchen:id,name'])
                ->whereIn('kitchen_id', $kitchenIds)
                ->latest()
                ->take(5)
                ->get();
        }

        if ($user->isAdmin()) {
            $data['adminStats'] = [
                'users' => User::count(),
                'kitchens' => Kitchen::count(),
                'bookings' => Booking::count(),
            ];
        }

        return Inertia::render('dashboard', $data);
    }
}
