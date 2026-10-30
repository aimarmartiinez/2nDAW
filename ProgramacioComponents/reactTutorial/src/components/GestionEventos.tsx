import { useState } from 'react';
import './GestionEventos.css';

export default function GestionEventos() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div className="gestion-eventos">
      <h2>Gestión de Eventos</h2>
      <p>En React, manejamos eventos con funciones.</p>
      <button onClick={handleClick}>Haz clic: {count}</button>
    </div>
  );
}