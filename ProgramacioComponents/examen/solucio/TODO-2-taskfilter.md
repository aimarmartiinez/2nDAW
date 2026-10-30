# TODO 2 - `TaskFilter.tsx`

## Solucio

```tsx
import React, { useEffect, useState } from 'react'
import { FilterOptions } from '../types/Task'
import './TaskFilter.css'

interface TaskFilterProps {
  filters: FilterOptions
  categories: string[]
  onFilterChange: (filters: FilterOptions) => void
}

export function TaskFilter({ filters, categories, onFilterChange }: TaskFilterProps) {
  const [status, setStatus] = useState<FilterOptions['status']>(filters.status)
  const [priority, setPriority] = useState<FilterOptions['priority']>(filters.priority)
  const [category, setCategory] = useState(filters.category)

  useEffect(() => {
    setStatus(filters.status)
    setPriority(filters.priority)
    setCategory(filters.category)
  }, [filters])

  const handleStatusChange = (nextStatus: FilterOptions['status']) => {
    setStatus(nextStatus)
    onFilterChange({
      status: nextStatus,
      priority,
      category,
    })
  }

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextPriority = e.target.value as FilterOptions['priority']
    setPriority(nextPriority)
    onFilterChange({
      status,
      priority: nextPriority,
      category,
    })
  }

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextCategory = e.target.value
    setCategory(nextCategory)
    onFilterChange({
      status,
      priority,
      category: nextCategory,
    })
  }

  return (
    <div className="task-filter">
      <div className="filter-group">
        <label>Estado:</label>
        <div className="filter-buttons">
          <button className={`filter-btn ${status === 'all' ? 'active' : ''}`} onClick={() => handleStatusChange('all')}>
            Todas
          </button>
          <button className={`filter-btn ${status === 'pending' ? 'active' : ''}`} onClick={() => handleStatusChange('pending')}>
            Pendientes
          </button>
          <button className={`filter-btn ${status === 'completed' ? 'active' : ''}`} onClick={() => handleStatusChange('completed')}>
            Completadas
          </button>
        </div>
      </div>

      <div className="filter-group">
        <label htmlFor="priority-filter">Prioridad:</label>
        <select id="priority-filter" value={priority} onChange={handlePriorityChange}>
          <option value="all">Todas</option>
          <option value="low">Baja</option>
          <option value="medium">Media</option>
          <option value="high">Alta</option>
        </select>
      </div>

      {categories.length > 0 && (
        <div className="filter-group">
          <label htmlFor="category-filter">Categoria:</label>
          <select id="category-filter" value={category} onChange={handleCategoryChange}>
            <option value="">Todas</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  )
}
```

## Explicacio linia a linia

- `import React, { useEffect, useState } from 'react'`:
  importa React, `useState` i `useEffect`.
- `const [status, setStatus] = useState(...)`:
  guarda l'estat del filtre de completat.
- `const [priority, setPriority] = useState(...)`:
  guarda l'estat del filtre de prioritat.
- `const [category, setCategory] = useState(...)`:
  guarda l'estat del filtre de categoria.
- `useEffect(() => { ... }, [filters])`:
  sincronitza l'estat local amb les props si canvien des de fora.
- `setStatus(filters.status)`:
  actualitza el filtre d'estat local.
- `setPriority(filters.priority)`:
  actualitza el filtre de prioritat local.
- `setCategory(filters.category)`:
  actualitza el filtre de categoria local.
- `handleStatusChange`:
  actualitza l'estat i notifica `App`.
- `handlePriorityChange`:
  converteix el valor del select i propaga el canvi.
- `handleCategoryChange`:
  fa el mateix per a la categoria.
- `onFilterChange({ ... })`:
  envia a `App` l'objecte complet de filtres.
- `className={... status === 'all' ...}`:
  marca visualment quin estat esta actiu.
- `value={priority}` i `value={category}`:
  converteixen els selects en elements controlats.

## Resum

Aquest TODO fa que `TaskFilter` tingui estat propi, mantingui la UI sincronitzada i propagui canvis cap a `App`.

