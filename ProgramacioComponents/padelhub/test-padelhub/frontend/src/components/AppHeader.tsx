import { Link } from 'react-router-dom';
import '../styles/components/AppHeader.css';

interface AppHeaderProps {
  userName?: string;
}

export default function AppHeader({ userName = 'Usuario' }: AppHeaderProps) {
  return (
    <header className="app-header">
      <div className="container-header">
        <div className="logo-container">
          <div className="logo-icon-app">
            <img src="/img/icon-logo.png" alt="Logo PadelHub" />
          </div>
          <div className="logo-text-app">
            <Link to="/">
              <span className="logo-padel">Padel</span>
              <span className="logo-hub">Hub</span>
            </Link>
          </div>
        </div>

        <div className="header-right">
          <Link className="bookings-link" to="/mis-reservas">📅</Link>
          <button className="notifications-btn" title="Notificaciones">🔔</button>

          <div className="user-dropdown">
            <div className="user-trigger">
              <img
                className="user-avatar"
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}`}
                alt={userName}
              />
            </div>

            <div className="dropdown-menu">
              <Link className="dropdown-item" to="#">Mi perfil</Link>
              <Link className="dropdown-item" to="/mis-reservas">Mis reservas</Link>
              <button className="logout-btn">Cerrar sesión</button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
