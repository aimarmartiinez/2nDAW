import '../styles/components/BookingSidebar.css';
import type { Club, Court } from '../types';

interface BookingSidebarProps {
  club: Club | undefined;
  date: string;
  time: string;
  court: Court | null;
  onConfirm: () => void;
  canConfirm: boolean;
}

// Helper to format Date to dd/mm/yyyy
const formatDate = (dateString: string) => {
  if (!dateString) return '-';
  const parts = dateString.split('-');
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
};

export default function BookingSidebar({ club, date, time, court, onConfirm, canConfirm }: BookingSidebarProps) {
  return (
    <aside className="booking-sidebar">
      <h3>Resumen de Reserva</h3>
      
      <ul className="summary-list">
        <li>
          <span>Club</span>
          <strong>{club?.name || '-'}</strong>
        </li>
        <li>
          <span>Fecha</span>
          <strong>{formatDate(date)}</strong>
        </li>
        <li>
          <span>Hora</span>
          <strong>{time || '-'}</strong>
        </li>
        <li>
          <span>Pista</span>
          <strong>{court ? court.name : '-'}</strong>
        </li>
        <li>
          <span>Interior/Exterior</span>
          <strong>{court ? (court.type === 'indoor' ? 'Interior' : 'Exterior') : '-'}</strong>
        </li>
      </ul>

      <div className="summary-total">
        <span>Total a pagar</span>
        <strong>{court ? `${(court.price_per_hour * 1.5).toFixed(2)}€` : '0€'}</strong>
      </div>

      <button 
        className="btn-confirm" 
        disabled={!canConfirm}
        onClick={onConfirm}
      >
        Confirmar Reserva
      </button>
    </aside>
  );
}
