type ChecklistPoliticaProps = {
  criterios: Array<{ id: string; nombre: string; valor: number }>;
};

export function ChecklistPolitica({ criterios }: ChecklistPoliticaProps) {
  return (
    <section className="checklist-politica">
      <h3>Checklist de política</h3>
      <ul>
        {criterios.map((criterio) => (
          <li key={criterio.id}>
            <span>{criterio.nombre}</span>
            <strong>{criterio.valor}%</strong>
          </li>
        ))}
      </ul>
      <div className="checklist-politica__status is-success">Cumple con la política mínima</div>
    </section>
  );
}
