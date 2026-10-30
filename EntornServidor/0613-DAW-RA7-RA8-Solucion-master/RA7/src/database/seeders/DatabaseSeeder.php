<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Recipe;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Entrants', 'description' => 'Primers plats i aperitius'],
            ['name' => 'Principals', 'description' => 'Plats principals'],
            ['name' => 'Postres', 'description' => 'Dolços i postres'],
            ['name' => 'Begudes', 'description' => 'Begudes i còctels'],
        ];

        foreach ($categories as $cat) {
            Category::create($cat);
        }

        $recipes = [
            [
                'title' => 'Pa amb tomàquet',
                'description' => 'Recepta tradicional catalana',
                'ingredients' => 'Pa de pagès, tomàquet madur, oli d\'oliva, sal',
                'instructions' => '1. Torrar el pa. 2. Fregar el tomàquet. 3. Afegir oli i sal.',
                'prep_time' => 10,
                'category_id' => 1,
            ],
            [
                'title' => 'Escalivada',
                'description' => 'Verdures al forn típiques de Catalunya',
                'ingredients' => 'Albergínies, pebrots, cebes, oli d\'oliva',
                'instructions' => '1. Posar les verdures al forn. 2. Coure 45 min. 3. Pelar i amanir.',
                'prep_time' => 60,
                'category_id' => 1,
            ],
            [
                'title' => 'Fricandó',
                'description' => 'Estofat de vedella amb bolets',
                'ingredients' => 'Vedella, moixernons, ceba, tomàquet, farina, brou',
                'instructions' => '1. Enfarinar i daurar la carn. 2. Sofregir ceba i tomàquet. 3. Afegir bolets i brou. 4. Coure a foc lent.',
                'prep_time' => 90,
                'category_id' => 2,
            ],
            [
                'title' => 'Crema catalana',
                'description' => 'Postre tradicional amb crosta de sucre',
                'ingredients' => 'Llet, ous, sucre, midó de blat de moro, llimona, canyella',
                'instructions' => '1. Escalfar la llet amb llimona i canyella. 2. Barrejar rovells amb sucre i midó. 3. Coure fins espessir. 4. Cremar el sucre.',
                'prep_time' => 30,
                'category_id' => 3,
            ],
            [
                'title' => 'Orxata',
                'description' => 'Beguda refrescant de xufles',
                'ingredients' => 'Xufles, aigua, sucre',
                'instructions' => '1. Remullar les xufles. 2. Triturar amb aigua. 3. Colar i afegir sucre.',
                'prep_time' => 15,
                'category_id' => 4,
            ],
        ];

        foreach ($recipes as $recipe) {
            Recipe::create($recipe);
        }
    }
}
