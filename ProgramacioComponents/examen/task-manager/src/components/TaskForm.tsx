// src/components/TaskForm.tsx
import React, { useState } from 'react'
import { useTask } from '../hooks/useTask'
import { TaskFormData } from '../types/Task'
import './TaskForm.css'

interface TaskFormProps {
  categories?: string[]
}

export function TaskForm({ categories = ['Work', 'Personal', 'Learning'] }: TaskFormProps) {
  // TODO: Implementa los estados para los valores del formulario
  // Necesitas un estado para: title, description, priority, dueDate, category
  // Pista: Usa destructuring de useState

  const [values, setValues] = useState<TaskFormData>({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    category: '',
  })

  // TODO: Implementa un estado para los errores de validación
  const [errors, setErrors] = useState<Record<string, string>>({})

  const { addTask } = useTask()

  // TODO: Implementa handleChange para actualizar valores cuando cambia un input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    // Obtén name y value del e.target
    const { name, value } = e.target;
    // Actualiza el estado values
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Opcionalmente: limpia el error de ese campo
    setErrors((prev) => {
      const next = { ...prev }
      delete next[name]
      return next
    })
  }

  // TODO: Implementa la validación del formulario
  // Requisitos:
  // - title: no puede estar vacío y debe tener mínimo 3 caracteres
  // - category: es requerida
  // - dueDate: es requerida
  // Retorna true si es válido, false si hay errores
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!values.title.trim()) {
      newErrors.title = 'El título es requerido'
    } else if (values.title.trim().length < 3) {
      newErrors.title = 'El título debe tener al menos 3 caracteres'
    }

    if (!values.category) {
      newErrors.category = 'La categoría es requerida'
    }

    if (!values.dueDate) {
      newErrors.dueDate = 'La fecha de entrega es requerida'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Valida el formulario
    // Si es válido: llama a addTask(values), luego resetea el formulario
    if (!validateForm()) {
      return
    }

    addTask(values)
    setValues({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: '',
      category: '',
    })
    setErrors({})
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Titol *</label>
        <input
          id="title"
          name="title"
          value={values.title}
          placeholder="Escriu el titol de la tasca"
          onChange={handleChange}
          className={errors.title ? 'input-error' : ''}
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          name="description"
          value={values.description}
          onChange={handleChange}
          placeholder="Describe tu tarea (opcional)"
          rows={3}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="priority">Prioridad</label>
          <select
            id="priority"
            name="priority"
            value={values.priority}
            onChange={handleChange}
          >
            <option value="low">Baja</option>
            <option value="medium">Media</option>
            <option value="high">Alta</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="category">Categoría *</label>
          <select
            id="category"
            name="category"
            value={values.category}
            onChange={handleChange}
            className={errors.category ? 'input-error' : ''}
          >
            <option value="">Selecciona una categoría</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && <span className="error-message">{errors.category}</span>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="dueDate">Fecha de entrega *</label>
        <input
          id="dueDate"
          type="date"
          name="dueDate"
          value={values.dueDate}
          onChange={handleChange}
          className={errors.dueDate ? 'input-error' : ''}
        />
        {errors.dueDate && <span className="error-message">{errors.dueDate}</span>}
      </div>

      <button type="submit" className="btn btn-primary">
        Añadir Tarea
      </button>
    </form>
  )
}
