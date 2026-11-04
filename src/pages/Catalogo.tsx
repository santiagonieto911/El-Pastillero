import { useMemo, useState } from 'react';
import { Apartado } from '../components/Apartado';
import { ProductoCard } from '../components/ProductoCard';
import { ProductoDetalle } from '../components/ProductoDetalle';
import { productos } from '../data/productos';
import { sucursales } from '../data/sucursales';
import { useApartado } from '../hooks/useApartado';
import { ahorroAnual, ahorroPorCaja, porcentajeAhorro, proporcionPrecioGenerico } from '../lib/calculos';
import type { FiltroCatalogo, Producto } from '../types';

const PRODUCTOS_POR_PAGINA = 4;

export function Catalogo() {
  const [busqueda, setBusqueda] = useState('');
  const [filtro, setFiltro] = useState<FiltroCatalogo>('todos');
  const [pagina, setPagina] = useState(1);
  const [detalle, setDetalle] = useState<Producto | null>(null);
  const [sucursal, setSucursal] = useState(sucursales[0].nombre);
  const [mensaje, setMensaje] = useState('');
  const [errorApartado, setErrorApartado] = useState('');
  const apartado = useApartado();

  const agregarAlApartado = (producto: Producto) => {
    apartado.agregar(producto);
    setErrorApartado('');
    setMensaje('');
  };

  const productosFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLocaleLowerCase('es-MX');
    return productos.filter((producto) => {
      const coincideTexto = `${producto.nombre} ${producto.uso}`.toLocaleLowerCase('es-MX').includes(texto);
      const coincideReceta = filtro === 'todos' || (filtro === 'con' ? producto.receta : !producto.receta);
      return coincideTexto && coincideReceta;
    });
  }, [busqueda, filtro]);
  const totalPaginas = Math.ceil(productosFiltrados.length / PRODUCTOS_POR_PAGINA);
  const indiceInicio = (pagina - 1) * PRODUCTOS_POR_PAGINA;
  const productosPagina = productosFiltrados.slice(
    indiceInicio,
    indiceInicio + PRODUCTOS_POR_PAGINA,
  );

  const confirmarApartado = () => {
    if (apartado.items.length === 0) {
      setMensaje('');
      setErrorApartado('Agrega al menos un producto antes de confirmar el apartado.');
      return;
    }
    const folio = Math.floor(1000 + Math.random() * 9000);
    setErrorApartado('');
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
                onChange={(event) => {
                  setBusqueda(event.target.value);
                  setPagina(1);
                }}
                placeholder="Ej. alergias"
              />
            </label>
            <div className="catalogo-filtros" role="group" aria-label="Filtrar por receta">
              <button type="button" className={filtro === 'todos' ? 'is-active' : ''} onClick={() => { setFiltro('todos'); setPagina(1); }}>Todos</button>
              <button type="button" className={filtro === 'sin' ? 'is-active' : ''} onClick={() => { setFiltro('sin'); setPagina(1); }}>Sin receta</button>
              <button type="button" className={filtro === 'con' ? 'is-active' : ''} onClick={() => { setFiltro('con'); setPagina(1); }}>Con receta</button>
            </div>
          </div>

          {productosFiltrados.length === 0 ? (
            <p className="catalogo-vacio">No encontramos productos. Cambia la búsqueda o el filtro.</p>
          ) : (
            <>
              <div className="catalogo-grid">
                {productosPagina.map((producto) => (
                  <ProductoCard
                    key={producto.id}
                    producto={producto}
                    ahorro={ahorroPorCaja(producto)}
                    porcentajeAhorro={porcentajeAhorro(producto)}
                    barraGenerico={proporcionPrecioGenerico(producto)}
                    onVerDetalle={setDetalle}
                    onApartar={agregarAlApartado}
                  />
                ))}
              </div>
              <div className="catalogo-paginacion">
                <span>
                  Mostrando {indiceInicio + 1}-{indiceInicio + productosPagina.length} de {productosFiltrados.length} productos
                </span>
                {totalPaginas > 1 ? (
                  <nav aria-label="Paginación del catálogo">
                    <button
                      type="button"
                      className="button button--secondary"
                      onClick={() => setPagina((actual) => Math.max(1, actual - 1))}
                      disabled={pagina === 1}
                    >
                      Anterior
                    </button>
                    {Array.from({ length: totalPaginas }, (_, indice) => indice + 1).map((numeroPagina) => (
                      <button
                        key={numeroPagina}
                        type="button"
                        className={`button button--secondary ${pagina === numeroPagina ? 'is-active' : ''}`}
                        onClick={() => setPagina(numeroPagina)}
                        aria-label={`Página ${numeroPagina}`}
                        aria-current={pagina === numeroPagina ? 'page' : undefined}
                      >
                        {numeroPagina}
                      </button>
                    ))}
                    <button
                      type="button"
                      className="button button--secondary"
                      onClick={() => setPagina((actual) => Math.min(totalPaginas, actual + 1))}
                      disabled={pagina === totalPaginas}
                    >
                      Siguiente
                    </button>
                  </nav>
                ) : null}
              </div>
            </>
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
          error={errorApartado}
        />
      </div>

      {detalle ? (
        <ProductoDetalle
          key={detalle.id}
          producto={detalle}
          ahorro={ahorroPorCaja(detalle)}
          ahorroAnual={ahorroAnual(detalle)}
          onClose={() => setDetalle(null)}
          onApartar={(producto) => {
            agregarAlApartado(producto);
            setDetalle(null);
          }}
        />
      ) : null}

      {mensaje ? <p className="catalogo-mensaje" role="status">{mensaje}</p> : null}
    </main>
  );
}
