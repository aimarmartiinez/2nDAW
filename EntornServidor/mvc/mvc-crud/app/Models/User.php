<?php
namespace App\Models;

class User
{
    static protected array $memoryUsers = [
        [
            'id' => 1,
            'username' => 'admin',
            'password' => 'admin', // para pruebas, sin hash aún
        ],
    ];

    public static function findByUsername(string $username): ?array
    {
        foreach (self::$memoryUsers as $user) {
            if ($user['username'] === $username) return $user;
        }
        return null;
    }

    public static function findById(int $id): ?array
    {
        foreach (self::$memoryUsers as $user) {
            if ($user['id'] === $id) return $user;
        }
        return null;
    }

    public static function create(array $data): int
    {
        $newId = empty(self::$memoryUsers) ? 1 : max(array_column(self::$memoryUsers, 'id')) + 1;
        self::$memoryUsers[] = [
            'id' => $newId,
            'username' => $data['username'],
            'password' => $data['password'], // hash en producción
        ];
        return $newId;
    }
}
