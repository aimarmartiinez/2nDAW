<?php

namespace App\Policies;

use App\Models\Club;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ClubPolicy
{
    use HandlesAuthorization;

    /**
     * Determinar si el usuario puede ver cualquier club.
     * IMPORTANTE: Esto afecta si el recurso aparece en el menú
     */
    public function viewAny(User $user): bool
    {
        // Permitir a TODOS los admins ver clubs (aparece en menú)
        return $user->role === 'admin';
    }

    /**
     * Determinar si el usuario puede ver un club específico.
     */
    public function view(User $user, Club $club): bool
    {
        // Puede ver si es admin O si es admin de ESE club
        return $user->role === 'admin' && (
            is_null($user->club_id) || 
            $user->club_id === $club->id
        );
    }

    /**
     * Determinar si el usuario puede crear clubs.
     */
    public function create(User $user): bool
    {
        // Solo admins pueden crear clubs
        return $user->role === 'admin' && is_null($user->club_id);
    }

    /**
     * Determinar si el usuario puede actualizar el club.
     */
    public function update(User $user, Club $club): bool
    {
        // Puede actualizar si es admin O si es admin de ESE club
        return $user->role === 'admin' && (
            is_null($user->club_id) || 
            $user->club_id === $club->id
        );
    }

    /**
     * Determinar si el usuario puede eliminar el club.
     */
    public function delete(User $user, Club $club): bool
    {
        // Solo admins pueden eliminar clubs
        return $user->role === 'admin' && is_null($user->club_id);
    }

    /**
     * Determinar si el usuario puede restaurar el club.
     */
    public function restore(User $user, Club $club): bool
    {
        return false;
    }

    /**
     * Determinar si el usuario puede eliminar permanentemente el club.
     */
    public function forceDelete(User $user, Club $club): bool
    {
        return false;
    }
}