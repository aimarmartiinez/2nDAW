<?php

namespace App\Filament\Resources\Courts\Pages;

use App\Filament\Resources\Courts\CourtResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;
use Illuminate\Support\Facades\Auth;

class ListCourts extends ListRecords
{
    protected static string $resource = CourtResource::class;

    protected function getHeaderActions(): array
    {
        $user = Auth::user();
        
        return [
            CreateAction::make()
                ->visible(fn (): bool => 
                    // Todos los admins pueden crear pistas
                    $user->role === 'admin'
                ),
        ];
    }
}