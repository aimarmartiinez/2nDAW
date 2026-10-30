<?php

namespace Core\Storage;

final class ArrayStorage implements StorageInterface
{
    private array $tables = [];
    private array $autoIncrement = [];

    public function __construct(array $seed = [])
    {
        foreach ($seed as $table => $rows) {
            $this->tables[$table] = [];
            $this->autoIncrement[$table] = 0;

            foreach ($rows as $row) {
                $this->insert($table, $row);
            }
        }
    }

    private function insert(string $table, array $data): int
    {
        $id = ++$this->autoIncrement[$table];
        $data['id'] = $id;
        $this->tables[$table][$id] = $data;
        return $id;
    }

    // Este método será llamado por Models: SELECT
    public function query(string $sql, array $params = []): array
    {
        if (!preg_match('/FROM\s+(\w+)/i', $sql, $match)) return [];
        $table = $match[1];
        return array_values($this->tables[$table] ?? []);
    }

    // INSERT / UPDATE / DELETE simulados
    public function execute(string $sql, array $params = []): bool
    {
        if (stripos($sql, 'INSERT INTO') === 0) {
            preg_match('/INTO\s+(\w+)/i', $sql, $m);
            $this->insert($m[1], $params);
            return true;
        }
        return true;
    }

    public function lastInsertId(): string
    {
        // No exacto, pero suficiente para modo demo/test
        return "1";
    }
}
