import type { Sucursal } from '../types';

type TablaPilotoProps = {
  sucursales: Sucursal[];
};

export function TablaPiloto({ sucursales }: TablaPilotoProps) {
  return (
    <table className="tabla-piloto">
      <thead>
        <tr>
          <th>Sucursal</th>
          <th>Zona</th>
          <th>Clientes</th>
        </tr>
      </thead>
      <tbody>
        {sucursales.map((sucursal) => (
          <tr key={sucursal.id}>
            <td>{sucursal.nombre}</td>
            <td>{sucursal.zona}</td>
            <td>{sucursal.clientes}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
