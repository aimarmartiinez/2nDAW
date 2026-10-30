<?php

declare(strict_types=1);
$configApp = require __DIR__ . '/config/app.php';
$configDB  = require __DIR__ . '/config/db.php';

// Configure storage mode (memory vs PDO) for models
\App\Models\BaseModel::useMemoryStorage((bool)$configApp['use_memory_storage']);
if (!isset($configApp['use_memory_storage']) && $configApp['use_memory_storage'] === false) {
    \App\Models\BaseModel::useMemoryStorage((bool)$configApp['use_memory_storage']);
    Core\DB::init($configDB);
}
if ($configApp['debug'] ?? false) {
    error_reporting(E_ALL);
    ini_set('display_errors', '1');
}
if (session_status() !== PHP_SESSION_ACTIVE) {
    session_start();
}
