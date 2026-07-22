<?php

namespace Database\Factories;

use App\Models\Booking;
use App\Models\Kitchen;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Booking>
 */
class BookingFactory extends Factory
{
    public function definition(): array
    {
        $start = fake()->numberBetween(7, 16);
        $duration = fake()->numberBetween(2, 6);

        return [
            'user_id' => User::factory()->state(['role' => 'chef']),
            'kitchen_id' => Kitchen::factory(),
            'date' => fake()->dateTimeBetween('-10 days', '+21 days')->format('Y-m-d'),
            'start_time' => sprintf('%02d:00', $start),
            'end_time' => sprintf('%02d:00', $start + $duration),
            'hours' => $duration,
            'total_price' => 0, // recalculated below from the kitchen's real hourly rate
            'status' => fake()->randomElement(Booking::STATUSES),
        ];
    }

    public function configure(): static
    {
        return $this->afterCreating(function (Booking $booking) {
            $booking->updateQuietly([
                'total_price' => round($booking->hours * (float) $booking->kitchen->hourly_price, 2),
            ]);
        });
    }
}
