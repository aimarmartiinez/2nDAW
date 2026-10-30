<?php

namespace App\Controllers;

use Core\Controller;
use App\Models\Comment;
use App\Models\Post;

class CommentController extends Controller
{
    /**
     * Guardar un nuevo comentario asociado a un post
     */
    public function store(): void
    {
        // Validación CSRF
        if (!$this->request->validateCsrf((string)$this->request->input('_csrf'))) {
            $this->response->status(419)->send('CSRF inválido');
            return;
        }

        $postId = (int)$this->request->input('post_id');
        $author = trim((string)$this->request->input('author'));
        $body = trim((string)$this->request->input('body'));

        // Validación simple
        $errors = [];
        if ($author === '') $errors['author'] = ['El nombre es obligatorio.'];
        if ($body === '') $errors['body'] = ['El comentario no puede estar vacío.'];

        if (!empty($errors)) {
            $_SESSION['_errors'] = $errors;
            $this->request->flashOld([
                'author' => $author,
                'body' => $body
            ]);
            $this->response->redirect("/post?id={$postId}");
            return;
        }

        // Crear comentario
        Comment::create([
            'post_id' => $postId,
            'author' => $author,
            'body' => $body
        ]);

        $this->request->flash('success', 'Comentario publicado correctamente.');
        $this->response->redirect("/post?id={$postId}");
    }

    public function destroy(string $id): void
    {
        if (!$this->request->validateCsrf((string)$this->request->input('_csrf'))) {
            $this->response->status(419)->send('CSRF inválido');
            return;
        }

        Comment::deleteById((int)$id);
        $this->request->flash('success', 'Comentario eliminado.');
        $this->response->redirect('/comments');
    }
}
