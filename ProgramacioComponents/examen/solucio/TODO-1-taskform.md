# TODO 1 - `TaskForm.tsx`

## Solucio

```tsx
import React, { useState } from 'react'
import { useTask } from '../hooks/useTask'
import { TaskFormData } from '../types/Task'
import './TaskForm.css'

interface TaskFormProps {
  categories?: string[]
}

export function TaskForm({ categories = ['Work', 'Personal', 'Learning'] }: TaskFormProps) {
  const [values, setValues] = useState<TaskFormData>({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    category: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const { addTask } = useTask()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }))

    setErrors((prev) => {
      const next = { ...prev }
      delete next[name]
      return next
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const nextErrors: Record<string, string> = {}

    if (!values.title.trim()) {
      nextErrors.title = 'El titol es obligatori'
    } else if (values.title.trim().length < 3) {
      nextErrors.title = 'El titol ha de tenir com a minim 3 caracters'
    }

    if (!values.category) {
      nextErrors.category = 'La categoria es obligatoria'
    }

    if (!values.dueDate) {
      nextErrors.dueDate = 'La data de venciment es obligatoria'
    }

    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
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
        <label htmlFor="description">Descripcio</label>
        <textarea
          id="description"
          name="description"
          value={values.description}
          onChange={handleChange}
          placeholder="Describe la teva tasca (opcional)"
          rows={3}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="priority">Prioritat</label>
          <select
            id="priority"
            name="priority"
            value={values.priority}
            onChange={handleChange}
          >
            <option value="low">Baja</option>
            <option value="medium">Mitjana</option>
            <option value="high">Alta</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="category">Categoria *</label>
          <select
            id="category"
            name="category"
            value={values.category}
            onChange={handleChange}
            className={errors.category ? 'input-error' : ''}
          >
            <option value="">Selecciona una categoria</option>
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
        <label htmlFor="dueDate">Data de venciment *</label>
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
        Afegir tasca
      </button>
    </form>
  )
}
```

## Explicacio linia a linia

- `import React, { useState } from 'react'`:
  importa React i l'hook `useState`.
- `import { useTask } from '../hooks/useTask'`:
  permet cridar `addTask` des del context.
- `import { TaskFormData } from '../types/Task'`:
  reutilitza la interfase del formulari.
- `interface TaskFormProps { ... }`:
  defineix les props del component.
- `categories = ['Work', 'Personal', 'Learning']`:
  dona categories per defecte si no arriben per props.
- `const [values, setValues] = useState<TaskFormData>(...)`:
  crea l'estat del formulari amb tots els camps.
- `const [errors, setErrors] = useState<Record<string, string>>({})`:
  crea l'estat dels missatges d'error.
- `const { addTask } = useTask()`:
  recupera la funcio per afegir tasques.
- `handleChange`:
  llegeix `name` i `value` de l'input que canvia.
- `setValues((prev) => ({ ...prev, [name]: value }))`:
  actualitza només el camp modificat.
- `setErrors((prev) => { ... delete next[name] ... })`:
  neteja l'error del camp que l'usuari acaba de corregir.
- `handleSubmit`:
  evita el comportament per defecte del formulari.
- `const nextErrors: Record<string, string> = {}`:
  prepara una col leccio nova d'errors.
- `if (!values.title.trim())`:
  valida que el titol no estigui buit.
- `else if (values.title.trim().length < 3)`:
  valida la longitud minima del titol.
- `if (!values.category)`:
  valida que hi hagi categoria.
- `if (!values.dueDate)`:
  valida que hi hagi data.
- `setErrors(nextErrors)`:
  mostra els errors trobats.
- `if (Object.keys(nextErrors).length > 0) return`:
  atura l'enviament si hi ha errors.
- `addTask(values)`:
  envia les dades valides al context.
- `setValues(...)`:
  reinicia el formulari un cop guardat.
- `setErrors({})`:
  neteja els errors despres d'un enviament correcte.
- `<input id="title" ... />`:
  afegeix el camp principal del titol.
- `className={errors.title ? 'input-error' : ''}`:
  pinta l'input en estat d'error si cal.
- `{errors.title && ...}`:
  mostra el missatge d'error sota l'input.

## Resum

Aquest TODO converteix `TaskForm` en un formulari controlat amb validacio, estat local i enviament correcte a `addTask`.

