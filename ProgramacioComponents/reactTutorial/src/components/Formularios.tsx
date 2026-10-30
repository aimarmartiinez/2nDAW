import { useState } from 'react';
import './Formularios.css';

export default function Formularios() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Nombre: ${name}, Email: ${email}`);
  };

  return (
    <div className="formularios">
      <h2>Formularios</h2>
      <p>Usa estado para controlar los inputs.</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}