<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Recipe;
use Illuminate\Database\Eloquent\Factories\Factory;

class RecipeFactory extends Factory
{
    protected $model = Recipe::class;

    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph(),
            'ingredients' => $this->faker->paragraph(),
            'instructions' => $this->faker->paragraph(3),
            'prep_time' => $this->faker->numberBetween(5, 120),
            'category_id' => Category::factory(),
        ];
    }
}
