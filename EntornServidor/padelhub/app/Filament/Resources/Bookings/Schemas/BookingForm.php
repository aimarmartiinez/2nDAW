<?php

namespace App\Filament\Resources\Bookings\Schemas;

use Filament\Forms;
use Filament\Schemas\Schema;
use Illuminate\Support\Facades\Auth;

class BookingForm
{
    public static function configure(Schema $schema): Schema
    {
        $user = Auth::user();
        $isClubAdmin = $user && $user->club_id;
        
        return $schema
            ->schema([
                Forms\Components\Select::make('court_id')
                    ->label('Pista')
                    ->relationship('court', 'name')
                    ->required()
                    ->disabled($isClubAdmin)
                    ->searchable(),
                
                Forms\Components\Select::make('user_id')
                    ->label('Usuario')
                    ->relationship('user', 'name')
                    ->required()
                    ->disabled($isClubAdmin)
                    ->visible($isClubAdmin)
                    ->searchable(),
                
                Forms\Components\DatePicker::make('date')
                    ->label('Fecha')
                    ->required()
                    ->disabled($isClubAdmin),
                
                Forms\Components\TimePicker::make('start_time')
                    ->label('Hora inicio')
                    ->required()
                    ->disabled($isClubAdmin),
                
                Forms\Components\TimePicker::make('end_time')
                    ->label('Hora fin')
                    ->required()
                    ->disabled($isClubAdmin),
                
                Forms\Components\Select::make('status')
                    ->label('Estado')
                    ->options([
                        'pending' => 'Pendiente',
                        'confirmed' => 'Confirmada',
                        'cancelled' => 'Cancelada',
                    ])
                    ->required()
                    ->visible($isClubAdmin),
            ]);
    }
}