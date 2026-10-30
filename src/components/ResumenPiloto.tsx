type ResumenPilotoProps = {
  total: number;
  cumplimiento: number;
};

export function ResumenPiloto({ total, cumplimiento }: ResumenPilotoProps) {
  return (
    <section className="resumen-piloto">
      <h3>Resumen del piloto</h3>
      <div className="resumen-piloto__meta">
        <span>Inversión total</span>
        <strong>{total}</strong>
      </div>
      <div className="progress-bar" aria-label="Progreso del piloto">
        <span style={{ width: `${Math.min(cumplimiento, 100)}%` }} />
      </div>
      <p className="resumen-piloto__estado">Cumplimiento estimado: {cumplimiento.toFixed(0)}%.</p>
      <div className="resumen-piloto__grid">
        <div>
          <span>Clientes</span>
          <strong>{total}</strong>
        </div>
        <div>
          <span>Meta</span>
          <strong>{Math.min(Math.round(cumplimiento), 100)}%</strong>
        </div>
      </div>
    </section>
  );
}
