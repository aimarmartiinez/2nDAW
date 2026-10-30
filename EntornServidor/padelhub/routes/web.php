<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\BookingController;

// También mantenemos /landing
Route::get('/', function () {
    return view('landing');
})->name('landing');

// Rutas para usuarios normales(role: user)
Route::middleware(['auth', 'role:user'])->group(function () {
    // Asignamos el nombre de dashboard de usuario
    Route::get('/home', [HomeController::class, 'index'])->name('user.dashboard');
    
    Route::get('/dashboard', [HomeController::class, 'index'])->name('home');
    
    Route::get('/clubs/{club}/reservar', [BookingController::class, 'create'])
    ->name('bookings.create');

    Route::post('/reservas', [BookingController::class, 'store'])
        ->name('bookings.store');

    Route::post('/reservas/horas', [BookingController::class, 'availableHours'])
        ->name('bookings.hours');

    Route::post('/reservas/pistas', [BookingController::class, 'availableCourts'])
        ->name('bookings.courts');

    Route::get('/mis-reservas', [BookingController::class, 'myBookings'])
        ->name('mybookings');
});

// RUTAS COMUNES PARA AMBOS ROLES
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Las rutas de admin dejaremos que filament las maneje

require __DIR__.'/auth.php';