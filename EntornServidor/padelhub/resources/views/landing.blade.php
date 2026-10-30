<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PadelHub - Reserva de Pistas de Pádel en Vallès Occidental</title>

    <!-- CDN -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Montserrat:wght@600;700;800&display=swap" rel="stylesheet" />
    <link rel="shortcut icon" href="{{ asset('img/brand-logo.png') }}" type="image/png">
    <link rel="icon" href="{{ asset('img/brand-logo.png') }}" type="image/png">
    <link rel="stylesheet" href="{{ asset('css/landingStyles.css') }}" />
</head>
<body>
    <header>
        <div class="container">
            <nav class="navbar">
                <div class="logo">
                    <div class="logo-icon">
                        <img class="fas fa-tennis-ball" src="{{ asset('img/icon-logo.png') }}" alt="Logo PadelHub" />
                    </div>
                    <div class="logo-text">Padel<span class="highlight">Hub</span></div>
                </div>
                <ul class="nav-links">
                    <li><a href="#hero">Inicio</a></li>
                    <li><a href="#features">Características</a></li>
                    <li><a href="#how-it-works">Cómo funciona</a></li>
                    <li><a href="#users">Para usuarios</a></li>
                    <li><a href="#values">Valores</a></li>
                    <li><a href="{{ route('login') }}" class="btn btn-primary">Iniciar Sesión</a></li> <!--Enviaremos al login comun en vez de solo al panel de admin-->
                </ul>
                <button class="mobile-menu-btn"><i class="fas fa-bars"></i></button>
            </nav>
        </div>
    </header>

    <!-- HERO SECTION -->
    <section class="hero" id="hero">
        <div class="container">
            <div class="hero-content">
                <div class="hero-text">
                    <h1>Reserva tu pista en el <span class="highlight">Vallès Occidental</span></h1>
                    <p>
                        PadelHub conecta jugadores con clubes de pádel de la región, simplificando la reserva de pistas y optimizando la gestión para clubes.
                    </p>
                    <div class="cta-buttons">
                        <a href="{{ route('home')}}" class="btn btn-primary">Reservar una pista</a>
                        <a href="#users" class="btn btn-secondary">Para clubes</a>
                    </div>
                </div>

                <div class="hero-image">
                    <div class="hero-preview">
                        <i class="fas fa-tablet-screen-button preview-icon"></i>
                        <p>Interfaz moderna e intuitiva<br />Vista previa del panel de reservas</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- FEATURES -->
    <section class="features" id="features">
        <div class="container">
            <div class="section-title">
                <h2>Características <span class="highlight">principales</span></h2>
                <p>Descubre todo lo que PadelHub ofrece para mejorar tu experiencia</p>
            </div>

            <div class="features-grid">
                <div class="feature-card">
                    <div class="feature-icon"><i class="fas fa-calendar-check"></i></div>
                    <h3>Reserva Rápida</h3>
                    <p>Encuentra y reserva pistas en tiempo real.</p>
                </div>

                <div class="feature-card">
                    <div class="feature-icon"><i class="fas fa-search-location"></i></div>
                    <h3>Búsqueda Inteligente</h3>
                    <p>Filtra por ubicación, fecha y tipo de pista.</p>
                </div>

                <div class="feature-card">
                    <div class="feature-icon"><i class="fas fa-club"></i></div>
                    <h3>Gestión para Clubes</h3>
                    <p>Panel de administración completo para clubes.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- HOW IT WORKS -->
    <section class="how-it-works" id="how-it-works">
        <div class="container">
            <div class="section-title">
                <h2>Cómo funciona</h2>
                <p>Empieza en solo 4 pasos</p>
            </div>

            <div class="steps">
                <div class="step">
                    <div class="step-number">1</div>
                    <h3>Regístrate</h3>
                    <p>Crea tu cuenta gratuitamente.</p>
                </div>

                <div class="step">
                    <div class="step-number">2</div>
                    <h3>Busca disponibilidad</h3>
                    <p>Selecciona ubicación y horario.</p>
                </div>

                <div class="step">
                    <div class="step-number">3</div>
                    <h3>Selecciona tu pista</h3>
                    <p>Elige la pista ideal para ti.</p>
                </div>

                <div class="step">
                    <div class="step-number">4</div>
                    <h3>Confirma la reserva</h3>
                    <p>Pago seguro y confirmación inmediata.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- USERS -->
    <section class="user-types" id="users">
        <div class="container">
            <div class="section-title">
                <h2>Diseñado para todos</h2>
                <p>Soluciones adaptadas a cada tipo de usuario</p>
            </div>

            <div class="user-cards">
                <div class="user-card">
                    <div class="user-header user-1"><h3>Para Jugadores</h3></div>
                    <div class="user-body">
                        <p>Reserva pistas de forma fácil.</p>
                        <ul class="user-features">
                            <li>Disponibilidad en tiempo real</li>
                            <li>Confirmación inmediata</li>
                            <li>Panel de reservas</li>
                            <li>Promociones exclusivas</li>
                            <li>Historial de reservas</li>
                        </ul>
                    </div>
                </div>

                <div class="user-card">
                    <div class="user-header user-2"><h3>Para Clubes</h3></div>
                    <div class="user-body">
                        <p>Optimiza la gestión de tus pistas.</p>
                        <ul class="user-features">
                            <li>Gestión de horarios</li>
                            <li>Reservas en tiempo real</li>
                            <li>Informes de uso</li>
                            <li>Promociones configurables</li>
                            <li>Mayor visibilidad</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- VALUES -->
    <section class="values" id="values">
        <div class="container">
            <div class="section-title values-title-fixed">
                <h2>Nuestros Valores</h2>
                <p>Principios que guían nuestro servicio</p>
            </div>

            <div class="values-grid">
                <div class="value-item">
                    <div class="value-icon"><i class="fas fa-lightbulb"></i></div>
                    <h3>Innovación</h3>
                    <p>Digitalizamos el pádel con tecnología moderna.</p>
                </div>

                <div class="value-item">
                    <div class="value-icon"><i class="fas fa-bolt"></i></div>
                    <h3>Simplicidad</h3>
                    <p>Experiencia clara y accesible.</p>
                </div>

                <div class="value-item">
                    <div class="value-icon"><i class="fas fa-handshake"></i></div>
                    <h3>Compromiso Local</h3>
                    <p>Colaboración con clubes del Vallès Occidental.</p>
                </div>

                <div class="value-item">
                    <div class="value-icon"><i class="fas fa-eye"></i></div>
                    <h3>Transparencia</h3>
                    <p>Información clara en todo momento.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA -->
    <section class="cta-section" id="cta">
        <div class="container">
            <h2>Únete a PadelHub</h2>
            <p>Más de 50 clubes ya confían en nosotros.</p>
            <div class="cta-buttons center">
                <a href="{{ route('login') }}" class="btn btn-primary">Iniciar Sesión</a>
                <a href="#users" class="btn btn-secondary white-border">Información para clubes</a>
            </div>
        </div>
    </section>

    <!-- PREMIUM FOOTER -->
    <footer>
        <div class="container premium-footer">
            <div class="footer-col">
                <h3 class="footer-logo">PadelHub</h3>
                <p>La plataforma líder en reservas de pádel en el Vallès Occidental.</p>
                <div class="footer-social">
                    <a href="#"><i class="fab fa-facebook"></i></a>
                    <a href="#"><i class="fab fa-instagram"></i></a>
                    <a href="#"><i class="fab fa-twitter"></i></a>
                    <a href="#"><i class="fab fa-linkedin"></i></a>
                </div>
            </div>

            <div class="footer-col">
                <h4>Enlaces</h4>
                <ul>
                    <li><a href="#">Inicio</a></li>
                    <li><a href="#features">Características</a></li>
                    <li><a href="#users">Usuarios</a></li>
                    <li><a href="#cta">Comenzar</a></li>
                </ul>
            </div>

            <div class="footer-col">
                <h4>Legal</h4>
                <ul>
                    <li><a href="#">Términos</a></li>
                    <li><a href="#">Privacidad</a></li>
                    <li><a href="#">Aviso Legal</a></li>
                </ul>
            </div>

            <div class="footer-col">
                <h4>Contacto</h4>
                <ul>
                    <li><i class="fas fa-map-marker-alt"></i> Vallès Occidental</li>
                    <li><i class="fas fa-envelope"></i> info@padelhub.com</li>
                    <li><i class="fas fa-phone"></i> +34 123 456 789</li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">© 2025 PadelHub</div>
    </footer>

    <!-- TU JS -->
    <script src="{{ asset('js/landing.js') }}"></script>
</body>
</html>
