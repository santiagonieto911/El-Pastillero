import type { Producto } from '../types';
import { formatearMoneda } from '../lib/formato';

type ProductoTabla = {
  producto: Producto;
  gananciaMarca: number;
  gananciaGenerico: number;
  inversion: number;
};

type TablaPilotoProps = {
  productos: ProductoTabla[];
  seleccionados: string[];
  onToggle: (productoId: string) => void;
};

export function TablaPiloto({ productos, seleccionados, onToggle }: TablaPilotoProps) {
  return (
    <div className="tabla-wrap">
      <table className="tabla-piloto">
        <thead>
          <tr>
            <th>Incluir</th>
            <th>Producto</th>
            <th>Ventas al mes (piezas)</th>
            <th>Ganancia por pieza hoy</th>
            <th>Ganancia por pieza genérico</th>
            <th>Mínimo al laboratorio (piezas)</th>
            <th>Inversión inicial</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(({ producto, gananciaMarca, gananciaGenerico, inversion }) => (
            <tr key={producto.id}>
              <td>
                <input
                  type="checkbox"
                  checked={seleccionados.includes(producto.id)}
                  aria-label={`Incluir ${producto.nombre}`}
                  onChange={() => onToggle(producto.id)}
                />
              </td>
              <td>
                <strong>{producto.nombre}{producto.receta ? ' (receta)' : ''}</strong>
                <small className="tabla-piloto__presentacion">{producto.presentacion}</small>
              </td>
              <td>{producto.ventasMes}</td>
              <td>{formatearMoneda(gananciaMarca)}</td>
              <td className="cell-green">{formatearMoneda(gananciaGenerico)}</td>
              <td>{producto.minimoLab}</td>
              <td>{formatearMoneda(inversion)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
