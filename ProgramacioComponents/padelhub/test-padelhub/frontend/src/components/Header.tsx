import { Link } from 'react-router-dom';
import '../styles/components/Header.css';

export default function Header() {
  return (
    <header className="landing-header">
      <div className="container">
        <nav className="navbar">
          <Link to="/" className="logo">
            <div className="logo-icon">
              <img src="/img/icon-logo.png" alt="Logo PadelHub" />
            </div>
            <div className="logo-text">Padel<span className="highlight">Hub</span></div>
          </Link>
          <ul className="nav-links">
            <li><a href="#hero">Inicio</a></li>
            <li><a href="#features">Características</a></li>
            <li><a href="#how-it-works">Cómo funciona</a></li>
            <li><a href="#users">Para usuarios</a></li>
            <li><a href="#values">Valores</a></li>
            <li><Link to="/login" className="btn btn-primary">Iniciar Sesión</Link></li>
          </ul>
          <button className="mobile-menu-btn"><i className="fas fa-bars"></i></button>
        </nav>
      </div>
    </header>
  );
}
