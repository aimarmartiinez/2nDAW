import { Link } from 'react-router-dom';
import '../styles/components/HeroSection.css';

export default function HeroSection() {
  return (
    <section className="landing-hero" id="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Reserva tu pista en el <span className="highlight">Vallès Occidental</span></h1>
            <p>
              PadelHub conecta jugadores con clubes de pádel de la región, simplificando la reserva de pistas y optimizando la gestión para clubes.
            </p>
            <div className="cta-buttons">
              <Link to="/" className="btn btn-primary">Empieza a Jugar Ahora</Link>
              <a href="#users" className="btn btn-secondary">Para clubes</a>
            </div>
          </div>

          <div className="hero-image">
            <div className="hero-preview">
              <i className="fas fa-tablet-screen-button preview-icon"></i>
              <p>Interfaz moderna e intuitiva<br />Vista previa del panel de reservas</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
