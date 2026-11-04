export type Producto = {
  id: string;
  nombre: string;
  presentacion: string;
  receta: boolean;
  precioMarca: number;
  precioGenerico: number;
  costoMarca: number;
  costoGenerico: number;
  ventasMes: number;
  minimoLab: number;
  uso: string;
};

export type TipoSucursal = 'Farmacia' | 'Minisúper';

export type Sucursal = {
  id: string;
  nombre: string;
  tipo: TipoSucursal;
};

export type Criterio = {
  id: string;
  nombre: string;
  obligatorio: boolean;
  checked: boolean;
};

export type FiltroCatalogo = 'todos' | 'sin' | 'con';

export type ItemApartado = {
  producto: Producto;
  cantidad: number;
};
