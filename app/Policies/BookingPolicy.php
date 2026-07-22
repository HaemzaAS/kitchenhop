<?php

namespace App\Policies;

use App\Models\Booking;
use App\Models\User;

class BookingPolicy
{
    /**
     * Only the chef who made the booking may cancel it.
     */
    public function cancel(User $user, Booking $booking): bool
    {
        return $user->id === $booking->user_id;
    }

    /**
     * Only the owner of the booked kitchen may approve or reject.
     */
    public function decide(User $user, Booking $booking): bool
    {
        return $user->id === $booking->kitchen->user_id;
    }
}
