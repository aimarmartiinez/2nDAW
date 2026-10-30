import '../styles/components/ValuesSection.css';

export default function ValuesSection() {
  return (
    <section className="values" id="values">
      <div className="container">
        <div className="section-title values-title-fixed">
          <h2>Nuestros Valores</h2>
          <p>Principios que guían nuestro servicio</p>
        </div>

        <div className="values-grid">
          <div className="value-item">
            <div className="value-icon"><i className="fas fa-lightbulb"></i></div>
            <h3>Innovación</h3>
            <p>Digitalizamos el pádel con tecnología moderna.</p>
          </div>
          <div className="value-item">
            <div className="value-icon"><i className="fas fa-bolt"></i></div>
            <h3>Simplicidad</h3>
            <p>Experiencia clara y accesible.</p>
          </div>
          <div className="value-item">
            <div className="value-icon"><i className="fas fa-handshake"></i></div>
            <h3>Compromiso Local</h3>
            <p>Colaboración con clubes del Vallès Occidental.</p>
          </div>
          <div className="value-item">
            <div className="value-icon"><i className="fas fa-eye"></i></div>
            <h3>Transparencia</h3>
            <p>Información clara en todo momento.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
