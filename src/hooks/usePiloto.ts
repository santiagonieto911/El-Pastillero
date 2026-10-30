import { useMemo, useState } from 'react';
import { criterios as criteriosIniciales } from '../data/criterios';
import { productos } from '../data/productos';
import { sucursales } from '../data/sucursales';
import {
  cabeEnPresupuesto,
  evaluarPolitica,
  gananciaExtraMes,
  gananciaExtraSemanas,
  totalInversion,
} from '../lib/calculos';

export function usePiloto() {
  const [sucursal, setSucursal] = useState('Farmacia 1');
  const [semanas, setSemanas] = useState(10);
  const [tope, setTope] = useState(25000);
  const [tasaCambio, setTasaCambio] = useState(25);
  const [seleccionados, setSeleccionados] = useState<string[]>(['para', 'met', 'ibu']);
  const [criterios, setCriterios] = useState(criteriosIniciales);

  const productosOrdenados = useMemo(
    () => [...productos].sort((a, b) => b.ventasMes - a.ventasMes),
    [],
  );
  const productosSeleccionados = useMemo(
    () => productosOrdenados.filter((producto) => seleccionados.includes(producto.id)),
    [productosOrdenados, seleccionados],
  );

  const inversion = totalInversion(productosSeleccionados);
  const presupuestoOk = cabeEnPresupuesto(productosSeleccionados, tope);
  const resultadoPolitica = evaluarPolitica(criterios, presupuestoOk);

  const alternarProducto = (productoId: string) => {
    setSeleccionados((actuales) =>
      actuales.includes(productoId)
        ? actuales.filter((id) => id !== productoId)
        : [...actuales, productoId],
    );
  };

  const elegirMasVendidos = () => {
    setSeleccionados(productosOrdenados.slice(0, 3).map((producto) => producto.id));
  };

  const alternarCriterio = (criterioId: string) => {
    if (criterioId === 'presupuesto') {
      return;
    }
    setCriterios((actuales) =>
      actuales.map((criterio) =>
        criterio.id === criterioId ? { ...criterio, checked: !criterio.checked } : criterio,
      ),
    );
  };

  return {
    sucursalesPiloto: sucursales.filter((sucursalItem) => sucursalItem.tipo === 'Farmacia'),
    sucursal,
    setSucursal,
    semanas,
    setSemanas,
    tope,
    setTope,
    tasaCambio,
    setTasaCambio,
    productosOrdenados,
    productosSeleccionados,
    seleccionados,
    alternarProducto,
    elegirMasVendidos,
    inversion,
    presupuestoOk,
    gananciaMes: gananciaExtraMes(productosSeleccionados, tasaCambio),
    gananciaSemanas: gananciaExtraSemanas(productosSeleccionados, semanas, tasaCambio),
    criterios,
    alternarCriterio,
    resultadoPolitica,
  };
}
