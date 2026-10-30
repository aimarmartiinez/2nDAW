import '../styles/components/SearchHero.css';

interface SearchHeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function SearchHero({
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
}: SearchHeroProps) {
  const filters = ['Todos', 'Interior', 'Exterior'];

  return (
    <section className="home-hero">
      <h1>Reserva tu Pista</h1>
      <p>Encuentra el club perfecto para tu próximo partido</p>

      <div className="search-box">
        <input
          type="text"
          placeholder="Buscar por ubicación, club..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="filters">
        {filters.map((filter) => (
          <div
            key={filter}
            className={`filter ${activeFilter === filter ? 'active' : ''}`}
            onClick={() => onFilterChange(filter)}
          >
            {filter}
          </div>
        ))}
      </div>
    </section>
  );
}
