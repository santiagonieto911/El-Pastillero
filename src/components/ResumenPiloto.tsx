type ResumenPilotoProps = {
  total: number;
  cumplimiento: number;
};

export function ResumenPiloto({ total, cumplimiento }: ResumenPilotoProps) {
  return (
    <section className="resumen-piloto">
      <h3>Resumen del piloto</h3>
      <div className="resumen-piloto__grid">
        <div>
          <span>Clientes totales</span>
          <strong>{total}</strong>
        </div>
        <div>
          <span>Cumplimiento</span>
          <strong>{cumplimiento.toFixed(0)}%</strong>
        </div>
      </div>
    </section>
  );
}
