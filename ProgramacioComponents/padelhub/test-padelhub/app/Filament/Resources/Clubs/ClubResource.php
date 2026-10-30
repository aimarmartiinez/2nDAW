<?php

namespace App\Filament\Resources\Clubs;

use App\Filament\Resources\Clubs\Pages\CreateClub;
use App\Filament\Resources\Clubs\Pages\EditClub;
use App\Filament\Resources\Clubs\Pages\ListClubs;
use App\Filament\Resources\Clubs\Schemas\ClubForm;
use App\Filament\Resources\Clubs\Tables\ClubsTable;
use App\Models\Club;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class ClubResource extends Resource
{
    protected static ?string $model = Club::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'name';

    // 1. SIEMPRE visible en menú
    public static function shouldRegisterNavigation(): bool
    {
        return true;
    }

    // 2. Nombre diferente para admin de club
    public static function getNavigationLabel(): string
    {
        $user = auth()->user();
        
        if ($user && $user->role === 'admin' && $user->club_id) {
            return 'Mi Club';
        }
        
        return 'Clubs';
    }

    // 3. Filtrar: admin de club solo ve SU club
    public static function getEloquentQuery(): Builder
    {
        $query = parent::getEloquentQuery();
        
        if (auth()->check()) {
            $user = auth()->user();
            
            if ($user->role === 'admin' && $user->club_id) {
                // Solo ver su club
                return $query->where('id', $user->club_id);
            }
        }
        
        return $query;
    }

    public static function form(Schema $schema): Schema
    {
        return ClubForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ClubsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListClubs::route('/'),
            'create' => CreateClub::route('/create'),
            'edit' => EditClub::route('/{record}/edit'),
        ];
    }
}