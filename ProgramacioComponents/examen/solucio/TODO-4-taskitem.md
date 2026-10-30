# TODO 4 - `TaskItem.tsx`

## Solucio

```tsx
import React from 'react'
import { Task } from '../types/Task'
import { useTask } from '../hooks/useTask'
import './TaskItem.css'

interface TaskItemProps {
  task: Task
}

export function TaskItem({ task }: TaskItemProps) {
  const { toggleTaskCompletion, deleteTask } = useTask()

  const handleToggle = () => {
    toggleTaskCompletion(task.id)
  }

  const handleDelete = () => {
    const confirmed = window.confirm('Segur que vols eliminar aquesta tasca?')

    if (confirmed) {
      deleteTask(task.id)
    }
  }

  const getPriorityClass = (priority: string) => {
    return `priority-${priority}`
  }

  const isOverdue = new Date(task.dueDate) < new Date() && !task.completed

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}>
      <div className="task-checkbox">
        <input type="checkbox" checked={task.completed} onChange={handleToggle} id={`task-${task.id}`} />
      </div>

      <div className="task-content">
        <label htmlFor={`task-${task.id}`} className="task-title">
          {task.title}
        </label>
        {task.description && <p className="task-description">{task.description}</p>}

        <div className="task-meta">
          <span className={`priority-badge ${getPriorityClass(task.priority)}`}>{task.priority}</span>
          <span className="category-badge">{task.category}</span>
          <span className="due-date">Venciment: {new Date(task.dueDate).toLocaleDateString('es-ES')}</span>
        </div>
      </div>

      <button className="btn btn-danger btn-small" onClick={handleDelete} aria-label="Eliminar tasca">
        ✕
      </button>
    </div>
  )
}
```

## Explicacio linia a linia

- `const { toggleTaskCompletion, deleteTask } = useTask()`:
  recupera les accions del context.
- `handleToggle`:
  crida `toggleTaskCompletion` amb l'identificador de la tasca.
- `handleDelete`:
  pregunta abans d'esborrar.
- `window.confirm(...)`:
  obre un diàleg natiu de confirmacio.
- `if (confirmed) { deleteTask(task.id) }`:
  elimina només si l'usuari accepta.
- `checked={task.completed}`:
  sincronitza l'estat del checkbox amb la tasca.
- `className={... completed ... overdue ...}`:
  afegeix classes visuals segons l'estat de la tasca.

## Resum

Aquest TODO fa que cada targeta pugui marcar-se com completada o eliminar-se amb confirmacio.

