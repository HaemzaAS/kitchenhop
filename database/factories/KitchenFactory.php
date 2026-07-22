<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Kitchen>
 */
class KitchenFactory extends Factory
{
    public function definition(): array
    {
        $types = ['Prep Kitchen', 'Ghost Kitchen', 'Bakery', 'Catering Kitchen', 'Shared Kitchen', 'Pop-up Space'];
        $cities = ['Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Leipzig'];

        return [
            'user_id' => User::factory(),
            'name' => fake()->lastName().' '.fake()->randomElement($types),
            'description' => fake()->paragraphs(3, true),
            'address' => fake()->streetAddress(),
            'city' => fake()->randomElement($cities),
            'hourly_price' => fake()->randomFloat(2, 15, 120),
        ];
    }
}
