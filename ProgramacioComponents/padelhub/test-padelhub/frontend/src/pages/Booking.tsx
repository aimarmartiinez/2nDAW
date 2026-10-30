import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import BookingStepper from '../components/BookingStepper';
import BookingSidebar from '../components/BookingSidebar';
import type { Club, Court } from '../types';
import '../styles/pages/Booking.css';
import '../styles/components/BookingSteps.css';



// Available time mock
const availableTimes = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"];

export default function Booking() {
  const { clubId } = useParams();
  const navigate = useNavigate();
  
  // State 
  const [club, setClub] = useState<Club | undefined>();
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);

  // Initialize
  useEffect(() => {
    // Today formatted as YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);

    // Fetch real club data
    fetch(`${import.meta.env.VITE_API_URL}/clubs/${clubId}`)
      .then(res => {
        if (!res.ok) throw new Error("Club not found");
        return res.json();
      })
      .then(data => {
        setClub(data);
      })
      .catch(err => {
        console.error(err);
        alert("Club not found in database");
        navigate('/');
      });
  }, [clubId, navigate]);

  // Handle Date
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
    setSelectedTime(''); // Reset time when date changes
    setSelectedCourt(null); // Reset court
    if (step > 2) setStep(2); // Go back to step 2 visually
  };
  
  // Progress to step 3 when time is picked handled cleanly in onClick

  // Handle Confirm
  const handleConfirm = () => {
    setStep(4);
    
    // Convertir 90 minuts de durada a format H:i per Laravel
    const [h, m] = selectedTime.split(':').map(Number);
    const totalMins = h * 60 + m + 90;
    const end_time = `${String(Math.floor(totalMins / 60)).padStart(2, '0')}:${String(totalMins % 60).padStart(2, '0')}`;

    const bookingData = {
      user_id: 1,
      club_id: club?.id,
      date: selectedDate,
      start_time: selectedTime,
      end_time: end_time,
      court_id: selectedCourt?.id,
      total_price: selectedCourt?.price_per_hour ? (Number(selectedCourt.price_per_hour) * 1.5) : 0,
      status: 'pending'
    };

    fetch(`${import.meta.env.VITE_API_URL}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData)
    })
      .then(res => res.json())
      .then(() => {
        setTimeout(() => {
          navigate('/mis-reservas');
        }, 1500);
      })
      .catch(err => {
        console.error(err);
        alert('Error conectando con la base de datos (Laravel)');
      });
  };

  if (!club) return <div>Cargando...</div>;

  return (
    <div style={{ backgroundColor: 'var(--color-bg-light)', minHeight: '100vh' }}>
      <AppHeader userName="Aimar" />
      
      <main className="booking-app">
        <BookingStepper currentStep={step} />

        <div className="booking-layout">
          <div className="booking-main">
            
            {/* Step 1 & 2 combined logic: Pick Date, Pick Time */}
            {(step === 1 || step === 2) && (
              <>
                <section className="booking-section">
                  <header>
                    <h2>1. Selecciona la fecha</h2>
                    <span>¿Qué día quieres jugar?</span>
                  </header>
                  <input 
                    type="date" 
                    className="booking-date" 
                    value={selectedDate}
                    onChange={handleDateChange}
                    min={new Date().toISOString().split('T')[0]} // Cannot book past dates
                  />
                </section>

                <section className="booking-section">
                  <header>
                    <h2>2. Selecciona la hora</h2>
                    <span>Horarios disponibles para {club.name}</span>
                  </header>
                  <div className="time-slots">
                    {availableTimes.map(time => (
                      <button
                        key={time}
                        className={`time-card ${selectedTime === time ? 'active' : ''}`}
                        onClick={() => {
                          setSelectedTime(time);
                          setStep(3); // Advance to Pick Court
                        }}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </section>
              </>
            )}

            {/* Step 3: Pick court */}
            {step === 3 && (
              <section className="booking-section">
                <header>
                  <h2>3. Elige tu pista</h2>
                  <span>Selecciona una de las pistas disponibles para jugar a las {selectedTime}</span>
                </header>
                
                <div className="court-grid">
                  {club.courts?.map(court => (
                    <div 
                      key={court.id} 
                      className={`court-card-booking ${selectedCourt?.id === court.id ? 'active' : ''}`}
                      onClick={() => setSelectedCourt(court)}
                    >
                      <h4>{court.name}</h4>
                      <div className="court-meta">
                        <span>{court.type === 'indoor' ? 'Interior' : 'Exterior'}</span>

                        <span className="court-price">{court.price_per_hour}€</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button 
                  className="filter active" 
                  style={{marginTop: 24}}
                  onClick={() => { setStep(2); setSelectedCourt(null); }}
                >
                  ← Volver a Horas
                </button>
              </section>
            )}

            {/* Step 4: Loading / Success */}
            {step === 4 && (
              <section className="booking-section" style={{ textAlign: 'center', paddingTop: 60 }}>
                <h1 style={{ fontSize: '4rem', marginBottom: 20 }}>✅</h1>
                <h2>¡Reserva Confirmada!</h2>
                <p style={{ color: 'var(--color-text-light)' }}>Redirigiendo a tus reservas...</p>
              </section>
            )}

          </div>

          <BookingSidebar 
            club={club}
            date={selectedDate}
            time={selectedTime}
            court={selectedCourt}
            onConfirm={handleConfirm}
            canConfirm={!!(selectedDate && selectedTime && selectedCourt && step === 3)}
          />
        </div>
      </main>
    </div>
  );
}
