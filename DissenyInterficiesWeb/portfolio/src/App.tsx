import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import M06ra1ra2 from './pages/M06-ra1-ra2';
import M06ra3ra5ra6 from './pages/M06-ra3-ra5-ra6';
import M06ra4 from './pages/M06-ra4';
import M06ra7 from './pages/M06-ra7';
import M09ra1ra2 from './pages/M09-ra1-ra2';
import M09ra5ra6 from './pages/M09-ra5-ra6';

function App() {
  return (
    <div className="min-vh-100 bg-body">
      {/* La Navbar està fora de "Routes", per tant es veurà a TOTA arreu */}
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/m06-ra1-ra2" element={<M06ra1ra2 />} />
          <Route path="/m06-ra3-ra5-ra6" element={<M06ra3ra5ra6 />} />
          <Route path="/m06-ra4" element={<M06ra4 />} />
          <Route path="/m06-ra7" element={<M06ra7 />} />
          <Route path="/m09-ra1-ra2" element={<M09ra1ra2 />} />
          <Route path="/m09-ra5-ra6" element={<M09ra5ra6 />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
