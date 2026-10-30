import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import AboutPage from './pages/AboutPage'
import HomePage from './pages/HomePage'
import RegisterHookFormPage from './pages/RegisterHookFormPage'
import RegisterManualPage from './pages/RegisterManualPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom">
          <div className="container">
            <span className="navbar-brand fw-semibold">Mini Register App</span>
            <div className="navbar-nav gap-2">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `nav-link px-3 rounded ${isActive ? 'active-link' : ''}`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `nav-link px-3 rounded ${isActive ? 'active-link' : ''}`
                }
              >
                About Us
              </NavLink>
              <NavLink
                to="/register-1"
                className={({ isActive }) =>
                  `nav-link px-3 rounded ${isActive ? 'active-link' : ''}`
                }
              >
                Register 1
              </NavLink>
              <NavLink
                to="/register-2"
                className={({ isActive }) =>
                  `nav-link px-3 rounded ${isActive ? 'active-link' : ''}`
                }
              >
                Register 2
              </NavLink>
            </div>
          </div>
        </nav>

        <main className="container py-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/register-1" element={<RegisterManualPage />} />
            <Route path="/register-2" element={<RegisterHookFormPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
