import { Apartado } from '../components/Apartado';
import { ProductoCard } from '../components/ProductoCard';
import { ProductoDetalle } from '../components/ProductoDetalle';
import { productos } from '../data/productos';
import { useApartado } from '../hooks/useApartado';

export function Catalogo() {
  const productoSeleccionado = productos[0];
  const apartado = useApartado(productoSeleccionado, 2);

  return (
    <div className="app-shell">
      <main>
        <section className="hero-block" aria-label="Bienvenida">
          <p className="eyebrow">A precio por tu salud</p>
          <h1>Genéricos con la marca El Pastillero</h1>
          <p>
            Acceso sencillo a medicamentos de confianza con precios más claros para la familia.
          </p>
        </section>

        <section className="catalogo" aria-label="Catálogo de productos">
          <div className="catalogo__lista">
            {productos.map((producto) => (
              <ProductoCard key={producto.id} producto={producto} />
            ))}
          </div>

          <div className="catalogo__detalle">
            <ProductoDetalle producto={productoSeleccionado} />
            <Apartado
              producto={productoSeleccionado}
              cantidad={apartado.cantidad}
              total={apartado.total}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
