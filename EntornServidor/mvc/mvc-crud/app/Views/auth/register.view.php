<h1>Registrarse</h1>

<form method="post" action="/register">
    <input type="hidden" name="_csrf" value="<?= htmlspecialchars($csrf ?? '') ?>">
    
    <div>
        <label>Nombre de usuario</label><br>
        <input type="text" name="username" value="<?= htmlspecialchars($old['username'] ?? '') ?>" required>
        <?php if (!empty($errors['username'])): ?>
            <div class="error"><?= htmlspecialchars(implode(', ', $errors['username'])) ?></div>
        <?php endif; ?>
    </div>
    
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
    
    <div>
        <label>Confirmar contraseña</label><br>
        <input type="password" name="password_confirmation" required>
    </div>
    
    <button type="submit">Registrarse</button>
</form>

<p>¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a></p>