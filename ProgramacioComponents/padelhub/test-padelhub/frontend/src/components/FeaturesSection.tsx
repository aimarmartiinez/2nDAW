import '../styles/components/FeaturesSection.css';

export default function FeaturesSection() {
  return (
    <section className="features" id="features">
      <div className="container">
        <div className="section-title">
          <h2>Características <span className="highlight">principales</span></h2>
          <p>Descubre todo lo que PadelHub ofrece para mejorar tu experiencia</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon"><i className="fas fa-calendar-check"></i></div>
            <h3>Reserva Rápida</h3>
            <p>Encuentra y reserva pistas en tiempo real.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon"><i className="fas fa-search-location"></i></div>
            <h3>Búsqueda Inteligente</h3>
            <p>Filtra por ubicación, fecha y tipo de pista.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon"><i className="fas fa-club"></i></div>
            <h3>Gestión para Clubes</h3>
            <p>Panel de administración completo para clubes.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
