<?php  
  
use App\Http\Controllers\Api\ClubController;
use App\Http\Controllers\Api\BookingController;

// L'enunciat indica que per aquest projecte Frontend l'usuari és anònim (Guest). 
// Lliurem de Middleware Sanctum perquè les trucades fetch() sense Auth Token funcionin.
Route::apiResource('clubs', ClubController::class);
Route::apiResource('bookings', BookingController::class);