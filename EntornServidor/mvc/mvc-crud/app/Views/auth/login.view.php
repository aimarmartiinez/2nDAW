<h1>Iniciar sesión</h1>

<?php if (!empty($flash['error'])): ?>
    <div class="flash error"><?= htmlspecialchars($flash['error']) ?></div>
<?php endif; ?>

<form method="post" action="/login">
    <input type="hidden" name="_csrf" value="<?= htmlspecialchars($csrf ?? '') ?>">
    
    <div>
        <label>Email</label><br>
        <input type="email" name="email" value="<?= htmlspecialchars($old['email'] ?? '') ?>" required>
        <?php if (!empty($errors['email'])): ?>
            <div class="error"><?= htmlspecialchars(implode(', ', $errors['email'])) ?></div>
        <?php endif; ?>
    </div>
    
    <div>
        <label>Contraseña</label><br>
        <input type="password" name="password" required>
        <?php if (!empty($errors['password'])): ?>
            <div class="error"><?= htmlspecialchars(implode(', ', $errors['password'])) ?></div>
        <?php endif; ?>
    </div>
    
    <button type="submit">Iniciar sesión</button>
</form>

<p>¿No tienes cuenta? <a href="/register">Regístrate aquí</a></p>