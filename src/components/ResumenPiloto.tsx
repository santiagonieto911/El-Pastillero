import { formatearMoneda } from '../lib/formato';

type ResumenPilotoProps = {
  sucursal: string;
  inversion: number;
  tope: number;
  progreso: number;
  estado: string;
  sePasa: boolean;
  gananciaMes: number;
  gananciaSemanas: number;
  semanas: number;
  tasaCambio: number;
};

export function ResumenPiloto({
  sucursal,
  inversion,
  tope,
  progreso,
  estado,
  sePasa,
  gananciaMes,
  gananciaSemanas,
  semanas,
  tasaCambio,
}: ResumenPilotoProps) {
  return (
    <section className="resumen-piloto">
      <h2>Resumen de la prueba en {sucursal}</h2>
      <div className="resumen-piloto__meta">
        <span>Inversión total</span>
        <strong>{formatearMoneda(inversion)} de {formatearMoneda(tope)}</strong>
      </div>
      <div className={`progress-bar ${sePasa ? 'progress-bar--excedido' : ''}`} aria-label="Avance del tope de inversión">
        <span style={{ width: `${progreso}%` }} />
      </div>
      <p className="resumen-piloto__estado">{estado}</p>
      <div className="resumen-piloto__grid">
        <div>
          <span>Ganancia extra al mes</span>
          <strong>{formatearMoneda(gananciaMes)}</strong>
        </div>
        <div>
          <span>Ganancia extra en {semanas} semanas</span>
          <strong>{formatearMoneda(gananciaSemanas)}</strong>
        </div>
      </div>
      <p className="resumen-piloto__nota">
        Supone que {tasaCambio}% de los clientes de la marca cambia al genérico.
      </p>
    </section>
  );
}
