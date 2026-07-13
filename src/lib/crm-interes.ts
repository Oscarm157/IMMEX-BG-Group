import { SERVICE_DETAIL } from "@/content/services-detail";

// Los diagnósticos del sitio guardan en el lead un CÓDIGO de resultado
// (p. ej. "DEFENSE", "IMMEDIATE_DEFENSE"). Para el CRM se traduce a la etiqueta
// legible en español. El mapa se agrega desde services-detail.ts (fuente única de
// los resultTag) para no duplicar ni desincronizar.
const INTERES_CODE_LABELS: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  for (const svc of SERVICE_DETAIL.es) {
    const rt = svc.diagnostic?.resultTag;
    if (!rt) continue;
    for (const [code, label] of Object.entries(rt)) {
      if (!map[code]) map[code] = label.es;
    }
  }
  return map;
})();

/**
 * Normaliza el valor de "Interés" para mostrarlo: si es un código de diagnóstico
 * conocido devuelve su etiqueta ES; si ya es texto (industria/servicio manual) lo
 * devuelve tal cual. `null` si no hay valor.
 */
export function interesLabel(raw?: string | null): string | null {
  if (!raw) return null;
  const k = raw.trim();
  if (!k) return null;
  return INTERES_CODE_LABELS[k] ?? k;
}
