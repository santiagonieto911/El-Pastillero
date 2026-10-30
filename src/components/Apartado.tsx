import type { ItemApartado, Sucursal } from '../types';
import { formatearMoneda } from '../lib/formato';

type ApartadoProps = {
  items: ItemApartado[];
  total: number;
  ahorro: number;
  hayReceta: boolean;
  sucursales: Sucursal[];
  sucursal: string;
  onSeleccionarSucursal: (sucursal: string) => void;
  onCambiarCantidad: (productoId: string, delta: number) => void;
  onConfirmar: () => void;
};

export function Apartado({
  items,
  total,
  ahorro,
  hayReceta,
  sucursales,
  sucursal,
  onSeleccionarSucursal,
  onCambiarCantidad,
  onConfirmar,
}: ApartadoProps) {
  return (
    <aside className="apartado-panel">
      <h2>Mi apartado</h2>

      {items.length === 0 ? (
        <p className="apartado-panel__empty">
          Aún no apartas nada. Elige un genérico y se guarda aquí para que lo recojas en tu sucursal.
        </p>
      ) : (
        <>
          <ul className="apartado-panel__lista">
            {items.map(({ producto, cantidad }) => (
              <li className="apartado-panel__item" key={producto.id}>
                <div className="apartado-panel__producto">
                  <strong>{producto.nombre}</strong>
                  <small>{producto.presentacion}</small>
                  <small>{formatearMoneda(producto.precioGenerico)} por caja</small>
                </div>
                <div className="apartado-panel__cantidad">
                  <button type="button" aria-label={`Disminuir ${producto.nombre}`} onClick={() => onCambiarCantidad(producto.id, -1)}>
                    −
                  </button>
                  <span>{cantidad}</span>
                  <button type="button" aria-label={`Aumentar ${producto.nombre}`} onClick={() => onCambiarCantidad(producto.id, 1)}>
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="apartado-panel__meta">
            <span>Total</span>
            <strong>{formatearMoneda(total)}</strong>
          </div>
          <p className="apartado-panel__ahorro">Ahorras {formatearMoneda(ahorro)} frente a la marca.</p>
        </>
      )}

      <label className="apartado-panel__sucursal">
        Recoger en
        <select value={sucursal} onChange={(event) => onSeleccionarSucursal(event.target.value)}>
          {sucursales.map((item) => (
            <option key={item.id} value={item.nombre}>{item.nombre}</option>
          ))}
        </select>
      </label>

      {hayReceta ? (
        <p className="apartado-panel__alerta">Incluye medicamento con receta. Lleva tu receta al recogerlo.</p>
      ) : null}

      <button type="button" className="button button--primary button--wide" onClick={onConfirmar}>
        Confirmar apartado
      </button>
    </aside>
  );
}
