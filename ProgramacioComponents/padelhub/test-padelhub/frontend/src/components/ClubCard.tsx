import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/ClubCard.css';
import type { Club } from '../types';

interface ClubCardProps {
  club: Club;
}

export default function ClubCard({ club }: ClubCardProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const images = club.images || [];
  const minPrice = club.courts
    ? Math.min(...club.courts.map(c => c.price_per_hour))
    : 0;

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const formatPrice = (price: number): string => {
    const formatted = price.toFixed(2);
    return formatted.replace(/\.?0+$/, '');
  };

  return (
    <div className="card">
      <div className="card-img">
        <div className="badge">{club.city.charAt(0).toUpperCase() + club.city.slice(1)}</div>

        {images.length > 0 && (
          <div className="carousel-container">
            <div className="carousel-images">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  className={`carousel-image ${index === currentImage ? 'active' : ''}`}
                  alt={`${club.name} - ${index + 1}`}
                />
              ))}
            </div>

            {images.length > 1 && (
              <>
                <button className="carousel-arrow prev" onClick={prevImage}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button className="carousel-arrow next" onClick={nextImage}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 6 15 12 9 18" />
                  </svg>
                </button>

                <div className="carousel-dots">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      className={`carousel-dot ${index === currentImage ? 'active' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setCurrentImage(index);
                      }}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <div className="card-body">
        <h3>{club.name}</h3>
        <div className="location">
          {club.address} · {club.city}
        </div>

        <div className="card-footer">
          <div className="price">
            <p className="text-muted">Desde</p>
            <strong>{formatPrice(minPrice)}€ /hora</strong>
          </div>

          <Link to={`/clubs/${club.id}/reservar`} className="btn">
            Reservar
          </Link>
        </div>
      </div>
    </div>
  );
}
