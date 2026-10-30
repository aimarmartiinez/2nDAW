<?php

namespace App\Filament\Resources\Clubs\Pages;

use App\Filament\Resources\Clubs\ClubResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;
use Illuminate\Support\Facades\Auth;

class ListClubs extends ListRecords
{
    protected static string $resource = ClubResource::class;

    protected function getHeaderActions(): array
    {
        $user = Auth::user();
        
        return [
            CreateAction::make()
                ->visible(fn (): bool => 
                    // Solo  admin (sin club_id) puede crear
                    $user->role === 'admin' && is_null($user->club_id)
                ),
        ];
    }

    // Redirigir si es admin de club
    public function mount(): void
    {
        $user = Auth::user();
        
        // Si es admin de club, ir directo a editar SU club
        if ($user->role === 'admin' && $user->club_id) {
            $this->redirect(ClubResource::getUrl('edit', [
                'record' => $user->club_id
            ]));
            return;
        }
        
        parent::mount();
    }
}