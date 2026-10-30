<?php

namespace App\Filament\Resources\Bookings\Pages;

use App\Filament\Resources\Bookings\BookingResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;
use Illuminate\Support\Facades\Auth;

class ListBookings extends ListRecords
{
    protected static string $resource = BookingResource::class;

    protected function getHeaderActions(): array
    {
        $user = Auth::user();
        /*
        return [
            CreateAction::make()
                ->visible(fn (): bool => 
                    // Todos los admins pueden crear reservas
                    $user->role === 'admin'
                ),
        ];*/
        return []; //No queremos crear reservas.
    }
}