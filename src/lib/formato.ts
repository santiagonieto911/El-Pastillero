export const formatearMoneda = (valor: number) =>
  new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 2,
  }).format(valor);

export const formatearNumero = (valor: number) =>
  new Intl.NumberFormat('es-MX').format(valor);
