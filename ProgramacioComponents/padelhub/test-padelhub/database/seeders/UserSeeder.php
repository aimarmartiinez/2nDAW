<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $seedUsers = [
            // 5 users (sin club_id)
            ['name' => 'Marc',   'surname' => 'Soler',     'username' => 'marc.soler',    'email' => 'marc.soler@gmail.com',    'phone' => '612345678', 'role' => 'user', 'club_id' => null],
            ['name' => 'Laura',  'surname' => 'Pons',      'username' => 'laura.pons',    'email' => 'laura.pons@hotmail.com',  'phone' => '612345679', 'role' => 'user', 'club_id' => null],
            ['name' => 'Jordi',  'surname' => 'Ribas',     'username' => 'jordi.ribas',   'email' => 'jordi.ribas@outlook.com', 'phone' => '612345680', 'role' => 'user', 'club_id' => null],
            ['name' => 'Núria',  'surname' => 'Costa',     'username' => 'nuria.costa',   'email' => 'nuria.costa@gmail.com',   'phone' => '612345681', 'role' => 'user', 'club_id' => null],
            ['name' => 'Oriol',  'surname' => 'Vidal',     'username' => 'oriol.vidal',   'email' => 'oriol.vidal@gmail.com',   'phone' => '612345682', 'role' => 'user', 'club_id' => null],

            // 5 admins (cada uno asignado a su club correspondiente)
            ['name' => 'Aimar',      'surname' => 'Martínez', 'username' => 'aimar.martinez', 'email' => 'aimar.martinez@badiaclub.com',         'phone' => '611987654', 'role' => 'admin', 'club_id' => 1],
            ['name' => 'Mahamadu',   'surname' => 'Mas',       'username' => 'mahamadu.mas',   'email' => 'mahamadu.mas@padelterrassa.es',     'phone' => '611987655', 'role' => 'admin', 'club_id' => 2],
            ['name' => 'Jordi',      'surname' => 'Solà',      'username' => 'jordi.sola',     'email' => 'jordi.sola@campoamorclub.com',        'phone' => '611987656', 'role' => 'admin', 'club_id' => 3],
            ['name' => 'Martí',      'surname' => 'Puig',      'username' => 'marti.puig',     'email' => 'marti.puig@barberaclub.es',           'phone' => '611987657', 'role' => 'admin', 'club_id' => 4],
            ['name' => 'Sergio',     'surname' => 'Martí',     'username' => 'sergio.marti',   'email' => 'sergio.marti@padelsantcugat.cat',        'phone' => '611987658', 'role' => 'admin', 'club_id' => 5],
        ];

        foreach ($seedUsers as $u) {
            \App\Models\User::create([
                'name' => $u['name'],
                'email' => $u['email'],
                'email_verified_at' => now(),
                'surname' => $u['surname'],
                'username' => $u['username'],
                'password' => Hash::make('Password!234'),
                'phone' => $u['phone'],
                'role' => $u['role'],
                'club_id' => $u['club_id'],
            ]);
        }
    }
}
