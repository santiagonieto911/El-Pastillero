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
      <div className="apartado-panel__row">
        <span>Producto</span>
        <strong>{producto.nombre}</strong>
      </div>
      <div className="apartado-panel__row">
        <span>Cantidad</span>
        <strong>{cantidad}</strong>
      </div>
      <div className="apartado-panel__row">
        <span>Total</span>
        <strong>{formatearMoneda(total)}</strong>
      </div>
    </aside>
  );
}
