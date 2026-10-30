<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Court extends Model
{
    public function club()
    {
        return $this->belongsTo(Club::class);
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}

