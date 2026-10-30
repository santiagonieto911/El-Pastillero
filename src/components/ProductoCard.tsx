import type { Producto } from '../types';
import { formatearMoneda } from '../lib/formato';

type ProductoCardProps = {
  producto: Producto;
  ahorro: number;
  porcentajeAhorro: number;
  barraGenerico: number;
  onVerDetalle: (producto: Producto) => void;
  onApartar: (producto: Producto) => void;
};

export function ProductoCard({
  producto,
  ahorro,
  porcentajeAhorro,
  barraGenerico,
  onVerDetalle,
  onApartar,
}: ProductoCardProps) {
  return (
    <article className={`producto-card ${producto.receta ? 'producto-card--receta' : ''}`}>
      <div className="producto-card__topline" aria-hidden="true" />
      <div className="producto-card__header">
        <div>
          <h2>{producto.nombre}</h2>
        </div>
        {producto.receta ? <span className="chip chip--receta">Con receta</span> : null}
      </div>

      <p className="producto-card__presentacion">{producto.presentacion}</p>
      <p className="producto-card__uso">{producto.uso}</p>

      <div className="precio-bar" aria-label={`Comparación de precios de ${producto.nombre}`}>
        <div className="precio-bar__label">
          <span>Marca de referencia</span>
          <strong>{formatearMoneda(producto.precioMarca)}</strong>
        </div>
        <div className="precio-bar__track"><span className="precio-bar__fill precio-bar__fill--marca" /></div>
        <div className="precio-bar__label">
          <span>El Pastillero</span>
          <strong>{formatearMoneda(producto.precioGenerico)}</strong>
        </div>
        <div className="precio-bar__track">
          <span className="precio-bar__fill precio-bar__fill--generico" style={{ width: `${barraGenerico}%` }} />
        </div>
      </div>

      <div className="producto-card__meta">
        <span className="producto-card__ahorro">
          Ahorras {formatearMoneda(ahorro)} ({porcentajeAhorro}%)
        </span>
        <div className="producto-card__actions">
          <button type="button" className="button button--secondary" onClick={() => onVerDetalle(producto)}>
            Ver detalle
          </button>
          <button type="button" className="button button--primary" onClick={() => onApartar(producto)}>
            Apartar
          </button>
        </div>
      </div>
    </article>
  );
}
