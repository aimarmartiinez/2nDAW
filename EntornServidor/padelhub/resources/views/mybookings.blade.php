<x-app-layout>
    <link rel="stylesheet" href="{{ asset('css/myBookingsStyles.css') }}">

    <div class="main-content">
        <div class="page-header">
            <div class="header-content">
                <h1 class="page-title"><i class="fas fa-calendar-check"></i> Mis Reservas</h1>
                <p class="page-subtitle">Gestiona y revisa todas tus reservas activas</p>
            </div>
            <a href="{{ route('home') }}" class="btn btn-primary">
                <i class="fas fa-plus-circle"></i> Nueva Reserva
            </a>
        </div>

        @if($bookings->isEmpty())
            <div class="empty-state">
                <i class="fas fa-calendar-times fa-3x" style="color: #9ca3af; margin-bottom: 1rem;"></i>
                <p>No tienes reservas todavía</p>
                <a href="{{ route('home') }}" class="btn btn-primary">
                    <i class="fas fa-tennis-ball"></i> Hacer mi primera reserva
                </a>
            </div>
        @else
            <div class="bookings-list">
                @foreach($bookings as $booking)
                    <div class="booking-card booking-card--{{ $booking->status }}">
                        <div class="booking-header">
                            <h3>
                                <i class="fas fa-map-marker-alt icon-location"></i>
                                {{ $booking->court->club->name }}
                            </h3>
                            <span class="badge badge--{{ $booking->status }}">
                                @if($booking->status == 'confirmed')
                                    <i class="fas fa-check-circle"></i>
                                @elseif($booking->status == 'pending')
                                    <i class="fas fa-clock"></i>
                                @elseif($booking->status == 'canceled')
                                    <i class="fas fa-times-circle"></i>
                                @endif
                                {{ ucfirst($booking->status) }}
                            </span>
                        </div>
                        <div class="booking-body">
                            <p>
                                <strong>🎾Pista:</strong> {{ $booking->court->name }}
                            </p>
                            <p>
                                <i class="fas fa-calendar-alt icon-calendar"></i>
                                <strong>Fecha:</strong> {{ \Carbon\Carbon::parse($booking->date)->format('d/m/Y') }}
                            </p>
                            <p>
                                <i class="fas fa-clock icon-clock"></i>
                                <strong>Horario:</strong> {{ $booking->start_time }} – {{ $booking->end_time }}
                            </p>
                            <p>
                                <i class="fas fa-euro-sign icon-price"></i>
                                <strong>Total:</strong> {{ number_format($booking->total_price, 2) }} €
                            </p>
                        </div>
                    </div>
                @endforeach
            </div>
        @endif
    </div>
</x-app-layout>