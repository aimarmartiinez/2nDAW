<x-app-layout>
    <link rel="stylesheet" href="{{ asset('css/bookingStyles.css') }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <div class="booking-app">

        <!-- Stepper -->
        <div class="booking-stepper">
            <div class="step active" data-step="1"><i class="fas fa-calendar-alt"></i></div>
            <div class="step" data-step="2"><i class="fas fa-clock"></i></div>
            <div class="step" data-step="3"><i class="fas fa-tennis-ball">🎾</i></div>
            <div class="step" data-step="4"><i class="fas fa-check-circle"></i></div>
        </div>

        <form method="POST" action="{{ route('bookings.store') }}">
            <a href="{{ url('/home') }}" class="btn btn-secondary">Volver al inicio</a>

            @csrf
            <input type="hidden" name="club_id" value="{{ $club->id }}">
            <input type="hidden" name="court_id" id="court_id">
            <input type="hidden" name="start_time" id="start_time">
            <input type="hidden" name="end_time" id="end_time">

            <div class="booking-layout">

                <!-- Main Content -->
                <main class="booking-main">

                    <!-- Club Info -->
                    <section class="booking-section">
                        <div class="club-info">
                            <h2>{{ $club->name }}</h2>
                            <span>{{ $club->address ?? 'Reserva de pistas de pádel' }}</span>
                        </div>
                    </section>

                    <!-- Step 1: Fecha -->
                    <section class="booking-section" id="step-date">
                        <header>
                            <h2>Selecciona una fecha</h2>
                            <span>Calendario de disponibilidad</span>
                        </header>
                        <input type="date" class="booking-date" name="date" required>
                    </section>

                    <!-- Step 2: Hora -->
                    <section class="booking-section" id="step-hour" style="display:none;">
                        <header>
                            <h2>Selecciona franja horaria</h2>
                            <span>Solo horas con pistas libres</span>
                        </header>

                        <div class="time-slots" id="time-slots"></div>

                        <!-- Hora de fin (opcional) -->
                        <div class="end-time-wrapper" style="margin-top: 1rem; display:none;" id="end-time-wrapper">
                            <label for="end_time"><strong>Hora de fin (opcional)</strong></label>
                            <select id="end_time_select" class="booking-end-time">
                                <option value="">+1 hora (por defecto)</option>
                            </select>
                        </div>
                    </section>

                    <!-- Step 3: Pistas -->
                    <section class="booking-section" id="step-court" style="display:none;">
                        <header>
                            <h2>Pistas disponibles</h2>
                            <span>Selecciona una pista para continuar</span>
                        </header>
                        <div class="court-grid" id="court-grid">
                            @foreach($club->courts as $court)
                                <article class="court-card" data-court-id="{{ $court->id }}" data-price="{{ $court->price_per_hour }}">
                                    <h4>{{ $court->name }}</h4>
                                    <div class="court-meta">
                                        <span>{{ ucfirst($court->type) }}</span>
                                        <span class="court-price">{{ $court->price_per_hour }} €/h</span>
                                    </div>
                                </article>
                            @endforeach
                        </div>
                    </section>

                </main>

                <!-- Sidebar -->
                <aside class="booking-sidebar">
                    <h3>Resumen de reserva</h3>
                    <ul class="summary-list">
                        <li><span>Club</span><strong>{{ $club->name }}</strong></li>
                        <li><span>Fecha</span><strong id="summary-date">—</strong></li>
                        <li><span>Hora</span><strong id="summary-time">—</strong></li>
                        <li><span>Pista</span><strong id="summary-court">—</strong></li>
                        <li><span>Duración</span><strong></strong></li>
                    </ul>
                    <div class="summary-total">
                        <span>Total</span>
                        <strong id="summary-total">— €</strong>
                    </div>
                    <div class="sidebar-actions">
                        <button type="submit" class="btn-confirm" disabled>Confirmar reserva</button>
                    </div>
                </aside>

            </div>
        </form>
    </div>

    <script src="{{ asset('js/booking.js') }}"></script>
</x-app-layout>
