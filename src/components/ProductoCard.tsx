import type { Producto } from '../types';
import { formatearMoneda } from '../lib/formato';

type ProductoCardProps = {
  producto: Producto;
};

export function ProductoCard({ producto }: ProductoCardProps) {
  return (
    <article className="producto-card">
      <div className="producto-card__topline" aria-hidden="true" />
      <div className="producto-card__header">
        <div>
          <p className="producto-card__categoria">{producto.categoria}</p>
          <h2>{producto.nombre}</h2>
        </div>
        <span className="chip chip--receta">{producto.stock} disponibles</span>
      </div>

      <p className="producto-card__presentacion">{producto.presentacion}</p>
      <p className="producto-card__uso">{producto.descripcion}</p>

      <div className="precio-bar" aria-label={`Precio de ${producto.nombre}`}>
        <div className="precio-bar__label">
          <span>Precio</span>
          <strong>{formatearMoneda(producto.precio)}</strong>
        </div>
      </div>

      <div className="producto-card__meta">
        <span className="producto-card__ahorro">Ahorro al cliente</span>
        <button type="button" className="button button--primary">
          Ver detalle
        </button>
      </div>
    </article>
  );
}
