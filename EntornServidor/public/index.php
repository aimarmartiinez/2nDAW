<?php
declare(strict_types=1);
require dirname(__DIR__) . '/vendor/autoload.php';

require dirname(__DIR__) . '/bootstrap.php';

use Core\{Router, Request, Response};
$request  = new Request($_SERVER, $_GET, $_POST);
$response = new Response();
$router = new Router($request, $response);
// Rutas CRUD
$router->get('/', 'App\Controllers\HomeController@index');
$router->get('/posts/create', 'App\Controllers\HomeController@create');
$router->post('/posts', 'App\Controllers\HomeController@store');
$router->get('/posts/{id}/edit', 'App\Controllers\HomeController@edit');
$router->post('/posts/{id}/update', 'App\Controllers\HomeController@update');
$router->post('/posts/{id}/delete', 'App\Controllers\HomeController@destroy');
$router->get('/posts/{id}', 'App\Controllers\HomeController@show');
$router->dispatch();