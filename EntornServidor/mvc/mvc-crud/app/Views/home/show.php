<h1>#<?= (int)$post['id'] ?> — <?= htmlspecialchars($post['title']) ?></h1>
<p><strong>Autor:</strong> <?= htmlspecialchars($post['author_name'] ?? 'Anónimo') ?></p>
<?php if (!empty($post['author_bio'])): ?>
    <p><em><?= htmlspecialchars($post['author_bio']) ?></em></p>
<?php endif; ?>
<hr>
<p><?= nl2br(htmlspecialchars($post['body'])) ?></p>

<h3>Comentarios</h3>
<?php if (empty($comments)): ?>
    <p>No hay comentarios aún.</p>
<?php else: ?>
    <?php foreach ($comments as $comment): ?>
        <div class="card" style="margin-left: 20px; border-left: 3px solid #ccc; padding-left: 10px;">
            <p><strong><?= htmlspecialchars($comment['author'] ?? 'Anónimo') ?></strong></p>
            <p><?= htmlspecialchars($comment['body']) ?></p>
            <small><?= htmlspecialchars($comment['created_at']) ?></small>
        </div>
    <?php endforeach; ?>
<?php endif; ?>

<?php if ($isLoggedIn): ?>
    <hr>
    <h4>Añadir comentario</h4>
    <form method="post" action="/comments">
        <input type="hidden" name="_csrf" value="<?= htmlspecialchars($this->request->csrfToken() ?? '') ?>">
        <input type="hidden" name="post_id" value="<?= (int)$post['id'] ?>">
        
        <div>
            <label>Tu nombre</label><br>
            <input type="text" name="author" value="<?= htmlspecialchars($_SESSION['user']['username'] ?? '') ?>">
        </div>
        
        <div>
            <label>Comentario</label><br>
            <textarea name="body" rows="3" required></textarea>
        </div>
        
        <button type="submit">Publicar comentario</button>
    </form>
<?php else: ?>
    <p><a href="/login">Inicia sesión</a> para comentar.</p>
<?php endif; ?>

<p><a href="/">← Volver</a></p>