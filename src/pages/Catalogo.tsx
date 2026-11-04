import { useMemo, useState } from 'react';
import { Apartado } from '../components/Apartado';
import { ProductoCard } from '../components/ProductoCard';
import { ProductoDetalle } from '../components/ProductoDetalle';
import { productos } from '../data/productos';
import { sucursales } from '../data/sucursales';
import { useApartado } from '../hooks/useApartado';
import { ahorroAnual, ahorroPorCaja, porcentajeAhorro, proporcionPrecioGenerico } from '../lib/calculos';
import type { FiltroCatalogo, Producto } from '../types';

export function Catalogo() {
  const [busqueda, setBusqueda] = useState('');
  const [filtro, setFiltro] = useState<FiltroCatalogo>('todos');
  const [detalle, setDetalle] = useState<Producto | null>(null);
  const [sucursal, setSucursal] = useState(sucursales[0].nombre);
  const [mensaje, setMensaje] = useState('');
  const apartado = useApartado();

  const productosFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLocaleLowerCase('es-MX');
    return productos.filter((producto) => {
      const coincideTexto = `${producto.nombre} ${producto.uso}`.toLocaleLowerCase('es-MX').includes(texto);
      const coincideReceta = filtro === 'todos' || (filtro === 'con' ? producto.receta : !producto.receta);
      return coincideTexto && coincideReceta;
    });
  }, [busqueda, filtro]);

  const confirmarApartado = () => {
    if (apartado.items.length === 0) return;
    const folio = Math.floor(1000 + Math.random() * 9000);
    setMensaje(`Apartado EP-${folio} confirmado. Recógelo en ${sucursal}.`);
    apartado.limpiar();
  };

  return (
    <main className="catalogo-page">
      <section className="hero-block" aria-label="Catálogo para clientes">
        <p className="eyebrow">El Pastillero</p>
        <h1>Medicamentos genéricos</h1>
        <p>Consulta precios y aparta tus productos para recogerlos en una sucursal.</p>
      </section>

      <div className="catalogo-layout">
        <section className="catalogo-panel" aria-label="Catálogo de genéricos">
          <div className="catalogo-toolbar">
            <label className="catalogo-buscador">
              <span>Buscar por nombre o uso</span>
              <input
                type="search"
                value={busqueda}
                onChange={(event) => setBusqueda(event.target.value)}
                placeholder="Ej. alergias"
              />
            </label>
            <div className="catalogo-filtros" role="group" aria-label="Filtrar por receta">
              <button type="button" className={filtro === 'todos' ? 'is-active' : ''} onClick={() => setFiltro('todos')}>Todos</button>
              <button type="button" className={filtro === 'sin' ? 'is-active' : ''} onClick={() => setFiltro('sin')}>Sin receta</button>
              <button type="button" className={filtro === 'con' ? 'is-active' : ''} onClick={() => setFiltro('con')}>Con receta</button>
            </div>
          </div>

          {productosFiltrados.length === 0 ? (
            <p className="catalogo-vacio">No encontramos productos. Cambia la búsqueda o el filtro.</p>
          ) : (
            <div className="catalogo-grid">
              {productosFiltrados.map((producto) => (
                <ProductoCard
                  key={producto.id}
                  producto={producto}
                  ahorro={ahorroPorCaja(producto)}
                  porcentajeAhorro={porcentajeAhorro(producto)}
                  barraGenerico={proporcionPrecioGenerico(producto)}
                  onVerDetalle={setDetalle}
                  onApartar={apartado.agregar}
                />
              ))}
            </div>
          )}
        </section>

        <Apartado
          items={apartado.items}
          total={apartado.total}
          ahorro={apartado.ahorro}
          hayReceta={apartado.items.some((item) => item.producto.receta)}
          sucursales={sucursales}
          sucursal={sucursal}
          onSeleccionarSucursal={setSucursal}
          onCambiarCantidad={apartado.cambiarCantidad}
          onConfirmar={confirmarApartado}
        />
      </div>

      {detalle ? (
        <ProductoDetalle
          producto={detalle}
          ahorro={ahorroPorCaja(detalle)}
          ahorroAnual={ahorroAnual(detalle)}
          onClose={() => setDetalle(null)}
          onApartar={(producto) => {
            apartado.agregar(producto);
            setDetalle(null);
          }}
        />
      ) : null}

      {mensaje ? <p className="catalogo-mensaje" role="status">{mensaje}</p> : null}
    </main>
  );
}
