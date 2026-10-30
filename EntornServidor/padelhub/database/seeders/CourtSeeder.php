<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Court;
use App\Models\Club;

class CourtSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Obtenim tots els clubs
        $clubs = Club::all();

        // Definim el nombre de pistes per club (aleatori o fixe segons club)
        $pistasPorClub = [
            'Club Pádel Badia' => 4,
            'Pádel Club Terrassa' => 6,
            'Club Esports Rubí' => 5,
            'Pádel Sant Cugat' => 6,
            'Club Pádel Castellar' => 5,
            'Pádel Polinyà' => 4,
            'Club Pádel Barberà' => 7,
            'Pádel Sentmenat' => 4,
            'Club Pádel Vacarisses' => 5,
            'Pádel Santa Perpètua' => 4,
        ];

        foreach ($clubs as $club) {
            $numPistas = $pistasPorClub[$club->name] ?? rand(3, 6);
            $pricePerHour = rand(10, 30); // Precio fijo para todas las pistas del club

            for ($i = 1; $i <= $numPistas; $i++) {
                Court::create([
                    'club_id' => $club->id,
                    'name' => "Pista $i",
                    'type' => rand(0,1) ? 'indoor' : 'outdoor',
                    'capacity' => 4,
                    'price_per_hour' => $pricePerHour, // Usar el mismo precio
                    'state' => 'available',
                ]);
            }
        }
    }
}
