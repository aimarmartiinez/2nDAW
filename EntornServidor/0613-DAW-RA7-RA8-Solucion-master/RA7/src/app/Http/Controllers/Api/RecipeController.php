<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Recipe;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RecipeController extends Controller
{
    /**
     * SOLUCIÓ TODO 2: Llistar receptes amb paginació i filtre per categoria.
     */
    public function index(Request $request): JsonResponse
    {
        $recipes = Recipe::with('category')
            ->when($request->category_id, fn($q, $v) => $q->where('category_id', $v))
            ->paginate(10);

        return response()->json($recipes);
    }

    /**
     * SOLUCIÓ TODO 3: Crear una recepta amb validació.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'ingredients' => 'required|string',
            'instructions' => 'required|string',
            'prep_time' => 'required|integer|min:1',
            'category_id' => 'required|exists:categories,id',
        ]);

        $recipe = Recipe::create($validated);

        return response()->json($recipe, 201);
    }

    /**
     * Mostra una recepta específica amb la seva categoria.
     * ✅ Ja implementat
     */
    public function show(Recipe $recipe): JsonResponse
    {
        $recipe->load('category');
        return response()->json($recipe);
    }

    /**
     * Actualitza una recepta existent.
     * ✅ Ja implementat
     */
    public function update(Request $request, Recipe $recipe): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'ingredients' => 'sometimes|string',
            'instructions' => 'sometimes|string',
            'prep_time' => 'sometimes|integer|min:1',
            'category_id' => 'sometimes|exists:categories,id',
        ]);

        $recipe->update($validated);
        $recipe->load('category');

        return response()->json($recipe);
    }

    /**
     * SOLUCIÓ TODO 5: Eliminar una recepta.
     */
    public function destroy(Recipe $recipe): JsonResponse
    {
        $recipe->delete();

        return response()->json(['message' => 'Recipe deleted successfully']);
    }
}
