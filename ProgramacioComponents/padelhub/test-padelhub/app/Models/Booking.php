<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
class Booking extends Model
{
    protected $fillable = [
        'user_id',
        'court_id',
        'date',
        'start_time',
        'end_time',
        'total_price',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

public function court()
    {
        return $this->belongsTo(Court::class);
    }

    protected static function booted()
    {
        static::creating(function ($booking) {

            $start = Carbon::createFromFormat('H:i', $booking->start_time);
            $end   = Carbon::createFromFormat('H:i', $booking->end_time);

            $hours = $start->diffInMinutes($end) / 60;

            $booking->total_price = $hours * $booking->court->price_per_hour;
        });
    }
}
