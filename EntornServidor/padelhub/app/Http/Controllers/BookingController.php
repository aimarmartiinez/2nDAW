<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Club;
use App\Models\Court;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class BookingController extends Controller
{
    public function create(Club $club)
    {
        return view('booking', compact('club'));
    }

    public function availableHours(Request $request)
    {
        $request->validate([
            'date' => 'required|date',
            'club_id' => 'required|exists:clubs,id',
        ]);

        $club = Club::findOrFail($request->club_id);

        $opening = Carbon::createFromTimeString($club->opening_time);
        $closing = Carbon::createFromTimeString($club->closing_time);

        $hours = [];

        while ($opening < $closing) {
            $hours[] = $opening->format('H:i');
            $opening->addHour();
        }

        return response()->json($hours);
    }

    public function availableCourts(Request $request)
    {
        $request->validate([
            'date'      => 'required|date',
            'hour'      => 'required',
            'end_time'  => 'nullable',
            'club_id'   => 'required|exists:clubs,id',
        ]);

        $start = Carbon::parse($request->date . ' ' . $request->hour);

        $end = $request->end_time
            ? Carbon::parse($request->date . ' ' . $request->end_time)
            : $start->copy()->addHour();

        $courts = Court::where('club_id', $request->club_id)
            ->where('state', 'available')
            ->whereDoesntHave('bookings', function ($query) use ($request, $start, $end) {
                $query->where('date', $request->date)
                    ->where('start_time', '<', $end)
                    ->where('end_time', '>', $start);
            })
            ->get();

        return response()->json($courts);
    }

    public function store(Request $request)
    {
        $request->validate([
            'court_id'   => 'required|exists:courts,id',
            'date'       => 'required|date',
            'start_time' => 'required',
            'end_time'   => 'nullable|after:start_time',
        ]);

        $court = Court::findOrFail($request->court_id);

        $start = Carbon::parse($request->date . ' ' . $request->start_time);

        $end = $request->end_time
            ? Carbon::parse($request->date . ' ' . $request->end_time)
            : $start->copy()->addHour();

        // Evitar solapamientos
        $conflict = Booking::where('court_id', $court->id)
            ->where('date', $request->date)
            ->where('start_time', '<', $end)
            ->where('end_time', '>', $start)
            ->exists();

        if ($conflict) {
            return back()->withErrors('La pista ya no está disponible para ese rango horario.');
        }

        Booking::create([
            'user_id'    => auth()->id(),
            'court_id'   => $court->id,
            'date'       => $request->date,
            'start_time' => $start->format('H:i'),
            'end_time'   => $end->format('H:i'),
            'status'     => 'confirmed',
        ]);

        return redirect()->route('mybookings')->with('success', 'Reserva realizada con éxito.');
    }

    public function myBookings(){
        $bookings = Booking::with(['court.club'])
            ->where('user_id', auth()->id())
            ->orderBy('date', 'desc')
            ->orderBy('start_time', 'desc')
            ->get();

        return view('mybookings', compact('bookings'));
    }

}
