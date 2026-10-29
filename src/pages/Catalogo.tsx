import { Apartado } from '../components/Apartado';
import { Header } from '../components/Header';
import { ProductoCard } from '../components/ProductoCard';
import { ProductoDetalle } from '../components/ProductoDetalle';
import { productos } from '../data/productos';
import { calcularTotal } from '../lib/calculos';

export function Catalogo() {
  const productoSeleccionado = productos[0];
  const cantidad = 2;
  const total = calcularTotal(productoSeleccionado.precio, cantidad);

  return (
    <div className="app-shell">
      <Header />

      <main className="catalogo">
        <section className="catalogo__lista" aria-label="Productos">
          {productos.map((producto) => (
            <ProductoCard key={producto.id} producto={producto} />
          ))}
        </section>

        <section className="catalogo__detalle" aria-label="Detalle del producto">
          <ProductoDetalle producto={productoSeleccionado} />
          <Apartado producto={productoSeleccionado} cantidad={cantidad} total={total} />
        </section>
      </main>
    </div>
  );
}
