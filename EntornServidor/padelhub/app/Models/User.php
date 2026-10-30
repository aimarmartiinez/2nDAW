<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    // Roles de usuario
    const ROLE_ADMIN = 'admin';
    const ROLE_USER = 'user';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'surname',
        'username',
        'email',
        'password',
        'phone',
        'role',
        'club_id',  
    ];

    // Métodos auxiliares de rol
    public function isAdmin()
    {
        return $this->role === self::ROLE_ADMIN;
    }

    public function isUser()
    {
        return $this->role === self::ROLE_USER;
    }

    /**
     * Relación: un admin pertenece a un club
     * (Usuarios normales tendrán club_id = null)
     */
    public function club()
    {
        return $this->belongsTo(Club::class);
    }
    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
public function getFilamentRedirectUrl(): ?string
{
    if ($this->role === 'admin') {
        return "/admin";
    }

    if ($this->role === 'user') {
        return "/user";
    }

    return null;
}


}
