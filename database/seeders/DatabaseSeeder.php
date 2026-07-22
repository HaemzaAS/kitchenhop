<?php

namespace Database\Seeders;

use App\Models\Booking;
use App\Models\Kitchen;
use App\Models\KitchenImage;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Demo accounts — documented in the README. Default factory password is "password".
        User::factory()->create([
            'name' => 'Demo Admin',
            'email' => 'admin@kitchenhop.demo',
            'role' => 'admin',
        ]);

        $demoOwner = User::factory()->create([
            'name' => 'Demo Owner',
            'email' => 'owner@kitchenhop.demo',
            'role' => 'owner',
        ]);

        $demoChef = User::factory()->create([
            'name' => 'Demo Chef',
            'email' => 'chef@kitchenhop.demo',
            'role' => 'chef',
        ]);

        // >= 20 users in total (3 demo + 9 owners + 10 chefs = 22)
        $owners = User::factory(9)->create(['role' => 'owner'])->concat([$demoOwner]);
        $chefs = User::factory(10)->create(['role' => 'chef'])->concat([$demoChef]);

        // >= 20 kitchens spread across the owners, each with a real photo
        // (bundled in public/images/kitchens, shipped with the repo)
        $kitchens = collect();
        $i = 0;

        while ($kitchens->count() < 22) {
            $owner = $owners[$i % $owners->count()];
            $kitchen = Kitchen::factory()->create(['user_id' => $owner->id]);

            KitchenImage::create([
                'kitchen_id' => $kitchen->id,
                'path' => sprintf('/images/kitchens/seed-%02d.jpg', $kitchens->count() + 1),
            ]);

            $kitchens->push($kitchen);
            $i++;
        }

        // >= 20 bookings from random chefs in random kitchens
        // (BookingFactory recalculates total_price from the kitchen's real hourly rate)
        foreach (range(1, 25) as $n) {
            Booking::factory()->create([
                'user_id' => $chefs->random()->id,
                'kitchen_id' => $kitchens->random()->id,
            ]);
        }
    }
}
