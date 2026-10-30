<?php

namespace App\Models;

class Author
{
    static protected array $memoryAuthors = [
        [
            'id' => 1,
            'user_id' => 1, // Relación con User
            'name' => 'Admin Autor',
            'bio' => 'Administrador del sitio',
            'created_at' => '2024-01-01 10:00:00'
        ],
        [
            'id' => 2,
            'user_id' => null,
            'name' => 'Invitado',
            'bio' => 'Autor invitado',
            'created_at' => '2024-01-02 11:00:00'
        ]
    ];

    public static function all(): array
    {
        return self::$memoryAuthors;
    }

    public static function find(int $id): ?array
    {
        foreach (self::$memoryAuthors as $author) {
            if ($author['id'] === $id) {
                return $author;
            }
        }
        return null;
    }

    public static function findByUserId(int $userId): ?array
    {
        foreach (self::$memoryAuthors as $author) {
            if ($author['user_id'] === $userId) {
                return $author;
            }
        }
        return null;
    }

    public static function create(array $data): int
    {
        $newId = empty(self::$memoryAuthors) ? 1 :
            max(array_column(self::$memoryAuthors, 'id')) + 1;

        $author = [
            'id' => $newId,
            'user_id' => $data['user_id'] ?? null,
            'name' => $data['name'],
            'bio' => $data['bio'] ?? '',
            'created_at' => date('Y-m-d H:i:s')
        ];

        self::$memoryAuthors[] = $author;
        return $newId;
    }

    public static function update(int $id, array $data): bool
    {
        foreach (self::$memoryAuthors as $key => $author) {
            if ($author['id'] === $id) {
                self::$memoryAuthors[$key] = array_merge(
                    self::$memoryAuthors[$key],
                    $data
                );
                return true;
            }
        }
        return false;
    }

    public static function delete(int $id): bool
    {
        $initialCount = count(self::$memoryAuthors);
        self::$memoryAuthors = array_filter(
            self::$memoryAuthors,
            fn($author) => $author['id'] !== $id
        );
        return count(self::$memoryAuthors) < $initialCount;
    }

    public static function getForSelect(): array
    {
        $authors = [];
        foreach (self::$memoryAuthors as $author) {
            $authors[$author['id']] = $author['name'];
        }
        return $authors;
    }
}