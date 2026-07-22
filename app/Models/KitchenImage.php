<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class KitchenImage extends Model
{
    protected $fillable = ['kitchen_id', 'path'];

    protected $appends = ['url'];

    /**
     * Owner uploads live on the public disk; seeded images are bundled
     * public assets ("/images/...") shipped with the repository.
     */
    public function getUrlAttribute(): string
    {
        if (str_starts_with($this->path, 'http') || str_starts_with($this->path, '/')) {
            return $this->path;
        }

        return Storage::url($this->path);
    }

    public function kitchen()
    {
        return $this->belongsTo(Kitchen::class);
    }
}
