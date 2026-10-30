import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Conceptos from './components/Conceptos';
import GestionEventos from './components/GestionEventos';
import ComunicacionComponentes from './components/ComunicacionComponentes';
import Formularios from './components/Formularios';
import Routing from './components/Routing';

export default function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<div className="home"><h2>Bienvenido al Tutorial de React</h2><p>Selecciona una sección del menú.</p></div>} />
            <Route path="/conceptos" element={<Conceptos />} />
            <Route path="/gestion-eventos" element={<GestionEventos />} />
            <Route path="/comunicacion-componentes" element={<ComunicacionComponentes />} />
            <Route path="/formularios" element={<Formularios />} />
            <Route path="/routing" element={<Routing />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}