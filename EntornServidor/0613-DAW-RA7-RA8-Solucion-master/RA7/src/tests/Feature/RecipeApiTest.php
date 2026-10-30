<?php

use App\Models\Category;
use App\Models\Recipe;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

/*
|--------------------------------------------------------------------------
| Tests per a l'API REST de Receptes
|--------------------------------------------------------------------------
|
| Aquests tests validen la implementació dels 5 TODOs.
| Executa: docker-compose exec app ./vendor/bin/pest
|
*/

// =============================================
// TEST TODO 1: Les rutes de l'API estan definides
// =============================================

test('GET /api/recipes retorna una llista de receptes', function () {
    Category::factory()->create();
    Recipe::factory(3)->create();

    $response = $this->getJson('/api/recipes');

    $response->assertStatus(200);
});

test('POST /api/recipes retorna 201 quan es crea una recepta', function () {
    $category = Category::factory()->create();

    $response = $this->postJson('/api/recipes', [
        'title' => 'Test Recipe',
        'description' => 'Test description',
        'ingredients' => 'Test ingredients',
        'instructions' => 'Test instructions',
        'prep_time' => 15,
        'category_id' => $category->id,
    ]);

    $response->assertStatus(201);
});

test('DELETE /api/recipes/{id} retorna 200 quan s\'elimina', function () {
    $recipe = Recipe::factory()->create();

    $response = $this->deleteJson("/api/recipes/{$recipe->id}");

    $response->assertStatus(200);
});

// =============================================
// TEST TODO 2: Index amb paginació i filtre
// =============================================

test('GET /api/recipes retorna resultats paginats', function () {
    $category = Category::factory()->create();
    Recipe::factory(15)->create(['category_id' => $category->id]);

    $response = $this->getJson('/api/recipes');

    $response->assertStatus(200);
    $response->assertJsonStructure([
        'data',
        'current_page',
        'per_page',
    ]);
    expect(count($response->json('data')))->toBeLessThanOrEqual(10);
});

test('GET /api/recipes pot filtrar per category_id', function () {
    $cat1 = Category::factory()->create();
    $cat2 = Category::factory()->create();
    Recipe::factory(3)->create(['category_id' => $cat1->id]);
    Recipe::factory(2)->create(['category_id' => $cat2->id]);

    $response = $this->getJson("/api/recipes?category_id={$cat1->id}");

    $response->assertStatus(200);
    expect(count($response->json('data')))->toBe(3);
});

test('GET /api/recipes inclou la relació category', function () {
    $category = Category::factory()->create();
    Recipe::factory(1)->create(['category_id' => $category->id]);

    $response = $this->getJson('/api/recipes');

    $response->assertStatus(200);
    $response->assertJsonStructure([
        'data' => [
            ['id', 'title', 'category'],
        ],
    ]);
});

// =============================================
// TEST TODO 3: Store crea una recepta
// =============================================

test('POST /api/recipes crea una nova recepta a la base de dades', function () {
    $category = Category::factory()->create();
    $data = [
        'title' => 'Pa amb tomàquet',
        'description' => 'Recepta catalana clàssica',
        'ingredients' => 'Pa, tomàquet, oli, sal',
        'instructions' => 'Torrar el pa, fregar el tomàquet, afegir oli i sal',
        'prep_time' => 10,
        'category_id' => $category->id,
    ];

    $response = $this->postJson('/api/recipes', $data);

    $response->assertStatus(201);
    $response->assertJsonFragment(['title' => 'Pa amb tomàquet']);
    $this->assertDatabaseHas('recipes', ['title' => 'Pa amb tomàquet']);
});

test('POST /api/recipes valida els camps obligatoris', function () {
    $response = $this->postJson('/api/recipes', []);

    $response->assertStatus(422);
    $response->assertJsonValidationErrors([
        'title',
        'description',
        'ingredients',
        'instructions',
        'prep_time',
        'category_id'
    ]);
});

test('POST /api/recipes valida que category_id existeixi', function () {
    $response = $this->postJson('/api/recipes', [
        'title' => 'Test',
        'description' => 'Test',
        'ingredients' => 'Test',
        'instructions' => 'Test',
        'prep_time' => 10,
        'category_id' => 999,
    ]);

    $response->assertStatus(422);
    $response->assertJsonValidationErrors(['category_id']);
});

// =============================================
// TEST TODO 4: Recipe pertany a Category
// =============================================

test('Recipe pertany a una Category (belongsTo)', function () {
    $category = Category::factory()->create();
    $recipe = Recipe::factory()->create(['category_id' => $category->id]);

    expect($recipe->category)->toBeInstanceOf(Category::class);
    expect($recipe->category->id)->toBe($category->id);
});

test('Category té moltes Recipes (hasMany)', function () {
    $category = Category::factory()->create();
    Recipe::factory(3)->create(['category_id' => $category->id]);

    expect($category->recipes)->toHaveCount(3);
});

// =============================================
// TEST TODO 5: Destroy elimina una recepta
// =============================================

test('DELETE /api/recipes/{id} elimina la recepta de la BD', function () {
    $recipe = Recipe::factory()->create();

    $response = $this->deleteJson("/api/recipes/{$recipe->id}");

    $response->assertStatus(200);
    $response->assertJsonFragment(['message' => 'Recipe deleted successfully']);
    $this->assertDatabaseMissing('recipes', ['id' => $recipe->id]);
});

// =============================================
// Tests addicionals (ja implementats - control)
// =============================================

test('GET /api/recipes/{id} retorna una recepta amb la seva categoria', function () {
    $category = Category::factory()->create();
    $recipe = Recipe::factory()->create(['category_id' => $category->id]);

    $response = $this->getJson("/api/recipes/{$recipe->id}");

    $response->assertStatus(200);
    $response->assertJsonFragment(['title' => $recipe->title]);
});

test('PUT /api/recipes/{id} actualitza una recepta', function () {
    $recipe = Recipe::factory()->create();

    $response = $this->putJson("/api/recipes/{$recipe->id}", [
        'title' => 'Recepta Actualitzada',
    ]);

    $response->assertStatus(200);
    $response->assertJsonFragment(['title' => 'Recepta Actualitzada']);
});

test('GET /api/categories retorna totes les categories', function () {
    Category::factory(3)->create();

    $response = $this->getJson('/api/categories');

    $response->assertStatus(200);
    expect(count($response->json()))->toBe(3);
});
