import { ChecklistPolitica } from '../components/ChecklistPolitica';
import { ResumenPiloto } from '../components/ResumenPiloto';
import { TablaPiloto } from '../components/TablaPiloto';
import { usePiloto } from '../hooks/usePiloto';

export function Piloto() {
  const piloto = usePiloto();

  return (
    <main className="page-piloto">
      <section className="hero-block">
        <p className="eyebrow">Prueba piloto</p>
        <h1>Evaluación de José</h1>
      </section>

      <div className="piloto-metricas">
        <div className="piloto-metrica">
          <span>Total de clientes</span>
          <strong>{piloto.total}</strong>
        </div>
        <div className="piloto-metrica">
          <span>Cumplimiento</span>
          <strong>{piloto.cumplimiento.toFixed(0)}%</strong>
        </div>
      </div>

      <TablaPiloto sucursales={piloto.sucursales} />
      <ResumenPiloto total={piloto.total} cumplimiento={piloto.cumplimiento} />
      <ChecklistPolitica criterios={piloto.criterios} />
    </main>
  );
}
