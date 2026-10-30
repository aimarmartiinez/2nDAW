<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\RecipeController;
use App\Http\Controllers\Api\CategoryController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Aquí es defineixen les rutes de l'API REST.
| Totes les rutes tenen el prefix /api automàticament.
|
*/

// Categories - ja implementat ✅
Route::apiResource('categories', CategoryController::class)->only(['index', 'show']);

// SOLUCIÓ TODO 1: Ruta apiResource per a receptes
Route::apiResource('recipes', RecipeController::class);
