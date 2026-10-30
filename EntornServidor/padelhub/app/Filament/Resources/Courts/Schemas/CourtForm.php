<?php

namespace App\Filament\Resources\Courts\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Select;
use Filament\Schemas\Schema;
use Illuminate\Support\Facades\Auth;
use App\Models\Club;

class CourtForm
{
    public static function configure(Schema $schema): Schema
    {
        $user = Auth::user();
        $isClubAdmin = $user->role === 'admin' && !is_null($user->club_id);

        return $schema
            ->components([
                // Si es admin de club, preseleccionar su club
                $isClubAdmin 
                    ? TextInput::make('club_id')
                        ->default($user->club_id)
                        ->disabled()
                        ->dehydrated()
                    : Select::make('club_id')
                        ->options(Club::pluck('name', 'id'))
                        ->required()
                        ->searchable(),
                
                TextInput::make('name')
                    ->required(),
                
                TextInput::make('type')
                    ->required(),
                
                TextInput::make('capacity')
                    ->required()
                    ->numeric(),
                
                TextInput::make('price_per_hour')
                    ->required()
                    ->numeric(),
                
                TextInput::make('state')
                    ->required()
                    ->default('available'),
            ]);
    }
}