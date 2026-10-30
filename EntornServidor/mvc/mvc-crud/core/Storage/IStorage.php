<?php

namespace Core\Storage;

interface StorageInterface
{
    public function query(string $sql, array $params = []): array;
    public function execute(string $sql, array $params = []): bool;
    public function lastInsertId(): string;
}
