import { useMemo, useState } from 'react';
import { productos } from '../data/productos';
import { ahorroApartado, totalGenerico, totalMarca } from '../lib/calculos';
import type { ItemApartado, Producto } from '../types';

export function useApartado() {
  const [cantidades, setCantidades] = useState<Record<string, number>>({});

  const items = useMemo<ItemApartado[]>(
    () =>
      Object.entries(cantidades).flatMap(([productoId, cantidad]) => {
        const producto = productos.find((item) => item.id === productoId);
        return producto && cantidad > 0 ? [{ producto, cantidad }] : [];
      }),
    [cantidades],
  );

  const agregar = (producto: Producto) => {
    setCantidades((actuales) => ({
      ...actuales,
      [producto.id]: (actuales[producto.id] ?? 0) + 1,
    }));
  };

  const cambiarCantidad = (productoId: string, delta: number) => {
    setCantidades((actuales) => {
      const cantidad = (actuales[productoId] ?? 0) + delta;
      if (cantidad <= 0) {
        const siguientes = { ...actuales };
        delete siguientes[productoId];
        return siguientes;
      }
      return { ...actuales, [productoId]: cantidad };
    });
  };

  const limpiar = () => setCantidades({});

  return {
    items,
    total: totalGenerico(items),
    totalMarca: totalMarca(items),
    ahorro: ahorroApartado(items),
    agregar,
    cambiarCantidad,
    limpiar,
  };
}
