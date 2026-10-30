<?php
namespace Core;
class Request {
    public function __construct(
        private array $server, private array $get, private array $post
    ) {
        if (session_status() !== PHP_SESSION_ACTIVE) { session_start(); }
    }
    public function method(): string { return $this->server['REQUEST_METHOD'] ?? 'GET'; }
    public function path(): string {
        $uri = $this->server['REQUEST_URI'] ?? '/';
        $q = strpos($uri, '?');
        return $q === false ? $uri : substr($uri, 0, $q);
    }
    public function input(string $key, mixed $default=null): mixed {
        return $this->post[$key] ?? $this->get[$key] ?? $default;
    }
    public function all(): array { return array_merge($this->get, $this->post); }
    public function old(): array { return $_SESSION['_old'] ?? []; }
    public function flashOld(array $data): void { $_SESSION['_old'] = $data; }
    public function flash(string $key, mixed $value): void { $_SESSION['_flash'][$key] = $value; }
    public function takeFlash(): array { $f = $_SESSION['_flash'] ?? []; unset($_SESSION['_flash']); return $f; }
    public function csrfToken(): string {
        if (empty($_SESSION['_csrf'])) { $_SESSION['_csrf'] = bin2hex(random_bytes(16)); }
        return $_SESSION['_csrf'];
    }
    public function validateCsrf(string $token): bool {
        return isset($_SESSION['_csrf']) && hash_equals($_SESSION['_csrf'], $token);
    }
}
