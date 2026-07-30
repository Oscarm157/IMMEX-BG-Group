// Tabla real: un criterio por fila, una columna por opción a comparar.
// Familia distinta de ParPolar (paneles) y de PliegoRequisitos (dt/dd): aquí
// la comparación es la protagonista, por eso vive en <table>.
export function TablaCriterios({
  columnas,
  filas,
}: {
  columnas: readonly string[];
  filas: readonly { criterio: string; celdas: readonly string[] }[];
}) {
  return (
    <div className="overflow-x-auto rounded-[16px] border border-line">
      <table className="w-full min-w-[560px] border-collapse text-left">
        <thead>
          <tr className="border-b border-line bg-surface-1/60">
            <th scope="col" className="px-6 py-4 font-mono text-[11px] uppercase tracking-[0.14em] text-ash">
              Criterio
            </th>
            {columnas.map((col) => (
              <th key={col} scope="col" className="px-6 py-4 font-mono text-[11px] uppercase tracking-[0.14em] text-ash">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filas.map((f) => (
            <tr key={f.criterio} className="border-b border-line last:border-b-0">
              <th scope="row" className="px-6 py-5 text-left font-display text-[15px] font-medium text-chalk">
                {f.criterio}
              </th>
              {f.celdas.map((c, i) => (
                <td key={i} className="px-6 py-5 text-[15px] leading-relaxed text-bone/85">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
