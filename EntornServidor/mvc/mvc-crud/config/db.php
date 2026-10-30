<?php
return [
  'driver'   => 'array', // o "mysql"

  // Para array:
  'seed' => [
    'posts' => [
      ['title' => 'Hola Mundo', 'content' => 'Demo en memoria'],
    ],
  ],

  // Para mysql:
  'host'     => '127.0.0.1',
  'database' => 'mimvc',
  'user'     => 'root',
  'password' => '',
  'charset'  => 'utf8mb4',
];
