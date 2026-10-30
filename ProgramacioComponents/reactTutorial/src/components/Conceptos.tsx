import './Conceptos.css';

export default function Conceptos() {
  return (
    <div className="conceptos">
      <h2>Conceptos Básicos de React</h2>
      <p>React es una biblioteca de JavaScript para construir interfaces de usuario.</p>
      <ul>
        <li><strong>Componentes:</strong> Bloques reutilizables de UI.</li>
        <li><strong>JSX:</strong> Sintaxis para escribir HTML en JavaScript.</li>
        <li><strong>Estado:</strong> Datos que cambian en el tiempo.</li>
        <li><strong>Props:</strong> Datos pasados a componentes.</li>
      </ul>
    </div>
  );
}