<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'PadelHub') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    <!-- Scripts -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <link rel="stylesheet" href="{{ asset('css/publiclayoutStyles.css') }}" />
</head>

<body>

    {{-- HEADER PUBLICO --}}
    <header>
        <div class="container-header">

            {{-- Logo --}}
            <div class="logo-container">
                <div class="logo-icon">
                    <img src="{{ asset('img/icon-logo.png') }}" alt="Logo PadelHub" />
                </div>
                <div class="logo-text">
                    <a href="{{ route('landing') }}">
                        <span class="logo-padel">Padel</span><span class="logo-hub">Hub</span>
                    </a>
                </div>
            </div>

            {{-- Zona derecha --}}
            <div class="header-right">

                @auth
                    {{-- Bookings --}}
                    <a class="bookings-link" href="{{ route('mybookings') }}">📅</a>

                    {{-- Notificaciones --}}
                    <button class="notifications-btn" title="Notificaciones">🔔</button>

                    {{-- Usuario --}}
                    <div class="user-dropdown">
                        <div class="user-trigger">
                            <img class="user-avatar" src="https://ui-avatars.com/api/?name={{ auth()->user()->name }}">
                        </div>

                        {{-- Dropdown --}}
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="#">Mi perfil</a>
                            <a class="dropdown-item" href="{{ route('mybookings') }}">
                                Mis reservas
                            </a>
                            <form method="POST" action="{{ route('logout') }}">
                                @csrf
                                <button type="submit" class="logout-btn">Cerrar sesión</button>
                            </form>
                        </div>
                    </div>
                @endauth

                @guest
                    <div class="auth-links">
                        <a class="login-link" href="{{ route('login') }}">Login</a>
                        <a class="register-btn" href="{{ route('register') }}">Registrarse</a>
                    </div>
                @endguest

            </div>
        </div>
    </header>


    {{-- Page Heading (opcional, Breeze) --}}
    @isset($header)
        <header>
            <div>
                {{ $header }}
            </div>
        </header>
    @endisset

    {{-- CONTENIDO --}}
    <main>
        {{ $slot }}
    </main>

</body>
</html>
