import '../styles/components/HowItWorksSection.css';

export default function HowItWorksSection() {
  return (
    <section className="how-it-works" id="how-it-works">
      <div className="container">
        <div className="section-title">
          <h2>Cómo funciona</h2>
          <p>Empieza en solo 4 pasos</p>
        </div>

        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Regístrate</h3>
            <p>Crea tu cuenta gratuitamente.</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Busca disponibilidad</h3>
            <p>Selecciona ubicación y horario.</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Selecciona tu pista</h3>
            <p>Elige la pista ideal para ti.</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Confirma la reserva</h3>
            <p>Pago seguro y confirmación inmediata.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
