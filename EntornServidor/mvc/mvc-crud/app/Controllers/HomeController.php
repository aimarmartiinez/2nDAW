<?php
namespace App\Controllers;
use Core\Controller;
use Core\Validator;
use App\Models\Post;
use App\Models\Author;
use App\Models\Comment;

class HomeController extends Controller {
    public function index(): void {
        $posts = Post::all();
        $flash = $this->request->takeFlash();
        $this->view('home.index', [
            'title' => 'Posts', 
            'posts' => $posts, 
            'flash' => $flash,
            'isLoggedIn' => isset($_SESSION['user']),
            'currentAuthorId' => $_SESSION['author_id'] ?? null
        ]);
    }

    public function create(): void {
        // Verificar autenticación
        if (!isset($_SESSION['user'])) {
            $this->request->flash('error', 'Debes iniciar sesión para crear posts');
            $this->response->redirect('/login');
            return;
        }
        
        $authors = Author::all();
        $this->view('home.form', [
            'title' => 'Crear post',
            'csrf'  => $this->request->csrfToken(),
            'old'   => $this->request->old(),
            'errors'=> $_SESSION['_errors'] ?? [],
            'authors' => $authors,
            'currentAuthorId' => $_SESSION['author_id'] ?? null
        ]);
        unset($_SESSION['_errors']);
    }

    public function store(): void {
        // Verificar autenticación
        if (!isset($_SESSION['user'])) {
            $this->request->flash('error', 'Debes iniciar sesión para crear posts');
            $this->response->redirect('/login');
            return;
        }
        
        $data = [
            'title' => trim((string)$this->request->input('title')), 
            'body' => trim((string)$this->request->input('body')),
            'author_id' => (int)$this->request->input('author_id') ?: ($_SESSION['author_id'] ?? 1)
        ];
        
        if (!$this->request->validateCsrf((string)$this->request->input('_csrf'))) { 
            $this->response->status(419)->send('CSRF inválido'); 
            return; 
        }
        
        $errors = Validator::make($data, [
            'title' => 'required|min:3|max:150', 
            'body' => 'required|min:5',
            'author_id' => 'required|numeric'
        ]);
        
        if ($errors) {
            $_SESSION['_errors'] = $errors;
            $this->request->flashOld($data);
            $this->response->redirect('/posts/create');
        } else {
            $id = Post::create($data);
            $this->request->flash('success', 'Post creado correctamente.');
            $this->response->redirect('/');
        }
    }

    public function edit(string $id): void {
        // Verificar autenticación
        if (!isset($_SESSION['user'])) {
            $this->request->flash('error', 'Debes iniciar sesión para editar posts');
            $this->response->redirect('/login');
            return;
        }
        
        $post = Post::find((int)$id);
        if (!$post) { 
            $this->response->status(404)->send('No encontrado'); 
            return; 
        }
        
        // Verificar que el usuario es el autor o tiene permisos
        $currentAuthorId = $_SESSION['author_id'] ?? null;
        if ($currentAuthorId && $post['author_id'] != $currentAuthorId) {
            $this->request->flash('error', 'No tienes permisos para editar este post');
            $this->response->redirect('/');
            return;
        }
        
        $authors = Author::all();
        $this->view('home.form', [
            'title' => 'Editar post',
            'csrf'  => $this->request->csrfToken(),
            'post'  => $post,
            'old'   => $this->request->old(),
            'errors'=> $_SESSION['_errors'] ?? [],
            'authors' => $authors
        ]);
        unset($_SESSION['_errors']);
    }

    public function update(string $id): void {
        // Verificar autenticación
        if (!isset($_SESSION['user'])) {
            $this->request->flash('error', 'Debes iniciar sesión para editar posts');
            $this->response->redirect('/login');
            return;
        }
        
        if (!$this->request->validateCsrf((string)$this->request->input('_csrf'))) { 
            $this->response->status(419)->send('CSRF inválido'); 
            return; 
        }
        
        // Verificar que el post existe y pertenece al usuario
        $post = Post::find((int)$id);
        if (!$post) {
            $this->response->status(404)->send('No encontrado');
            return;
        }
        
        $currentAuthorId = $_SESSION['author_id'] ?? null;
        if ($currentAuthorId && $post['author_id'] != $currentAuthorId) {
            $this->request->flash('error', 'No tienes permisos para editar este post');
            $this->response->redirect('/');
            return;
        }
        
        $data = [
            'title' => trim((string)$this->request->input('title')), 
            'body' => trim((string)$this->request->input('body')),
            'author_id' => (int)$this->request->input('author_id') ?: $post['author_id']
        ];
        
        $errors = Validator::make($data, [
            'title' => 'required|min:3|max:150', 
            'body' => 'required|min:5',
            'author_id' => 'required|numeric'
        ]);
        
        if ($errors) {
            $_SESSION['_errors'] = $errors;
            $this->request->flashOld($data);
            $this->response->redirect('/posts/' . $id . '/edit');
        } else {
            Post::updateById((int)$id, $data);
            $this->request->flash('success', 'Post actualizado.');
            $this->response->redirect('/');
        }
    }

    public function destroy(string $id): void {
        // Verificar autenticación
        if (!isset($_SESSION['user'])) {
            $this->request->flash('error', 'Debes iniciar sesión para eliminar posts');
            $this->response->redirect('/login');
            return;
        }
        
        if (!$this->request->validateCsrf((string)$this->request->input('_csrf'))) { 
            $this->response->status(419)->send('CSRF inválido'); 
            return; 
        }
        
        // Verificar que el post existe y pertenece al usuario
        $post = Post::find((int)$id);
        if (!$post) {
            $this->response->status(404)->send('No encontrado');
            return;
        }
        
        $currentAuthorId = $_SESSION['author_id'] ?? null;
        if ($currentAuthorId && $post['author_id'] != $currentAuthorId) {
            $this->request->flash('error', 'No tienes permisos para eliminar este post');
            $this->response->redirect('/');
            return;
        }
        
        Post::deleteById((int)$id);
        
        // También eliminar comentarios asociados
        $comments = Comment::findByPostId((int)$id);
        foreach ($comments as $comment) {
            Comment::deleteById($comment['id']);
        }
        
        $this->request->flash('success', 'Post eliminado.');
        $this->response->redirect('/');
    }

    public function show(string $id): void {
        $post = Post::find((int)$id);
        if (!$post) { 
            $this->response->status(404)->send('No encontrado'); 
            return; 
        }
        
        // Obtener autor del post
        $author = Author::find($post['author_id'] ?? 0);
        if ($author) {
            $post['author_name'] = $author['name'];
            $post['author_bio'] = $author['bio'] ?? '';
        }
        
        // Obtener comentarios del post
        $comments = Comment::findByPostId((int)$id);
        
        $this->view('home.show', [
            'title' => "Post #{$id}",
            'post' => $post,
            'comments' => $comments,
            'isLoggedIn' => isset($_SESSION['user']),
            'currentUser' => $_SESSION['user'] ?? null,
            'csrf' => $this->request->csrfToken()
        ]);
    }
}