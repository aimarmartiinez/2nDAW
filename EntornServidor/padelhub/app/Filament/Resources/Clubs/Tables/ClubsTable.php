<?php

namespace App\Filament\Resources\Clubs\Tables;

use App\Models\Club;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Auth;

class ClubsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')->searchable(),
                TextColumn::make('address')->searchable(),
                TextColumn::make('city')->searchable(),
                TextColumn::make('postcode')->searchable(),
                TextColumn::make('phone')->searchable(),
                TextColumn::make('opening_time')->time()->sortable(),
                TextColumn::make('closing_time')->time()->sortable(),
                TextColumn::make('email')->label('Email')->searchable(),
                TextColumn::make('state')->searchable(),
                TextColumn::make('created_at')->dateTime()->sortable()->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')->dateTime()->sortable()->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([])
            ->recordActions([
                EditAction::make()
                    ->visible(fn (Club $record): bool => 
                        Auth::user()->role === 'admin' && (
                            is_null(Auth::user()->club_id) || 
                            Auth::user()->club_id === $record->id
                        )
                    ),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make()
                        ->visible(fn (): bool => 
                            Auth::user()->role === 'admin' && is_null(Auth::user()->club_id)
                        ),
                ]),
            ]);
    }
}