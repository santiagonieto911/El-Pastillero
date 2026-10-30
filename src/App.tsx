import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Catalogo } from './pages/Catalogo';
import { Piloto } from './pages/Piloto';

export default function App() {
  const [activeView, setActiveView] = useState<'catalogo' | 'panel'>(() =>
    window.location.hash === '#panel' ? 'panel' : 'catalogo',
  );

  useEffect(() => {
    const updateView = () => setActiveView(window.location.hash === '#panel' ? 'panel' : 'catalogo');
    window.addEventListener('hashchange', updateView);
    return () => window.removeEventListener('hashchange', updateView);
  }, []);

  return (
    <div className="app-shell">
      <Header activeView={activeView} />
      {activeView === 'panel' ? <Piloto /> : <Catalogo />}
      <footer className="app-footer">
        Prototipo con datos de ejemplo. Los precios, costos y ventas son inventados para la demostración y no hay conexión con inventario real.
      </footer>
    </div>
  );
}
