import type { Criterio, ItemApartado, Producto } from '../types';

export function ahorroPorCaja(producto: Producto): number {
  return producto.precioMarca - producto.precioGenerico;
}

export function porcentajeAhorro(producto: Producto): number {
  return Math.round((ahorroPorCaja(producto) / producto.precioMarca) * 100);
}

export function ahorroAnual(producto: Producto): number {
  return ahorroPorCaja(producto) * 12;
}

export function totalGenerico(items: ItemApartado[]): number {
  return items.reduce((total, item) => total + item.producto.precioGenerico * item.cantidad, 0);
}

export function totalMarca(items: ItemApartado[]): number {
  return items.reduce((total, item) => total + item.producto.precioMarca * item.cantidad, 0);
}

export function ahorroApartado(items: ItemApartado[]): number {
  return totalMarca(items) - totalGenerico(items);
}

export function gananciaPiezaMarca(producto: Producto): number {
  return producto.precioMarca - producto.costoMarca;
}

export function gananciaPiezaGenerico(producto: Producto): number {
  return producto.precioGenerico - producto.costoGenerico;
}

export function inversionInicialProducto(producto: Producto): number {
  return producto.minimoLab * producto.costoGenerico;
}

export function totalInversion(productos: Producto[]): number {
  return productos.reduce((total, producto) => total + inversionInicialProducto(producto), 0);
}

export function gananciaExtraMes(productos: Producto[], tasaCambio: number): number {
  return productos.reduce(
    (total, producto) =>
      total +
      producto.ventasMes *
        (tasaCambio / 100) *
        (gananciaPiezaGenerico(producto) - gananciaPiezaMarca(producto)),
    0,
  );
}

export function gananciaExtraSemanas(
  productos: Producto[],
  semanas: number,
  tasaCambio: number,
): number {
  return (gananciaExtraMes(productos, tasaCambio) * semanas) / 4.3;
}

export function cabeEnPresupuesto(productos: Producto[], tope: number): boolean {
  return productos.length > 0 && totalInversion(productos) <= tope;
}

export function evaluarPolitica(criterios: Criterio[], presupuestoOk: boolean): {
  cumplidos: number;
  obligatoriosCumplidos: boolean;
  pasa: boolean;
  mensaje: string;
} {
  const criteriosEvaluados = criterios.map((criterio) =>
    criterio.id === 'presupuesto' ? { ...criterio, checked: presupuestoOk } : criterio,
  );
  const cumplidos = criteriosEvaluados.filter((criterio) => criterio.checked).length;
  const obligatoriosCumplidos = criteriosEvaluados
    .filter((criterio) => criterio.obligatorio)
    .every((criterio) => criterio.checked);
  const pasa = cumplidos >= 5 && obligatoriosCumplidos;

  let mensaje: string;
  if (pasa) {
    mensaje = `Pasa: cumple ${cumplidos} de 6 y los dos obligatorios. José puede aprobar la prueba.`;
  } else if (!obligatoriosCumplidos) {
    mensaje = `Todavía no pasa: cumple ${cumplidos} de 6. Faltan los obligatorios (*).`;
  } else {
    mensaje = `Todavía no pasa: cumple ${cumplidos} de 6. Necesita al menos 5.`;
  }

  return { cumplidos, obligatoriosCumplidos, pasa, mensaje };
}
