import type { Producto } from '../types';

export const productos: Producto[] = [
  {
    id: 'prod-01',
    nombre: 'Paracetamol 500 mg',
    categoria: 'Analgésico',
    presentacion: 'Caja con 20 tabletas',
    precio: 59,
    stock: 120,
    descripcion: 'Analgesia y reducción de fiebre.',
  },
  {
    id: 'prod-02',
    nombre: 'Amoxicilina 500 mg',
    categoria: 'Antibiótico',
    presentacion: 'Caja con 12 tabletas',
    precio: 92,
    stock: 80,
    descripcion: 'Uso indicado bajo prescripción médica.',
  },
  {
    id: 'prod-03',
    nombre: 'Multivitamínico',
    categoria: 'Vitaminas',
    presentacion: 'Frasco con 30 tabletas',
    precio: 138,
    stock: 64,
    descripcion: 'Complemento vitamínico para uso diario.',
  },
];
