import { useEffect } from 'react';
import type { Producto } from '../types';
import { formatearMoneda } from '../lib/formato';

type ProductoDetalleProps = {
  producto: Producto;
  ahorro: number;
  ahorroAnual: number;
  onClose: () => void;
  onApartar: (producto: Producto) => void;
};

export function ProductoDetalle({ producto, ahorro, ahorroAnual, onClose, onApartar }: ProductoDetalleProps) {
  useEffect(() => {
    const cerrarConEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', cerrarConEscape);
    return () => {
      window.removeEventListener('keydown', cerrarConEscape);
    };
  }, [onClose]);

  return (
    <div
      className="detalle-overlay"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section className="detalle-dialog" role="dialog" aria-modal="true" aria-label={`Detalle de ${producto.nombre}`}>
        <div className="detalle-dialog__contenido">
          <div className="detalle-dialog__encabezado">
            <h2>{producto.nombre}</h2>
            <button type="button" className="button button--secondary" onClick={onClose}>Cerrar</button>
          </div>
          <p><strong>Presentación:</strong> {producto.presentacion}</p>
          <p><strong>Para qué se usa:</strong> {producto.uso}</p>
          <p><strong>Receta:</strong> {producto.receta ? 'Se necesita receta.' : 'No se necesita receta.'}</p>
          <p><strong>Ahorro por caja:</strong> {formatearMoneda(ahorro)}</p>
          <p><strong>Ahorro anual estimado:</strong> {formatearMoneda(ahorroAnual)} si compras una caja al mes.</p>
          <p>El registro sanitario se confirmará con el laboratorio antes de la venta.</p>
          <p className="detalle-dialog__nota">
            Consulta a tu médico o farmacéutico antes de cambiar tu tratamiento.
          </p>
          <div className="detalle-dialog__acciones">
            <button type="button" className="button button--secondary" onClick={onClose}>Cerrar</button>
            <button type="button" className="button button--primary" onClick={() => onApartar(producto)}>Apartar</button>
          </div>
        </div>
      </section>
    </div>
  );
}
