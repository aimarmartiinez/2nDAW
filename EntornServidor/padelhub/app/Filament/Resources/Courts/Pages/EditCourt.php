<?php

namespace App\Filament\Resources\Courts\Pages;

use App\Filament\Resources\Courts\CourtResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Support\Facades\Auth;

class EditCourt extends EditRecord
{
    protected static string $resource = CourtResource::class;

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