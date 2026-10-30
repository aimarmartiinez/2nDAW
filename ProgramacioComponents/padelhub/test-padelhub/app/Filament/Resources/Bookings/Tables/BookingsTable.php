<?php

namespace App\Filament\Resources\Bookings\Tables;

use App\Models\Booking;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Auth;

class BookingsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('user.name')
                    ->label('Usuario')
                    ->sortable()
                    ->searchable(),
                
                TextColumn::make('court.name')
                    ->label('Pista')
                    ->sortable(),
                
                TextColumn::make('date')
                    ->date('d/m/Y')
                    ->sortable(),
                
                TextColumn::make('start_time')
                    ->time('H:i'),
                
                TextColumn::make('end_time')
                    ->time('H:i'),
                
                TextColumn::make('total_price')
                    ->money('EUR')
                    ->sortable(),
                
                TextColumn::make('status')
                    ->label('Estado')
                    ->formatStateUsing(fn (string $state): string => 
                        $state === 'confirmed' ? 'Confirmada' : 
                        ($state === 'pending' ? 'Pendiente' : 'Cancelada')
                    ),
            ])
            ->recordActions([
                EditAction::make(),
                DeleteAction::make(),
            ]);
    }
}