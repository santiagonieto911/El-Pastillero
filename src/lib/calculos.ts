export const sumar = (a: number, b: number) => a + b;

export const calcularTotal = (precio: number, cantidad: number) => precio * cantidad;

export const calcularPromedio = (valores: number[]) => {
  if (!valores.length) {
    return 0;
  }

  return valores.reduce((total, valor) => total + valor, 0) / valores.length;
};

export const calcularTotalClientes = (sucursales: Array<{ clientes: number }>) =>
  sucursales.reduce((total, sucursal) => total + sucursal.clientes, 0);

export const calcularCumplimiento = (criterios: Array<{ valor: number }>) =>
  calcularPromedio(criterios.map((criterio) => criterio.valor));

export const promoverResultado = (valor: number, meta: number) => valor >= meta;
