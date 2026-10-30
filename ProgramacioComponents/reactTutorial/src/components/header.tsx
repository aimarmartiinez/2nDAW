import Button from './Button';
import './header.css';

export default function Header() {
  return (
    <header>
      <h1>React Tutorial</h1>
      <nav>
        <Button id="conceptos" text="Conceptos" />
        <Button id="gestion-eventos" text="Gestión Eventos" />
        <Button id="comunicacion-componentes" text="Comunicación Componentes" />
        <Button id="formularios" text="Formularios" />
        <Button id="routing" text="Routing" />
      </nav>
    </header>
  );
}