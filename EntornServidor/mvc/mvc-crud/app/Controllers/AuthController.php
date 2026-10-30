<?php

namespace App\Controllers;

use Core\Controller;
use Core\Validator;
use App\Models\User;
use App\Models\Author;

class AuthController extends Controller
{
    public function showLogin(): void
    {
        $this->view('auth.login', [
            'title' => 'Iniciar sesión',
            'csrf' => $this->request->csrfToken(),
            'errors' => $_SESSION['_errors'] ?? [],
            'old' => $this->request->old()
        ]);
        unset($_SESSION['_errors']);
    }

    public function login(): void
    {
        if (!$this->request->validateCsrf((string)$this->request->input('_csrf'))) {
            $this->response->status(419)->send('CSRF inválido');
            return;
        }

        $data = [
            'email' => trim((string)$this->request->input('email')),
            'password' => (string)$this->request->input('password')
        ];

        $errors = Validator::make($data, [
            'email' => 'required|email',
            'password' => 'required|min:6'
        ]);

        if ($errors) {
            $_SESSION['_errors'] = $errors;
            $this->request->flashOld($data);
            $this->response->redirect('/login');
            return;
        }

        $user = User::verifyPassword($data['email'], $data['password']);
        
        if ($user) {
            $_SESSION['user'] = $user;
            
            // Verificar si el usuario tiene un autor asociado
            $author = Author::findByUserId($user['id']);
            if ($author) {
                $_SESSION['author_id'] = $author['id'];
            }
            
            $this->request->flash('success', '¡Bienvenido ' . $user['username'] . '!');
            $this->response->redirect('/');
        } else {
            $this->request->flash('error', 'Credenciales incorrectas');
            $this->response->redirect('/login');
        }
    }

    public function showRegister(): void
    {
        $this->view('auth.register', [
            'title' => 'Registrarse',
            'csrf' => $this->request->csrfToken(),
            'errors' => $_SESSION['_errors'] ?? [],
            'old' => $this->request->old()
        ]);
        unset($_SESSION['_errors']);
    }

    public function register(): void
    {
        if (!$this->request->validateCsrf((string)$this->request->input('_csrf'))) {
            $this->response->status(419)->send('CSRF inválido');
            return;
        }

        $data = [
            'username' => trim((string)$this->request->input('username')),
            'email' => trim((string)$this->request->input('email')),
            'password' => (string)$this->request->input('password'),
            'password_confirmation' => (string)$this->request->input('password_confirmation')
        ];

        $errors = Validator::make($data, [
            'username' => 'required|min:3|max:50',
            'email' => 'required|email',
            'password' => 'required|min:6|confirmed'
        ]);

        // Verificar si el email ya existe
        if (User::findByEmail($data['email'])) {
            $errors['email'] = ['El email ya está registrado'];
        }

        if ($errors) {
            $_SESSION['_errors'] = $errors;
            $this->request->flashOld($data);
            $this->response->redirect('/register');
            return;
        }

        // Crear usuario
        $userId = User::create([
            'username' => $data['username'],
            'email' => $data['email'],
            'password' => $data['password']
        ]);

        // Crear autor automáticamente
        $authorId = Author::create([
            'user_id' => $userId,
            'name' => $data['username']
        ]);

        // Iniciar sesión automáticamente
        $user = User::findByEmail($data['email']);
        unset($user['password']);
        $_SESSION['user'] = $user;
        $_SESSION['author_id'] = $authorId;

        $this->request->flash('success', '¡Registro exitoso! Ahora puedes crear posts.');
        $this->response->redirect('/');
    }

    public function logout(): void
    {
        session_destroy();
        $this->response->redirect('/');
    }
}