// Contenido rico por servicio (problema -> solución), generado y verificado con orquestación
// multi-agente a partir del contenido real del sitio (docs/bgcg-site-content.txt) + dominio
// aduanero/fiscal. Factual, sin invenciones, sin vende-humos. Orden = SERVICE_SLUGS.

type DiagnosticForm = {
  heading: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  phonePlaceholder: string;
  submit: string;
  sending: string;
  successTitle: string;
  successBody: string;
  errorMsg: string;
  nameRequired: string;
  emailRequired: string;
  emailInvalid: string;
};

export type DiagnosticLang = {
  eyebrow: string;
  title: string;
  lead: string;
  restart: string;
  questions: readonly { text: string; opts: readonly string[] }[];
  results: Record<string, { title: string; body: string; cta: string }>;
  contactTJ: string;
  contactSD: string;
  contactEmail: string;
  of: string;
  progress: string;
  form: DiagnosticForm;
};

export type DiagnosticData = {
  es: DiagnosticLang;
  en: DiagnosticLang;
  getResult: (answers: number[]) => string;
  resultTag: Record<string, { es: string; en: string }>;
  stageForResult: Record<string, number>;
};

export type FlowStage = { n: string; name: string; desc: string };

export type FlowLang = {
  eyebrow: string;
  title: string;
  lead: string;
  panel: string;
  stages: readonly FlowStage[];
};

export type FlowData = {
  es: FlowLang;
  en: FlowLang;
};

export type ServiceDetail = {
  overview: string;
  pains: { title: string; desc: string }[];
  whatWeDo: { title: string; desc: string }[];
  outcomes: string[];
  faq: { q: string; a: string }[];
  diagnostic?: DiagnosticData;
  flow?: FlowData;
  bandImage?: string;
  bandCaption?: string;
};

const FT_DIAGNOSTIC: DiagnosticData = {
  es: {
    eyebrow: "Diagnóstico rápido",
    title: "¿Por dónde empieza tu caso?",
    lead: "Cuatro preguntas para orientarte hacia el área correcta.",
    restart: "Volver a empezar",
    questions: [
      {
        text: "¿Cuál es tu situación hoy?",
        opts: [
          "Me llegó una notificación: auditoría, PAMA, multa o crédito fiscal",
          "Tengo una revisión en curso y necesito responder con sustento técnico",
          "Quiero revisar mi cumplimiento antes de que llegue una auditoría",
          "Tengo una decisión de negocio con impacto aduanero que evaluar",
        ],
      },
      {
        text: "¿Tu empresa opera bajo programa IMMEX?",
        opts: [
          "Sí, y tenemos dudas sobre si cumplimos todos los requisitos",
          "Sí, pero queremos una revisión periódica para mantenerlo en orden",
          "No, pero estamos evaluando obtenerlo",
          "No, nuestra operación no requiere IMMEX",
        ],
      },
      {
        text: "¿Hay plazos que ya están corriendo?",
        opts: [
          "Sí, tengo días o pocas semanas para actuar",
          "Sí, pero tengo uno a tres meses de margen",
          "No hay plazos inmediatos, es planeación",
          "No lo sé con certeza",
        ],
      },
      {
        text: "¿Cuál es el corredor principal de tu operación?",
        opts: [
          "Tijuana - San Diego",
          "Otro cruce fronterizo en la zona norte",
          "Operación marítima, aérea o interior",
          "Aún no tenemos operaciones activas",
        ],
      },
    ],
    results: {
      HIGH_DEFENSE: {
        title: "Defensa con plazos corriendo",
        body: "Los medios de defensa tienen fechas límite que arrancan con la notificación del acto. Revisamos el alcance, construimos los agravios y presentamos el recurso o la demanda dentro de los plazos del procedimiento.",
        cta: "Hablar con el equipo",
      },
      DEFENSE: {
        title: "Defensa técnica ante la autoridad",
        body: "Revisamos el acto, el soporte documental de las operaciones y construimos la postura técnica. La defensa se conduce desde la notificación hasta su conclusión por la vía que conviene al caso.",
        cta: "Hablar con el equipo",
      },
      COMPLIANCE_IMMEX: {
        title: "Auditoría preventiva IMMEX",
        body: "Identificamos las contingencias antes de que las encuentre la autoridad: clasificación, valoración, Anexo 24, soporte documental y control de inventarios. El diagnóstico precede a cualquier revisión.",
        cta: "Programar revisión",
      },
      ADVISORY: {
        title: "Asesoría antes de actuar",
        body: "Cada decisión con efecto aduanero o fiscal conviene evaluarla antes de ejecutarla. Analizamos el caso, fijamos la contingencia y orientamos la decisión con criterio técnico.",
        cta: "Consultar",
      },
      GENERAL: {
        title: "Diagnóstico de la operación",
        body: "Revisamos el punto de partida y orientamos el trabajo hacia lo que la operación necesita, sin presuposiciones sobre el área ni la urgencia.",
        cta: "Hablar con el equipo",
      },
    },
    contactTJ: "Tijuana +52 (664) 607 9642",
    contactSD: "San Diego (619) 638-2168",
    contactEmail: "contacto@bgc.mx",
    of: "de",
    progress: "Pregunta",
    form: {
      heading: "Recibe orientación del equipo",
      namePlaceholder: "Nombre completo",
      emailPlaceholder: "Correo electrónico",
      phonePlaceholder: "Teléfono (opcional)",
      submit: "Enviar",
      sending: "Enviando...",
      successTitle: "Recibido",
      successBody: "El equipo revisará tu caso y se pondrá en contacto contigo en breve.",
      errorMsg: "Ocurrió un error al enviar. Intenta de nuevo o escribe a contacto@bgc.mx.",
      nameRequired: "El nombre es obligatorio",
      emailRequired: "El correo electrónico es obligatorio",
      emailInvalid: "Correo electrónico no válido",
    },
  },
  en: {
    eyebrow: "Quick diagnostic",
    title: "Where does your case start?",
    lead: "Four questions to point you toward the right area.",
    restart: "Start over",
    questions: [
      {
        text: "What is your situation today?",
        opts: [
          "I received a notice: audit, PAMA, fine, or tax assessment",
          "A review is underway and I need to respond with technical support",
          "I want to check my compliance before an audit arrives",
          "I have a business decision with customs or tax impact to evaluate",
        ],
      },
      {
        text: "Does your company operate under an IMMEX program?",
        opts: [
          "Yes, and we have doubts about whether we meet all the requirements",
          "Yes, we run it but want a periodic review to keep it in order",
          "No, but we are evaluating whether to obtain it",
          "No, our operation does not require IMMEX",
        ],
      },
      {
        text: "Are deadlines already running?",
        opts: [
          "Yes, I have days or a few weeks to act",
          "Yes, but I have one to three months of room",
          "No immediate deadlines, this is planning",
          "I am not sure",
        ],
      },
      {
        text: "What is the main corridor for your operation?",
        opts: [
          "Tijuana - San Diego",
          "Another border crossing in the northern zone",
          "Maritime, air, or inland operation",
          "No active cross-border operations yet",
        ],
      },
    ],
    results: {
      HIGH_DEFENSE: {
        title: "Defense with deadlines running",
        body: "Defense remedies carry deadlines that start at notification. We review the act, build the grievances, and file the appeal or lawsuit within the procedural deadlines.",
        cta: "Talk to the team",
      },
      DEFENSE: {
        title: "Technical defense before the authority",
        body: "We review the act, the supporting documentation, and build the technical position. The defense is handled from notification through to conclusion by the route that fits the case.",
        cta: "Talk to the team",
      },
      COMPLIANCE_IMMEX: {
        title: "Preventive IMMEX audit",
        body: "We identify contingencies before the authority does: classification, valuation, Annex 24, documentary support, and inventory control. The diagnosis comes before any review.",
        cta: "Schedule a review",
      },
      ADVISORY: {
        title: "Advisory before acting",
        body: "Every decision with customs or tax effect is worth evaluating before execution. We analyze the case, fix the exposure, and orient the decision with technical criteria.",
        cta: "Consult",
      },
      GENERAL: {
        title: "Operation diagnostic",
        body: "We review the starting point and direct the work to what the operation needs, without assumptions about the area or the urgency.",
        cta: "Talk to the team",
      },
    },
    contactTJ: "Tijuana +52 (664) 607 9642",
    contactSD: "San Diego (619) 638-2168",
    contactEmail: "contacto@bgc.mx",
    of: "of",
    progress: "Question",
    form: {
      heading: "Get guidance from the team",
      namePlaceholder: "Full name",
      emailPlaceholder: "Email address",
      phonePlaceholder: "Phone (optional)",
      submit: "Send",
      sending: "Sending...",
      successTitle: "Received",
      successBody: "The team will review your case and be in touch shortly.",
      errorMsg: "An error occurred. Try again or write to contacto@bgc.mx.",
      nameRequired: "Name is required",
      emailRequired: "Email address is required",
      emailInvalid: "Invalid email address",
    },
  },
  getResult(answers: number[]): string {
    const [q1, q2, q3] = answers;
    if ((q1 === 0 || q1 === 1) && q3 === 0) return "HIGH_DEFENSE";
    if (q1 === 0 || q1 === 1) return "DEFENSE";
    if (q1 === 2 && (q2 === 0 || q2 === 1)) return "COMPLIANCE_IMMEX";
    if (q2 === 0 || q2 === 2) return "COMPLIANCE_IMMEX";
    if (q1 === 3) return "ADVISORY";
    return "GENERAL";
  },
  resultTag: {
    HIGH_DEFENSE: { es: "Defensa inmediata", en: "Immediate defense" },
    DEFENSE: { es: "Defensa técnica", en: "Technical defense" },
    COMPLIANCE_IMMEX: { es: "Cumplimiento IMMEX", en: "IMMEX compliance" },
    ADVISORY: { es: "Asesoría", en: "Advisory" },
    GENERAL: { es: "Diagnóstico", en: "Diagnostic" },
  },
  stageForResult: {
    HIGH_DEFENSE: 4,
    DEFENSE: 4,
    COMPLIANCE_IMMEX: 3,
    ADVISORY: 0,
    GENERAL: 2,
  },
};

const FT_FLOW: FlowData = {
  es: {
    eyebrow: "Ciclo del pedimento",
    title: "De la clasificación al cierre del asunto.",
    lead: "Cada operación recorre las mismas etapas. Cuando la autoridad interviene, BG conduce la defensa desde la notificación hasta la resolución.",
    panel: "Flujo aduanal · 5 etapas",
    stages: [
      {
        n: "01",
        name: "Clasificación",
        desc: "Se determina la fracción arancelaria de la mercancía con las Reglas Generales de Interpretación. Un error en la fracción define el arancel, las regulaciones y los permisos que se activan, y es el punto de partida de la mayoría de las controversias.",
      },
      {
        n: "02",
        name: "Valoración",
        desc: "El valor en aduana se fija conforme al Acuerdo de Valoración de la OMC: valor de transacción más los ajustes incrementables que correspondan. Cuando hay vinculación entre partes o el método principal no aplica, se acude a los métodos secundarios en el orden que marca la ley.",
      },
      {
        n: "03",
        name: "Pedimento",
        desc: "El pedimento concentra toda la información de la operación: fracción, valor, origen, contribuciones y regulaciones no arancelarias. El agente aduanal lo transmite ante el mecanismo de selección automatizado, que determina si la mercancía pasa a reconocimiento.",
      },
      {
        n: "04",
        name: "Cumplimiento",
        desc: "Una vez liberada la mercancía, el cumplimiento continúa: Anexo 24 para el control de inventarios IMMEX, validación Anexo 31 y registro de retornos en plazo. Sin estos controles, los impuestos diferidos se causan y el programa queda en riesgo.",
      },
      {
        n: "05",
        name: "Defensa",
        desc: "Si la autoridad observa la operación, los plazos para defenderse arrancan con la notificación. BG revisa el acto, construye los agravios con sustento técnico y conduce el asunto por la vía que corresponda: recurso, juicio ante el TFJA, amparo o acuerdo conclusivo.",
      },
    ],
  },
  en: {
    eyebrow: "Customs cycle",
    title: "From classification to case closure.",
    lead: "Every operation moves through the same stages. When the authority steps in, BG handles the defense from notification through to resolution.",
    panel: "Customs flow · 5 stages",
    stages: [
      {
        n: "01",
        name: "Classification",
        desc: "The tariff code is determined under the General Rules of Interpretation. An error in the classification drives the duty rate, the non-tariff regulations, and the permits that apply, and is where most disputes begin.",
      },
      {
        n: "02",
        name: "Valuation",
        desc: "Customs value is set under the WTO Valuation Agreement: transaction value plus the applicable dutiable additions. When buyer and seller are related or the primary method does not apply, the law moves to secondary methods in a fixed order.",
      },
      {
        n: "03",
        name: "Entry",
        desc: "The customs entry captures everything: tariff code, value, origin, duties, and non-tariff regulations. The customs broker transmits it to the automated selection system, which determines whether the shipment goes to inspection.",
      },
      {
        n: "04",
        name: "Compliance",
        desc: "After release, compliance continues: Annex 24 for IMMEX inventory control, Annex 31 validation, and on-time return records. Without these controls, deferred duties come due and the program is at risk.",
      },
      {
        n: "05",
        name: "Defense",
        desc: "If the authority challenges the operation, defense deadlines run from notification. BG reviews the act, builds the grievances with technical support, and handles the matter by whichever route fits: appeal, TFJA litigation, amparo, or conclusive agreement.",
      },
    ],
  },
};

const LEGAL_DIAGNOSTIC: DiagnosticData = {
  es: {
    eyebrow: "Diagnóstico rápido",
    title: "¿Por dónde empieza tu asunto?",
    lead: "Cuatro preguntas para orientarte hacia la vía correcta.",
    restart: "Volver a empezar",
    questions: [
      {
        text: "¿Cuál es tu situación hoy?",
        opts: [
          "Me llegó una notificación: crédito fiscal, multa o PAMA",
          "Tengo una revisión o auditoría en curso de mis operaciones",
          "Voy a tomar una decisión de negocio con efecto fiscal o aduanero",
          "Tengo una resolución desfavorable que quiero combatir",
        ],
      },
      {
        text: "¿En qué etapa está el asunto?",
        opts: [
          "La autoridad ejerce sus facultades, aún no hay determinación",
          "Ya hay una resolución o crédito notificado",
          "Es planeación, todavía no hay acto de autoridad",
          "No estoy seguro",
        ],
      },
      {
        text: "¿Hay plazos corriendo?",
        opts: [
          "Sí, tengo días o pocas semanas para responder",
          "Sí, pero con uno a tres meses de margen",
          "No hay plazos inmediatos, es planeación",
          "No lo sé con certeza",
        ],
      },
      {
        text: "¿Dónde concentras tu operación?",
        opts: [
          "Tijuana - San Diego",
          "Otro cruce de la frontera norte",
          "Operación en el interior del país",
          "Aún no tengo operaciones activas",
        ],
      },
    ],
    results: {
      IMMEDIATE_DEFENSE: {
        title: "Defensa con plazos corriendo",
        body: "Los medios de defensa arrancan sus plazos con la notificación del acto. Revisamos el alcance, construimos los agravios con sustento técnico y presentamos el recurso o la demanda dentro de los plazos del procedimiento.",
        cta: "Hablar con el equipo",
      },
      DEFENSE: {
        title: "Defensa técnica del asunto",
        body: "Revisamos el acto, los pedimentos y el soporte documental de las operaciones, y construimos la postura técnica. La defensa se conduce desde la notificación hasta su conclusión por la vía que conviene al caso: recurso, juicio ante el TFJA o amparo.",
        cta: "Hablar con el equipo",
      },
      APPEAL: {
        title: "Vía para combatir la resolución",
        body: "Frente a una resolución definitiva, la vía depende del acto y de la etapa procesal: recurso de revocación en sede administrativa, juicio ante el Tribunal Federal de Justicia Administrativa o amparo. Analizamos el caso y elegimos la que corresponde.",
        cta: "Hablar con el equipo",
      },
      CONCLUSIVE: {
        title: "Acuerdo conclusivo ante PRODECON",
        body: "Mientras la autoridad ejerce sus facultades de comprobación, el acuerdo conclusivo permite plantear y resolver las diferencias antes de la determinación definitiva, como alternativa a llevar el desacuerdo al litigio.",
        cta: "Plantear el acuerdo",
      },
      ADVISORY: {
        title: "Asesoría antes de decidir",
        body: "Cada decisión con efecto fiscal o aduanero conviene evaluarla antes de ejecutarla. Analizamos el cambio de régimen, la reestructura o la operación transfronteriza, fijamos la contingencia y orientamos la decisión con criterio técnico.",
        cta: "Consultar",
      },
      GENERAL: {
        title: "Diagnóstico del asunto",
        body: "Revisamos el punto de partida y orientamos el trabajo hacia lo que el asunto necesita, sin presuposiciones sobre la vía ni la urgencia.",
        cta: "Hablar con el equipo",
      },
    },
    contactTJ: "Tijuana +52 (664) 607 9642",
    contactSD: "San Diego (619) 638-2168",
    contactEmail: "contacto@bgc.mx",
    of: "de",
    progress: "Pregunta",
    form: {
      heading: "Recibe orientación del equipo",
      namePlaceholder: "Nombre completo",
      emailPlaceholder: "Correo electrónico",
      phonePlaceholder: "Teléfono (opcional)",
      submit: "Enviar",
      sending: "Enviando...",
      successTitle: "Recibido",
      successBody: "El equipo revisará tu caso y se pondrá en contacto contigo en breve.",
      errorMsg: "Ocurrió un error al enviar. Intenta de nuevo o escribe a contacto@bgc.mx.",
      nameRequired: "El nombre es obligatorio",
      emailRequired: "El correo electrónico es obligatorio",
      emailInvalid: "Correo electrónico no válido",
    },
  },
  en: {
    eyebrow: "Quick diagnostic",
    title: "Where does your matter start?",
    lead: "Four questions to point you toward the right route.",
    restart: "Start over",
    questions: [
      {
        text: "What is your situation today?",
        opts: [
          "I received a notice: tax assessment, fine, or PAMA",
          "A review or audit of my operations is underway",
          "I am about to make a business decision with tax or customs effect",
          "I have an unfavorable resolution I want to challenge",
        ],
      },
      {
        text: "What stage is the matter at?",
        opts: [
          "The authority is exercising its powers, no assessment yet",
          "A resolution or assessment has already been notified",
          "It is planning, there is no act from the authority yet",
          "I am not sure",
        ],
      },
      {
        text: "Are deadlines already running?",
        opts: [
          "Yes, I have days or a few weeks to respond",
          "Yes, but I have one to three months of room",
          "No immediate deadlines, this is planning",
          "I am not sure",
        ],
      },
      {
        text: "Where is your operation concentrated?",
        opts: [
          "Tijuana - San Diego",
          "Another northern border crossing",
          "Operation in the country's interior",
          "No active operations yet",
        ],
      },
    ],
    results: {
      IMMEDIATE_DEFENSE: {
        title: "Defense with deadlines running",
        body: "Defense remedies start their deadlines at notification of the act. We review the scope, build the grievances with technical support, and file the appeal or lawsuit within the procedural deadlines.",
        cta: "Talk to the team",
      },
      DEFENSE: {
        title: "Technical defense of the matter",
        body: "We review the act, the pedimentos, and the supporting documentation, and build the technical position. The defense runs from notification through to conclusion by the route that fits the case: administrative appeal, TFJA litigation, or amparo.",
        cta: "Talk to the team",
      },
      APPEAL: {
        title: "Route to challenge the resolution",
        body: "Against a final resolution, the route depends on the act and the procedural stage: revocation appeal in the administrative channel, litigation before the Federal Court of Administrative Justice, or amparo. We analyze the case and choose the one that fits.",
        cta: "Talk to the team",
      },
      CONCLUSIVE: {
        title: "Conclusive agreement before PRODECON",
        body: "While the authority exercises its review powers, the conclusive agreement lets you raise and settle the differences before the final assessment, as an alternative to taking the disagreement to litigation.",
        cta: "Raise the agreement",
      },
      ADVISORY: {
        title: "Advisory before deciding",
        body: "Every decision with tax or customs effect is worth evaluating before execution. We analyze the change of regime, the restructuring, or the cross-border operation, fix the exposure, and orient the decision with technical criteria.",
        cta: "Consult",
      },
      GENERAL: {
        title: "Diagnostic of the matter",
        body: "We review the starting point and direct the work to what the matter needs, without assumptions about the route or the urgency.",
        cta: "Talk to the team",
      },
    },
    contactTJ: "Tijuana +52 (664) 607 9642",
    contactSD: "San Diego (619) 638-2168",
    contactEmail: "contacto@bgc.mx",
    of: "of",
    progress: "Question",
    form: {
      heading: "Get guidance from the team",
      namePlaceholder: "Full name",
      emailPlaceholder: "Email address",
      phonePlaceholder: "Phone (optional)",
      submit: "Send",
      sending: "Sending...",
      successTitle: "Received",
      successBody: "The team will review your case and be in touch shortly.",
      errorMsg: "An error occurred. Try again or write to contacto@bgc.mx.",
      nameRequired: "Name is required",
      emailRequired: "Email address is required",
      emailInvalid: "Invalid email address",
    },
  },
  getResult(answers: number[]): string {
    const [q1, q2, q3] = answers;
    if (q1 === 2) return "ADVISORY";
    if (q1 === 3) return "APPEAL";
    if (q1 === 0 || q1 === 1) {
      if (q3 === 0) return "IMMEDIATE_DEFENSE";
      if (q2 === 0) return "CONCLUSIVE";
      return "DEFENSE";
    }
    return "GENERAL";
  },
  resultTag: {
    IMMEDIATE_DEFENSE: { es: "Defensa inmediata", en: "Immediate defense" },
    DEFENSE: { es: "Defensa técnica", en: "Technical defense" },
    APPEAL: { es: "Medios de defensa", en: "Defense remedies" },
    CONCLUSIVE: { es: "Acuerdo conclusivo", en: "Conclusive agreement" },
    ADVISORY: { es: "Asesoría", en: "Advisory" },
    GENERAL: { es: "Diagnóstico", en: "Diagnostic" },
  },
  // CustomsStageVisual solo tiene motivos del ciclo del pedimento; el único
  // coherente con materia legal es "Defensa" (índice 4: notificación, recurso,
  // juicio, amparo). Solo los resultados de defensa lo usan; los demás no
  // muestran visual a propósito, en lugar de forzar un diagrama aduanero ajeno.
  stageForResult: {
    IMMEDIATE_DEFENSE: 4,
    DEFENSE: 4,
    APPEAL: 4,
  },
};

const LEGAL_FLOW: FlowData = {
  es: {
    eyebrow: "Ruta del asunto",
    title: "De la asesoría a la resolución del asunto.",
    lead: "Cuando la autoridad interviene, el asunto recorre las mismas etapas. BG conduce la defensa desde la notificación del acto hasta su conclusión, por la vía ordinaria o alternativa que corresponda.",
    panel: "Vías de defensa · 6 etapas",
    stages: [
      {
        n: "01",
        name: "Asesoría y prevención",
        desc: "Antes de que exista un acto, el seguimiento del cumplimiento y la asesoría de cada decisión con efecto fiscal o aduanero identifican la contingencia. El propósito es que el riesgo se corrija por iniciativa propia, antes de que se convierta en un crédito o una sanción.",
      },
      {
        n: "02",
        name: "Facultades de comprobación",
        desc: "La autoridad ejerce sus facultades de comprobación sobre las operaciones: clasificación, valoración, origen, regímenes como IMMEX. Se responde con sustento técnico y, cuando aplica, el acuerdo conclusivo ante PRODECON permite plantear y resolver las diferencias antes de que se emita la determinación.",
      },
      {
        n: "03",
        name: "Notificación",
        desc: "La autoridad notifica el acto administrativo: una determinación de crédito fiscal, una multa o el inicio de un Procedimiento Administrativo en Materia Aduanera. Desde la notificación corren los plazos para defenderse y cada decisión condiciona el resultado del asunto.",
      },
      {
        n: "04",
        name: "Recurso",
        desc: "El recurso de revocación y demás medios en sede administrativa controvierten el acto ante la propia autoridad, sin acudir todavía al tribunal. Es la primera instancia de defensa y en muchos asuntos define el resultado.",
      },
      {
        n: "05",
        name: "Juicio TFJA",
        desc: "El juicio contencioso administrativo ante el Tribunal Federal de Justicia Administrativa revisa la resolución definitiva ante un órgano independiente de la autoridad que la emitió. La vía ordinaria o sumaria se elige según la cuantía y la naturaleza del asunto.",
      },
      {
        n: "06",
        name: "Amparo",
        desc: "El amparo indirecto o directo procede cuando el acto vulnera derechos fundamentales o cuando se ha agotado la instancia previa. Los derechos reconocidos en la Constitución y en los tratados sirven como base de defensa frente a la actuación de la autoridad.",
      },
    ],
  },
  en: {
    eyebrow: "Route of the matter",
    title: "From advisory to resolution of the matter.",
    lead: "When the authority steps in, the matter moves through the same stages. BG handles the defense from notification of the act through to its conclusion, by whichever ordinary or alternative route fits.",
    panel: "Defense routes · 6 stages",
    stages: [
      {
        n: "01",
        name: "Advisory and prevention",
        desc: "Before any act exists, monitoring compliance and advising each decision with tax or customs effect identifies the exposure. The aim is to correct the risk on your own initiative, before it turns into an assessment or a penalty.",
      },
      {
        n: "02",
        name: "Authority review",
        desc: "The authority exercises its review powers over the operations: classification, valuation, origin, regimes such as IMMEX. We respond with technical support and, where it applies, the conclusive agreement before PRODECON lets you raise and settle the differences before an assessment is issued.",
      },
      {
        n: "03",
        name: "Notification",
        desc: "The authority serves the administrative act: a tax assessment, a fine, or the start of an administrative customs proceeding (PAMA). From notification, the deadlines to mount a defense run, and each decision shapes how the matter ends.",
      },
      {
        n: "04",
        name: "Appeal",
        desc: "The revocation appeal and other administrative-channel remedies challenge the act before the authority itself, without going to court yet. It is the first instance of defense, and in many matters it decides the outcome.",
      },
      {
        n: "05",
        name: "TFJA litigation",
        desc: "The administrative litigation before the Federal Court of Administrative Justice reviews the final resolution before a body independent of the authority that issued it. The ordinary or summary route is chosen based on the amount and the nature of the matter.",
      },
      {
        n: "06",
        name: "Amparo",
        desc: "Indirect or direct amparo applies when the act violates fundamental rights or once the prior instance has been exhausted. The rights recognized in the Constitution and in treaties serve as the basis of defense against the authority's action.",
      },
    ],
  },
};

const COMPLIANCE_AND_ASSURANCE_DIAGNOSTIC: DiagnosticData = {
  es: {
    eyebrow: "Diagnóstico rápido",
    title: "¿En qué punto está tu operación de comercio exterior?",
    lead: "Cuatro preguntas para orientar el punto de partida.",
    restart: "Volver a empezar",
    questions: [
      {
        text: "¿Cuál es tu situación hoy?",
        opts: [
          "Operamos bajo IMMEX y queremos verificar que cumplimos todos los requisitos",
          "Llegó una orden de visita domiciliaria o un requerimiento de la autoridad",
          "Los saldos de pedimentos no cuadran con el inventario real",
          "El área de comercio exterior carece de estructura y controles claros",
        ],
      },
      {
        text: "¿Tu empresa opera bajo programa IMMEX?",
        opts: [
          "Sí, con dudas sobre el cumplimiento de todos los requisitos de operación",
          "Sí, y ya recibimos una observación o requerimiento relacionado con el programa",
          "No, pero estamos evaluando solicitarlo",
          "No, nuestra operación no lo requiere",
        ],
      },
      {
        text: "¿Cuándo fue la última revisión interna de la operación aduanera?",
        opts: [
          "Nunca o hace más de dos años",
          "Hace menos de un año",
          "Tenemos una revisión en curso en este momento",
          "No lo sabemos con certeza",
        ],
      },
      {
        text: "¿Hay plazos corriendo para responder a la autoridad?",
        opts: [
          "Sí, tengo días o pocas semanas para actuar",
          "Sí, pero con uno a tres meses de margen",
          "No hay plazos inmediatos, es planeación",
          "No lo sé con certeza",
        ],
      },
    ],
    results: {
      URGENT_REVIEW: {
        title: "Revisión con plazos corriendo",
        body: "Cuando la autoridad notifica una visita o un requerimiento, los plazos para preparar la respuesta son cortos. Revisamos la documentación de las operaciones, identificamos las contingencias y preparamos el soporte técnico para atender el requerimiento dentro del tiempo disponible.",
        cta: "Hablar con el equipo",
      },
      IMMEX_AUDIT: {
        title: "Auditoría preventiva IMMEX",
        body: "Revisamos la operación bajo los requisitos del programa IMMEX: clasificación, valoración, Anexo 24, soporte documental y control de inventarios. Identificar las contingencias por iniciativa propia, antes de que lo haga la autoridad, es lo que protege la autorización y los privilegios de exportación.",
        cta: "Programar revisión",
      },
      BALANCE_RECON: {
        title: "Reconstrucción de saldos de pedimentos",
        body: "Reconstruimos y conciliamos los saldos de activo fijo y materia prima registrados en los pedimentos contra el inventario real, incluyendo bienes de capital y accesorios. Sin esa conciliación, las diferencias quedan expuestas ante cualquier revisión de la autoridad.",
        cta: "Hablar con el equipo",
      },
      PROCESS_REENG: {
        title: "Estructura del área de comercio exterior",
        body: "Cuando el área creció sin controles definidos, el cumplimiento depende de criterios aislados y cada operación acumula contingencia. Rediseñamos los procesos y responsabilidades del departamento de importaciones y exportaciones para que el cumplimiento quede integrado a la operación diaria.",
        cta: "Consultar",
      },
      GENERAL: {
        title: "Diagnóstico del cumplimiento",
        body: "Revisamos el punto de partida de la operación aduanera y orientamos el trabajo hacia lo que el programa o la autorización necesita, sin presuposiciones sobre el área ni la urgencia.",
        cta: "Hablar con el equipo",
      },
    },
    contactTJ: "Tijuana +52 (664) 607 9642",
    contactSD: "San Diego (619) 638-2168",
    contactEmail: "contacto@bgc.mx",
    of: "de",
    progress: "Pregunta",
    form: {
      heading: "Recibe orientación del equipo",
      namePlaceholder: "Nombre completo",
      emailPlaceholder: "Correo electrónico",
      phonePlaceholder: "Teléfono (opcional)",
      submit: "Enviar",
      sending: "Enviando...",
      successTitle: "Recibido",
      successBody: "El equipo revisará tu caso y se pondrá en contacto contigo en breve.",
      errorMsg: "Ocurrió un error al enviar. Intenta de nuevo o escribe a contacto@bgc.mx.",
      nameRequired: "El nombre es obligatorio",
      emailRequired: "El correo electrónico es obligatorio",
      emailInvalid: "Correo electrónico no válido",
    },
  },
  en: {
    eyebrow: "Quick diagnostic",
    title: "Where does your foreign trade operation stand?",
    lead: "Four questions to identify the right starting point.",
    restart: "Start over",
    questions: [
      {
        text: "What is your situation today?",
        opts: [
          "We operate under IMMEX and want to confirm we meet every operating requirement",
          "An audit order or an information request from the authority has arrived",
          "Pedimento balances do not reconcile with the real inventory",
          "The foreign trade area lacks clear structure and controls",
        ],
      },
      {
        text: "Does your company operate under an IMMEX program?",
        opts: [
          "Yes, with doubts about whether we meet every operating requirement",
          "Yes, and we have already received a finding or request related to the program",
          "No, but we are evaluating whether to apply",
          "No, our operation does not require it",
        ],
      },
      {
        text: "When was the last internal review of the customs operation?",
        opts: [
          "Never, or more than two years ago",
          "Less than a year ago",
          "A review is in progress right now",
          "We are not sure",
        ],
      },
      {
        text: "Are there deadlines running to respond to the authority?",
        opts: [
          "Yes, I have days or a few weeks to act",
          "Yes, but I have one to three months of room",
          "No immediate deadlines, this is planning",
          "I am not sure",
        ],
      },
    ],
    results: {
      URGENT_REVIEW: {
        title: "Review with deadlines running",
        body: "When the authority notifies an audit visit or an information request, the window to prepare is short. We review the documentation behind the operations, identify the exposures, and build the technical support to address the requirement within the available time.",
        cta: "Talk to the team",
      },
      IMMEX_AUDIT: {
        title: "Preventive IMMEX audit",
        body: "We review operations against the requirements of the IMMEX program: classification, valuation, Annex 24, documentary support, and inventory control. Identifying contingencies on your own initiative, before the authority does, is what protects the authorization and the export privileges granted.",
        cta: "Schedule a review",
      },
      BALANCE_RECON: {
        title: "Reconstruction of pedimento balances",
        body: "We rebuild and reconcile the fixed assets and raw materials balances recorded on pedimentos against the real inventory, including capital goods and accessories. Without that reconciliation, the differences are exposed the moment the authority runs a review.",
        cta: "Talk to the team",
      },
      PROCESS_REENG: {
        title: "Foreign trade area structure",
        body: "When the area grew without defined controls, compliance depends on isolated judgment and every operation accumulates exposure. We redesign the processes and responsibilities of the import-export department so compliance is built into daily operations rather than left to individual criteria.",
        cta: "Consult",
      },
      GENERAL: {
        title: "Compliance diagnostic",
        body: "We review the starting point of the customs operation and direct the work toward what the program or authorization needs, without assumptions about the area or the urgency.",
        cta: "Talk to the team",
      },
    },
    contactTJ: "Tijuana +52 (664) 607 9642",
    contactSD: "San Diego (619) 638-2168",
    contactEmail: "contacto@bgc.mx",
    of: "of",
    progress: "Question",
    form: {
      heading: "Get guidance from the team",
      namePlaceholder: "Full name",
      emailPlaceholder: "Email address",
      phonePlaceholder: "Phone (optional)",
      submit: "Send",
      sending: "Sending...",
      successTitle: "Received",
      successBody: "The team will review your case and be in touch shortly.",
      errorMsg: "An error occurred. Try again or write to contacto@bgc.mx.",
      nameRequired: "Name is required",
      emailRequired: "Email address is required",
      emailInvalid: "Invalid email address",
    },
  },
  getResult(answers: number[]): string {
    const [q1, , , q4] = answers;
    if (q4 === 0) return "URGENT_REVIEW";
    if (q1 === 2) return "BALANCE_RECON";
    if (q1 === 3) return "PROCESS_REENG";
    if (q1 === 0 || q1 === 1) return "IMMEX_AUDIT";
    return "GENERAL";
  },
  resultTag: {
    URGENT_REVIEW: { es: "Revisión urgente", en: "Urgent review" },
    IMMEX_AUDIT: { es: "Auditoría IMMEX", en: "IMMEX audit" },
    BALANCE_RECON: { es: "Saldos de pedimentos", en: "Pedimento balances" },
    PROCESS_REENG: { es: "Estructura del área", en: "Department structure" },
    GENERAL: { es: "Diagnóstico", en: "Diagnostic" },
  },
  stageForResult: {
    URGENT_REVIEW: 4,
    IMMEX_AUDIT: 3,
    BALANCE_RECON: 3,
  },
};

const COMPLIANCE_AND_ASSURANCE_FLOW: FlowData = {
  es: {
    eyebrow: "Proceso de aseguramiento",
    title: "Del diagnóstico al cumplimiento sostenido.",
    lead: "BG Consulting estructura la revisión, corrige las desviaciones y rediseña los controles para que la autorización se conserve sin depender de revisiones aisladas.",
    panel: "Plan de aseguramiento · 5 etapas",
    stages: [
      {
        n: "01",
        name: "Evaluación de riesgos",
        desc: "Identificamos los puntos donde la operación se aparta del marco autorizado: clasificación, valoración, origen, control de inventarios y soporte documental. Este diagnóstico muestra dónde está expuesta la empresa antes de que lo detecte la autoridad.",
      },
      {
        n: "02",
        name: "Auditoría preventiva",
        desc: "Revisamos la operación contra los requisitos del programa IMMEX y las demás autorizaciones de comercio exterior vigentes. La auditoría preventiva permite encontrar y corregir desviaciones en condiciones controladas, antes de que una visita de la autoridad las encuentre.",
      },
      {
        n: "03",
        name: "Reconstrucción de saldos",
        desc: "Reconstruimos los saldos de pedimentos de activo fijo y materia prima, incluyendo bienes de capital y accesorios. Cuadrar esos saldos con el inventario físico es la base para acreditar la legal estancia de la mercancía importada temporalmente ante cualquier revisión.",
      },
      {
        n: "04",
        name: "Control interno e inventarios",
        desc: "Analizamos los controles internos y el sistema de control de inventarios conforme al Anexo 24, verificando que respalde cada entrada y salida. Un control de inventarios consistente es requisito para conservar el programa y para responder un descargo sin diferencias.",
      },
      {
        n: "05",
        name: "Reingeniería del área",
        desc: "Rediseñamos los procesos y responsabilidades del departamento de importaciones y exportaciones para que el cumplimiento quede integrado a la operación diaria. El objetivo es una estructura que sostenga la autorización por sí misma, sin depender de criterios aislados.",
      },
    ],
  },
  en: {
    eyebrow: "Assurance process",
    title: "From diagnostic to sustained compliance.",
    lead: "BG Consulting structures the review, corrects the deviations, and redesigns the controls so the authorization is kept without relying on isolated reviews.",
    panel: "Assurance plan · 5 stages",
    stages: [
      {
        n: "01",
        name: "Risk evaluation",
        desc: "We identify where operations drift from the authorized scope: classification, valuation, origin, inventory control, and documentary support. This diagnosis shows where the company is exposed before the authority finds it.",
      },
      {
        n: "02",
        name: "Preventive audit",
        desc: "We review operations against the requirements of the IMMEX program and other foreign trade authorizations in force. A preventive audit lets you find and correct deviations under controlled conditions, before an authority visit does.",
      },
      {
        n: "03",
        name: "Balance reconstruction",
        desc: "We reconstruct pedimento balances for fixed assets and raw materials, including capital goods and accessories. Reconciling those balances with the physical inventory is the basis for proving the legal status of temporarily imported goods under any review.",
      },
      {
        n: "04",
        name: "Internal control and inventory",
        desc: "We analyze internal controls and the inventory control system under Annex 24, verifying it backs every entry and exit. Consistent inventory control is a condition for keeping the program and for answering a review without unexplained differences.",
      },
      {
        n: "05",
        name: "Department reengineering",
        desc: "We redesign the processes and responsibilities of the import-export department so compliance is built into daily operations. The goal is a structure that sustains the authorization on its own, without depending on isolated judgment calls.",
      },
    ],
  },
};

const INTERNATIONAL_TRADE_EXPERTS_DIAGNOSTIC: DiagnosticData = {
  es: {
    eyebrow: "Diagnóstico rápido",
    title: "¿Qué está cuestionando la autoridad?",
    lead: "Cuatro preguntas para orientar el tipo de dictamen o soporte técnico que necesitas.",
    restart: "Volver a empezar",
    questions: [
      {
        text: "¿Cuál es la situación que necesitas resolver?",
        opts: [
          "La autoridad reclasificó la fracción arancelaria de mi mercancía",
          "La autoridad rechazó el origen declarado y perdí la preferencia arancelaria",
          "La autoridad objetó el valor en aduana o ajustó la base gravable",
          "Tenemos observaciones al control de inventarios del Anexo 24 (IMMEX)",
        ],
      },
      {
        text: "¿En qué etapa está el asunto?",
        opts: [
          "Aún no hay acto de la autoridad: busco certeza antes de operar",
          "La autoridad ejerce sus facultades y necesito responder con sustento técnico",
          "Ya hay una resolución notificada y quiero presentar una defensa con dictamen pericial",
          "No estoy seguro de la etapa",
        ],
      },
      {
        text: "¿Hay plazos corriendo para responder?",
        opts: [
          "Sí, tengo días o pocas semanas para actuar",
          "Sí, pero con uno a tres meses de margen",
          "No hay plazos inmediatos, es preventivo",
          "No lo sé con certeza",
        ],
      },
      {
        text: "¿Cuál es el corredor principal de tu operación?",
        opts: [
          "Tijuana - San Diego",
          "Otro cruce fronterizo en la zona norte",
          "Operación marítima, aérea o interior",
          "Aún no tenemos operaciones activas",
        ],
      },
    ],
    results: {
      CLASSIFICATION: {
        title: "Dictamen en clasificación arancelaria",
        body: "Analizamos la mercancía y construimos el sustento de la fracción que corresponde conforme a las Reglas Generales de Interpretación, las notas legales y los criterios aplicables. El dictamen respalda la controversia frente a la reclasificación de la autoridad y sirve como prueba en el recurso o en el juicio.",
        cta: "Hablar con el equipo",
      },
      ORIGIN: {
        title: "Sustento técnico de origen",
        body: "Verificamos el cumplimiento de las reglas de origen del tratado invocado, revisamos el valor de contenido regional o el salto arancelario según corresponda y ordenamos el soporte documental. El dictamen permite defender la preferencia arancelaria cuando la autoridad la desconoce.",
        cta: "Hablar con el equipo",
      },
      VALUATION: {
        title: "Avalúo y valoración aduanera",
        body: "Determinamos el valor en aduana con base en los métodos de valoración de la Ley Aduanera, partiendo del valor de transacción y, en su caso, de los métodos secundarios. El avalúo aporta el fundamento técnico para controvertir el ajuste de la base gravable o el avalúo propio de la autoridad.",
        cta: "Hablar con el equipo",
      },
      ANNEX24: {
        title: "Revisión del Anexo 24 e IMMEX",
        body: "Revisamos el sistema de control de inventarios, la trazabilidad entre pedimentos de entrada y de retorno, los descargos y el balance de materiales. El objetivo es identificar el sustento documental y técnico para responder a la observación de la autoridad sobre las mercancías sujetas al régimen temporal.",
        cta: "Hablar con el equipo",
      },
      PREVENTIVE: {
        title: "Opinión preventiva de certeza jurídica",
        body: "Antes de que exista un acto de la autoridad, una decisión operativa con impacto fiscal conviene evaluarla con criterio técnico. Fijamos la postura sobre clasificación, origen o valor y emitimos la opinión que da certeza antes de ejecutar la operación.",
        cta: "Consultar",
      },
      GENERAL: {
        title: "Diagnóstico del asunto",
        body: "Revisamos el punto de partida y orientamos el tipo de dictamen o soporte técnico que necesita el caso, sin presuposiciones sobre el área ni sobre si ya existe un acto de la autoridad.",
        cta: "Hablar con el equipo",
      },
    },
    contactTJ: "Tijuana +52 (664) 607 9642",
    contactSD: "San Diego (619) 638-2168",
    contactEmail: "contacto@bgc.mx",
    of: "de",
    progress: "Pregunta",
    form: {
      heading: "Recibe orientación del equipo",
      namePlaceholder: "Nombre completo",
      emailPlaceholder: "Correo electrónico",
      phonePlaceholder: "Teléfono (opcional)",
      submit: "Enviar",
      sending: "Enviando...",
      successTitle: "Recibido",
      successBody: "El equipo revisará tu caso y se pondrá en contacto contigo en breve.",
      errorMsg: "Ocurrió un error al enviar. Intenta de nuevo o escribe a contacto@bgc.mx.",
      nameRequired: "El nombre es obligatorio",
      emailRequired: "El correo electrónico es obligatorio",
      emailInvalid: "Correo electrónico no válido",
    },
  },
  en: {
    eyebrow: "Quick diagnostic",
    title: "What is the authority challenging?",
    lead: "Four questions to identify the type of expert opinion or technical support your case needs.",
    restart: "Start over",
    questions: [
      {
        text: "What is the situation you need to resolve?",
        opts: [
          "The authority reclassified the tariff code of my goods",
          "The authority rejected my declared origin and the preferential rate was lost",
          "The authority questioned the customs value or adjusted the taxable base",
          "We have findings on the Annex 24 inventory control system (IMMEX)",
        ],
      },
      {
        text: "What stage is the matter at?",
        opts: [
          "No act from the authority yet: I want certainty before acting",
          "The authority is exercising its review powers and I need to respond with technical support",
          "A resolution has already been notified and I want to file a defense with an expert opinion",
          "I am not sure of the stage",
        ],
      },
      {
        text: "Are deadlines already running?",
        opts: [
          "Yes, I have days or a few weeks to act",
          "Yes, but I have one to three months of room",
          "No immediate deadlines, this is preventive",
          "I am not sure",
        ],
      },
      {
        text: "What is the main corridor for your operation?",
        opts: [
          "Tijuana - San Diego",
          "Another border crossing in the northern zone",
          "Maritime, air, or inland operation",
          "No active operations yet",
        ],
      },
    ],
    results: {
      CLASSIFICATION: {
        title: "Expert opinion on tariff classification",
        body: "We analyze the goods and build the support for the classification that applies under the General Rules of Interpretation, the legal notes, and the applicable criteria. The opinion backs the dispute against the authority's reclassification and serves as evidence in an appeal or in court.",
        cta: "Talk to the team",
      },
      ORIGIN: {
        title: "Technical substantiation of origin",
        body: "We verify that the goods meet the rules of origin of the treaty invoked, review the regional value content or tariff shift as applicable, and organize the documentary support. The opinion allows you to defend the preferential rate when the authority denies it.",
        cta: "Talk to the team",
      },
      VALUATION: {
        title: "Customs appraisal and valuation",
        body: "We determine the customs value using the valuation methods set in the Customs Law, starting from transaction value and, where that does not apply, the secondary methods. The appraisal provides the technical basis to dispute an adjustment to the taxable base or the authority's own valuation.",
        cta: "Talk to the team",
      },
      ANNEX24: {
        title: "Annex 24 and IMMEX review",
        body: "We review the inventory control system, the traceability between entry and return pedimentos, the write-offs, and the material balance. The goal is to identify the documentary and technical support to respond to the authority's finding on goods under the temporary regime.",
        cta: "Talk to the team",
      },
      PREVENTIVE: {
        title: "Preventive opinion for legal certainty",
        body: "Before any act from the authority, an operational decision with tax exposure is worth assessing with technical criteria. We fix the position on classification, origin, or value and issue the opinion that gives certainty before the operation is carried out.",
        cta: "Consult",
      },
      GENERAL: {
        title: "Diagnostic of the matter",
        body: "We review the starting point and orient the type of expert opinion or technical support the case needs, without assumptions about the area or whether an act from the authority already exists.",
        cta: "Talk to the team",
      },
    },
    contactTJ: "Tijuana +52 (664) 607 9642",
    contactSD: "San Diego (619) 638-2168",
    contactEmail: "contacto@bgc.mx",
    of: "of",
    progress: "Question",
    form: {
      heading: "Get guidance from the team",
      namePlaceholder: "Full name",
      emailPlaceholder: "Email address",
      phonePlaceholder: "Phone (optional)",
      submit: "Send",
      sending: "Sending...",
      successTitle: "Received",
      successBody: "The team will review your case and be in touch shortly.",
      errorMsg: "An error occurred. Try again or write to contacto@bgc.mx.",
      nameRequired: "Name is required",
      emailRequired: "Email address is required",
      emailInvalid: "Invalid email address",
    },
  },
  getResult(answers: number[]): string {
    const [q1, q2] = answers;
    if (q2 === 0) return "PREVENTIVE";
    if (q1 === 0) return "CLASSIFICATION";
    if (q1 === 1) return "ORIGIN";
    if (q1 === 2) return "VALUATION";
    if (q1 === 3) return "ANNEX24";
    return "GENERAL";
  },
  resultTag: {
    CLASSIFICATION: { es: "Clasificación arancelaria", en: "Tariff classification" },
    ORIGIN: { es: "Origen de la mercancía", en: "Origin of goods" },
    VALUATION: { es: "Valoración aduanera", en: "Customs valuation" },
    ANNEX24: { es: "Anexo 24 IMMEX", en: "Annex 24 IMMEX" },
    PREVENTIVE: { es: "Opinión preventiva", en: "Preventive opinion" },
    GENERAL: { es: "Diagnóstico", en: "Diagnostic" },
  },
  stageForResult: {
    CLASSIFICATION: 0,
    VALUATION: 1,
    ORIGIN: 2,
    ANNEX24: 3,
  },
};

const INTERNATIONAL_TRADE_EXPERTS_FLOW: FlowData = {
  es: {
    eyebrow: "Proceso de peritaje",
    title: "Del análisis técnico al dictamen con sustento.",
    lead: "Cuando la autoridad cuestiona la clasificación, el origen o el valor de una mercancía, o cuando se necesita certeza jurídica antes de operar, el dictamen pericial recorre estas etapas hasta quedar listo para usarse como prueba.",
    panel: "Proceso pericial · 5 etapas",
    stages: [
      {
        n: "01",
        name: "Revisión del caso",
        desc: "Analizamos el acto de la autoridad: la reclasificación, el rechazo del origen, el ajuste de valor o las observaciones al Anexo 24. Esta revisión determina el alcance del dictamen y los criterios técnicos aplicables al caso concreto.",
      },
      {
        n: "02",
        name: "Análisis técnico de la mercancía",
        desc: "Según la materia, analizamos la mercancía bajo las Reglas Generales de Interpretación y las notas legales para clasificación, verificamos el cumplimiento de las reglas de origen del tratado para origen, o aplicamos los métodos de valoración aduanera para el valor. Este es el núcleo técnico del dictamen.",
      },
      {
        n: "03",
        name: "Construcción del dictamen",
        desc: "Documentamos el criterio, los fundamentos normativos y la conclusión técnica en el formato que exige su uso como prueba: recurso administrativo, juicio ante el TFJA o presentación ante la aduana. Un dictamen bien construido responde exactamente a lo que la autoridad cuestionó.",
      },
      {
        n: "04",
        name: "Coordinación con la defensa legal",
        desc: "Alineamos el dictamen con los agravios que presentará el área jurídica. El soporte técnico y la postura legal van en la misma dirección: la clasificación que sostiene el dictamen es la misma que sustenta el recurso o el juicio.",
      },
      {
        n: "05",
        name: "Seguimiento del asunto",
        desc: "Acompañamos el asunto mientras la autoridad resuelve. Si surgen preguntas adicionales o si la contraparte o la autoridad cuestionan el dictamen, respondemos con el sustento técnico del caso.",
      },
    ],
  },
  en: {
    eyebrow: "Expert opinion process",
    title: "From technical analysis to a grounded expert opinion.",
    lead: "When the authority challenges classification, origin, or the value of goods, or when legal certainty is needed before acting, the expert opinion moves through these stages until it is ready to be used as evidence.",
    panel: "Expert opinion process · 5 stages",
    stages: [
      {
        n: "01",
        name: "Case review",
        desc: "We analyze the authority's act: the reclassification, the origin denial, the value adjustment, or the Annex 24 findings. This review determines the scope of the opinion and the technical criteria applicable to the specific case.",
      },
      {
        n: "02",
        name: "Technical analysis of the goods",
        desc: "Depending on the subject, we analyze the goods under the General Rules of Interpretation and legal notes for classification, verify compliance with the treaty's rules of origin for an origin matter, or apply the customs valuation methods for a value dispute. This is the technical core of the opinion.",
      },
      {
        n: "03",
        name: "Drafting the expert opinion",
        desc: "We document the criterion, the regulatory grounds, and the technical conclusion in the format required for its use as evidence: administrative appeal, TFJA litigation, or presentation before customs. A well-built opinion answers exactly what the authority challenged.",
      },
      {
        n: "04",
        name: "Coordination with legal defense",
        desc: "We align the expert opinion with the grievances the legal team will raise. The technical support and the legal position run in the same direction: the classification the opinion sustains is the same one the appeal or court filing rests on.",
      },
      {
        n: "05",
        name: "Follow-up on the matter",
        desc: "We accompany the matter while the authority resolves. If additional questions arise or if the opposing party or the authority challenges the opinion, we respond with the technical support behind the case.",
      },
    ],
  },
};

export const SERVICE_DETAIL: Record<"es" | "en", readonly ServiceDetail[]> = {
  "es": [
    {
      "overview": "Las empresas de comercio exterior operan bajo legislación fiscal y aduanera densa, técnica y en constante cambio. BG Consulting Group da seguimiento al cumplimiento de esas obligaciones y asesora las decisiones de negocio con efecto fiscal, y cuando llega un acto de la autoridad asume la defensa del asunto desde la notificación hasta su conclusión, por las vías ordinarias y alternativas que prevé la ley.",
      "pains": [
        {
          "title": "Llegó una notificación de la autoridad",
          "desc": "La empresa recibe la notificación de un acto administrativo: una determinación de crédito fiscal, una multa o el inicio de un Procedimiento Administrativo en Materia Aduanera. A partir de ese momento corren plazos para defenderse y cada decisión condiciona el resultado del asunto."
        },
        {
          "title": "Una revisión o auditoría en curso",
          "desc": "La autoridad ejerce sus facultades de comprobación sobre operaciones de comercio exterior: clasificación arancelaria, valoración, origen, regímenes como IMMEX. La compañía necesita responder con sustento técnico antes de que la revisión derive en una determinación."
        },
        {
          "title": "Una decisión de negocio con riesgo fiscal",
          "desc": "Cambios de régimen, reestructuras, nuevas operaciones transfronterizas o ajustes en la cadena de proveeduría tienen efectos aduaneros y fiscales que conviene evaluar antes de ejecutarlos, no después de recibir una observación."
        },
        {
          "title": "Una resolución desfavorable que se quiere combatir",
          "desc": "Existe una resolución definitiva que la empresa considera ilegal o lesiva de sus derechos, y debe decidir por qué vía controvertirla: recurso administrativo, juicio ante el tribunal o amparo, según el caso y la etapa procesal."
        }
      ],
      "whatWeDo": [
        {
          "title": "Asesoría fiscal y aduanera continua",
          "desc": "Seguimiento del cumplimiento al que la empresa está obligada y acompañamiento en las decisiones de negocio con efecto fiscal o aduanero: clasificación, valoración, regímenes aduaneros, operaciones de comercio exterior. El propósito es identificar la contingencia antes de que se convierta en un crédito o una sanción."
        },
        {
          "title": "Recursos administrativos",
          "desc": "Interposición del recurso de revocación y demás medios de defensa en sede administrativa frente a actos de la autoridad aduanera y fiscal. Es la primera instancia para controvertir un acto sin acudir todavía al tribunal, y en muchos asuntos define el resultado."
        },
        {
          "title": "Litigio ante el Tribunal Federal de Justicia Administrativa",
          "desc": "Promoción y seguimiento del juicio contencioso administrativo contra resoluciones definitivas: créditos fiscales, multas y determinaciones en materia aduanera. Se elige la vía ordinaria o sumaria según la cuantía y la naturaleza del asunto."
        },
        {
          "title": "Juicio de amparo y derechos humanos",
          "desc": "Promoción del amparo indirecto y directo cuando el acto de autoridad vulnera derechos fundamentales o cuando se ha agotado la instancia previa. Los derechos humanos reconocidos en la Constitución y en los tratados sirven como base de defensa frente a la actuación de la autoridad."
        },
        {
          "title": "Acuerdos conclusivos, arbitraje y mediación",
          "desc": "Acuerdos conclusivos ante PRODECON para resolver diferencias con la autoridad durante el ejercicio de sus facultades de comprobación, arbitraje comercial internacional para controversias entre particulares en operaciones transfronterizas y mediación. Son vías para cerrar un asunto sin necesidad de agotar todo el litigio."
        },
        {
          "title": "Peritajes ante tribunales",
          "desc": "Intervención como peritos ante el Poder Judicial de la Federación y ante el Tribunal Federal de Justicia Administrativa. El dictamen pericial aporta el sustento técnico en materia aduanera y fiscal que el juzgador requiere para resolver."
        }
      ],
      "outcomes": [
        "Defensa del asunto conducida desde la notificación del acto administrativo hasta su conclusión, por la vía que mejor convenga al caso.",
        "Decisiones de negocio tomadas con la contingencia fiscal y aduanera identificada de antemano.",
        "Posibilidad de cerrar diferencias con la autoridad por acuerdo conclusivo o por medios alternativos, sin agotar todo el litigio.",
        "Sustento técnico pericial cuando el asunto llega a tribunales."
      ],
      "faq": [
        {
          "q": "¿En qué momento conviene involucrar a un abogado?",
          "a": "Desde la notificación del acto administrativo, e idealmente antes, cuando se ejercen las facultades de comprobación. A partir de la notificación corren los plazos para interponer los medios de defensa, y las actuaciones que se realicen durante la auditoría influyen en la resolución y en la defensa posterior."
        },
        {
          "q": "¿Qué diferencia hay entre el recurso administrativo y el juicio ante el TFJA?",
          "a": "El recurso administrativo se interpone ante la propia autoridad fiscal o aduanera y permite revisar el acto en sede administrativa. El juicio ante el Tribunal Federal de Justicia Administrativa se promueve ante un órgano jurisdiccional independiente de la autoridad que emitió la resolución. La elección entre uno y otro depende del acto, de la etapa y de la estrategia del asunto."
        },
        {
          "q": "¿Qué es un acuerdo conclusivo y cuándo aplica?",
          "a": "Es un medio alternativo que se tramita a través de PRODECON durante el ejercicio de las facultades de comprobación de la autoridad. Permite plantear y resolver diferencias sobre los hechos u omisiones observados antes de que se emita la determinación definitiva, como alternativa a llevar el desacuerdo al litigio."
        },
        {
          "q": "¿Atienden operaciones entre Tijuana y San Diego?",
          "a": "Sí. El cruce de mercancías y las operaciones entre ambos lados de la frontera concentran buena parte de la materia aduanera y de las controversias entre particulares. Para estas últimas, el arbitraje comercial internacional es una de las vías previstas para resolver el conflicto fuera de los tribunales."
        }
      ],
      diagnostic: LEGAL_DIAGNOSTIC,
      flow: LEGAL_FLOW,
      bandImage: "/img/gen/legal-defense.webp",
      bandCaption: "Defensa fiscal y aduanera, de la notificación a la resolución",
    },
    {
      "overview": "El programa IMMEX y el resto de las autorizaciones de comercio exterior se sostienen sobre el cumplimiento detallado de sus requisitos de operación, no solo sobre sus beneficios. Una omisión documental o una operación que la autoridad interprete de forma adversa en revisión puede costar la autorización y los privilegios de exportación. En BG Consulting diseñamos programas de auditoría interna y externa en comercio exterior y aduanas que validan la certeza jurídica de cada operación dentro del marco autorizado.",
      "pains": [
        {
          "title": "Riesgo de perder la autorización IMMEX",
          "desc": "La empresa opera bajo IMMEX pero no tiene certeza de cumplir todos los requisitos de operación. Un incumplimiento detectado por la autoridad puede derivar en suspensión o cancelación del programa y en la pérdida de los privilegios de exportación."
        },
        {
          "title": "Descuadres en saldos de pedimentos",
          "desc": "Los saldos de activo fijo y materia prima registrados en los pedimentos no coinciden con la realidad del inventario. Sin una reconstrucción ordenada de esos saldos, cualquier revisión de la autoridad expone diferencias difíciles de justificar."
        },
        {
          "title": "Anuncio de una visita o revisión",
          "desc": "Llega una orden de visita domiciliaria o un requerimiento y el departamento de importaciones y exportaciones no sabe si la documentación soporta cada operación. La empresa necesita conocer sus contingencias antes, no durante la revisión."
        },
        {
          "title": "Controles internos débiles o área improvisada",
          "desc": "El área de comercio exterior creció sin estructura, los controles de inventario no se actualizan y nadie tiene visibilidad clara del riesgo. Cada error operativo se convierte en una contingencia fiscal y aduanera latente."
        }
      ],
      "whatWeDo": [
        {
          "title": "Evaluación y análisis de riesgos en comercio exterior",
          "desc": "Identificamos los puntos donde la operación se aparta del marco autorizado: clasificación, valoración, origen, control de inventarios y soporte documental. Es el diagnóstico que define dónde está expuesta la empresa antes de que lo encuentre la autoridad."
        },
        {
          "title": "Auditorías preventivas y planes anuales de aseguramiento",
          "desc": "Realizamos auditorías preventivas de comercio exterior y estructuramos un plan anual continuo de aseguramiento y un plan anual de asesoría especializada. La revisión recurrente detecta desviaciones a tiempo y mantiene la operación dentro de los límites de la autorización."
        },
        {
          "title": "Reconstrucción de saldos de pedimentos",
          "desc": "Reconstruimos los saldos de pedimentos de activo fijo y materia prima, además de bienes de capital y accesorios. Cuadrar estos saldos con el inventario físico es la base para sostener la legal estancia de la mercancía importada temporalmente."
        },
        {
          "title": "Análisis de control interno y de inventarios",
          "desc": "Analizamos los controles internos y el riesgo de inventario para verificar que el sistema de control de inventarios, en términos del Anexo 24, respalde cada entrada y salida. Un control de inventarios consistente es requisito para conservar el programa y para responder un descargo sin diferencias."
        },
        {
          "title": "Reingeniería del Departamento de Importaciones y Exportaciones",
          "desc": "Rediseñamos los procesos y responsabilidades del área de comercio exterior para que el cumplimiento quede integrado a la operación diaria y no dependa de criterios aislados. El objetivo es que la estructura sostenga la autorización por sí misma."
        },
        {
          "title": "Artículo 303 del TLCAN y reglas de origen",
          "desc": "Revisamos el tratamiento de las contribuciones sobre insumos no originarios incorporados a la exportación, conforme al artículo 303 del TLCAN y a su tratamiento equivalente vigente en el T-MEC. Es un punto donde un cálculo incorrecto genera diferencias y créditos fiscales."
        }
      ],
      "outcomes": [
        "Certeza jurídica de que las operaciones se ejecutan dentro de los límites de la autorización vigente.",
        "Contingencias de comercio exterior identificadas y documentadas antes de una revisión de la autoridad.",
        "Saldos de pedimentos de activo fijo y materia prima reconstruidos y conciliados con el inventario.",
        "Un departamento de importaciones y exportaciones con procesos y controles que sostienen el cumplimiento de forma continua."
      ],
      "faq": [
        {
          "q": "¿Por qué necesito auditorías si mi IMMEX ya está autorizado?",
          "a": "La autorización no se gana una sola vez: se conserva cumpliendo de forma continua los requisitos de operación. Las auditorías internas y externas verifican que la operación siga dentro de ese marco y evitan que un incumplimiento, o una operación que la autoridad interprete de forma negativa en revisión, ponga en riesgo el programa y los privilegios de exportación."
        },
        {
          "q": "¿Qué implica reconstruir los saldos de pedimentos?",
          "a": "Consiste en rehacer y conciliar los saldos de activo fijo y materia prima registrados en los pedimentos contra el inventario real, incluyendo bienes de capital y accesorios. Cuando esos saldos no cuadran, la legal estancia de la mercancía importada temporalmente queda expuesta; la reconstrucción ordena esa información para sostenerla ante una revisión."
        },
        {
          "q": "¿Conviene hacer una auditoría preventiva aunque no tenga una revisión en puerta?",
          "a": "Sí. La auditoría preventiva permite encontrar y corregir desviaciones por iniciativa propia, en condiciones controladas, en lugar de enfrentarlas durante una visita de la autoridad. Por eso trabajamos sobre un plan anual continuo de aseguramiento y no solo como respuesta a un requerimiento."
        },
        {
          "q": "¿Qué es el artículo 303 del TLCAN y por qué lo revisan?",
          "a": "El artículo 303 del TLCAN, con un tratamiento equivalente vigente en el T-MEC, regula las contribuciones sobre insumos no originarios que se incorporan a mercancías destinadas a exportación bajo programas como IMMEX: limita la devolución o exención de aranceles cuando el producto final se exporta a la región del tratado. Su aplicación incorrecta genera diferencias en el pago de contribuciones; revisarlo evita créditos fiscales derivados de un cálculo equivocado."
        }
      ],
      diagnostic: COMPLIANCE_AND_ASSURANCE_DIAGNOSTIC,
      flow: COMPLIANCE_AND_ASSURANCE_FLOW,
    },
    {
      "overview": "El comercio exterior cambia con cada modificación regulatoria, y un criterio mal aplicado en valoración, origen o clasificación puede convertirse en un crédito fiscal, una multa o la suspensión del padrón. En BG Consulting Group acompañamos a la empresa importadora y exportadora para que cada operación cumpla la legislación vigente y, al mismo tiempo, aproveche los beneficios fiscales y arancelarios que México ha pactado en sus tratados internacionales.",
      "pains": [
        {
          "title": "Una auditoría o requerimiento de la autoridad ya está en curso",
          "desc": "El SAT o la ANAM detecta inconsistencias en el valor declarado, en el origen o en el cumplimiento de regulaciones no arancelarias. La empresa necesita revisar pedimentos, reconstruir el soporte documental y responder con criterio técnico antes de que se determine un crédito fiscal."
        },
        {
          "title": "Dudas sobre cómo valorar la mercancía",
          "desc": "Existen vinculaciones entre partes, regalías, ajustes incrementables o descuentos que afectan la base gravable. Aplicar mal el método de valoración expone a diferencias de impuestos y a sanciones; aplicarlo bien evita pagar de más o de menos."
        },
        {
          "title": "La empresa opera o quiere operar bajo IMMEX",
          "desc": "Importación temporal, control de inventarios Anexo 24, validación Anexo 31 y retornos en tiempo conllevan obligaciones que, si no se administran, derivan en la causación de los impuestos diferidos y en riesgo para el programa."
        },
        {
          "title": "Se busca reducir la carga arancelaria de forma legal",
          "desc": "La compañía paga aranceles que podría disminuir o recuperar mediante Drawback, PROSEC, certificación de origen bajo tratado o devolución de contribuciones, pero no tiene claro qué figura aplica a su operación ni cómo documentarla."
        }
      ],
      "whatWeDo": [
        {
          "title": "Valoración aduanera y base gravable",
          "desc": "Determinación del valor en aduana de la mercancía y aplicación de los criterios de valoración conforme a la legislación y al Acuerdo de Valoración de la OMC: método de valor de transacción, ajustes incrementables, vinculación entre partes y métodos secundarios. Una base gravable bien sustentada evita diferencias de impuestos y observaciones en revisión."
        },
        {
          "title": "Clasificación, origen y pedimentos",
          "desc": "Correcta elaboración del pedimento, análisis del origen de la mercancía y certificación bajo los tratados de libre comercio suscritos por México. El origen define la preferencia arancelaria y las reglas específicas; un error aquí se traduce en aranceles pagados de más o en preferencias negadas."
        },
        {
          "title": "Regulaciones no arancelarias y permisos previos",
          "desc": "Cumplimiento de restricciones y regulaciones no arancelarias, permisos previos ante la Secretaría de Economía y demás requisitos sectoriales. Identificamos qué exige cada fracción para que la mercancía no quede detenida ni la operación expuesta a sanción."
        },
        {
          "title": "Programas de fomento: IMMEX, PROSEC y Drawback",
          "desc": "Asesoría en el programa IMMEX, en PROSEC y en la recuperación de contribuciones vía Drawback y devolución de impuestos. Estas figuras permiten diferir o recuperar aranceles de forma legal; aplicarlas requiere soporte documental y control que ordenamos desde el origen."
        },
        {
          "title": "Control de inventarios: Anexo 24, Anexo 31 y Data Stage",
          "desc": "Implementación y revisión del sistema de control de inventarios (Anexo 24), el sistema de validación Anexo 31 y el sistema Data Stage. El control de inventarios es la columna del régimen temporal: sin él no se acredita el retorno y se causan los impuestos diferidos."
        },
        {
          "title": "Análisis de riesgo y fomento a la exportación",
          "desc": "Diagnóstico de riesgo en materia aduanera sobre las operaciones de la empresa y aprovechamiento de los esquemas de fomento a la exportación. Anticipar el punto débil de la operación cuesta menos que corregirlo durante una auditoría."
        }
      ],
      "outcomes": [
        "Operaciones de importación y exportación sustentadas con criterio técnico frente a una revisión de la autoridad.",
        "Carga arancelaria optimizada de forma legal mediante tratados, PROSEC, Drawback y devolución de contribuciones cuando la operación lo permite.",
        "Control de inventarios Anexo 24 y validación Anexo 31 ordenados para acreditar retornos y sostener el programa IMMEX.",
        "Identificación anticipada de los riesgos en valoración, origen, clasificación y regulaciones no arancelarias antes de que se conviertan en crédito fiscal."
      ],
      "faq": [
        {
          "q": "¿Cómo se determina el valor en aduana de mi mercancía?",
          "a": "La regla general es el método de valor de transacción: el precio pagado o por pagar por la mercancía, más los ajustes incrementables que correspondan, como fletes, seguros, comisiones, regalías o materiales aportados al proveedor. Cuando existe vinculación entre comprador y vendedor, o cuando el valor de transacción no es aplicable, se acude a los métodos secundarios en el orden que marca la ley. Revisamos su estructura de costos y contratos para fijar la base gravable correcta y documentarla."
        },
        {
          "q": "¿Qué diferencia hay entre Drawback, PROSEC e IMMEX?",
          "a": "Son figuras distintas que pueden coexistir. IMMEX permite la importación temporal de insumos para producir bienes destinados a la exportación, difiriendo el pago de contribuciones mientras se cumplan los plazos de retorno. PROSEC reduce el arancel de importación de ciertos insumos y maquinaria por sector productivo. Drawback es la devolución del impuesto general de importación pagado por insumos que se incorporan a mercancías exportadas. Cuál aplica depende de su operación, sus insumos y sus mercados; lo definimos a partir de su caso."
        },
        {
          "q": "Recibí un requerimiento del SAT sobre comercio exterior, ¿qué hacen ustedes?",
          "a": "Revisamos el alcance del requerimiento, los pedimentos y el soporte documental de las operaciones observadas, e identificamos si la inconsistencia está en valoración, origen, clasificación o cumplimiento de regulaciones no arancelarias. Con ese diagnóstico preparamos la respuesta técnica y la documentación que sustente la operación, con el objeto de atender a la autoridad dentro de los plazos del procedimiento."
        },
        {
          "q": "¿Por qué importa tanto el control de inventarios bajo IMMEX?",
          "a": "Porque es lo que acredita que la mercancía importada temporalmente se retornó, se transfirió o cambió de régimen en tiempo. El Anexo 24 es el sistema de control de inventarios obligatorio, el Anexo 31 valida saldos ante la autoridad y Data Stage respalda el manejo de la información. Si estos sistemas no cuadran con las operaciones, la autoridad presume que la mercancía permaneció en el país y determina las contribuciones que se difirieron."
        }
      ],
      diagnostic: FT_DIAGNOSTIC,
      flow: FT_FLOW,
    },
    {
      "overview": "Cuando una autoridad aduanera o fiscal cuestiona la clasificación arancelaria, el origen o el valor de una mercancía, lo que está en juego es la determinación de un crédito fiscal y, con frecuencia, la viabilidad de la operación. BG Consulting Group sustenta los agravios de la defensa legal con dictámenes técnicos en materia de comercio exterior y aduanas, y emite opinión pericial cuando el asunto exige certeza jurídica ante la autoridad correspondiente.",
      "pains": [
        {
          "title": "Reclasificación arancelaria de la autoridad",
          "desc": "La aduana o la auditoría reclasifica una fracción y con ello modifica la tasa de impuestos, el cumplimiento de regulaciones no arancelarias o el acceso a un trato preferencial. Para controvertirlo no basta la postura comercial: se necesita un sustento técnico que justifique la clasificación aplicada conforme a las Reglas Generales de Interpretación."
        },
        {
          "title": "Origen rechazado y pérdida de preferencia arancelaria",
          "desc": "La autoridad desconoce el origen declarado bajo el T-MEC u otro tratado y exige el pago de aranceles que se habían omitido por preferencia. Defenderlo requiere acreditar las reglas de origen específicas, la documentación de soporte y el criterio aplicable a la mercancía."
        },
        {
          "title": "Valor en aduana objetado",
          "desc": "La autoridad rechaza el valor declarado o ajusta la base gravable mediante un avalúo propio, lo que incrementa contribuciones y puede derivar en infracciones. Sostener el valor declarado exige una valuación técnica fundada en los métodos de valoración aduanera."
        },
        {
          "title": "Inconsistencias en Anexo 24 e IMMEX",
          "desc": "Empresas con programa IMMEX enfrentan observaciones sobre el sistema de control de inventarios del Anexo 24, descargos no acreditados o diferencias en el balance de materiales que comprometen el régimen temporal y abren la puerta a créditos por las mercancías no retornadas."
        }
      ],
      "whatWeDo": [
        {
          "title": "Dictamen pericial en clasificación arancelaria",
          "desc": "Análisis técnico de la mercancía y su ubicación en la TIGIE conforme a las Reglas Generales de Interpretación, notas legales de sección y capítulo, y criterios aplicables. Sirve como prueba pericial para sostener la fracción correcta frente a una reclasificación de la autoridad."
        },
        {
          "title": "Sustento de origen de las mercancías",
          "desc": "Verificación del cumplimiento de las reglas de origen del tratado invocado, revisión del valor de contenido regional o del salto arancelario según corresponda, y soporte documental. Permite defender la preferencia arancelaria cuando la autoridad la desconoce."
        },
        {
          "title": "Avalúos y valoración aduanera",
          "desc": "Determinación del valor en aduana con base en los métodos de valoración previstos en la Ley Aduanera, partiendo del valor de transacción y, en su defecto, de los métodos secundarios. Aporta el fundamento para controvertir un avalúo o un ajuste de la base gravable."
        },
        {
          "title": "Criterios aduaneros y opinión técnica",
          "desc": "Interpretación de la normativa aduanera y los criterios de la autoridad aplicables al caso concreto, para fijar la postura técnica que respalda los agravios de la defensa o que da certeza jurídica antes de tomar una decisión operativa."
        },
        {
          "title": "Revisión de Anexo 24 y control de inventarios",
          "desc": "Análisis del sistema de control de inventarios del Anexo 24, la trazabilidad de entradas, descargos y retornos, y la consistencia del balance de materiales del programa IMMEX. Identifica y documenta el sustento frente a observaciones de la autoridad."
        },
        {
          "title": "Soporte pericial en la defensa legal",
          "desc": "Elaboración de los dictámenes que respaldan los agravios presentados en recursos administrativos y juicios contencioso administrativos en materia aduanera, coordinados con la estrategia jurídica del asunto."
        }
      ],
      "outcomes": [
        "Agravios de la defensa respaldados por un sustento técnico documentado y fundado en la normativa aduanera aplicable.",
        "Posición clara sobre clasificación, origen, valor o Anexo 24 antes de responder a la autoridad o de comprometer una operación.",
        "Dictámenes y opiniones periciales utilizables como prueba en recursos administrativos y juicios.",
        "Mayor certeza jurídica para decisiones de comercio exterior con impacto fiscal."
      ],
      "faq": [
        {
          "q": "¿En qué se distingue un dictamen pericial de una asesoría aduanera ordinaria?",
          "a": "La asesoría orienta la operación cotidiana. El dictamen pericial es un documento técnico que analiza un caso concreto y se ofrece como prueba ante la autoridad o el tribunal para sustentar los agravios de la defensa. Se elabora con el rigor y la fundamentación que exige su uso dentro de un procedimiento."
        },
        {
          "q": "¿Pueden defender una clasificación arancelaria distinta a la que determinó la autoridad?",
          "a": "Sí. Analizamos la mercancía y construimos el sustento de la fracción que corresponde conforme a las Reglas Generales de Interpretación, las notas legales y los criterios aplicables. Ese análisis se traduce en el dictamen que respalda la controversia frente a la reclasificación."
        },
        {
          "q": "Tenemos una observación sobre el Anexo 24 de nuestro IMMEX, ¿qué revisan?",
          "a": "Revisamos el sistema de control de inventarios, la trazabilidad entre pedimentos de entrada y de retorno, los descargos y el balance de materiales. El objetivo es identificar el sustento documental y técnico para responder a la observación de la autoridad sobre las mercancías sujetas al régimen temporal."
        },
        {
          "q": "¿En qué momento conviene solicitar una opinión pericial?",
          "a": "Cuando la autoridad ya cuestionó la clasificación, el origen o el valor y se va a presentar una defensa, y también de forma preventiva, cuando una decisión operativa con impacto fiscal requiere certeza jurídica antes de ejecutarse."
        }
      ],
      diagnostic: INTERNATIONAL_TRADE_EXPERTS_DIAGNOSTIC,
      flow: INTERNATIONAL_TRADE_EXPERTS_FLOW,
    },
    {
      "overview": "Una operación de comercio exterior genera miles de pedimentos, facturas, certificados de origen y registros de movimiento que la autoridad puede revisar años después del despacho. Cuando esa información vive en hojas de cálculo aisladas o se reconcilia a mano, las inconsistencias aparecen tarde, normalmente durante una auditoría. BG Consulting Group implementa tecnología capaz de operar a gran escala y desarrolla herramientas de cumplimiento aduanero que permiten alcanzar un nivel de cumplimiento óptimo o mitigar hallazgos en tiempo real, sobre la operación logística internacional, terrestre y marítima.",
      "pains": [
        {
          "title": "Datos dispersos que no resisten una auditoría",
          "desc": "El pedimento dice una cosa, la factura otra y el sistema contable una tercera. Cuando el SAT o la ANAM cruzan la información, esas diferencias se vuelven créditos fiscales y multas. El problema no es la mala fe, es la falta de un sistema que valide la consistencia antes de transmitir."
        },
        {
          "title": "Hallazgos que se detectan cuando ya no hay margen",
          "desc": "Una clasificación arancelaria equivocada, un valor mal declarado o un certificado de origen vencido se descubren meses después, cuando corregir implica rectificaciones, recargos y exposición acumulada en cada operación que repitió el error."
        },
        {
          "title": "Volumen que rebasa el control manual",
          "desc": "Cuando la empresa pasa de decenas a miles de operaciones mensuales, el seguimiento por correo y archivos deja de funcionar. No se sabe en tiempo real qué embarque está detenido, qué documento falta ni dónde está la mercancía dentro de la cadena."
        },
        {
          "title": "Programas de fomento sin trazabilidad suficiente",
          "desc": "IMMEX y depósito fiscal exigen control de inventarios y descargo de pedimentos consistente, e IMMEX suma la balanza de materiales que liga insumos importados con producto exportado. Sin registros que amarren entradas, salidas y mermas, el beneficio fiscal queda en riesgo ante una revisión."
        }
      ],
      "whatWeDo": [
        {
          "title": "Cumplimiento aduanero validado por sistema",
          "desc": "Herramientas desarrolladas para verificar la información antes de la transmisión: consistencia entre pedimento, factura y datos del importador, vigencia de certificados y catálogos, y reglas de validación sobre clasificación y valor. El objetivo es alcanzar un nivel de cumplimiento óptimo, no corregir después del despacho."
        },
        {
          "title": "Detección y mitigación de hallazgos en tiempo real",
          "desc": "Reglas que señalan inconsistencias y desviaciones mientras la operación ocurre, no en la auditoría posterior. Identificar un error en el momento permite rectificar con menor exposición y documentar la corrección, en lugar de arrastrar el mismo problema en cada embarque."
        },
        {
          "title": "Logística internacional, terrestre y marítima",
          "desc": "Coordinación del movimiento de mercancía por vía terrestre y marítima dentro del comercio exterior, con la información aduanera y la documental amarradas al flujo físico. Que el dato del pedimento corresponda al embarque real, y que cada cambio quede registrado."
        },
        {
          "title": "Almacenaje y control de inventarios",
          "desc": "Registro de entradas, salidas, existencias y mermas con el detalle que exigen depósito fiscal y los programas de fomento. Un inventario que cuadra con los descargos de pedimentos es la base para sostener IMMEX o depósito fiscal ante una revisión."
        },
        {
          "title": "Distribución con trazabilidad documental",
          "desc": "Seguimiento de la mercancía desde el despacho hasta su entrega, conservando la liga entre cada movimiento y su soporte aduanero y fiscal. La trazabilidad reduce el tiempo de respuesta cuando la autoridad solicita evidencia de una operación específica."
        },
        {
          "title": "Monitoreo de la operación a gran escala",
          "desc": "Visibilidad sobre el estado de las operaciones: qué está en proceso, qué está detenido y qué requiere acción. El monitoreo continuo es lo que hace manejable un volumen alto sin perder control sobre el cumplimiento de cada pedimento."
        }
      ],
      "outcomes": [
        "Información aduanera consistente entre pedimento, factura y registros internos, lista para resistir una revisión de la autoridad.",
        "Hallazgos identificados durante la operación, con margen para rectificar y documentar antes de que se acumule la exposición.",
        "Control de inventarios y descargos que sostiene los beneficios de programas como IMMEX o depósito fiscal.",
        "Visibilidad en tiempo real sobre el estado de la mercancía y de cada operación logística, terrestre y marítima."
      ],
      "faq": [
        {
          "q": "¿La tecnología sustituye al agente aduanal o trabaja con él?",
          "a": "Trabaja con la operación aduanera existente. Las herramientas validan y dan visibilidad sobre la información, pero el despacho sigue su cauce legal con el agente aduanal. Lo que cambia es que las inconsistencias se detectan antes de transmitir, no después."
        },
        {
          "q": "¿Qué significa mitigar hallazgos en tiempo real?",
          "a": "Que las reglas de validación señalan una desviación mientras la operación está en curso, no en una auditoría posterior. Eso permite corregir con menor costo, documentar la rectificación y evitar repetir el mismo error en los siguientes embarques."
        },
        {
          "q": "¿Sirve para una operación bajo programa IMMEX o depósito fiscal?",
          "a": "Sí. Ambos exigen control de inventarios y descargo de pedimentos consistente, y en IMMEX se suma la balanza de materiales que liga insumos importados con producto exportado. El registro de entradas, salidas, existencias y mermas amarrado a la documentación aduanera es lo que sostiene el beneficio fiscal ante una revisión."
        },
        {
          "q": "¿Esto aplica solo a importación o también a logística y distribución?",
          "a": "Cubre la operación logística internacional, terrestre y marítima, e incluye almacenaje, distribución y monitoreo. La información aduanera se mantiene ligada al movimiento físico de la mercancía a lo largo de la cadena."
        }
      ]
    },
    {
      "overview": "Una empresa con saldo a favor de IVA tiene dinero retenido por la autoridad que solo recupera si la solicitud de devolución llega bien soportada y consistente con su contabilidad y declaraciones. El SAT revisa origen de operaciones, requisitos fiscales y congruencia entre lo informado y lo declarado antes de liberar un peso. BG Consulting revisa la determinación del saldo a favor, ordena el soporte de las operaciones y presenta la solicitud conforme a las Normas de Información Financiera y a los requisitos fiscales vigentes, dando seguimiento hasta que la autoridad resuelve.",
      "pains": [
        {
          "title": "Saldo a favor acumulado sin recuperar",
          "desc": "La empresa arrastra saldo a favor de IVA mes tras mes porque sus acreditamientos superan al impuesto trasladado, situación común en exportadores, tasa 0% y proyectos con inversión intensiva. Ese saldo es capital de trabajo inmovilizado mientras no se solicite y obtenga la devolución."
        },
        {
          "title": "Devoluciones rechazadas o detenidas por requerimientos",
          "desc": "Una solicitud presentada sin soporte suficiente deriva en requerimientos de información, en devolución parcial o en negativa. Cada requerimiento mal atendido alarga el proceso y deja a la empresa respondiendo a la autoridad sin una determinación sólida detrás."
        },
        {
          "title": "Inconsistencias entre lo informado y lo declarado",
          "desc": "Diferencias entre la Declaración Informativa de Operaciones con Terceros (DIOT) y la declaración mensual presentada al SAT son una de las causas frecuentes de observación. Cuando la cifra acreditada no cuadra con lo informado de proveedores, la autoridad cuestiona el acreditamiento."
        },
        {
          "title": "Acreditamientos sin sustento documental o contable",
          "desc": "El IVA acreditable exige comprobantes que cumplan requisitos fiscales y operaciones efectivamente registradas en el periodo. Facturas con defectos, operaciones no asentadas conforme a la normatividad contable o pagos no acreditados ponen en riesgo la parte del saldo que los origina."
        }
      ],
      "whatWeDo": [
        {
          "title": "Revisión de operaciones contra registros contables",
          "desc": "Cotejamos las operaciones del periodo contra los registros contables y la normatividad contable aplicable, verificando que cada partida que sustenta el IVA acreditable esté efectivamente asentada. Es la base que la autoridad espera encontrar al revisar el origen del saldo a favor."
        },
        {
          "title": "Verificación de requisitos fiscales del acreditamiento",
          "desc": "Revisamos que las operaciones cumplan los requisitos fiscales vigentes para que el IVA sea acreditable: comprobantes válidos, efectiva realización y pago de las operaciones, y procedencia del impuesto trasladado. Sin estos requisitos, la autoridad rechaza la porción correspondiente."
        },
        {
          "title": "Revisión de la determinación del saldo a favor",
          "desc": "Analizamos cómo se determinó el saldo a favor de IVA del periodo, validando el cálculo del impuesto trasladado, el acreditable y la mecánica que arroja la cifra solicitada. Una determinación correcta es lo que sostiene el monto frente a una revisión."
        },
        {
          "title": "Conciliación de la DIOT con la declaración mensual",
          "desc": "Confrontamos la Declaración Informativa de Operaciones con Terceros contra la declaración mensual presentada al SAT para detectar y resolver diferencias antes de presentar. La congruencia entre ambas reduce el riesgo de observaciones sobre el acreditamiento informado."
        },
        {
          "title": "Presentación de la solicitud de devolución",
          "desc": "Integramos y presentamos la solicitud de devolución por los meses que correspondan, con la determinación y el soporte de operaciones ordenados conforme a lo que requiere la autoridad. Una solicitud bien armada llega con el respaldo listo desde el primer momento."
        },
        {
          "title": "Seguimiento hasta la respuesta de la autoridad",
          "desc": "Damos seguimiento al trámite y atendemos lo que la autoridad solicite hasta que emite su respuesta. El proceso no termina al presentar: la atención a requerimientos durante la revisión es donde muchas devoluciones se ganan o se pierden."
        }
      ],
      "outcomes": [
        "Solicitud de devolución de IVA presentada con la determinación y el soporte de operaciones conforme a los requisitos del SAT.",
        "Operaciones, registros contables y declaraciones conciliados, con diferencias entre DIOT y declaración mensual identificadas y resueltas antes de presentar.",
        "Acreditamiento sustentado en comprobantes y operaciones que cumplen los requisitos fiscales vigentes.",
        "Trámite acompañado hasta la respuesta de la autoridad, con atención a los requerimientos que surjan durante la revisión."
      ],
      "faq": [
        {
          "q": "¿Qué revisan antes de presentar la solicitud de devolución?",
          "a": "Revisamos que las operaciones del periodo coincidan con los registros contables y la normatividad contable, que cumplan los requisitos fiscales vigentes para ser acreditables, y validamos la determinación del saldo a favor. También conciliamos la Declaración Informativa de Operaciones con Terceros contra la declaración mensual presentada al SAT. Ese cotejo ordena el soporte antes de que la autoridad lo pida."
        },
        {
          "q": "¿Por qué importa conciliar la DIOT con la declaración mensual?",
          "a": "Las diferencias entre lo informado en la DIOT y lo declarado en el periodo son una causa frecuente de observación por parte de la autoridad. Si el IVA acreditable de la declaración no es congruente con lo informado de proveedores, el SAT cuestiona el acreditamiento. Resolver esas diferencias antes de presentar evita que detengan o reduzcan la devolución."
        },
        {
          "q": "¿El acompañamiento termina al presentar la solicitud?",
          "a": "No. Damos seguimiento hasta que la autoridad emite su respuesta. Durante la revisión el SAT puede emitir requerimientos de información, y atenderlos con el soporte de las operaciones ya integrado es parte central del trabajo. Una solicitud bien presentada pero sin seguimiento queda expuesta en esa etapa."
        },
        {
          "q": "¿Bajo qué marco se realiza la revisión?",
          "a": "La revisión se realiza conforme a las Normas de Información Financiera y a los requisitos fiscales vigentes, contrastando las operaciones contra los registros contables del periodo. Sobre esa base se determina y soporta el saldo a favor que se solicita en devolución."
        }
      ]
    },
    {
      "overview": "México mantiene una de las redes de tratados comerciales más amplias del mundo, y cada acuerdo abre acceso preferencial siempre que la mercancía cumpla las reglas de origen y la documentación resista una verificación. El problema rara vez es la tarifa preferencial en sí, sino acreditarla: registros incompletos, certificados mal sustentados y proveedores que no documentan su aporte regional. BG Consulting Group estructura la determinación y certificación de origen para que el beneficio arancelario se aplique con respaldo y se sostenga frente a la autoridad.",
      "pains": [
        {
          "title": "El cliente exige certificado y el origen no está sustentado",
          "desc": "Un comprador en el extranjero condiciona la compra a un certificado de origen bajo el tratado aplicable, pero la empresa no tiene los registros que prueben el cumplimiento de la regla. Sin esa trazabilidad, o se pierde la venta o se emite un certificado que no resistirá una verificación posterior."
        },
        {
          "title": "Proveedores nacionales que no documentan su aporte",
          "desc": "El producto final califica solo si los insumos nacionales acreditan su origen, pero los proveedores entregan facturas sin la declaración ni los formatos que exige el cálculo. La empresa queda expuesta a determinar un origen que no puede demostrar."
        },
        {
          "title": "Se paga arancel general por desconocer la preferencia aplicable",
          "desc": "Mercancía que podría entrar con tarifa preferencial se importa pagando el arancel general porque no se analizó el tratado, la fracción o la correlación de nomenclaturas que habilitan el beneficio. Es costo recurrente que no se detecta hasta auditar las operaciones."
        },
        {
          "title": "Verificación de origen abierta por la autoridad",
          "desc": "La autoridad del país importador inicia una verificación y requiere sustentar el origen declarado en un plazo determinado. Sin expediente ordenado ni criterio técnico de respuesta, el riesgo es el desconocimiento de la preferencia y el cobro retroactivo de diferencias."
        }
      ],
      "whatWeDo": [
        {
          "title": "Determinación y registro de origen",
          "desc": "Revisamos y construimos los registros de origen que sustentan la calificación de cada producto: clasificación de insumos, criterio aplicable y memoria de cálculo. Es el expediente que convierte una afirmación de origen en algo demostrable ante la autoridad o el cliente."
        },
        {
          "title": "Gestión de origen con proveedores nacionales",
          "desc": "Diseñamos los formatos de solicitud de origen y gestionamos su obtención con los proveedores nacionales, de modo que el aporte regional de cada insumo quede documentado. Sin esta base, el producto final no puede acreditar la regla de origen aplicable."
        },
        {
          "title": "Certificación y registro de productos elegibles",
          "desc": "Registramos los productos que califican y tramitamos la obtención de certificados de origen bajo el instrumento correspondiente. Esto habilita al exportador a entregar al comprador un documento válido y al importador a aplicar la preferencia."
        },
        {
          "title": "Auditoría y cumplimiento de reglas de origen",
          "desc": "Auditamos los procesos de determinación y certificación y analizamos el cumplimiento de las reglas de origen aplicables. El objetivo es detectar certificaciones débiles antes de que lo haga una verificación y corregir el criterio mientras todavía es subsanable."
        },
        {
          "title": "Análisis de preferencias y correlación arancelaria",
          "desc": "Realizamos el análisis de factibilidad para identificar las tarifas preferenciales disponibles y correlacionamos las fracciones arancelarias con las nomenclaturas regionales, incluida ALADI. Así se confirma qué beneficio aplica realmente a cada mercancía y bajo qué tratado."
        },
        {
          "title": "Resoluciones anticipadas y verificaciones de origen",
          "desc": "Asesoramos en procedimientos aduaneros para obtener preferencias, tramitamos solicitudes de resolución anticipada y atendemos las verificaciones de origen que abre la autoridad. La resolución anticipada da certeza sobre el criterio antes de operar; la atención a verificaciones protege la preferencia ya aplicada."
        }
      ],
      "outcomes": [
        "Certificados de origen emitidos con expediente que respalda cada calificación y resiste una verificación.",
        "Aplicación de las tarifas preferenciales que realmente corresponden a cada mercancía y tratado, en lugar de pagar arancel general por omisión.",
        "Aporte de origen de proveedores nacionales documentado, de modo que la determinación del producto final sea defendible.",
        "Verificaciones de origen atendidas en plazo, protegiendo la preferencia ya aplicada frente a su desconocimiento."
      ],
      "faq": [
        {
          "q": "¿Por qué necesito registros de origen si ya clasifiqué la mercancía?",
          "a": "La clasificación arancelaria identifica el producto, pero no prueba que cumpla la regla de origen del tratado. El registro de origen documenta el criterio aplicable, los insumos y su procedencia, y la memoria de cálculo. Es lo que se exhibe en una verificación: sin él, el certificado emitido carece de sustento aunque la fracción sea correcta."
        },
        {
          "q": "Mis proveedores nacionales no me dan documentación de origen. ¿Eso me afecta?",
          "a": "Sí. Cuando la regla de origen depende del aporte regional, el origen de los insumos nacionales debe estar documentado para que el producto final califique. Diseñamos los formatos de solicitud y gestionamos su obtención con los proveedores, de modo que cada insumo relevante quede acreditado y la determinación sea defendible."
        },
        {
          "q": "¿Qué es una resolución anticipada y cuándo conviene solicitarla?",
          "a": "Es un pronunciamiento de la autoridad sobre un criterio concreto, por ejemplo el origen o la clasificación de una mercancía, emitido antes de realizar la operación. Conviene cuando hay duda razonable sobre la calificación y se quiere certeza previa, evitando aplicar una preferencia que después sea controvertida en una verificación."
        },
        {
          "q": "La autoridad abrió una verificación de origen. ¿Qué hacen ustedes?",
          "a": "Atendemos la verificación: integramos y revisamos el expediente, validamos que la determinación de origen sea consistente con la regla aplicable y preparamos la respuesta dentro del plazo requerido. El objetivo es sostener la preferencia ya aplicada y evitar el desconocimiento del trato preferencial y el cobro de diferencias."
        }
      ]
    },
    {
      "overview": "Importar a México implica clasificar correctamente la mercancía, cumplir regulaciones no arancelarias, tramitar permisos y despachar ante la aduana sin que la carga se detenga. Un error en la fracción arancelaria o una NOM omitida puede frenar el contenedor en el cruce y generar costos que nadie presupuestó. BG Consulting Group acompaña la operación desde el origen hasta la entrega en destino, coordinando el despacho aduanal, el cumplimiento normativo y la logística en el corredor Tijuana-San Diego.",
      "pains": [
        {
          "title": "La mercancía se detiene en la aduana",
          "desc": "El embarque queda retenido por una clasificación arancelaria incorrecta, documentación incompleta o una regulación no cumplida. Cada día detenido suma almacenaje y rompe los compromisos de entrega con el cliente final."
        },
        {
          "title": "No saben qué NOM aplica a su producto",
          "desc": "La empresa descubre tarde que su producto requiere certificación de etiquetado o de seguridad. Sin la NOM acreditada, la aduana no libera la mercancía, sin importar que el resto del trámite esté en regla."
        },
        {
          "title": "El producto necesita un permiso previo",
          "desc": "Ciertas mercancías exigen permisos o avisos de dependencias como Salud, Economía o SADER antes de importarse. Quien no identifica el requisito a tiempo enfrenta el embarque parado y, en algunos casos, sanciones."
        },
        {
          "title": "Coordinar broker, transporte y bodega por separado",
          "desc": "La empresa gestiona por su cuenta al agente aduanal, al transportista y al almacén, y cada parte responde solo por su tramo. Cuando algo falla en el cruce, nadie tiene la operación completa a la vista."
        }
      ],
      "whatWeDo": [
        {
          "title": "Despacho con agente aduanal",
          "desc": "Coordinamos el despacho ante la aduana con agente aduanal: clasificación de la fracción arancelaria, elaboración del pedimento y determinación de las contribuciones aplicables, como el IGI y el IVA. La clasificación correcta define lo que se paga y los requisitos que se activan, por eso es el punto de partida de toda la operación."
        },
        {
          "title": "Cumplimiento de NOM",
          "desc": "Identificamos qué Normas Oficiales Mexicanas aplican a su producto, sea de etiquetado comercial, información comercial o seguridad, y gestionamos la acreditación que la aduana exige para liberar la mercancía. Resolver la NOM antes del cruce evita que el embarque quede retenido por un requisito normativo."
        },
        {
          "title": "Gestión de permisos y regulaciones no arancelarias",
          "desc": "Tramitamos los permisos previos, avisos y autorizaciones que distintas dependencias exigen según el tipo de mercancía. Mapear estos requisitos antes de importar evita que el producto llegue al cruce sin la documentación que condiciona su entrada al país."
        },
        {
          "title": "Almacenaje",
          "desc": "Disponemos de bodega para resguardar la mercancía antes o después del despacho, sea para consolidar embarques, escalonar entregas o mantener la carga mientras se completa un trámite. Tener dónde colocar la mercancía da margen para operar sin presión sobre el cruce."
        },
        {
          "title": "Transporte y entrega puerta a puerta",
          "desc": "Coordinamos el transporte de la carga y el servicio puerta a puerta, desde el origen hasta el destino final en México. Al manejar el despacho y el movimiento físico bajo una misma coordinación, la mercancía no se queda esperando un eslabón que responde por separado."
        }
      ],
      "outcomes": [
        "Despacho sin retenciones evitables: la mercancía cruza con la clasificación, el pedimento y los requisitos normativos resueltos de antemano, sin sorpresas en la aduana.",
        "Cumplimiento normativo verificado: NOM, permisos y regulaciones no arancelarias identificados y acreditados antes del cruce, no descubiertos cuando la carga ya está detenida.",
        "Una sola coordinación de la operación: despacho, almacenaje y transporte gestionados bajo un mismo interlocutor, con visibilidad de toda la cadena en el corredor Tijuana-San Diego.",
        "Entrega hasta destino final: la carga llega al punto de entrega en México con el movimiento físico y el trámite aduanal coordinados en conjunto."
      ],
      "faq": [
        {
          "q": "¿Qué necesito para importar un producto a México?",
          "a": "Como mínimo, estar inscrito en el Padrón de Importadores, contar con la clasificación arancelaria correcta de la mercancía y cumplir las regulaciones que correspondan a esa fracción: contribuciones como el IGI y el IVA, las NOM aplicables y, en su caso, permisos previos. Revisamos su producto para determinar qué requisitos activa antes de mover el embarque."
        },
        {
          "q": "¿Cómo sé si mi producto requiere una NOM?",
          "a": "Depende de la fracción arancelaria y de la naturaleza del producto. Hay NOM de etiquetado e información comercial y otras de seguridad que la aduana verifica al momento del despacho. Revisamos la clasificación de su mercancía e identificamos qué normas aplican y cómo acreditarlas para que no detengan el embarque."
        },
        {
          "q": "¿Por qué se queda detenida la mercancía en la aduana?",
          "a": "Las causas más frecuentes son una clasificación arancelaria incorrecta, documentación incompleta, una NOM no acreditada o un permiso previo faltante. La mayoría se previene revisando los requisitos antes de que la carga llegue al cruce, que es como trabajamos la operación."
        },
        {
          "q": "¿Se encargan también del transporte y la entrega?",
          "a": "Sí. Además del despacho aduanal, coordinamos el transporte de la carga y el servicio puerta a puerta hasta el destino final en México, junto con almacenaje cuando se requiere consolidar o resguardar la mercancía. La idea es que el trámite y el movimiento físico avancen coordinados, no por separado."
        }
      ]
    }
  ],
  "en": [
    {
      "overview": "Foreign trade companies operate under dense, technical tax and customs legislation that changes constantly. BG Consulting Group monitors compliance with those obligations and advises on business decisions with tax exposure, and when the authority issues an act, it takes on the defense of the matter from the moment of notification through to its conclusion, using the ordinary and alternative means set out in the law.",
      "pains": [
        {
          "title": "A notice from the authority just arrived",
          "desc": "The company is served with an administrative act: a tax assessment, a fine, or the start of an administrative customs proceeding (PAMA). From that point deadlines begin to run, and each decision shapes how the matter ends."
        },
        {
          "title": "An audit or review underway",
          "desc": "The authority exercises its review powers over foreign trade operations: tariff classification, valuation, origin, regimes such as IMMEX. The company needs to respond with technical support before the review turns into an assessment."
        },
        {
          "title": "A business decision with tax exposure",
          "desc": "Changes of regime, restructurings, new cross-border operations, or shifts in the supply chain carry customs and tax effects that are better assessed before execution, not after an observation lands."
        },
        {
          "title": "An adverse resolution to challenge",
          "desc": "There is a final resolution the company considers unlawful or harmful to its rights, and it must decide how to contest it: administrative appeal, litigation before the court, or amparo, depending on the matter and the procedural stage."
        }
      ],
      "whatWeDo": [
        {
          "title": "Ongoing tax and customs advisory",
          "desc": "Monitoring of the compliance the company is obliged to meet and support on business decisions with tax or customs effect: classification, valuation, customs regimes, foreign trade operations. The aim is to identify exposure before it becomes an assessment or a penalty."
        },
        {
          "title": "Administrative appeals",
          "desc": "Filing of the revocation appeal and other defense remedies at the administrative level against acts of the tax and customs authority. This is the first instance to contest an act without yet going to court, and in many matters it decides the outcome."
        },
        {
          "title": "Litigation before the Federal Court of Administrative Justice",
          "desc": "Filing and follow-up of administrative litigation against final resolutions: tax assessments, fines, and customs determinations. The ordinary or summary track is chosen according to the amount and nature of the matter."
        },
        {
          "title": "Amparo proceedings and human rights",
          "desc": "Filing of indirect and direct amparo when an act of authority violates fundamental rights or when the prior instance has been exhausted. The human rights recognized in the Constitution and in treaties serve as a basis of defense against the authority's actions."
        },
        {
          "title": "Conclusive agreements, arbitration, and mediation",
          "desc": "Conclusive agreements before PRODECON to resolve differences with the authority during its review powers, international commercial arbitration for disputes between private parties in cross-border operations, and mediation. These are routes to close a matter without exhausting full litigation."
        },
        {
          "title": "Expert opinions before the courts",
          "desc": "Acting as experts before the Judicial Branch of the Federation and before the Federal Court of Administrative Justice. The expert opinion provides the technical support in customs and tax matters that the adjudicator needs to decide."
        }
      ],
      "outcomes": [
        "Defense of the matter handled from the notification of the administrative act through to its conclusion, by whichever route best fits the case.",
        "Business decisions made with tax and customs exposure identified in advance.",
        "The option to settle differences with the authority through a conclusive agreement or alternative means, without exhausting full litigation.",
        "Technical expert support when the matter reaches the courts."
      ],
      "faq": [
        {
          "q": "When should a lawyer get involved?",
          "a": "From the notification of the administrative act, and ideally before, while the authority is exercising its review powers. Deadlines to file defense remedies begin at notification, and actions taken during the audit affect both the resolution and the later defense."
        },
        {
          "q": "What is the difference between an administrative appeal and litigation before the TFJA?",
          "a": "The administrative appeal is filed before the tax or customs authority itself and allows the act to be reviewed at the administrative level. Litigation before the Federal Court of Administrative Justice is brought before a judicial body independent of the authority that issued the resolution. The choice between them depends on the act, the stage, and the strategy for the matter."
        },
        {
          "q": "What is a conclusive agreement and when does it apply?",
          "a": "It is an alternative means processed through PRODECON while the authority is exercising its review powers. It allows differences over the observed facts or omissions to be raised and resolved before the final determination is issued, as an alternative to taking the disagreement to litigation."
        },
        {
          "q": "Do you handle operations between Tijuana and San Diego?",
          "a": "Yes. The movement of goods and operations across both sides of the border concentrate much of the customs work and of the disputes between private parties. For the latter, international commercial arbitration is one of the routes available to resolve the conflict outside the courts."
        }
      ],
      diagnostic: LEGAL_DIAGNOSTIC,
      flow: LEGAL_FLOW,
      bandImage: "/img/gen/legal-defense.webp",
      bandCaption: "Tax and customs defense, from notice to resolution",
    },
    {
      "overview": "The IMMEX program and other foreign trade authorizations rest on detailed compliance with their operating requirements, not only on their benefits. A documentary gap or an operation an authority reads adversely during a review can cost the authorization and the export privileges granted to the company. BG Consulting builds internal and external audit programs in foreign trade and customs that validate the legal certainty of every operation within its authorized scope.",
      "pains": [
        {
          "title": "Risk of losing the IMMEX authorization",
          "desc": "The company operates under IMMEX but has no certainty it meets every operating requirement. A non-compliance found by the authority can lead to suspension or cancellation of the program and the loss of granted export privileges."
        },
        {
          "title": "Pedimento balances that do not reconcile",
          "desc": "The fixed assets and raw materials balances recorded on pedimentos no longer match the real inventory. Without an orderly reconstruction of those balances, any review exposes differences that are hard to justify."
        },
        {
          "title": "A notified audit or review",
          "desc": "An audit order or a request for information arrives and the import-export department cannot confirm that documentation supports each operation. The company needs to know its exposure before the review, not during it."
        },
        {
          "title": "Weak internal controls or an improvised department",
          "desc": "The foreign trade area grew without structure, inventory controls fall behind, and no one has clear visibility of the risk. Each operational error turns into a latent customs and tax contingency."
        }
      ],
      "whatWeDo": [
        {
          "title": "Foreign trade risk evaluation and analysis",
          "desc": "We identify where operations drift from the authorized framework: classification, valuation, origin, inventory control, and documentary support. This is the diagnosis that shows where the company is exposed before the authority finds it."
        },
        {
          "title": "Preventive audits and annual assurance plans",
          "desc": "We run preventive foreign trade audits and structure an annual continuous assurance plan plus an annual specialized advisory plan. Recurring review catches deviations in time and keeps operations within the limits of the authorization."
        },
        {
          "title": "Reconstruction of pedimento balances",
          "desc": "We reconstruct pedimento balances for fixed assets and raw materials, along with capital goods and accessories. Reconciling these balances with physical inventory is the basis for sustaining the legal status of temporarily imported goods."
        },
        {
          "title": "Internal control and inventory analysis",
          "desc": "We analyze internal controls and inventory risk to confirm that the inventory control system, as required under Annex 24, backs every entry and exit. Consistent inventory control is a condition for keeping the program and for answering a review without unexplained differences."
        },
        {
          "title": "Reengineering of the Import-Export Department",
          "desc": "We redesign the processes and responsibilities of the foreign trade area so compliance is built into daily operations rather than left to isolated judgment. The goal is a structure that sustains the authorization on its own."
        },
        {
          "title": "NAFTA Article 303 and rules of origin",
          "desc": "We review the treatment of duties on non-originating inputs incorporated into exports, under NAFTA Article 303 and its equivalent treatment in force under the USMCA. This is a point where an incorrect calculation creates differences and tax assessments."
        }
      ],
      "outcomes": [
        "Legal certainty that operations run within the limits of the current authorization.",
        "Foreign trade contingencies identified and documented before an authority review.",
        "Pedimento balances for fixed assets and raw materials reconstructed and reconciled with inventory.",
        "An import-export department with processes and controls that sustain compliance on a continuous basis."
      ],
      "faq": [
        {
          "q": "Why do I need audits if my IMMEX is already authorized?",
          "a": "The authorization is not earned once: it is kept by continuously meeting the operating requirements. Internal and external audits confirm that operations stay within that framework and prevent a non-compliance, or an operation the authority reads negatively in a review, from putting the program and its export privileges at risk."
        },
        {
          "q": "What does reconstructing pedimento balances involve?",
          "a": "It means rebuilding and reconciling the fixed assets and raw materials balances recorded on pedimentos against the real inventory, including capital goods and accessories. When those balances do not match, the legal status of temporarily imported goods is exposed; the reconstruction organizes that information so it can be sustained in a review."
        },
        {
          "q": "Is a preventive audit worth it if no review is pending?",
          "a": "Yes. A preventive audit lets you find and correct deviations on your own initiative, under controlled conditions, instead of facing them during an authority visit. That is why we work from an annual continuous assurance plan and not only in response to a request."
        },
        {
          "q": "What is NAFTA Article 303 and why do you review it?",
          "a": "NAFTA Article 303, with an equivalent treatment in force under the USMCA, governs duties on non-originating inputs incorporated into goods destined for export under programs like IMMEX: it limits the refund or waiver of duties when the finished good is exported to the treaty region. Applying it incorrectly creates differences in duty payments; reviewing it avoids tax assessments arising from a wrong calculation."
        }
      ],
      diagnostic: COMPLIANCE_AND_ASSURANCE_DIAGNOSTIC,
      flow: COMPLIANCE_AND_ASSURANCE_FLOW,
    },
    {
      "overview": "Foreign trade rules change with every regulatory update, and a single misapplied criterion in valuation, origin, or classification can turn into a tax assessment, a penalty, or loss of your importer registry. BG Consulting Group works with importers and exporters so each transaction meets current law while using the tax and customs benefits Mexico has secured through its international trade agreements.",
      "pains": [
        {
          "title": "An audit or authority request is already underway",
          "desc": "The SAT or ANAM flags inconsistencies in declared value, origin, or compliance with non-tariff regulations. You need to review entries, rebuild the supporting documentation, and respond with technical grounds before an assessment is determined."
        },
        {
          "title": "Uncertainty about how to value the merchandise",
          "desc": "Related-party transactions, royalties, dutiable additions, or discounts affect the customs base. Applying the valuation method wrong exposes you to tax differences and penalties; applying it right keeps you from overpaying or underpaying."
        },
        {
          "title": "The company runs, or wants to run, under IMMEX",
          "desc": "Temporary imports, Annex 24 inventory control, Annex 31 validation, and on-time returns carry obligations that, if left unmanaged, lead to deferred taxes becoming payable and put the program at risk."
        },
        {
          "title": "You want to lower duty cost legally",
          "desc": "The company pays duties it could reduce or recover through Drawback, PROSEC, preferential origin under a trade agreement, or refund of contributions, but it is not clear which mechanism fits the operation or how to document it."
        }
      ],
      "whatWeDo": [
        {
          "title": "Customs valuation and the dutiable base",
          "desc": "Determining the customs value of the merchandise and applying valuation criteria under Mexican law and the WTO Valuation Agreement: transaction value, dutiable additions, related-party situations, and secondary methods. A well-supported base prevents tax differences and findings during review."
        },
        {
          "title": "Classification, origin, and entries",
          "desc": "Correct filing of entries (pedimentos), analysis of the origin of the merchandise, and certification under the free trade agreements Mexico has signed. Origin drives the tariff preference and the specific rules; an error here means duties overpaid or preferences denied."
        },
        {
          "title": "Non-tariff regulations and prior permits",
          "desc": "Compliance with non-tariff restrictions and regulations, prior permits before the Ministry of Economy, and other sector requirements. We identify what each tariff code demands so goods are not held and the operation is not exposed to penalty."
        },
        {
          "title": "Promotion programs: IMMEX, PROSEC, and Drawback",
          "desc": "Advisory on the IMMEX program, PROSEC, and recovery of contributions through Drawback and tax refunds. These mechanisms let you defer or recover duties legally; using them requires documentary support and control that we set up from the start."
        },
        {
          "title": "Inventory control: Annex 24, Annex 31, and Data Stage",
          "desc": "Setup and review of the inventory control system (Annex 24), the Annex 31 validation system, and the Data Stage system. Inventory control is the backbone of the temporary regime: without it, returns cannot be proven and deferred taxes come due."
        },
        {
          "title": "Risk analysis and export promotion",
          "desc": "Risk analysis in customs matters across your operations, plus use of export promotion schemes. Spotting the weak point in an operation costs far less than correcting it during an audit."
        }
      ],
      "outcomes": [
        "Import and export operations backed by technical grounds when the authority reviews them.",
        "Duty cost optimized legally through trade agreements, PROSEC, Drawback, and refunds where the operation allows it.",
        "Annex 24 inventory control and Annex 31 validation kept in order to prove returns and sustain the IMMEX program.",
        "Early identification of risks in valuation, origin, classification, and non-tariff regulations before they become a tax assessment."
      ],
      "faq": [
        {
          "q": "How is the customs value of my merchandise determined?",
          "a": "The general rule is the transaction value method: the price paid or payable for the goods, plus the dutiable additions that apply, such as freight, insurance, commissions, royalties, or materials supplied to the vendor. When buyer and seller are related, or when transaction value cannot be used, the law moves to secondary methods in a set order. We review your cost structure and contracts to fix the correct dutiable base and document it."
        },
        {
          "q": "What is the difference between Drawback, PROSEC, and IMMEX?",
          "a": "They are distinct mechanisms that can coexist. IMMEX allows the temporary import of inputs to produce goods for export, deferring duties as long as return deadlines are met. PROSEC lowers the import duty on certain inputs and machinery by productive sector. Drawback is the refund of the general import duty paid on inputs incorporated into exported goods. Which one applies depends on your operation, your inputs, and your markets; we define it from your case."
        },
        {
          "q": "I received a SAT request about foreign trade. What do you do?",
          "a": "We review the scope of the request, the entries, and the supporting documentation for the operations under review, and we identify whether the inconsistency sits in valuation, origin, classification, or compliance with non-tariff regulations. With that diagnosis we prepare the technical response and the documentation that supports the operation, to address the authority within the deadlines of the procedure."
        },
        {
          "q": "Why does inventory control matter so much under IMMEX?",
          "a": "Because it is what proves that temporarily imported merchandise was returned, transferred, or changed regime on time. Annex 24 is the mandatory inventory control system, Annex 31 validates balances before the authority, and Data Stage supports the information handling. If these systems do not match the operations, the authority presumes the goods stayed in the country and assesses the duties that were deferred."
        }
      ],
      diagnostic: FT_DIAGNOSTIC,
      flow: FT_FLOW,
    },
    {
      "overview": "When customs or tax authorities challenge the tariff classification, origin, or value of your goods, what is at stake is a tax assessment and often the viability of the operation itself. BG Consulting Group substantiates the grievances raised in legal defense with technical opinions in foreign trade and customs matters, and issues expert opinions when a case requires legal certainty before the corresponding authority.",
      "pains": [
        {
          "title": "Authority reclassifies your tariff code",
          "desc": "Customs or an audit reassigns a tariff classification, changing the duty rate, the non-tariff regulations that apply, or access to preferential treatment. Disputing it takes more than a commercial argument: it requires technical support justifying the classification under the General Rules of Interpretation."
        },
        {
          "title": "Origin denied, preference lost",
          "desc": "The authority rejects the declared origin under the USMCA or another treaty and demands the duties that were waived under preference. Defending it means proving the specific rules of origin, the supporting documentation, and the criteria that apply to the goods."
        },
        {
          "title": "Customs value questioned",
          "desc": "The authority rejects the declared value or adjusts the taxable base through its own appraisal, raising the duties and taxes owed and potentially triggering penalties. Holding the declared value requires a technical valuation grounded in the customs valuation methods."
        },
        {
          "title": "Annex 24 and IMMEX inconsistencies",
          "desc": "Companies under an IMMEX program face findings on the Annex 24 inventory control system, unsupported discharges, or discrepancies in the material balance that put the temporary regime at risk and open the door to assessments on goods not returned."
        }
      ],
      "whatWeDo": [
        {
          "title": "Expert opinion on tariff classification",
          "desc": "Technical analysis of the goods and their position in the tariff schedule under the General Rules of Interpretation, section and chapter legal notes, and applicable criteria. It serves as expert evidence to defend the correct classification against an authority reclassification."
        },
        {
          "title": "Substantiating origin of goods",
          "desc": "Verification that the goods meet the rules of origin of the treaty invoked, review of regional value content or tariff shift as applicable, and documentary support. This lets you defend preferential treatment when the authority denies it."
        },
        {
          "title": "Appraisals and customs valuation",
          "desc": "Determination of customs value using the valuation methods set in the Customs Law, starting from transaction value and, where that does not apply, the secondary methods. It provides the basis to dispute an appraisal or an adjustment to the taxable base."
        },
        {
          "title": "Customs criteria and technical opinion",
          "desc": "Interpretation of customs regulations and the authority's criteria as they apply to the specific case, to fix the technical position that supports the defense grievances or that provides certainty before an operational decision is made."
        },
        {
          "title": "Annex 24 and inventory control review",
          "desc": "Analysis of the Annex 24 inventory control system, the traceability of entries, discharges, and returns, and the consistency of the IMMEX material balance. It identifies and documents the support needed to respond to authority findings."
        },
        {
          "title": "Expert support within legal defense",
          "desc": "Preparation of the opinions that back the grievances raised in administrative appeals and tax litigation in customs matters, coordinated with the legal strategy of the case."
        }
      ],
      "outcomes": [
        "Defense grievances backed by documented technical support grounded in the applicable customs regulations.",
        "A clear position on classification, origin, value, or Annex 24 before responding to the authority or committing to an operation.",
        "Opinions usable as evidence in administrative appeals and litigation.",
        "Greater legal certainty for foreign trade decisions with tax exposure."
      ],
      "faq": [
        {
          "q": "How is an expert opinion different from ordinary customs advice?",
          "a": "Advice guides day-to-day operations. An expert opinion is a technical document that analyzes a specific case and is offered as evidence before the authority or court to support the defense grievances. It is prepared with the rigor and legal grounding its use within a proceeding demands."
        },
        {
          "q": "Can you defend a tariff classification different from the one the authority assigned?",
          "a": "Yes. We analyze the goods and build the support for the classification that applies under the General Rules of Interpretation, the legal notes, and the applicable criteria. That analysis becomes the opinion backing the dispute against the reclassification."
        },
        {
          "q": "We have a finding on our IMMEX Annex 24. What do you review?",
          "a": "We review the inventory control system, the traceability between entry and return pedimentos, the discharges, and the material balance. The goal is to identify the documentary and technical support to respond to the authority's finding on goods under the temporary regime."
        },
        {
          "q": "When does it make sense to request an expert opinion?",
          "a": "When the authority has already challenged classification, origin, or value and a defense is being filed, and also preventively, when an operational decision with tax exposure requires legal certainty before it is carried out."
        }
      ],
      diagnostic: INTERNATIONAL_TRADE_EXPERTS_DIAGNOSTIC,
      flow: INTERNATIONAL_TRADE_EXPERTS_FLOW,
    },
    {
      "overview": "A cross-border operation produces thousands of customs entries, invoices, certificates of origin and movement records that the authority can review years after release. When that information lives in disconnected spreadsheets and gets reconciled by hand, inconsistencies surface late, usually during an audit. BG Consulting Group deploys information technology capable of managing a large-scale operation and builds customs compliance tools that help reach an optimal level of compliance or mitigate findings in real time, across international, land and maritime logistics.",
      "pains": [
        {
          "title": "Scattered data that fails an audit",
          "desc": "The customs entry says one thing, the invoice another, the accounting system a third. When the tax or customs authority cross-checks the records, those gaps turn into assessments and penalties. The issue is not bad faith, it is the absence of a system that checks consistency before transmission."
        },
        {
          "title": "Findings caught when there is no room to fix them",
          "desc": "A wrong tariff classification, a misdeclared value or an expired certificate of origin gets discovered months later, when correcting it means amendments, surcharges and exposure that compounded on every operation that repeated the error."
        },
        {
          "title": "Volume that outgrows manual control",
          "desc": "When a company moves from dozens to thousands of monthly operations, tracking by email and files stops working. There is no real-time view of which shipment is held, which document is missing or where the goods sit in the chain."
        },
        {
          "title": "Incentive programs without enough traceability",
          "desc": "IMMEX and bonded warehouse require inventory control and consistent entry write-offs, and IMMEX adds a material balance that ties imported inputs to exported product. Without records that tie inflows, outflows and waste together, the tax benefit is exposed the moment a review begins."
        }
      ],
      "whatWeDo": [
        {
          "title": "System-validated customs compliance",
          "desc": "Tools built to verify information before transmission: consistency between the customs entry, the invoice and importer data, validity of certificates and catalogs, and validation rules over classification and value. The goal is to reach an optimal level of compliance, not to fix things after release."
        },
        {
          "title": "Real-time detection and mitigation of findings",
          "desc": "Rules that flag inconsistencies and deviations while the operation is happening, not in a later audit. Catching an error in the moment allows correction with lower exposure and documents the fix, instead of carrying the same problem through every shipment."
        },
        {
          "title": "International, land and maritime logistics",
          "desc": "Coordination of goods moving by land and sea within foreign trade, with the customs and documentary data tied to the physical flow. The entry data matches the actual shipment, and every change stays on record."
        },
        {
          "title": "Storage and inventory control",
          "desc": "Recording of inflows, outflows, balances and waste at the level of detail that bonded warehouse and incentive programs require. An inventory that reconciles with customs write-offs is the basis for sustaining IMMEX or bonded warehouse under review."
        },
        {
          "title": "Distribution with documentary traceability",
          "desc": "Tracking goods from release to delivery while keeping the link between each movement and its customs and tax support. Traceability cuts response time when the authority requests evidence on a specific operation."
        },
        {
          "title": "Monitoring at scale",
          "desc": "Visibility over the state of operations: what is in process, what is held and what needs action. Continuous monitoring is what makes high volume manageable without losing control over the compliance of each entry."
        }
      ],
      "outcomes": [
        "Customs data consistent across the entry, the invoice and internal records, ready to hold up under an authority review.",
        "Findings identified during the operation, with room to correct and document before exposure compounds.",
        "Inventory control and write-offs that sustain the benefits of programs such as IMMEX or bonded warehouse.",
        "Real-time visibility over the status of goods and of each land and maritime logistics operation."
      ],
      "faq": [
        {
          "q": "Does the technology replace the customs broker or work alongside one?",
          "a": "It works alongside the existing customs operation. The tools validate and give visibility over the information, but clearance follows its legal path with the broker. What changes is that inconsistencies are caught before transmission, not after."
        },
        {
          "q": "What does mitigating findings in real time mean?",
          "a": "Validation rules flag a deviation while the operation is in progress, not in a later audit. That allows correction at lower cost, documents the fix, and prevents repeating the same error on the next shipments."
        },
        {
          "q": "Does it work for an operation under IMMEX or bonded warehouse?",
          "a": "Yes. Both require inventory control and consistent entry write-offs, and IMMEX adds a material balance that ties imported inputs to exported product. Recording inflows, outflows, balances and waste tied to the customs documentation is what sustains the tax benefit under review."
        },
        {
          "q": "Does this apply only to imports, or also to logistics and distribution?",
          "a": "It covers international, land and maritime logistics, and includes storage, distribution and monitoring. The customs information stays linked to the physical movement of the goods across the chain."
        }
      ]
    },
    {
      "overview": "A company carrying a VAT credit balance has money held by the tax authority that it only recovers when the refund request arrives well supported and consistent with its accounting and filings. Before releasing anything, the SAT reviews the origin of the operations, the tax requirements they must meet, and whether what was reported matches what was filed. BG Consulting reviews how the credit balance was determined, organizes the support behind the operations, and files the refund request under Financial Information Standards and current tax requirements, following up until the authority responds.",
      "pains": [
        {
          "title": "Accumulated credit balance not recovered",
          "desc": "The company carries a VAT credit balance month after month because its creditable VAT exceeds the VAT it charges, common in exporters, 0% rate activities, and investment-heavy projects. That balance is working capital tied up until the refund is requested and obtained."
        },
        {
          "title": "Refunds rejected or stalled by information requests",
          "desc": "A request filed without sufficient support leads to information requirements, partial refunds, or denial. Each requirement handled poorly stretches the process and leaves the company responding to the authority without a solid determination behind it."
        },
        {
          "title": "Mismatches between what was reported and what was filed",
          "desc": "Differences between the Informative Statement of Third-Party Operations (DIOT) and the monthly statement filed with the SAT are a frequent source of observations. When the creditable amount does not match what was reported for its suppliers, the authority questions the credit."
        },
        {
          "title": "Credits without documentary or accounting support",
          "desc": "Creditable VAT requires invoices that meet tax requirements and operations actually recorded in the period. Defective invoices, operations not booked per accounting standards, or payments not substantiated put at risk the portion of the balance they originate."
        }
      ],
      "whatWeDo": [
        {
          "title": "Review of operations against accounting records",
          "desc": "We match the period's operations against the accounting records and applicable accounting standards, verifying that every item supporting creditable VAT is actually booked. This is the foundation the authority expects to find when it reviews the origin of the credit balance."
        },
        {
          "title": "Verification of tax requirements for the credit",
          "desc": "We review that operations meet the current tax requirements for VAT to be creditable: valid invoices, operations actually carried out and paid, and a sound basis for the VAT charged. Without these, the authority rejects the corresponding portion."
        },
        {
          "title": "Review of the credit balance determination",
          "desc": "We analyze how the period's VAT credit balance was determined, validating the calculation of VAT charged, creditable VAT, and the mechanics that yield the amount requested. A correct determination is what holds the amount up under review."
        },
        {
          "title": "Reconciliation of the DIOT with the monthly statement",
          "desc": "We compare the Informative Statement of Third-Party Operations against the monthly statement filed with the SAT to find and resolve differences before filing. Consistency between the two lowers the risk of observations on the reported credit."
        },
        {
          "title": "Filing the refund request",
          "desc": "We assemble and file the refund request for the applicable months, with the determination and operational support organized as the authority requires. A well-built request arrives with the backup ready from the start."
        },
        {
          "title": "Follow-up until the authority responds",
          "desc": "We follow the process and address what the authority asks until it issues its response. The work does not end at filing: handling requirements during the review is where many refunds are won or lost."
        }
      ],
      "outcomes": [
        "VAT refund request filed with the determination and operational support meeting SAT requirements.",
        "Operations, accounting records, and filings reconciled, with differences between the DIOT and the monthly statement found and resolved before filing.",
        "Credit supported by invoices and operations that meet current tax requirements.",
        "Process accompanied until the authority responds, addressing any requirements raised during the review."
      ],
      "faq": [
        {
          "q": "What do you review before filing the refund request?",
          "a": "We check that the period's operations match the accounting records and accounting standards, that they meet the current tax requirements to be creditable, and we validate how the credit balance was determined. We also reconcile the Informative Statement of Third-Party Operations against the monthly statement filed with the SAT. That cross-check organizes the support before the authority asks for it."
        },
        {
          "q": "Why does reconciling the DIOT with the monthly statement matter?",
          "a": "Differences between what the DIOT reports and what the period's statement declares are a frequent source of observations from the authority. If the creditable VAT in the statement is not consistent with what was reported for suppliers, the SAT questions the credit. Resolving those differences before filing keeps them from stalling or reducing the refund."
        },
        {
          "q": "Does the support end once the request is filed?",
          "a": "No. We follow up until the authority issues its response. During the review the SAT may issue information requirements, and addressing them with the operational support already in place is a central part of the work. A well-filed request without follow-up is exposed at that stage."
        },
        {
          "q": "Under what framework is the review performed?",
          "a": "The review is performed under Financial Information Standards and current tax requirements, contrasting operations against the period's accounting records. On that basis the credit balance to be refunded is determined and supported."
        }
      ]
    },
    {
      "overview": "Mexico holds one of the widest networks of trade agreements in the world, and each one opens preferential access as long as the goods meet the rules of origin and the paperwork survives a verification. The hard part is rarely the preferential rate itself, it is proving entitlement to it: incomplete records, weakly supported certificates, and suppliers who never document their regional content. BG Consulting Group structures origin determination and certification so the tariff benefit is applied with backing and holds up before the authority.",
      "pains": [
        {
          "title": "The buyer demands a certificate and origin is not supported",
          "desc": "A foreign buyer makes the purchase conditional on a certificate of origin under the applicable agreement, but the company has no records proving the rule is met. Without that traceability, you either lose the sale or issue a certificate that will not survive a later verification."
        },
        {
          "title": "National suppliers that do not document their content",
          "desc": "The finished good qualifies only if domestic inputs prove their origin, yet suppliers hand over invoices with no declaration and none of the formats the calculation requires. The company is left claiming an origin it cannot demonstrate."
        },
        {
          "title": "Paying the general tariff by missing the applicable preference",
          "desc": "Goods that could enter at a preferential rate are imported paying the general tariff because no one analyzed the agreement, the tariff code, or the nomenclature correlation that unlocks the benefit. It is a recurring cost that goes unnoticed until the operations are audited."
        },
        {
          "title": "An origin verification opened by the authority",
          "desc": "The importing country's authority starts a verification and requires the declared origin to be supported within a set deadline. With no organized file and no technical line of response, the risk is denial of the preference and retroactive collection of the difference."
        }
      ],
      "whatWeDo": [
        {
          "title": "Origin determination and records",
          "desc": "We review and build the origin records that support each product's qualification: input classification, applicable criterion, and calculation memorandum. This file is what turns an origin claim into something demonstrable before the authority or the buyer."
        },
        {
          "title": "Origin management with national suppliers",
          "desc": "We design the origin request formats and manage their collection from national suppliers, so the regional content of each input is documented. Without this base, the finished good cannot meet the applicable rule of origin."
        },
        {
          "title": "Certification and registration of eligible products",
          "desc": "We register the products that qualify and obtain certificates of origin under the relevant instrument. This lets the exporter hand the buyer a valid document and the importer apply the preference."
        },
        {
          "title": "Audit and rule-of-origin compliance",
          "desc": "We audit determination and certification processes and analyze compliance with the applicable rules of origin. The goal is to catch weak certifications before a verification does, and correct the criterion while it can still be fixed."
        },
        {
          "title": "Preference analysis and tariff correlation",
          "desc": "We run the feasibility analysis to identify available preferential rates and correlate tariff codes with regional nomenclatures, including ALADI. This confirms which benefit actually applies to each good and under which agreement."
        },
        {
          "title": "Advance rulings and origin verifications",
          "desc": "We advise on customs procedures to obtain preferences, file requests for advance rulings, and handle the origin verifications the authority opens. An advance ruling gives certainty on the criterion before you operate; handling verifications protects the preference already applied."
        }
      ],
      "outcomes": [
        "Certificates of origin issued with a file that backs each qualification and survives a verification.",
        "The preferential rates that actually apply to each good and agreement are claimed, instead of paying the general tariff by omission.",
        "Regional origin content from national suppliers documented, so the finished good's determination is defensible.",
        "Origin verifications handled within the deadline, protecting the preference already applied from being denied."
      ],
      "faq": [
        {
          "q": "Why do I need origin records if I already classified the goods?",
          "a": "Classification identifies the product, but it does not prove it meets the agreement's rule of origin. The origin record documents the applicable criterion, the inputs and their source, and the calculation. That is what you present in a verification: without it, the certificate has no backing even if the tariff code is correct."
        },
        {
          "q": "My national suppliers do not give me origin documentation. Does that affect me?",
          "a": "Yes. When the rule of origin depends on regional content, the origin of domestic inputs must be documented for the finished good to qualify. We design the request formats and manage their collection from suppliers, so each relevant input is supported and the determination is defensible."
        },
        {
          "q": "What is an advance ruling and when is it worth requesting?",
          "a": "It is a determination by the authority on a specific point, for example the origin or classification of a good, issued before the operation takes place. It is worth requesting when there is reasonable doubt about qualification and you want certainty up front, rather than applying a preference that is later disputed in a verification."
        },
        {
          "q": "The authority opened an origin verification. What do you do?",
          "a": "We handle the verification: we assemble and review the file, confirm the origin determination is consistent with the applicable rule, and prepare the response within the required deadline. The goal is to sustain the preference already applied and avoid denial of preferential treatment and collection of differences."
        }
      ]
    },
    {
      "overview": "Importing into Mexico means classifying goods correctly, meeting non-tariff regulations, securing permits, and clearing customs without the shipment stalling. A wrong tariff code or an overlooked NOM can hold a container at the border and trigger costs no one budgeted for. BG Consulting Group manages the operation from origin to final delivery, coordinating customs clearance, regulatory compliance, and logistics across the Tijuana-San Diego corridor.",
      "pains": [
        {
          "title": "Goods held up at customs",
          "desc": "A shipment gets detained over a wrong tariff classification, incomplete paperwork, or an unmet regulation. Every day held adds storage costs and breaks the delivery commitments made to the end customer."
        },
        {
          "title": "Not knowing which NOM applies",
          "desc": "A company finds out late that its product needs a labeling or safety certification. Without the NOM in place, customs will not release the goods, no matter how clean the rest of the filing is."
        },
        {
          "title": "The product needs a prior permit",
          "desc": "Certain goods require permits or notices from agencies before they can be imported. Anyone who misses the requirement faces a stalled shipment and, in some cases, penalties."
        },
        {
          "title": "Coordinating broker, transport, and warehouse separately",
          "desc": "The company manages the customs broker, the carrier, and the warehouse on its own, and each party answers only for its own leg. When something breaks at the border, no one has the full operation in view."
        }
      ],
      "whatWeDo": [
        {
          "title": "Customs clearance with a licensed broker",
          "desc": "We handle clearance through a licensed customs broker: tariff classification, the pedimento filing, and the applicable duties such as the general import duty and VAT. Correct classification drives what you pay and which requirements get triggered, so it is the starting point for the whole operation."
        },
        {
          "title": "NOM compliance",
          "desc": "We identify which Mexican Official Standards apply to your product, whether commercial labeling, product information, or safety, and handle the accreditation customs requires before releasing the goods. Resolving the NOM ahead of the crossing keeps the shipment from being held over a regulatory requirement."
        },
        {
          "title": "Permit and non-tariff regulation management",
          "desc": "We process the prior permits, notices, and authorizations that different agencies require depending on the type of goods. Mapping these requirements before importing keeps the product from reaching the border without the documentation that conditions its entry."
        },
        {
          "title": "Warehousing",
          "desc": "We provide warehouse space to hold goods before or after clearance, whether to consolidate shipments, stagger deliveries, or keep cargo while a filing is completed. Having somewhere to place the goods gives room to operate without pressure on the crossing."
        },
        {
          "title": "Transportation and door-to-door delivery",
          "desc": "We coordinate cargo transportation and door-to-door service, from origin to the final destination in Mexico. By running clearance and the physical move under one coordination, the goods do not sit waiting on a link that answers separately."
        }
      ],
      "outcomes": [
        "Clearance without avoidable holds: goods cross with classification, the pedimento, and regulatory requirements resolved in advance, with no surprises at customs.",
        "Verified regulatory compliance: NOMs, permits, and non-tariff regulations identified and accredited before the crossing, not discovered once the cargo is already held.",
        "One point of coordination: clearance, warehousing, and transport managed through a single contact, with visibility across the chain in the Tijuana-San Diego corridor.",
        "Delivery to final destination: cargo reaches its delivery point in Mexico with the physical move and customs filing coordinated together."
      ],
      "faq": [
        {
          "q": "What do I need to import a product into Mexico?",
          "a": "At minimum, registration in the Importers Registry, the correct tariff classification for the goods, and compliance with the regulations tied to that code: duties such as the general import duty and VAT, the applicable NOMs, and prior permits where required. We review your product to determine which requirements it triggers before the shipment moves."
        },
        {
          "q": "How do I know if my product requires a NOM?",
          "a": "It depends on the tariff code and the nature of the product. There are NOMs for labeling and commercial information and others for safety that customs checks at clearance. We review your goods' classification and identify which standards apply and how to accredit them so they do not hold up the shipment."
        },
        {
          "q": "Why do goods get held at customs?",
          "a": "The most common causes are a wrong tariff classification, incomplete documentation, an unaccredited NOM, or a missing prior permit. Most of it is prevented by reviewing the requirements before the cargo reaches the border, which is how we run the operation."
        },
        {
          "q": "Do you also handle transport and delivery?",
          "a": "Yes. Beyond customs clearance, we coordinate cargo transportation and door-to-door service to the final destination in Mexico, along with warehousing when goods need to be consolidated or held. The point is to keep the filing and the physical move advancing together, not separately."
        }
      ]
    }
  ]
};
