<?php

namespace App\Policies;

use App\Models\Kitchen;
use App\Models\User;

class KitchenPolicy
{
    /**
     * Only the kitchen's owner may update it.
     */
    public function update(User $user, Kitchen $kitchen): bool
    {
        return $user->id === $kitchen->user_id;
    }

    /**
     * Only the kitchen's owner may delete it.
     */
    public function delete(User $user, Kitchen $kitchen): bool
    {
        return $user->id === $kitchen->user_id;
    }
}
