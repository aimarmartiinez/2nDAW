<?php

namespace App\Filament\Resources\Clubs\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\TimePicker;
use Filament\Schemas\Schema;
use Illuminate\Support\Facades\Auth;

class ClubForm
{
    public static function configure(Schema $schema): Schema
    {
        $user = Auth::user();
        $isClubAdmin = $user->role === 'admin' && $user->club_id;

        return $schema
            ->components([
                TextInput::make('name')
                    ->required()
                    ->disabled($isClubAdmin), // No cambia nombre
                
                TextInput::make('address')
                    ->required(),
                
                TextInput::make('city')
                    ->required(),
                
                TextInput::make('postcode')
                    ->required(),
                
                TextInput::make('phone')
                    ->tel()
                    ->required(),
                
                TimePicker::make('opening_time')
                    ->required(),
                
                TimePicker::make('closing_time')
                    ->required(),
                
                TextInput::make('email')
                    ->label('Email')
                    ->email()
                    ->required(),
                
                TextInput::make('state')
                    ->required()
                    ->default('active')
                    ->disabled($isClubAdmin), // No cambia estado
            ]);
    }
}