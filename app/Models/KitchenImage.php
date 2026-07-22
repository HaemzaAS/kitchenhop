<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KitchenImage extends Model
{
    protected $fillable = ['kitchen_id', 'path'];

    public function kitchen()
    {
        return $this->belongsTo(Kitchen::class);
    }
}
