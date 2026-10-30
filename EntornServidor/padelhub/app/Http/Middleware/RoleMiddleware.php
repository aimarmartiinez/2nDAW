<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware //Control de acceso para las rutas
{
    public function handle(Request $request, Closure $next, string $role): Response
    {
        if (!Auth::check()) {
            return redirect()->route('login'); //Si no está autenticado lo reenviamos al login
        }

        if (Auth::user()->role !== $role) {
            abort(403,'No tienes permisos para acceder a esta parte'); //Verificamos el rol
            
        }
        return $next($request);
    }
}

