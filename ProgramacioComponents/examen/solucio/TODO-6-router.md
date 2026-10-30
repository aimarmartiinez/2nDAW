# TODO 6 - React Router

## Solucio

### `Navigation.tsx`

```tsx
import React from 'react'
import { Link } from 'react-router-dom'

export function Navigation() {
  return (
    <nav className="navigation">
      <Link to="/">Home</Link>
      <Link to="/settings">Settings</Link>
    </nav>
  )
}
```

### `TaskDetail.tsx`

```tsx
import React from 'react'
import { useParams } from 'react-router-dom'

export function TaskDetail() {
  const { id } = useParams()

  return (
    <section>
      <h2>Detall de la tasca</h2>
      <p>ID: {id}</p>
    </section>
  )
}
```

### `Settings.tsx`

```tsx
import React from 'react'
import { useNavigate } from 'react-router-dom'

export function Settings() {
  const navigate = useNavigate()

  return (
    <section>
      <h2>Configuracio</h2>
      <button onClick={() => navigate('/')}>Tornar a l'inici</button>
    </section>
  )
}
```

### `App.tsx` amb rutes

```tsx
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navigation } from './components/Navigation'
import { TaskDetail } from './components/TaskDetail'
import { Settings } from './components/Settings'

function TaskListPage() {
  return <div>Pantalla principal amb la llista de tasques</div>
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
```

## Explicacio linia a linia

- `import { Link } from 'react-router-dom'`:
  crea enllacos interns sense recarregar la pagina.
- `<Link to="/">Home</Link>`:
  porta a la ruta principal.
- `<Link to="/settings">Settings</Link>`:
  porta a la configuracio.
- `useParams()`:
  llegeix el parametre `id` de la URL.
- `const { id } = useParams()`:
  extreu l'identificador de la ruta `task/:id`.
- `useNavigate()`:
  permet navegar per codi.
- `navigate('/')`:
  envia l'usuari a la pantalla inicial.
- `<BrowserRouter>`:
  activa el routing basat en l'historial del navegador.
- `<Routes>`:
  agrupa totes les rutes.
- `<Route path="/" ... />`:
  defineix la pantalla principal.
- `<Route path="/task/:id" ... />`:
  defineix la vista de detall.
- `<Route path="/settings" ... />`:
  defineix la vista de configuracio.

## Resum

Aquest TODO afegeix la navegacio real entre pantalles: enllacos, lectura de parametres de ruta i navegacio programatica.

