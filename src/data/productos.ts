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
];
