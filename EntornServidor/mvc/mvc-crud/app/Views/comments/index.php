<?php
?>
<h1><?= htmlspecialchars($title ?? 'Comments') ?></h1>
<?php foreach ($comments as $p): ?>
  <div class="card">
    <h3><a href="/comments/<?= (int)$p['id'] ?>"><?= htmlspecialchars($p['title']) ?></a></h3>
    <p><?= nl2br(htmlspecialchars($p['body'])) ?></p>
    <p><?= nl2br(htmlspecialchars($p['author'])) ?></p>
    <p><?= nl2br(htmlspecialchars($p['created_at'])) ?></p>
    <p><?= nl2br(htmlspecialchars($p['updated_at'])) ?></p>
    <p><a href="/comments/<?= (int)$p['id'] ?>/edit">Editar</a></p>
    <form method="comment" action="/comments/<?= (int)$p['id'] ?>/delete" onsubmit="return confirm('¿Eliminar?');">
      <input type="hidden" name="_csrf" value="<?= htmlspecialchars($this->request->csrfToken() ?? '') ?>">
      <button type="submit">Eliminar</button>
    </form>
  </div>
<?php endforeach; ?>
<?php if (empty($comments)): ?>
  <p>No hay comments.</p>
<?php endif; ?>