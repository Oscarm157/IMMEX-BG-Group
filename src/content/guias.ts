// Corpus SEO — silo "Conceptos" (/guias/). Plantilla "Concepto".
// Español-first. Cada guía debe tener su campo de valor único (definición
// propia, fundamento legal citado, errores con ángulo legal), no plantilla
// vacía. El contenido jurídico se calibra con material real del sitio y el
// documento de estrategia; al escalar necesita revisión de un experto de BG.

export type QA = { q: string; a: string };

export type Guia = {
  slug: string;
  eyebrow: string;
  h1: string;
  seoTitle: string;
  seoDescription: string;
  // Definición propia en 2-3 párrafos (no copiada del DOF).
  definicion: string[];
  // Fundamento legal exacto (artículo/regla) — diferenciador de una firma legal.
  fundamento: { cita: string; texto: string };
  // Cómo funciona / qué exige.
  puntosClave: { title: string; desc: string }[];
  // Distinción con conceptos que se confunden (opcional).
  distincion?: { title: string; desc: string }[];
  // Errores comunes + consecuencia legal (ángulo BG).
  errores: { title: string; desc: string }[];
  faq: QA[];
  // CTA al servicio corporativo relacionado (ruta /es/services/<slug>).
  servicio: { slug: string; label: string };
  // Slugs de otras guías del cluster (se enlazan solo si existen).
  relacionadas: string[];
  actualizado: string; // ISO corto
};

export const GUIAS: Guia[] = [
  {
    slug: "anexo-24",
    eyebrow: "Guía · Comercio exterior",
    h1: "Anexo 24: el control de inventarios que exige el SAT a una empresa IMMEX",
    seoTitle: "Anexo 24: qué es y cómo cumplirlo | Control de inventarios IMMEX",
    seoDescription:
      "Qué es el Anexo 24, qué debe registrar el sistema de control de inventarios de una empresa IMMEX y su fundamento legal. Errores que derivan en créditos fiscales.",
    definicion: [
      "El Anexo 24 es el conjunto de requisitos que debe cumplir el sistema automatizado de control de inventarios de una empresa con programa IMMEX. No es un formato ni un trámite que se presenta: es el estándar que define cómo debe llevarse el registro de la mercancía de comercio exterior que entra y sale bajo régimen temporal.",
      "Aplica a toda empresa que importa temporalmente insumos, partes o maquinaria bajo IMMEX. El sistema debe registrar cada entrada y cada salida ligada a su pedimento, mantener los saldos actualizados y descargar la mercancía cuando retorna, se transfiere o cambia de régimen. La idea de fondo: la autoridad debe poder rastrear, en cualquier momento, qué pasó con cada mercancía que entró sin pagar impuestos.",
      "Cumplirlo no es opcional ni cosmético. Un sistema que no cuadra con los pedimentos es la primera puerta que revisa la autoridad en una visita domiciliaria, y de ahí salen la mayoría de los créditos fiscales del sector.",
    ],
    fundamento: {
      cita: "Art. 59, fracción I, Ley Aduanera · Anexo 24 de las Reglas Generales de Comercio Exterior",
      texto:
        "El artículo 59, fracción I de la Ley Aduanera obliga a quien importa mercancía a llevar los sistemas de control de inventarios en forma automatizada, con el registro actualizado de los datos de control de las mercancías de comercio exterior. El Anexo 24 de las RGCE detalla los módulos y datos mínimos de ese sistema para las empresas IMMEX. Para el programa, la obligación se refuerza en el Decreto IMMEX.",
    },
    puntosClave: [
      {
        title: "Registro por pedimento",
        desc: "Cada entrada y salida debe quedar ligada al pedimento que la ampara, con fracción arancelaria, cantidad y unidad de medida de comercio exterior.",
      },
      {
        title: "Saldos en tiempo",
        desc: "El sistema mantiene el saldo vivo de cada insumo temporal. La mercancía que entra debe descargarse al retornar, transferirse por pedimento virtual o cambiar de régimen, dentro de los plazos del programa.",
      },
      {
        title: "Automatizado y conservable",
        desc: "El control debe ser automatizado, no una hoja de cálculo llevada a mano, y conservarse por el plazo que exige la ley junto con la documentación que lo soporta.",
      },
      {
        title: "Trazabilidad de mermas y desperdicios",
        desc: "Los consumos, mermas y desperdicios del proceso productivo también se registran y descargan; no basta con controlar producto terminado.",
      },
    ],
    distincion: [
      {
        title: "Anexo 24 vs. Anexo 30",
        desc: "El Anexo 24 es el control de inventarios de la mercancía temporal IMMEX. El Anexo 30 es el sistema de control de descargos que exige la certificación en materia de IVA e IEPS. Se relacionan pero no son lo mismo: una empresa certificada suele necesitar ambos.",
      },
      {
        title: "Anexo 24 vs. Anexo 31",
        desc: "El Anexo 31 corresponde al sistema de control de cuentas de créditos y garantías ligado también a la certificación IVA/IEPS. Cumplir Anexo 24 no cubre por sí solo las obligaciones de la certificación.",
      },
    ],
    errores: [
      {
        title: "Saldos negativos o descuadrados",
        desc: "Cuando el sistema arroja saldos negativos o no cuadra contra los pedimentos, la autoridad presume que la mercancía temporal no retornó. La consecuencia es un crédito fiscal por los impuestos y el IVA que no se pagaron, más recargos y multas.",
      },
      {
        title: "Descargos fuera de plazo",
        desc: "No descargar el retorno o la transferencia dentro del plazo del régimen temporal convierte una operación válida en una omisión, con el mismo efecto de crédito fiscal.",
      },
      {
        title: "Control en Excel",
        desc: "Llevar el inventario en hojas de cálculo manuales no cumple el requisito de sistema automatizado y difícilmente resiste una revisión. Es una de las causas más frecuentes de observación.",
      },
      {
        title: "No conciliar contra pedimentos",
        desc: "Si el inventario del sistema no se concilia periódicamente contra los pedimentos y la contabilidad, las diferencias se acumulan y aparecen todas juntas en la auditoría, cuando ya cuesta corregirlas.",
      },
    ],
    faq: [
      {
        q: "¿Quién está obligado a llevar el Anexo 24?",
        a: "Toda empresa con programa IMMEX que importe mercancía bajo régimen temporal. La obligación nace de la Ley Aduanera y se detalla en las Reglas Generales de Comercio Exterior.",
      },
      {
        q: "¿El Anexo 24 se presenta ante la autoridad?",
        a: "No se presenta como una declaración. Es un sistema que la empresa debe tener operando y disponible en todo momento; la autoridad lo revisa en una visita o al solicitar información.",
      },
      {
        q: "¿Puedo llevar el Anexo 24 en Excel?",
        a: "No cumple el requisito de sistema automatizado. La ley exige un control automatizado con trazabilidad al pedimento y saldos actualizados, algo que una hoja de cálculo manual no garantiza.",
      },
      {
        q: "¿Qué pasa si el sistema no cuadra con los pedimentos?",
        a: "La autoridad puede presumir que la mercancía temporal no retornó y determinar un crédito fiscal por los impuestos omitidos, más recargos y multas. Por eso conviene conciliar antes de que llegue la revisión.",
      },
    ],
    servicio: { slug: "information-technology", label: "Tecnología de cumplimiento y control de inventarios" },
    relacionadas: ["anexo-30", "anexo-31", "que-es-immex", "pedimento"],
    actualizado: "2026-07-10",
  },
];

export const GUIA_SLUGS = GUIAS.map((g) => g.slug);

export function getGuia(slug: string): Guia | undefined {
  return GUIAS.find((g) => g.slug === slug);
}
