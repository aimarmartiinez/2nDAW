<?php
namespace Core;
class Router {
    private array $routes = ['GET'=>[], 'POST'=>[]];
    public function __construct(private Request $request, private Response $response) {}
    public function get(string $pattern, string $handler): void { $this->add('GET', $pattern, $handler); }
    public function post(string $pattern, string $handler): void { $this->add('POST', $pattern, $handler); }
    private function add(string $method, string $pattern, string $handler): void {
        $regex = preg_replace('#\{([a-zA-Z_][a-zA-Z0-9_]*)\}#', '(?P<$1>[^/]+)', $pattern);
        $regex = '#^' . $regex . '$#';
        $this->routes[$method][] = ['regex'=>$regex, 'handler'=>$handler];
    }
    public function dispatch(): void {
        $method = $this->request->method();
        $path   = $this->request->path();
        foreach ($this->routes[$method] ?? [] as $route) {
            if (preg_match($route['regex'], $path, $matches)) {
                $params = array_filter($matches, 'is_string', ARRAY_FILTER_USE_KEY);
                return $this->callHandler($route['handler'], $params);
            }
        }
        $this->response->status(404)->send('404 Not Found');
    }
    private function callHandler(string $handler, array $params): void {
        [$class, $action] = explode('@', $handler);
        $controller = new $class($this->request, $this->response);
        call_user_func_array([$controller, $action], $params);
    }
}
