<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kitchen extends Model
{
    /** @use HasFactory<\Database\Factories\KitchenFactory> */
    use HasFactory;

    protected $fillable = ['user_id', 'name', 'description', 'address', 'city', 'hourly_price'];

    public function owner()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function images()
    {
        return $this->hasMany(KitchenImage::class);
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}
