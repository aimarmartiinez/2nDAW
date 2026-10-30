<?php

namespace Core;

use PDO;

final class DB
{
    private static ?StorageInterface $instance = null;

    private function __construct() {}
    private function __clone() {}

    public static function init(array $cfg): void
    {
        if (self::$instance !== null) return;

        $driver = $cfg['driver'] ?? 'mysql';

        if ($driver === 'array') {
            self::$instance = new ArrayStorage($cfg['seed'] ?? []);
            return;
        }

        // Driver MySQL por defecto
        $dsn = sprintf(
            'mysql:host=%s;dbname=%s;charset=%s',
            $cfg['host'],
            $cfg['database'],
            $cfg['charset'] ?? 'utf8mb4'
        );

        $pdo = new PDO($dsn, $cfg['user'], $cfg['password']);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        self::$instance = new PdoAdapter($pdo);
    }

    public static function get(): StorageInterface
    {
        if (!self::$instance) {
            throw new \RuntimeException("DB no inicializada");
        }
        return self::$instance;
    }
}
