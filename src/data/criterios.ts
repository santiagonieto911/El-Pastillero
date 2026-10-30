import type { Criterio } from '../types';

export const criterios: Criterio[] = [
  { id: 'trato', nombre: 'Cuida el trato al cliente*', obligatorio: true, checked: true },
  { id: 'real', nombre: 'Resuelve algo real', obligatorio: false, checked: true },
  { id: 'presupuesto', nombre: 'Cabe en el presupuesto', obligatorio: false, checked: false },
  { id: 'operacion', nombre: 'La sucursal lo puede operar', obligatorio: false, checked: false },
  { id: 'permisos', nombre: 'Cumple permisos y datos personales*', obligatorio: true, checked: false },
  { id: 'g3', nombre: 'Deja algo para la G3', obligatorio: false, checked: true },
];
