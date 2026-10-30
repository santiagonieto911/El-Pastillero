export function Header() {
  return (
    <header className="topbar">
      <div className="topbar__brand">
        <span className="topbar__logo">+</span>
        <div>
          <p className="topbar__eyebrow">Farmacia</p>
          <h1>Genéricos El Pastillero</h1>
        </div>
      </div>

      <nav className="topbar__nav" aria-label="Navegación principal">
        <a href="#catalogo" aria-current="page">
          Catálogo para clientes
        </a>
        <a href="#panel">Prueba piloto (José)</a>
      </nav>
    </header>
  );
}
