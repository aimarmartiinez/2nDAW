<?php  
  
use App\Http\Controllers\Api\ClubController;

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('clubs', ClubController::class);
});