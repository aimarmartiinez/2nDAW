import { useState, useEffect, useMemo } from 'react';
import AppHeader from '../components/AppHeader';
import Footer from '../components/Footer';
import SearchHero from '../components/SearchHero';
import ClubListHeader from '../components/ClubListHeader';
import ClubCard from '../components/ClubCard';
import type { Club } from '../types';
import '../styles/home.css';

export default function Home() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [sortBy, setSortBy] = useState('recommended');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/clubs`)
      .then((res) => {
        if (!res.ok) throw new Error('Error al connectar amb Laravel');
        return res.json();
      })
      .then((data) => {
        setClubs(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('No hi ha connexió amb l\'API del Backend (Laravel). Mostrant llistat buit.');
        setIsLoading(false);
      });
  }, []);

  const filteredClubs = useMemo(() => {
    let result = [...clubs];

    // Filtre de cerca
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (club) =>
          club.name.toLowerCase().includes(q) ||
          club.city.toLowerCase().includes(q) ||
          club.address.toLowerCase().includes(q)
      );
    }

    // Filtre per tipus de pista (Mapeig Interior/Exterior -> indoor/outdoor)
    if (activeFilter !== 'Todos') {
      const dbType = activeFilter === 'Interior' ? 'indoor' : 'outdoor';
      result = result.filter((club) =>
        club.courts?.some((court) => court.type === dbType)
      );
    }

    // Ordenació
    if (sortBy === 'price_asc') {
      result.sort((a, b) => {
        const minA = a.courts ? Math.min(...a.courts.map((c) => c.price_per_hour)) : 0;
        const minB = b.courts ? Math.min(...b.courts.map((c) => c.price_per_hour)) : 0;
        return minA - minB;
      });
    } else if (sortBy === 'price_desc') {
      result.sort((a, b) => {
        const minA = a.courts ? Math.min(...a.courts.map((c) => c.price_per_hour)) : 0;
        const minB = b.courts ? Math.min(...b.courts.map((c) => c.price_per_hour)) : 0;
        return minB - minA;
      });
    }

    return result;
  }, [clubs, searchQuery, activeFilter, sortBy]);

  return (
    <>
      <AppHeader />

      <main>
        <SearchHero
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        <div className="home-container">
          <ClubListHeader
            count={filteredClubs.length}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '100px 0' }}>Carregant clubs de l'API...</div>
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '100px 0', color: '#ef4444' }}>{error}</div>
          ) : (
            <div className="grid">
              {filteredClubs.map((club) => (
                <ClubCard key={club.id} club={club} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
