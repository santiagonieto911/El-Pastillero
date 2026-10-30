import { criterios } from '../data/criterios';
import { sucursales } from '../data/sucursales';
import { calcularCumplimiento, calcularTotalClientes } from '../lib/calculos';

export function usePiloto() {
  const total = calcularTotalClientes(sucursales);
  const cumplimiento = calcularCumplimiento(criterios);

  return {
    total,
    cumplimiento,
    sucursales,
    criterios,
  };
}
