<?php

namespace App\Filament\Resources\Clubs\Pages;

use App\Filament\Resources\Clubs\ClubResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Support\Facades\Auth;

class EditClub extends EditRecord
{
    protected static string $resource = ClubResource::class;

    protected function getHeaderActions(): array
    {
        $user = Auth::user();
        
        return [
            DeleteAction::make()
                ->visible(fn (): bool => 
                    // Solo  admin puede eliminar
                    $user->role === 'admin' && is_null($user->club_id)
                ),
        ];
    }
}