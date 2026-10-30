import type { Criterio } from '../types';

type ResultadoPolitica = {
  cumplidos: number;
  obligatoriosCumplidos: boolean;
  pasa: boolean;
  mensaje: string;
};

type ChecklistPoliticaProps = {
  criterios: Criterio[];
  presupuestoOk: boolean;
  resultado: ResultadoPolitica;
  onToggle: (criterioId: string) => void;
};

export function ChecklistPolitica({ criterios, presupuestoOk, resultado, onToggle }: ChecklistPoliticaProps) {
  return (
    <section className="checklist-politica">
      <h2>Una idea pasa si…</h2>
      <ul>
        {criterios.map((criterio) => {
          const esPresupuesto = criterio.id === 'presupuesto';
          return (
            <li key={criterio.id}>
              <label>
                <input
                  type="checkbox"
                  checked={esPresupuesto ? presupuestoOk : criterio.checked}
                  disabled={esPresupuesto}
                  onChange={() => onToggle(criterio.id)}
                />
                <span>{criterio.nombre}{esPresupuesto ? ' (se revisa solo)' : ''}</span>
              </label>
            </li>
          );
        })}
      </ul>
      <div className={`checklist-politica__status ${resultado.pasa ? 'is-success' : 'is-error'}`} role="status">
        {resultado.mensaje}
      </div>
      <p className="checklist-politica__nota">* Obligatorio. Tiene que cumplir 5 de 6.</p>
    </section>
  );
}
