import { Link } from 'react-router-dom';
import '../styles/components/CTASection.css';

export default function CTASection() {
  return (
    <section className="cta-section" id="cta">
      <div className="container">
        <h2>Únete a PadelHub</h2>
        <p>Más de 50 clubes ya confían en nosotros.</p>
        <div className="cta-buttons center">
          <Link to="/login" className="btn btn-primary">Iniciar Sesión</Link>
          <a href="#users" className="btn btn-secondary white-border">Información para clubes</a>
        </div>
      </div>
    </section>
  );
}
