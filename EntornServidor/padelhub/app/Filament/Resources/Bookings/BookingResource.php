<?php
namespace App\Filament\Resources\Bookings;

use App\Filament\Resources\Bookings\Pages\EditBooking;
use App\Filament\Resources\Bookings\Pages\ListBookings;
use App\Filament\Resources\Bookings\Schemas\BookingForm;
use App\Filament\Resources\Bookings\Tables\BookingsTable;
use App\Models\Booking;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class BookingResource extends Resource
{
    protected static ?string $model = Booking::class;
    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;
    protected static ?string $recordTitleAttribute = 'id';

    public static function getEloquentQuery(): Builder
    {
        $query = parent::getEloquentQuery();
        $user = auth()->user();

        if (!$user) {
            return $query->where('id', 0); //Verifica la autenticacion
        }

        if ($user->club_id) {
            return $query->whereHas('court', function ($q) use ($user) {
                $q->where('club_id', $user->club_id); //Verifica que tengamos id club
            });
        }

        return $query->where('id',0); //En caso de que no pues muestra todo
    }

    public static function canCreate(): bool
    {
        return false;
    }

    public static function table(Table $table): Table
    {
        $table = BookingsTable::configure($table);
        return $table->toolbarActions([]);
    }

    public static function form(Schema $schema): Schema
    {
        return BookingForm::configure($schema);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListBookings::route('/'),
            'edit' => EditBooking::route('/{record}/edit'),
        ];
    }

    public static function getNavigationLabel(): string
    {
        $user = auth()->user();
        
        if (!$user) {
            return 'Reservas';
        }
        
        if ($user->club_id) {
            return 'Reservas del Club';
        }
        
        return 'Mis Reservas';
    }
    
    public static function shouldRegisterNavigation(): bool
    {
        return auth()->check();
    }
}