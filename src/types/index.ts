export type Categoria = 'Analgésico' | 'Antibiótico' | 'Vitaminas' | 'Control' | 'General';

export type Producto = {
  id: string;
  nombre: string;
  categoria: Categoria;
  presentacion: string;
  precio: number;
  stock: number;
  descripcion: string;
};

export type Sucursal = {
  id: string;
  nombre: string;
  zona: string;
  clientes: number;
};

export type Criterio = {
  id: string;
  nombre: string;
  valor: number;
  descripcion: string;
};
