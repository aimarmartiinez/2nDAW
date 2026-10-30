import '../styles/components/Footer.css';

export default function Footer() {
  return (
    <footer>
      <div className="container premium-footer">
        <div className="footer-col">
          <h3 className="footer-logo">PadelHub</h3>
          <p>La plataforma líder en reservas de pádel en el Vallès Occidental.</p>
          <div className="footer-social">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-linkedin"></i></a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Enlaces</h4>
          <ul>
            <li><a href="#">Inicio</a></li>
            <li><a href="#features">Características</a></li>
            <li><a href="#users">Usuarios</a></li>
            <li><a href="#cta">Comenzar</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Legal</h4>
          <ul>
            <li><a href="#">Términos</a></li>
            <li><a href="#">Privacidad</a></li>
            <li><a href="#">Aviso Legal</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contacto</h4>
          <ul>
            <li><i className="fas fa-map-marker-alt"></i> Vallès Occidental</li>
            <li><i className="fas fa-envelope"></i> info@padelhub.com</li>
            <li><i className="fas fa-phone"></i> +34 123 456 789</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">© 2025 PadelHub</div>
    </footer>
  );
}
