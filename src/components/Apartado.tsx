import type { Producto } from '../types';
import { formatearMoneda } from '../lib/formato';

type ApartadoProps = {
  producto: Producto;
  cantidad: number;
  total: number;
};

export function Apartado({ producto, cantidad, total }: ApartadoProps) {
  return (
    <aside className="apartado-panel">
      <h3>Apartado</h3>

      <p className="apartado-panel__empty">Tu pedido va a quedar listo para recoger en la sucursal que elijas.</p>

      <div className="apartado-panel__item">
        <div>
          <strong>{producto.nombre}</strong>
          <small>{producto.presentacion}</small>
        </div>
        <div className="apartado-panel__qty" aria-label="Cantidad del producto">
          <button type="button" aria-label="Disminuir cantidad">−</button>
          <span>{cantidad}</span>
          <button type="button" aria-label="Aumentar cantidad">+</button>
        </div>
      </div>

      <div className="apartado-panel__meta">
        <span>Subtotal</span>
        <strong>{formatearMoneda(total)}</strong>
      </div>

      <div className="apartado-panel__meta">
        <span>Ahorro</span>
        <strong>{formatearMoneda(Math.max(total * 0.18, 0))}</strong>
      </div>

      <div className="apartado-panel__meta">
        <span>Total final</span>
        <strong>{formatearMoneda(total)}</strong>
      </div>

      <button type="button" className="button button--primary button--wide">
        Confirmar apartado
      </button>
    </aside>
  );
}
