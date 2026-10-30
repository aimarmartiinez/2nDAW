<?php
namespace Core;
class Response {
    public function status(int $code): self { http_response_code($code); return $this; }
    public function header(string $h, string $v): self { header("$h: $v"); return $this; }
    public function json(array $data, int $code=200): void {
        $this->status($code)->header('Content-Type','application/json');
        echo json_encode($data, JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT);
    }
    public function send(string $html, int $code=200): void {
        $this->status($code)->header('Content-Type','text/html; charset=utf-8');
        echo $html;
    }
    public function redirect(string $to): void {
        header('Location: ' . $to, true, 302);
        exit;
    }
}
