import type { Producto } from '../types';
import { formatearMoneda } from '../lib/formato';

type ProductoDetalleProps = {
  producto: Producto;
};

export function ProductoDetalle({ producto }: ProductoDetalleProps) {
  return (
    <section className="detalle-panel">
      <p className="detalle-panel__categoria">{producto.categoria}</p>
      <h2>{producto.nombre}</h2>
      <p className="detalle-panel__presentacion">{producto.presentacion}</p>
      <div className="detalle-panel__precio">
        <span>Precio</span>
        <strong>{formatearMoneda(producto.precio)}</strong>
      </div>
      <p>{producto.descripcion}</p>
    </section>
  );
}
