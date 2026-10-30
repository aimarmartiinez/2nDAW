<?php
?>
<h1><?= htmlspecialchars($title ?? 'Posts') ?></h1>
<?php foreach ($posts as $p): ?>
  <div class="card">
    <h3><a href="/posts/<?= (int)$p['id'] ?>"><?= htmlspecialchars($p['title']) ?></a></h3>
    <p><?= nl2br(htmlspecialchars($p['body'])) ?></p>
    <p><a href="/posts/<?= (int)$p['id'] ?>/edit">Editar</a></p>
    <form method="post" action="/posts/<?= (int)$p['id'] ?>/delete" onsubmit="return confirm('¿Eliminar?');">
      <input type="hidden" name="_csrf" value="<?= htmlspecialchars($this->request->csrfToken() ?? '') ?>">
      <button type="submit">Eliminar</button>
    </form>
  </div>
<?php endforeach; ?>
<?php if (empty($posts)): ?>
  <p>No hay posts.</p>
<?php endif; ?>
