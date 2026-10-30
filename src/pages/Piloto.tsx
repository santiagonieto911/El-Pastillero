import { ChecklistPolitica } from '../components/ChecklistPolitica';
import { ResumenPiloto } from '../components/ResumenPiloto';
import { TablaPiloto } from '../components/TablaPiloto';
import { usePiloto } from '../hooks/usePiloto';
import { formatearMoneda } from '../lib/formato';
import { evaluarTope, gananciaPiezaGenerico, gananciaPiezaMarca, inversionInicialProducto } from '../lib/calculos';

export function Piloto() {
  const piloto = usePiloto();
  const presupuesto = evaluarTope(piloto.inversion, piloto.tope);
  let estado = 'Elige al menos un producto.';
  if (piloto.productosSeleccionados.length > 0) {
    estado = presupuesto.sePasa
      ? `Te pasas ${formatearMoneda(presupuesto.diferencia)} del tope. Quita un producto o sube el tope.`
      : `Sobran ${formatearMoneda(presupuesto.diferencia)} del tope.`;
  }

  const productosTabla = piloto.productosOrdenados.map((producto) => ({
    producto,
    gananciaMarca: gananciaPiezaMarca(producto),
    gananciaGenerico: gananciaPiezaGenerico(producto),
    inversion: inversionInicialProducto(producto),
  }));

  return (
    <main className="page-piloto">
      <section className="hero-block" aria-label="Prueba piloto">
        <p className="eyebrow">Panel para José</p>
        <h1>Prueba piloto de genéricos</h1>
        <p>Elige pocos productos que se vendan mucho, revisa que la inversión quepa en el tope y que la idea pase la política de innovación antes de aprobar.</p>
      </section>

      <div className="piloto-layout">
        <section className="piloto-controls" aria-label="Controles de la prueba piloto">
          <label>
            Sucursal piloto
            <select value={piloto.sucursal} onChange={(event) => piloto.setSucursal(event.target.value)}>
              {piloto.sucursalesPiloto.map((sucursal) => <option key={sucursal.id} value={sucursal.nombre}>{sucursal.nombre}</option>)}
            </select>
          </label>
          <label>
            Duración en semanas
            <input type="number" min="8" max="12" step="1" value={piloto.semanas} onChange={(event) => piloto.setSemanas(Math.min(12, Math.max(8, Number(event.target.value))))} />
          </label>
          <label>
            Tope de inversión en pesos
            <input type="number" min="0" step="1000" value={piloto.tope} onChange={(event) => piloto.setTope(Math.max(0, Number(event.target.value)))} />
          </label>
          <label className="piloto-slider">
            <span>Clientes que cambian de marca</span>
            <input type="range" min="5" max="60" step="5" value={piloto.tasaCambio} onChange={(event) => piloto.setTasaCambio(Number(event.target.value))} />
            <strong>{piloto.tasaCambio}%</strong>
          </label>
          <button type="button" className="button button--secondary" onClick={piloto.elegirMasVendidos}>
            Elegir los 3 más vendidos
          </button>
        </section>

        <aside className="piloto-resumen">
          <ResumenPiloto
            sucursal={piloto.sucursal}
            inversion={piloto.inversion}
            tope={piloto.tope}
            progreso={presupuesto.progreso}
            estado={estado}
            sePasa={presupuesto.sePasa}
            gananciaMes={piloto.gananciaMes}
            gananciaSemanas={piloto.gananciaSemanas}
            semanas={piloto.semanas}
            tasaCambio={piloto.tasaCambio}
          />
          <ChecklistPolitica
            criterios={piloto.criterios}
            presupuestoOk={piloto.presupuestoOk}
            resultado={piloto.resultadoPolitica}
            onToggle={piloto.alternarCriterio}
          />
        </aside>
      </div>

      <TablaPiloto
        productos={productosTabla}
        seleccionados={piloto.seleccionados}
        onToggle={piloto.alternarProducto}
      />
    </main>
  );
}
