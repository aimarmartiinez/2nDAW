<?php

namespace App\Models;

class Comment
{
    static protected array $memoryComments = [
        [
            'id' => 1,
            'post_id' => 1,
            'author' => 'Alice',
            'body' => 'Molt bon post!',
            'title' => 'Comentari 1',
            'created_at' => '2024-01-01 12:00:00',
            'updated_at' => '2024-01-01 12:00:00'
        ],
    ];

    public static function all(): array
    {
        return self::$memoryComments;
    }

    public static function getByPost(int $postId): array
    {
        return array_filter(
            self::$memoryComments,
            fn($c) => $c['post_id'] === $postId
        );
    }

    public static function create(array $data): int
    {
        $newId = empty(self::$memoryComments) ? 1 :
            max(array_column(self::$memoryComments, 'id')) + 1;

        $now = date('Y-m-d H:i:s');

        $comment = [
            'id' => $newId,
            'post_id' => $data['post_id'],
            'author' => $data['author'] ?? 'Anònim',
            'body' => $data['content'] ?? '',
            'title' => $data['title'] ?? 'Comentari ' . $newId,
            'created_at' => $now,
            'updated_at' => $now
        ];

        self::$memoryComments[] = $comment;
        return $newId;
    }

    public static function deleteById(int $id): bool
    {
        $initialCount = count(self::$memoryComments);
        self::$memoryComments = array_filter(
            self::$memoryComments,
            fn($c) => $c['id'] !== $id
        );
        return count(self::$memoryComments) < $initialCount;
    }
}
