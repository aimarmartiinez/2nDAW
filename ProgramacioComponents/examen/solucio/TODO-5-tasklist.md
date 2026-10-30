# TODO 5 - `TaskList.tsx`

## Solucio

```tsx
import React from 'react'
import { Task } from '../types/Task'
import { TaskItem } from './TaskItem'
import './TaskList.css'

interface TaskListProps {
  tasks: Task[]
  emptyMessage?: string
}

export function TaskList({
  tasks,
  emptyMessage = 'No hay tareas que mostrar',
}: TaskListProps) {
  if (tasks.length === 0) {
    return <div className="empty-state">{emptyMessage}</div>
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  )
}
```

## Explicacio linia a linia

- `if (tasks.length === 0)`:
  comprova si la llista esta buida.
- `return <div className="empty-state">{emptyMessage}</div>`:
  mostra el missatge de buit amb l'estil previst.
- `<div className="task-list">`:
  contenedor principal de la llista.
- `tasks.map((task) => ...)`:
  genera una targeta per cada tasca.
- `<TaskItem key={task.id} task={task} />`:
  passa la tasca al component individual.

## Resum

Aquest TODO converteix `TaskList` en un renderitzat real de l'array de tasques i gestiona correctament l'estat buit.

