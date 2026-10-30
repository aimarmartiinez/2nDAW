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