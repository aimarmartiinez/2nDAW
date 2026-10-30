import '../styles/components/UserTypesSection.css';

export default function UserTypesSection() {
  return (
    <section className="user-types" id="users">
      <div className="container">
        <div className="section-title">
          <h2>Diseñado para todos</h2>
          <p>Soluciones adaptadas a cada tipo de usuario</p>
        </div>

        <div className="user-cards">
          <div className="user-card">
            <div className="user-header user-1"><h3>Para Jugadores</h3></div>
            <div className="user-body">
              <p>Reserva pistas de forma fácil.</p>
              <ul className="user-features">
                <li>Disponibilidad en tiempo real</li>
                <li>Confirmación inmediata</li>
                <li>Panel de reservas</li>
                <li>Promociones exclusivas</li>
                <li>Historial de reservas</li>
              </ul>
            </div>
          </div>

          <div className="user-card">
            <div className="user-header user-2"><h3>Para Clubes</h3></div>
            <div className="user-body">
              <p>Optimiza la gestión de tus pistas.</p>
              <ul className="user-features">
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
  );
}
