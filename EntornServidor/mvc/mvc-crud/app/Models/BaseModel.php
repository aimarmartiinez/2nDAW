<?php

namespace App\Models;

use App\Models\Storage\StorageInterface;

abstract class BaseModel
{
    protected StorageInterface $storage;

    public function __construct(StorageInterface $storage)
    {
        $this->storage = $storage;
    }

    public function all(): array
    {
        return $this->storage->all();
    }

    public function find(int $id): ?array
    {
        return $this->storage->find($id);
    }

    public function create(array $data): int
    {
        return $this->storage->create($data);
    }

    public function update(int $id, array $data): bool
    {
        return $this->storage->update($id, $data);
    }

    public function delete(int $id): bool
    {
        return $this->storage->delete($id);
    }
}
