<?php
?><!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title><?= htmlspecialchars($title ?? 'Demo MVC') ?></title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body { font-family: system-ui, sans-serif; margin: 2rem; line-height: 1.5; }
    nav a { margin-right: .75rem; }
    .card { border:1px solid #ddd; border-radius:8px; padding:1rem; margin:.5rem 0; }
    .error { color:#b00020; }
    .flash { background:#e7f7ec; border:1px solid #c3e7d5; padding:.5rem 1rem; border-radius:6px; }
  </style>
</head>
<body>
  <nav>
    <a href="/">Inicio</a>
    <a href="/posts/create">Crear</a>
  </nav>
  <hr>
  <main>
    <?php if (!empty($flash['success'])): ?><div class="flash"><?= htmlspecialchars($flash['success']) ?></div><?php endif; ?>
    <?= $content ?? '' ?>
  </main>
</body>
</html>
