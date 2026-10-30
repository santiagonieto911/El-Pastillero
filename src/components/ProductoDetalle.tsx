import { useEffect, useRef } from 'react';
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
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    return () => {
      if (dialog?.open) dialog.close();
    };
  }, []);

  return (
    <dialog ref={dialogRef} className="detalle-dialog" onClose={onClose} aria-label={`Detalle de ${producto.nombre}`}>
      <div className="detalle-dialog__contenido">
        <div className="detalle-dialog__encabezado">
          <h2>{producto.nombre}</h2>
          <button type="button" className="button button--secondary" onClick={onClose}>Cerrar</button>
        </div>
        <p><strong>Presentación:</strong> {producto.presentacion}</p>
        <p><strong>Para qué se usa:</strong> {producto.uso}</p>
        <p><strong>Receta:</strong> {producto.receta ? 'Se necesita receta.' : 'No se necesita receta.'}</p>
        <p><strong>Ahorro por caja:</strong> {formatearMoneda(ahorro)}</p>
        <p><strong>Ahorras {formatearMoneda(ahorroAnual)} al año</strong> si lo usas cada mes.</p>
        <p><strong>Registro sanitario:</strong> Se confirma con el laboratorio antes de la venta.</p>
        <p className="detalle-dialog__nota">
          Un genérico intercambiable lleva la misma sustancia activa que la marca. Si ya sigues un tratamiento, consulta a tu médico o farmacéutico antes de cambiar.
        </p>
        <div className="detalle-dialog__acciones">
          <button type="button" className="button button--secondary" onClick={onClose}>Cerrar</button>
          <button type="button" className="button button--primary" onClick={() => onApartar(producto)}>Apartar</button>
        </div>
      </div>
    </dialog>
  );
}
