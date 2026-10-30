<x-app-layout>
    <link rel="stylesheet" href="{{ asset('css/homeStyles.css') }}">

    <div class="full-width">

        <section class="hero">
            <h1>Reserva tu Pista</h1>
            <p>Encuentra el club perfecto para tu próximo partido</p>

            <div class="search-box">
                <input type="text" placeholder="Buscar por ubicación, club..." />
            </div>

            <div class="filters">
                <div class="filter active">Todos</div>
                <div class="filter">Interior</div>
                <div class="filter">Exterior</div>
            </div>
        </section>

        <div class="container">
            <div class="header-list">
                <span><strong>{{ $clubs->count() }}</strong> clubes disponibles</span>
                <select>
                    <option>Recomendados</option>
                    <option>Precio más bajo</option>
                    <option>Precio más alto</option>
                </select>
            </div>

            <div class="grid">
                @foreach($clubs as $club)
                    <div class="card">
                        <div class="card-img">
                            <div class="badge">{{ ucfirst($club->city) }}</div>

                            @foreach ($club->images as $index => $image)
                                <img
                                    src="{{ $image }}"
                                    class="carousel-image {{ $index === 0 ? 'active' : '' }}"
                                >
                            @endforeach
                        </div>

                        <div class="card-body">
                            <h3>{{ $club->name }}</h3>
                            <div class="location">
                                {{ $club->address }} · {{ $club->city }}
                            </div>

                            <div class="card-footer">
                                <div class="price">
                                    <p class="text-muted">Desde</p>

                                    <strong>
                                        {{ rtrim(rtrim(sprintf('%.2f', $club->courts->min('price_per_hour')), '0'), '.') }}€ /hora
                                    </strong>
                                </div>

                                <form method="GET" action="{{ route('bookings.create', $club) }}">
                                    <button type="submit" class="btn">Reservar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>

    </div>
</x-app-layout>
