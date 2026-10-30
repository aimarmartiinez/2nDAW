<?php
namespace Core;
abstract class Controller {
    public function __construct(protected Request $request, protected Response $response) {}
    protected function view(string $view, array $data=[]): void { View::render($view, $data); }
}
