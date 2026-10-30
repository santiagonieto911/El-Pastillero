import type { Producto } from '../types';
import { calcularTotal } from '../lib/calculos';

export function useApartado(producto: Producto, cantidad: number) {
  return {
    cantidad,
    total: calcularTotal(producto.precio, cantidad),
  };
}
