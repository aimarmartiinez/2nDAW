<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\JsonResponse;

class CategoryController extends Controller
{
    /**
     * Llista totes les categories amb el recompte de receptes.
     */
    public function index(): JsonResponse
    {
        $categories = Category::withCount('recipes')->get();
        return response()->json($categories);
    }

    /**
     * Mostra una categoria amb les seves receptes.
     */
    public function show(Category $category): JsonResponse
    {
        $category->load('recipes');
        return response()->json($category);
    }
}
