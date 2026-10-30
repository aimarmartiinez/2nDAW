<?php

namespace App\Models;

class Post
{
    static protected array $memoryPosts = [
        [
            'id' => 1,
            'title' => 'First Post',
            'body' => 'This is our first post content.',
            'author_id' => 1,
            'created_at' => '2024-01-01 10:00:00',
            'updated_at' => '2024-01-01 10:00:00'
        ],
        [
            'id' => 2,
            'title' => 'Second Post',
            'body' => 'This is our second post content.',
            'author_id' => 2,
            'created_at' => '2024-01-02 11:00:00',
            'updated_at' => '2024-01-02 11:00:00'
        ]
    ];

    public static function all(): array
    {
        $posts = self::$memoryPosts;
        foreach ($posts as &$post) {
            $author = Author::find($post['author_id'] ?? 0);
            $post['author_name'] = $author['name'] ?? 'Anónimo';
            $post['author_bio'] = $author['bio'] ?? '';
        }
        return $posts;
    }

    public static function find(int $id): ?array
    {
        foreach (self::$memoryPosts as $post) {
            if ($post['id'] === $id) {
                $author = Author::find($post['author_id'] ?? 0);
                $post['author_name'] = $author['name'] ?? 'Anónimo';
                $post['author_bio'] = $author['bio'] ?? '';
                return $post;
            }
        }
        return null;
    }

    public static function create(array $data): int
    {
        $newId = empty(self::$memoryPosts) ? 1 :
            max(array_column(self::$memoryPosts, 'id')) + 1;

        $now = date('Y-m-d H:i:s');
        $post = [
            'id' => $newId,
            'title' => $data['title'],
            'body' => $data['body'],
            'author_id' => $data['author_id'] ?? 1,
            'created_at' => $now,
            'updated_at' => $now
        ];

        self::$memoryPosts[] = $post;
        return $newId;
    }

    public static function updateById(int $id, array $data): bool
    {
        foreach (self::$memoryPosts as $key => $post) {
            if ($post['id'] === $id) {
                self::$memoryPosts[$key] = [
                    ...self::$memoryPosts[$key],
                    'title' => $data['title'],
                    'body' => $data['body'],
                    'author_id' => $data['author_id'] ?? $post['author_id'],
                    'updated_at' => date('Y-m-d H:i:s')
                ];
                return true;
            }
        }
        return false;
    }

    public static function deleteById(int $id): bool
    {
        $initialCount = count(self::$memoryPosts);
        self::$memoryPosts = array_filter(
            self::$memoryPosts,
            fn($post) => $post['id'] !== $id
        );
        return count(self::$memoryPosts) < $initialCount;
    }
    public static function getComments(int $postId): array
    {
        return Comment::getByPost($postId);
    }

}