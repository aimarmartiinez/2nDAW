// src/App.tsx
import React, { useEffect, useState } from 'react'
import { useTask } from './hooks/useTask'
import { useFilter } from './hooks/useFilter'
import { TaskForm } from './components/TaskForm'
import { TaskFilter } from './components/TaskFilter'
import { TaskList } from './components/TaskList'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navigation } from './components/Navigation'
import { TaskDetail } from './components/TaskDetail'
import { Settings } from './components/Settings'
import './App.css'

function TaskListPage() {
  const { tasks } = useTask()
  const { filters, setFilters, filteredTasks, categories } = useFilter(tasks)

  // TODO: Implementa estos dos estados para contar tareas
  // 1. completedCount: número de tareas completadas
  // 2. pendingCount: número de tareas pendientes
  const [completedCount, setCompletedCount] = useState(0)
  const [pendingCount, setPendingCount] = useState(0)

  // TODO: Implementa un useEffect que:
  // 1. Se ejecute cuando cambien las tareas
  // 2. Calcule el número de tareas completadas y pendientes
  // 3. Actualice los estados completedCount y pendingCount
  useEffect(() => {
    // TODO: Calcula aquí las tareas completadas y pendientes
    // Pista: Usa task.completed para saber si está completada
    const completed = tasks.filter((task) => task.completed).length
    const pending = tasks.length - completed
    setCompletedCount(completed)
    setPendingCount(pending)
  }, [tasks]) // TODO: Añade la dependencia correcta si existe.


  return (
    <div className="app-container">
      <header className="app-header">
        <h1>📋 Gestor de Tareas</h1>
        <div className="task-stats">
          <div className="stat">
            <span className="stat-label">Total:</span>
            <span className="stat-value">{tasks.length}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Pendientes:</span>
            <span className="stat-value pending">{pendingCount}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Completadas:</span>
            <span className="stat-value completed">{completedCount}</span>
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="app-grid">
          <section className="form-section">
            <h2>Nueva Tarea</h2>
            <TaskForm categories={categories.length > 0 ? categories : ['Work', 'Personal']} />
          </section>

          <section className="tasks-section">
            <h2>Mis Tareas</h2>
            <TaskFilter
              filters={filters}
              categories={categories}
              onFilterChange={setFilters}
            />
            <TaskList
              tasks={filteredTasks}
              emptyMessage="No hay tareas que coincidan con los filtros"
            />
          </section>
        </div>
      </main>
    </div>
  )
}

export function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<TaskListPage />} />
        <Route path="/task/:id" element={<TaskDetail />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  )
}
