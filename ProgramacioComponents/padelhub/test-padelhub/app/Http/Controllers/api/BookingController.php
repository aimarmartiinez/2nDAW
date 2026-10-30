<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function index()
    {
        // En aquesta entrega frontend Guest no tenim Auth real
        // Mostrem totes les reserves (amb with() per poder mostrar dades de la pista en el Frontend)
        return response()->json(Booking::with('court.club')->get(), 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'court_id' => 'required|exists:courts,id',
            'date' => 'required|date',
            'start_time' => 'required',
            'end_time' => 'required',
            'total_price' => 'required|numeric',
            'status' => 'required'
        ]);

        $booking = Booking::create($validated);
        return response()->json($booking, 201);
    }
}
