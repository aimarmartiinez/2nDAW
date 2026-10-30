<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Club;

class ClubSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Club::create([
            'name' => 'Club Pádel Badia',
            'address' => 'Campo Municipal Sergio Busquets',
            'city' => 'Badia del Vallès',
            'postcode' => '08214',
            'phone' => '937123456',
            'opening_time' => '08:00',
            'closing_time' => '22:00',
            'email' => 'info@padelbadia.com',
            'state' => 'active',
        ]);

        Club::create([
            'name' => 'Pádel Club Terrassa',
            'address' => 'Avinguda de Montserrat, 120',
            'city' => 'Terrassa',
            'postcode' => '08221',
            'phone' => '937334567',
            'opening_time' => '07:00',
            'closing_time' => '22:30',
            'email' => 'contact@padelterrassa.es',
            'state' => 'active',
        ]);

        Club::create([
            'name' => 'Club Esports Rubí',
            'address' => 'Plaça Major, 32',
            'city' => 'Rubí',
            'postcode' => '08191',
            'phone' => '937456789',
            'opening_time' => '09:00',
            'closing_time' => '22:00',
            'email' => 'hello@esportsrubi.com',
            'state' => 'active',
        ]);

        Club::create([
            'name' => 'Pádel Sant Cugat',
            'address' => 'Carrer de la Vall, 88',
            'city' => 'Sant Cugat del Vallès',
            'postcode' => '08173',
            'phone' => '936789012',
            'opening_time' => '08:30',
            'closing_time' => '23:00',
            'email' => 'info@padelsantcugat.cat',
            'state' => 'active',
        ]);

        Club::create([
            'name' => 'Club Pádel Castellar',
            'address' => 'Av. Diagonal, 200',
            'city' => 'Castellar del Vallès',
            'postcode' => '08211',
            'phone' => '937567890',
            'opening_time' => '07:30',
            'closing_time' => '23:30',
            'email' => 'contact@padelcastellar.es',
            'state' => 'active',
        ]);

        Club::create([
            'name' => 'Pádel Polinyà',
            'address' => 'Carrer Sant Josep, 15',
            'city' => 'Polinyà',
            'postcode' => '08298',
            'phone' => '937234567',
            'opening_time' => '08:00',
            'closing_time' => '22:00',
            'email' => 'info@padelpolinya.com',
            'state' => 'active',
        ]);

        Club::create([
            'name' => 'Club Pádel Barberà',
            'address' => 'Avinguda Francesc Macià, 50',
            'city' => 'Barberà del Vallès',
            'postcode' => '08210',
            'phone' => '937345678',
            'opening_time' => '09:00',
            'closing_time' => '22:30',
            'email' => 'hello@padelbarbera.es',
            'state' => 'active',
        ]);

        Club::create([
            'name' => 'Pádel Sentmenat',
            'address' => 'Plaça de l\'Església, 5',
            'city' => 'Sentmenat',
            'postcode' => '08284',
            'phone' => '937456012',
            'opening_time' => '08:00',
            'closing_time' => '21:30',
            'email' => 'contact@padelsentmenat.cat',
            'state' => 'active',
        ]);

        Club::create([
            'name' => 'Club Pádel Vacarisses',
            'address' => 'Carrer Major, 78',
            'city' => 'Vacarisses',
            'postcode' => '08275',
            'phone' => '937234890',
            'opening_time' => '07:00',
            'closing_time' => '23:00',
            'email' => 'info@padelvacarisses.com',
            'state' => 'active',
        ]);

        Club::create([
            'name' => 'Pádel Santa Perpètua',
            'address' => 'Avinguda de Barcelona, 99',
            'city' => 'Santa Perpètua de Mogoda',
            'postcode' => '08130',
            'phone' => '937567123',
            'opening_time' => '08:30',
            'closing_time' => '22:00',
            'email' => 'contact@padelsantaperpetua.es',
            'state' => 'active',
        ]);
    }
}
