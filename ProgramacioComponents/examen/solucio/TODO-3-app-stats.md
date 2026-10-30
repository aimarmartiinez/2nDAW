# TODO 3 - `App.tsx` estadistiques

## Solucio

```tsx
import React, { useEffect, useState } from 'react'
import { useTask } from './hooks/useTask'
import { useFilter } from './hooks/useFilter'
import { TaskForm } from './components/TaskForm'
import { TaskFilter } from './components/TaskFilter'
import { TaskList } from './components/TaskList'
import './App.css'

export function App() {
  const { tasks } = useTask()
  const { filters, setFilters, filteredTasks, categories } = useFilter(tasks)

  const [completedCount, setCompletedCount] = useState(0)
  const [pendingCount, setPendingCount] = useState(0)

  useEffect(() => {
    const completed = tasks.filter((task) => task.completed).length
    const pending = tasks.length - completed

    setCompletedCount(completed)
    setPendingCount(pending)
  }, [tasks])

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>📋 Gestor de Tasques</h1>
        <div className="task-stats">
          <div className="stat">
            <span className="stat-label">Total:</span>
            <span className="stat-value">{tasks.length}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Pendents:</span>
            <span className="stat-value pending">{pendingCount}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Completades:</span>
            <span className="stat-value completed">{completedCount}</span>
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="app-grid">
          <section className="form-section">
            <h2>Nova Tasca</h2>
            <TaskForm categories={categories.length > 0 ? categories : ['Work', 'Personal']} />
          </section>

          <section className="tasks-section">
            <h2>Les Meves Tasques</h2>
            <TaskFilter filters={filters} categories={categories} onFilterChange={setFilters} />
            <TaskList tasks={filteredTasks} emptyMessage="No hi ha tasques que coincideixin amb els filtres" />
          </section>
        </div>
      </main>
    </div>
  )
}
```

## Explicacio linia a linia

- `const [completedCount, setCompletedCount] = useState(0)`:
  crea l'estat del nombre de tasques completades.
- `const [pendingCount, setPendingCount] = useState(0)`:
  crea l'estat del nombre de tasques pendents.
- `useEffect(() => { ... }, [tasks])`:
  recalcula les estadistiques cada cop que canvia `tasks`.
- `tasks.filter((task) => task.completed).length`:
  compta quantes tasques estan completades.
- `tasks.length - completed`:
  calcula quantes queden pendents.
- `setCompletedCount(completed)`:
  guarda el nou total de completades.
- `setPendingCount(pending)`:
  guarda el nou total de pendents.
- `<span className="stat-value pending">{pendingCount}</span>`:
  mostra el valor calculat a la UI.
- `<span className="stat-value completed">{completedCount}</span>`:
  mostra el valor calculat a la UI.

## Resum

Aquest TODO afegeix les estadistiques reals del panell superior i les manté actualitzades amb les tasques.

