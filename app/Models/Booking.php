<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    /** @use HasFactory<\Database\Factories\BookingFactory> */
    use HasFactory;

    public const STATUSES = ['pending', 'approved', 'rejected', 'cancelled'];

    protected $fillable = [
        'user_id',
        'kitchen_id',
        'date',
        'start_time',
        'end_time',
        'hours',
        'total_price',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'date' => 'date:Y-m-d',
        ];
    }

    public function chef()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function kitchen()
    {
        return $this->belongsTo(Kitchen::class);
    }
}
