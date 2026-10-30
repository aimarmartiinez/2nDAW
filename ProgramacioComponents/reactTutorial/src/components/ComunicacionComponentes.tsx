import { useState } from 'react';
import './ComunicacionComponentes.css';

function Child({ message, onChange }) {
  return (
    <div className="child">
      <p>{message}</p>
      <button onClick={onChange}>Cambiar mensaje</button>
    </div>
  );
}

export default function ComunicacionComponentes() {
  const [message, setMessage] = useState('Hola desde el padre');

  const handleChange = () => {
    setMessage('Mensaje cambiado');
  };

  return (
    <div className="comunicacion">
      <h2>Comunicación entre Componentes</h2>
      <p>Usamos props para pasar datos y callbacks para eventos.</p>
      <Child message={message} onChange={handleChange} />
    </div>
  );
}