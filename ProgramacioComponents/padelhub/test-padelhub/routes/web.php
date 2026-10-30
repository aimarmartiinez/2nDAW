<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Les rutes de frontend ara es gestionen des de la carpeta /frontend (React).
| Laravel actua només com a API (veure routes/api.php).
|
*/

Route::get('/', function () {
    return response()->json([
        'app' => 'PadelHub API',
        'status' => 'Running',
        'frontend_url' => 'http://localhost:5174'
    ]);
});

// En el futur, aquí es podria configurar el fallback per servir el build de React