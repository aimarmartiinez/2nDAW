<?php

namespace App\Filament\Resources\Courts\Tables;

use App\Models\Court;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Auth;

class CourtsTable
{
    public static function configure(Table $table): Table
    {
        $user = Auth::user();
        $isClubAdmin = $user->role === 'admin' && !is_null($user->club_id);

        return $table
            ->columns([
                // Ocultar columna club_id si es admin de club
                $isClubAdmin 
                    ? TextColumn::make('club_id')
                        ->numeric()
                        ->sortable()
                        ->toggleable(isToggledHiddenByDefault: true)
                    : TextColumn::make('club_id')
                        ->numeric()
                        ->sortable(),
                
                TextColumn::make('name')
                    ->searchable(),
                
                TextColumn::make('type')
                    ->searchable(),
                
                TextColumn::make('capacity')
                    ->numeric()
                    ->sortable(),
                
                TextColumn::make('price_per_hour')
                    ->numeric()
                    ->sortable(),
                
                TextColumn::make('state')
                    ->searchable(),
                
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make()
                    ->visible(fn (Court $record): bool => 
                        // Puede editar si es  admin O si es pista de SU club
                        Auth::user()->role === 'admin' && (
                            is_null(Auth::user()->club_id) || 
                            Auth::user()->club_id === $record->club_id
                        )
                    ),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make()
                        ->visible(fn (): bool => 
                            // Solo  admins pueden eliminar múltiples
                            Auth::user()->role === 'admin' && is_null(Auth::user()->club_id)
                        ),
                ]),
            ]);
    }
}