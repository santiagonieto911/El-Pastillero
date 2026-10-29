import type { Producto } from '../types';
import { formatearMoneda } from '../lib/formato';

type ProductoCardProps = {
  producto: Producto;
};

export function ProductoCard({ producto }: ProductoCardProps) {
  return (
    <article className="producto-card">
      <p className="producto-card__categoria">{producto.categoria}</p>
      <h2>{producto.nombre}</h2>
      <p>{producto.presentacion}</p>
      <div className="producto-card__meta">
        <strong>{formatearMoneda(producto.precio)}</strong>
        <span>Stock: {producto.stock}</span>
      </div>
    </article>
  );
}
