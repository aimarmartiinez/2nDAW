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
