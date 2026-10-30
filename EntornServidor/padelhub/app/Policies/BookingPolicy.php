<?php

namespace App\Policies;

use App\Models\Booking;
use App\Models\User;

class BookingPolicy
{
    public function view(User $user, Booking $booking): bool
    {
        if ($user->role !== 'admin') {
            return false;
        }

        // Admin global
        if (is_null($user->club_id)) {
            return true;
        }

        // Admin de club → solo su club
        return $booking->court->club_id === $user->club_id;
    }

    public function update(User $user, Booking $booking): bool
    {
        return $this->view($user, $booking);
    }

    public function delete(User $user, Booking $booking): bool
    {
        // Solo admin global puede borrar
        return $user->role === 'admin' && is_null($user->club_id);
    }
}
