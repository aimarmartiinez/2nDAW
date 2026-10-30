<?php

namespace App\Filament\Resources\Bookings\Pages;

use App\Filament\Resources\Bookings\BookingResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Support\Facades\Auth;

class EditBooking extends EditRecord
{
    protected static string $resource = BookingResource::class;

    protected function getHeaderActions(): array
    {
        $user = Auth::user();
        
        return [
            DeleteAction::make()
                ->visible(fn (): bool => 
                    // Solo admins pueden eliminar
                    $user->role === 'admin' && is_null($user->club_id)
                ),
        ];
    }
}