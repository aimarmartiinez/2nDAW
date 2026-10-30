import '../styles/components/ClubListHeader.css';

interface ClubListHeaderProps {
  count: number;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export default function ClubListHeader({ count, sortBy, onSortChange }: ClubListHeaderProps) {
  return (
    <div className="header-list">
      <span><strong>{count}</strong> clubes disponibles</span>
      <select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
        <option value="recommended">Recomendados</option>
        <option value="price_asc">Precio más bajo</option>
        <option value="price_desc">Precio más alto</option>
      </select>
    </div>
  );
}
