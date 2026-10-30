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