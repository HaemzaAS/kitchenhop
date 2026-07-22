<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Kitchen;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class BookingController extends Controller
{
    /**
     * Booking form for a kitchen (chef only).
     */
    public function create(Kitchen $kitchen): Response
    {
        return Inertia::render('chef/bookings/create', [
            'kitchen' => $kitchen->load('images'),
        ]);
    }

    /**
     * Submit a booking request (chef only).
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'kitchen_id' => 'required|exists:kitchens,id',
            'date' => 'required|date|after_or_equal:today',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
        ]);

        $kitchen = Kitchen::findOrFail($validated['kitchen_id']);

        $start = Carbon::createFromFormat('H:i', $validated['start_time']);
        $end = Carbon::createFromFormat('H:i', $validated['end_time']);
        $hours = round($start->diffInMinutes($end) / 60, 2);

        // Block requests that overlap an already-approved booking.
        $overlaps = $kitchen->bookings()
            ->where('date', $validated['date'])
            ->where('status', 'approved')
            ->where(fn ($q) => $q
                ->where('start_time', '<', $validated['end_time'])
                ->where('end_time', '>', $validated['start_time']))
            ->exists();

        if ($overlaps) {
            return back()->withErrors([
                'start_time' => 'This kitchen already has an approved booking in that time slot.',
            ]);
        }

        // Price is always computed server-side from the kitchen's hourly rate.
        $request->user()->bookings()->create([
            'kitchen_id' => $kitchen->id,
            'date' => $validated['date'],
            'start_time' => $validated['start_time'],
            'end_time' => $validated['end_time'],
            'hours' => $hours,
            'total_price' => round($hours * (float) $kitchen->hourly_price, 2),
            'status' => 'pending',
        ]);

        return to_route('bookings.index')->with('success', 'Booking request sent.');
    }

    /**
     * The chef's own bookings.
     */
    public function index(Request $request): Response
    {
        return Inertia::render('chef/bookings/index', [
            'bookings' => $request->user()->bookings()
                ->with('kitchen:id,name,city')
                ->latest()
                ->get(),
        ]);
    }

    /**
     * Incoming requests for the owner's kitchens.
     */
    public function requests(Request $request): Response
    {
        return Inertia::render('owner/bookings/index', [
            'bookings' => Booking::query()
                ->with(['chef:id,name,email', 'kitchen:id,name,city,user_id'])
                ->whereHas('kitchen', fn ($q) => $q->where('user_id', $request->user()->id))
                ->latest()
                ->get(),
        ]);
    }

    /**
     * Status transitions: owner approves/rejects, chef cancels.
     */
    public function update(Request $request, Booking $booking): RedirectResponse
    {
        $validated = $request->validate([
            'status' => 'required|in:approved,rejected,cancelled',
        ]);

        if ($validated['status'] === 'cancelled') {
            Gate::authorize('cancel', $booking);
        } else {
            Gate::authorize('decide', $booking);
        }

        if ($booking->status !== 'pending') {
            return back()->withErrors(['status' => 'Only pending bookings can be updated.']);
        }

        // Approving must not double-book the kitchen against an already-approved slot.
        if ($validated['status'] === 'approved') {
            $overlaps = Booking::query()
                ->where('kitchen_id', $booking->kitchen_id)
                ->where('id', '!=', $booking->id)
                ->whereDate('date', $booking->date)
                ->where('status', 'approved')
                ->where(fn ($q) => $q
                    ->where('start_time', '<', $booking->end_time)
                    ->where('end_time', '>', $booking->start_time))
                ->exists();

            if ($overlaps) {
                return back()->withErrors([
                    'status' => 'This request overlaps a booking you already approved for that kitchen.',
                ]);
            }
        }

        $booking->update(['status' => $validated['status']]);

        return back()->with('success', "Booking {$validated['status']}.");
    }
}
