<?php
namespace Core;
class View {
    public static string $basePath = __DIR__ . '/../app/Views';
    public static function render(string $view, array $data=[]): void {
        $viewFile = self::$basePath . '/' . str_replace('.', '/', $view) . '.php';
        if (!is_file($viewFile)) { http_response_code(500); echo "Vista no encontrada: $view"; return; }
        extract($data, EXTR_OVERWRITE);
        $content = (function() use ($viewFile, $data) { ob_start(); include $viewFile; return ob_get_clean(); })();
        include self::$basePath . '/layout.php';
    }
}
