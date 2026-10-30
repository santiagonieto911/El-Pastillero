type HeaderProps = {
  activeView: 'catalogo' | 'panel';
};

export function Header({ activeView }: HeaderProps) {
  return (
    <header className="topbar">
      <div className="topbar__brand">
        <span className="topbar__logo" aria-hidden="true">+</span>
        <div>
          <h1>El Pastillero</h1>
        </div>
      </div>

      <nav className="topbar__nav" aria-label="Navegación principal">
        <a href="#catalogo" aria-current={activeView === 'catalogo' ? 'page' : undefined}>
          Catálogo para clientes
        </a>
        <a href="#panel" aria-current={activeView === 'panel' ? 'page' : undefined}>
          Prueba piloto (José)
        </a>
      </nav>
    </header>
  );
}
