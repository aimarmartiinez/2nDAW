import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import '../styles/pages/MyBookings.css';
import type { Booking } from '../types';


// Helper to format Date to dd/mm/yyyy
const formatDate = (dateString: string) => {
  if (!dateString) return '-';
  const parts = dateString.split('-');
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
};

// Frontend translates DB statuses to strictly 3 states required
const getStatusConfig = (status: string) => {
  switch (status) {
    case 'completed': 
    case 'confirmed': 
      return { text: 'Completada', class: 'badge--completed' };
    case 'pending': 
      return { text: 'Pendiente', class: 'badge--pending' };
    case 'canceled': 
    case 'cancelled': 
      return { text: 'Cancelada', class: 'badge--cancelled' };
    default: 
      return { text: 'Pendiente', class: 'badge--pending' };
  }
};

export default function MyBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/bookings`)
      .then(res => res.json())
      .then(data => {
        setBookings(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setBookings([]);
        setIsLoading(false);
      });
  }, []);

  return (
    <div style={{ backgroundColor: 'var(--color-bg-light)', minHeight: '100vh' }}>
      <AppHeader userName="Aimar" />
      
      <main className="my-bookings-content">
        <div className="page-header">
          <div className="header-content">
            <h1 className="page-title">📅 Mis Reservas</h1>
            <p className="page-subtitle">Gestiona y revisa todas tus reservas activas y pasadas</p>
          </div>
          <Link to="/" className="btn btn-primary" style={{ padding: '12px 24px', borderRadius: '50px' }}>
            + Nueva Reserva
          </Link>
        </div>

        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>Carregant reserves...</div>
        ) : bookings.length === 0 ? (
          <div className="empty-state">
            <i>📅</i>
            <p>No tienes reservas todavía</p>
            <Link to="/" className="btn btn-primary">
              🎾 Hacer mi primera reserva
            </Link>
          </div>
        ) : (
          <div className="bookings-list">
            {bookings.map((booking: any) => {
              const statusCfg = getStatusConfig(booking.status);
              return (
                <div key={booking.id} className="booking-card-item">
                  <div className="booking-header">
                    <h3>
                      <span className="icon-location">📍</span>
                      {booking.court?.club?.name || 'Padel Club'}
                    </h3>
                    <span className={`booking-badge ${statusCfg.class}`}>
                      {statusCfg.text}
                    </span>
                  </div>
                  
                  <div className="booking-body">
                    <div className="booking-detail">
                      <span className="icon-court">🎾</span>
                      <span>Pista:</span>
                      <strong>{booking.court?.name || 'Standard'}</strong>
                    </div>
                    <div className="booking-detail">
                      <span className="icon-calendar">📅</span>
                      <span>Fecha:</span>
                      <strong>{formatDate(booking.date)}</strong>
                    </div>
                    <div className="booking-detail">
                      <span className="icon-clock">⏰</span>
                      <span>Hora:</span>
                      <strong>{booking.start_time} - {booking.end_time}</strong>
                    </div>
                    <div className="booking-detail">
                      <span className="icon-price">💶</span>
                      <span>Total:</span>
                      <strong>{Number(booking.total_price).toFixed(2)} €</strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
