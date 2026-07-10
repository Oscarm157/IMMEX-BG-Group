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
  // Gancho del CTA final, ligado al tema (evita repetir la misma línea en todas
  // las guías). Si falta, la plantilla usa un título genérico.
  ctaTitulo?: string;
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
    ctaTitulo: "¿Tu Anexo 24 cuadraría hoy contra tus pedimentos?",
    servicio: { slug: "information-technology", label: "Tecnología de cumplimiento y control de inventarios" },
    relacionadas: ["anexo-30", "que-es-immex", "pedimento", "regimenes-aduaneros"],
    actualizado: "2026-07-10",
  },
  {
    slug: "que-es-immex",
    eyebrow: "Guía · IMMEX",
    h1: "Qué es IMMEX: el programa para importar temporalmente sin pagar impuestos de entrada",
    seoTitle: "Qué es IMMEX: definición, beneficios y obligaciones del programa",
    seoDescription:
      "Qué es el programa IMMEX, qué beneficios fiscales otorga, a quién aplica y qué obligaciones exige a cambio. El régimen de importación temporal para exportar, explicado.",
    definicion: [
      "IMMEX permite a una empresa traer al país insumos, partes, maquinaria y equipo sin pagar de entrada el impuesto general de importación, a condición de que esa mercancía se destine a fabricar, transformar o reparar bienes que después se exportan. Su nombre completo, Industria Manufacturera, Maquiladora y de Servicios de Exportación, describe justo eso: producir en México con destino al exterior.",
      "La lógica del régimen es no gravar lo que no se queda. Si un componente entra, se convierte en producto y sale, cobrarle los impuestos de una importación definitiva encarecería la exportación sin razón. IMMEX formaliza ese trato temporal: la mercancía entra bajo régimen de importación temporal y debe retornar, transferirse a otra empresa del programa o cambiar de régimen dentro de los plazos que fija la ley.",
      "El beneficio viene atado a control. A cambio de no pagar los impuestos de entrada, la empresa se obliga a llevar el control de inventarios Anexo 24, a retornar en plazo y a operar dentro de la modalidad autorizada. El programa se conserva con cumplimiento diario, no con la autorización que llegó una vez.",
    ],
    fundamento: {
      cita: "Decreto IMMEX (DOF 1 de noviembre de 2006), arts. 4 y 5 · Art. 108 Ley Aduanera",
      texto:
        "El Decreto para el Fomento de la Industria Manufacturera, Maquiladora y de Servicios de Exportación regula el programa: sus modalidades, beneficios y obligaciones. El artículo 108 de la Ley Aduanera sustenta la importación temporal de las empresas con programa autorizado y fija los plazos de permanencia de la mercancía según sea insumo o activo fijo.",
    },
    puntosClave: [
      {
        title: "Importación temporal sin IGI",
        desc: "Los insumos y la maquinaria entran sin pagar el impuesto general de importación mientras se destinen a la exportación dentro de los plazos del programa.",
      },
      {
        title: "IVA e IEPS solo con certificación",
        desc: "IMMEX por sí solo no exenta el IVA ni el IEPS de la importación temporal. Para no desembolsarlos se necesita además la certificación en esa materia; sin ella, se pagan o se garantizan.",
      },
      {
        title: "Obligación de retornar en plazo",
        desc: "La mercancía temporal debe retornar, transferirse por pedimento virtual o cambiar de régimen dentro del plazo que corresponde a su tipo. Pasarlo convierte el beneficio en un impuesto exigible.",
      },
      {
        title: "Control de inventarios obligatorio",
        desc: "El programa exige el sistema automatizado de control de inventarios conforme al Anexo 24. Es la base con la que la autoridad verifica que cada mercancía temporal está donde debe estar.",
      },
    ],
    distincion: [
      {
        title: "IMMEX vs. importación definitiva",
        desc: "En la definitiva la mercancía se nacionaliza y paga todos los impuestos de entrada. En IMMEX entra temporalmente, sin esos impuestos, condicionada a retornar tras el proceso productivo.",
      },
      {
        title: "IMMEX vs. certificación IVA/IEPS",
        desc: "IMMEX autoriza la importación temporal; la certificación IVA/IEPS es un registro adicional que permite acreditar esos impuestos en vez de pagarlos. Son autorizaciones distintas y complementarias.",
      },
    ],
    errores: [
      {
        title: "Creer que IMMEX exenta de todo impuesto",
        desc: "El programa difiere el IGI y, con certificación, el IVA e IEPS, pero siempre condicionado al retorno. Si la mercancía no retorna en plazo, todos esos impuestos se vuelven exigibles con recargos.",
      },
      {
        title: "Descuidar el Anexo 24",
        desc: "Un control de inventarios que no cuadra contra los pedimentos es la primera causa de crédito fiscal en el sector. El beneficio IMMEX se cae si ese control no se sostiene.",
      },
      {
        title: "Perder de vista los plazos de retorno",
        desc: "Insumos y activo fijo tienen plazos de permanencia distintos. Ignorarlos transforma una operación válida en una omisión que la autoridad cobra.",
      },
      {
        title: "Operar fuera de la modalidad autorizada",
        desc: "El programa se otorga en una modalidad concreta. Realizar operaciones que no le corresponden expone la vigencia de la autorización.",
      },
    ],
    faq: [
      {
        q: "¿Qué significa IMMEX?",
        a: "Industria Manufacturera, Maquiladora y de Servicios de Exportación. Es el programa que permite importar temporalmente para producir bienes destinados a la exportación con beneficios fiscales.",
      },
      {
        q: "¿IMMEX me exenta del IVA?",
        a: "No de forma automática. IMMEX difiere el impuesto general de importación; para no desembolsar el IVA y el IEPS de la importación temporal se requiere además la certificación en esa materia.",
      },
      {
        q: "¿Qué obligaciones trae tener IMMEX?",
        a: "Llevar el control de inventarios Anexo 24, retornar la mercancía en plazo, operar dentro de la modalidad autorizada y presentar el reporte anual de operaciones de comercio exterior.",
      },
      {
        q: "¿Cuánto tiempo puede permanecer la mercancía temporal?",
        a: "Depende del tipo de bien: la Ley Aduanera fija plazos distintos para insumos y para maquinaria y equipo. Cuando se agota el plazo sin retorno, el beneficio se convierte en impuesto exigible.",
      },
    ],
    ctaTitulo: "¿Tu programa IMMEX está sostenido o solo autorizado?",
    servicio: { slug: "foreign-trade", label: "Asesoría IMMEX y comercio exterior" },
    relacionadas: ["decreto-immex", "anexo-30", "regimenes-aduaneros", "pedimento"],
    actualizado: "2026-07-10",
  },
  {
    slug: "decreto-immex",
    eyebrow: "Guía · IMMEX",
    h1: "Decreto IMMEX: la norma que da y quita el programa de importación temporal",
    seoTitle: "Decreto IMMEX: obligaciones y causales de cancelación del programa",
    seoDescription:
      "Qué regula el Decreto IMMEX, qué obligaciones impone a las empresas con programa y en qué casos la autoridad puede suspenderlo o cancelarlo. Los artículos que importan.",
    definicion: [
      "Detrás de cada programa IMMEX hay una norma que lo crea, lo condiciona y puede retirarlo: el Decreto IMMEX. Define quién puede tener el programa, en qué modalidades, qué beneficios otorga y, sobre todo, qué obligaciones y qué causales de cancelación conlleva. Es la fuente de la que cuelga toda la operación de una empresa con programa.",
      "Publicado en 2006, unificó en un solo instrumento los antiguos programas de maquila y PITEX. Desde entonces ha tenido varias reformas que endurecieron el control: reporte anual obligatorio, requisitos de infraestructura y supuestos de cancelación más claros. Leer el decreto es conocer los límites exactos dentro de los cuales el beneficio se conserva.",
      "Para una empresa, los artículos que de verdad pesan son los de obligaciones y los de cancelación. Son los que la autoridad invoca cuando algo falla, y la diferencia entre operar con margen o quedar expuesto suele estar en haberlos entendido a tiempo.",
    ],
    fundamento: {
      cita: "Decreto IMMEX (DOF 1 de noviembre de 2006) y sus reformas · arts. 11, 24 y 27",
      texto:
        "El Decreto IMMEX fija en su artículo 11 los compromisos y requisitos del programa, en el 24 las obligaciones de operación y reporte, y en el 27 las causales por las que la autoridad puede suspender o cancelar el programa. Se lee junto con la Ley Aduanera, que aporta el régimen temporal y los plazos, y con las Reglas Generales de Comercio Exterior.",
    },
    puntosClave: [
      {
        title: "Define modalidades y alcance",
        desc: "El decreto establece las modalidades del programa y qué operaciones ampara cada una. La empresa opera dentro de la que le fue autorizada, no en la que le convenga después.",
      },
      {
        title: "Impone el reporte anual",
        desc: "Presentar el reporte anual de operaciones de comercio exterior es una obligación del decreto. No presentarlo es, por sí solo, causal de cancelación.",
      },
      {
        title: "Enumera las causales de cancelación",
        desc: "Domicilio no localizado, inconsistencias graves de inventario, dejar de cumplir los compromisos declarados o no presentar el reporte anual están entre los supuestos que hacen perder el programa.",
      },
      {
        title: "Se apoya en la Ley Aduanera",
        desc: "Los plazos de permanencia y el régimen temporal no viven en el decreto sino en la Ley Aduanera. Interpretarlo aislado lleva a errores de plazo que terminan en crédito fiscal.",
      },
    ],
    distincion: [
      {
        title: "Decreto IMMEX vs. programa IMMEX",
        desc: "El decreto es la norma general; el programa es la autorización concreta que una empresa obtiene bajo esa norma. Uno regula, el otro habilita a operar.",
      },
    ],
    errores: [
      {
        title: "No presentar el reporte anual",
        desc: "Omitir el reporte anual de operaciones de comercio exterior es una de las causales directas de cancelación. Un descuido administrativo con consecuencia mayor: sin programa, la mercancía temporal queda sin sustento.",
      },
      {
        title: "Domicilio no localizado",
        desc: "Si la autoridad no localiza a la empresa en el domicilio registrado, puede suspender el programa. Mantener actualizado el domicilio fiscal y los registros es parte del cumplimiento, no un trámite menor.",
      },
      {
        title: "Dejar de sostener la infraestructura declarada",
        desc: "El programa se autoriza sobre ciertas instalaciones y capacidad productiva. Operar sin sostener lo declarado expone la vigencia de la autorización.",
      },
    ],
    faq: [
      {
        q: "¿Cuándo se publicó el Decreto IMMEX?",
        a: "El 1 de noviembre de 2006, con reformas posteriores. Unificó los programas Maquiladora y PITEX en un solo instrumento.",
      },
      {
        q: "¿Por qué me pueden cancelar el programa IMMEX?",
        a: "El decreto enumera causales como no presentar el reporte anual, domicilio no localizado, inconsistencias graves de inventario o dejar de cumplir los compromisos del programa.",
      },
      {
        q: "¿El Decreto IMMEX y la Ley Aduanera son lo mismo?",
        a: "No. El decreto regula el programa; la Ley Aduanera regula el régimen de importación temporal y los plazos. Se aplican juntos y se leen juntos.",
      },
    ],
    ctaTitulo: "¿Sabes por cuáles causales podrías perder tu programa IMMEX?",
    servicio: { slug: "compliance-and-assurance", label: "Cumplimiento y aseguramiento IMMEX" },
    relacionadas: ["que-es-immex", "anexo-30", "regimenes-aduaneros", "pedimento"],
    actualizado: "2026-07-10",
  },
  {
    slug: "pedimento",
    eyebrow: "Guía · Aduanas",
    h1: "Qué es un pedimento: el documento que ampara toda operación de comercio exterior",
    seoTitle: "Qué es un pedimento aduanal: definición, tipos y para qué sirve",
    seoDescription:
      "Qué es un pedimento, qué información contiene, qué tipos hay según la clave y por qué es la prueba central de la legal estancia de la mercancía. Con su fundamento legal.",
    definicion: [
      "Ninguna mercancía entra o sale legalmente del país sin un pedimento. Es el documento fiscal y aduanero con el que se declara la operación ante la autoridad: el régimen al que se somete la mercancía, su clasificación arancelaria, su valor en aduana y las contribuciones que se pagan o se difieren. Sin pedimento, para efectos aduaneros, la operación no existe.",
      "Funciona como el acta de cada mercancía en el comercio exterior. En él quedan la fracción arancelaria, el valor en aduana, la clave que identifica el tipo de operación, los impuestos y los datos de quien importa o exporta. Todo lo que después se afirme sobre esa mercancía, en una auditoría o en una controversia, se compara contra lo que dice su pedimento.",
      "Para una empresa IMMEX el pedimento es doblemente importante: es la prueba de la legal estancia de la mercancía temporal y la base del control de inventarios. Un pedimento mal elaborado, con la clave o la fracción equivocada, es el punto de partida de la mayoría de los créditos fiscales del sector.",
    ],
    fundamento: {
      cita: "Arts. 35, 36, 36-A y 37 Ley Aduanera · Anexo 22 de las RGCE",
      texto:
        "La Ley Aduanera establece en sus artículos 35 a 37 que el despacho de las mercancías se tramita mediante pedimento y los datos que debe contener. El Anexo 22 de las Reglas Generales de Comercio Exterior es el instructivo de llenado: fija los campos, las claves de pedimento y los apéndices que determinan cómo se declara cada operación.",
    },
    puntosClave: [
      {
        title: "Declara régimen y clasificación",
        desc: "El pedimento manifiesta el régimen aduanero de la mercancía y su fracción arancelaria, de las que dependen los impuestos y las regulaciones no arancelarias aplicables.",
      },
      {
        title: "La clave define el trato fiscal",
        desc: "Cada operación lleva una clave de pedimento (definitiva, temporal, virtual, de tránsito). Esa clave determina cómo se gravan las mercancías y cómo se descargan después.",
      },
      {
        title: "Determina las contribuciones",
        desc: "En el pedimento se calculan y declaran el impuesto general de importación, el IVA, el IEPS, el DTA y demás contribuciones, pagadas o diferidas según el régimen.",
      },
      {
        title: "Prueba la legal estancia",
        desc: "El pedimento, con su documentación soporte, acredita que la mercancía entró legalmente al país. Es la primera prueba que revisa la autoridad y la base sobre la que se concilia el inventario IMMEX.",
      },
    ],
    distincion: [
      {
        title: "Pedimento vs. factura comercial",
        desc: "La factura es un documento comercial entre vendedor y comprador; el pedimento es la declaración aduanera ante la autoridad. La factura soporta el valor, pero es el pedimento el que ampara la operación de comercio exterior.",
      },
      {
        title: "Pedimento definitivo vs. temporal",
        desc: "El pedimento con clave de importación definitiva nacionaliza la mercancía que se queda en el país; el de importación temporal ampara la que entra bajo IMMEX condicionada a retornar. La clave marca la diferencia fiscal.",
      },
    ],
    errores: [
      {
        title: "Fracción arancelaria incorrecta",
        desc: "Clasificar mal la mercancía altera los impuestos y las regulaciones aplicables. Es una de las causas más frecuentes de crédito fiscal y de reclasificación por parte de la autoridad.",
      },
      {
        title: "Valor en aduana mal declarado",
        desc: "Un valor incorrecto o sin la manifestación de valor que lo respalde expone la operación a determinaciones por subvaluación, con impuestos y multas.",
      },
      {
        title: "Clave de pedimento equivocada",
        desc: "Usar una clave que no corresponde al régimen real desalinea el trato fiscal y el descargo posterior, y complica la conciliación del inventario en el Anexo 24.",
      },
      {
        title: "Pedimento sin documentación soporte",
        desc: "Un pedimento sin la factura, el documento de transporte y los permisos que lo respaldan no sostiene la legal estancia cuando la autoridad la cuestiona.",
      },
    ],
    faq: [
      {
        q: "¿Qué es un pedimento aduanal?",
        a: "Es el documento fiscal y aduanero con el que se declara la entrada o salida de mercancías del país, incluyendo el régimen, la clasificación arancelaria, el valor en aduana y las contribuciones.",
      },
      {
        q: "¿Quién elabora el pedimento?",
        a: "Lo tramita el agente aduanal a nombre del importador o exportador. En el modelo de BG, la asesoría legal y de cumplimiento acompaña esa operación, que se despacha a través de agentes aduanales aliados.",
      },
      {
        q: "¿Qué es la clave del pedimento?",
        a: "Es el código que identifica el tipo de operación y su régimen (definitivo, temporal, virtual, tránsito). Determina el trato fiscal de la mercancía y cómo se descarga después.",
      },
      {
        q: "¿Para qué sirve el pedimento después del despacho?",
        a: "Es la prueba de la legal estancia de la mercancía y la base del control de inventarios. Se conserva y se concilia contra el Anexo 24 en las empresas IMMEX.",
      },
    ],
    ctaTitulo: "¿Una fracción o una clave mal puestas ya te generaron una observación?",
    servicio: { slug: "import-services", label: "Importación y despacho aduanero" },
    relacionadas: ["clasificacion-arancelaria", "valoracion-aduanera", "manifestacion-de-valor", "vucem"],
    actualizado: "2026-07-10",
  },
  {
    slug: "manifestacion-de-valor",
    eyebrow: "Guía · Aduanas",
    h1: "Manifestación de valor: el documento con el que sustentas el valor de tu importación",
    seoTitle: "Manifestación de valor: qué es, quién la presenta y qué debe contener",
    seoDescription:
      "Qué es la manifestación de valor en aduana, por qué es obligatoria para el importador, qué documentos la respaldan y qué riesgo hay si falta o está mal integrada.",
    definicion: [
      "Antes de que un pedimento declare cuánto vale una mercancía, el importador debe poder demostrar de dónde sale ese valor. La manifestación de valor es justo ese respaldo: el documento en el que el importador declara y sustenta, con pruebas, el valor en aduana de la mercancía que importa y los elementos que lo integran.",
      "Es la obligación con la que el importador asume la responsabilidad del valor declarado, y el soporte al que recurre la autoridad cuando revisa si hubo subvaluación. Reúne la factura, los contratos, los términos de compra, los pagos y los conceptos que se suman al precio (los incrementables), de modo que el valor del pedimento sea verificable y no una cifra suelta.",
      "Desde las reformas que la volvieron exigible con anexos documentales, integrarla mal o no tenerla dejó de ser un detalle: una manifestación de valor ausente o inconsistente es una de las puertas por las que la autoridad determina créditos por valor.",
    ],
    fundamento: {
      cita: "Art. 59, fracción III y art. 81 Ley Aduanera · reglas de la manifestación de valor en las RGCE",
      texto:
        "El artículo 59, fracción III de la Ley Aduanera obliga al importador a entregar al agente aduanal, y a conservar, la manifestación de valor con los elementos que permiten determinar el valor en aduana. El artículo 81 y las Reglas Generales de Comercio Exterior detallan el formato y los documentos que deben acompañarla.",
    },
    puntosClave: [
      {
        title: "Responsabilidad del importador",
        desc: "La obligación de manifestar el valor y sustentarlo es del importador, no del agente aduanal. Aunque el agente presente el pedimento, quien responde por el valor es la empresa.",
      },
      {
        title: "Debe integrar los incrementables",
        desc: "Fletes, seguros, comisiones, regalías y demás conceptos que se suman al precio pagado forman parte del valor en aduana y deben quedar sustentados en la manifestación.",
      },
      {
        title: "Se entrega y se conserva",
        desc: "La manifestación se entrega al agente aduanal antes del despacho y se conserva junto con sus anexos por el plazo legal, disponible para cuando la autoridad la solicite.",
      },
    ],
    distincion: [
      {
        title: "Manifestación de valor vs. valoración aduanera",
        desc: "La valoración aduanera es el método legal para determinar el valor en aduana; la manifestación de valor es el documento con el que el importador declara y prueba ese valor. Una es el cómo, la otra es el respaldo.",
      },
      {
        title: "Manifestación de valor vs. factura",
        desc: "La factura acredita el precio entre las partes; la manifestación de valor integra ese precio con los incrementables y la evidencia que lo soporta, para efectos aduaneros.",
      },
    ],
    errores: [
      {
        title: "No tener la manifestación integrada",
        desc: "Operar sin la manifestación de valor o con una versión incompleta deja el valor declarado sin respaldo. Ante una revisión, la autoridad puede rechazar el valor de transacción y determinar uno mayor.",
      },
      {
        title: "Omitir incrementables",
        desc: "Dejar fuera fletes, seguros o regalías que debían sumarse al valor genera una base gravable menor a la correcta, con el consecuente crédito fiscal por los impuestos omitidos.",
      },
      {
        title: "Delegar todo el valor en el agente aduanal",
        desc: "El valor es responsabilidad del importador. Confiar en que el agente resuelve el sustento, sin integrar la manifestación internamente, deja a la empresa expuesta en la revisión.",
      },
    ],
    faq: [
      {
        q: "¿Qué es la manifestación de valor?",
        a: "Es el documento con el que el importador declara y sustenta el valor en aduana de su mercancía, incluyendo el precio y los conceptos que se le suman. Respalda el valor que se asienta en el pedimento.",
      },
      {
        q: "¿Quién es responsable de la manifestación de valor?",
        a: "El importador. Aunque el agente aduanal presente el pedimento, la obligación de manifestar y sustentar el valor recae en la empresa que importa.",
      },
      {
        q: "¿Qué pasa si no tengo la manifestación de valor?",
        a: "La autoridad puede rechazar el valor declarado, determinar uno superior y fincar un crédito fiscal por los impuestos omitidos, además de multas. Por eso conviene integrarla antes de cada operación, no después.",
      },
    ],
    ctaTitulo: "Sustenta el valor de cada importación antes de que la autoridad lo cuestione.",
    servicio: { slug: "international-trade-experts", label: "Dictamen de valor y comercio exterior" },
    relacionadas: ["valoracion-aduanera", "pedimento", "clasificacion-arancelaria", "encargo-conferido"],
    actualizado: "2026-07-10",
  },
  {
    slug: "encargo-conferido",
    eyebrow: "Guía · Aduanas",
    h1: "Encargo conferido: la autorización con la que un agente aduanal opera por tu empresa",
    seoTitle: "Encargo conferido: qué es, cómo se otorga y por qué revisarlo",
    seoDescription:
      "Qué es el encargo conferido al agente aduanal, cómo se otorga y se revoca electrónicamente, y por qué la empresa responde por lo que se despacha bajo su encargo.",
    definicion: [
      "Un agente aduanal no puede despachar mercancía a nombre de una empresa sin que esta lo haya autorizado. Esa autorización es el encargo conferido: el acto por el que el importador faculta a uno o varios agentes aduanales para que actúen en su nombre en las operaciones de comercio exterior.",
      "Se otorga y se revoca de forma electrónica ante la autoridad, agente por agente. Es un registro que el SAT reconoce y que define quién puede firmar pedimentos por la empresa, distinto de cualquier acuerdo privado entre las partes. Mientras el encargo esté vigente, lo que ese agente despache se imputa al importador.",
      "Ahí está el punto que muchas empresas pasan por alto: el encargo conferido es también una llave de responsabilidad. Un encargo abierto a un agente con el que ya no se opera, o sin control de qué se despacha bajo él, deja la puerta abierta a operaciones que la empresa termina respondiendo.",
    ],
    fundamento: {
      cita: "Art. 59, fracción III y art. 40 Ley Aduanera · reglas de encargo conferido en las RGCE",
      texto:
        "El artículo 40 de la Ley Aduanera prevé que los importadores y exportadores promuevan el despacho por conducto de agente aduanal, y el artículo 59, fracción III obliga a conferir ese encargo. Las Reglas Generales de Comercio Exterior establecen el procedimiento electrónico para otorgarlo, modificarlo y revocarlo ante la autoridad.",
    },
    puntosClave: [
      {
        title: "Autorización agente por agente",
        desc: "El encargo se confiere a cada agente aduanal de forma individual y electrónica. Solo quien tenga el encargo vigente puede despachar a nombre de la empresa.",
      },
      {
        title: "Otorgamiento y revocación en línea",
        desc: "El importador otorga y revoca el encargo directamente ante la autoridad. Cerrar el encargo de un agente con el que ya no se opera es parte del control, no un trámite opcional.",
      },
      {
        title: "La empresa responde por lo despachado",
        desc: "Los pedimentos firmados bajo un encargo vigente se imputan al importador. El control sobre quién tiene encargo es control sobre la propia exposición.",
      },
    ],
    errores: [
      {
        title: "Encargos abiertos que ya no se usan",
        desc: "Mantener conferido el encargo a agentes con los que la empresa dejó de operar deja vías activas de despacho fuera de su control. Revocar lo que no se usa cierra esa exposición.",
      },
      {
        title: "No vigilar lo que se despacha bajo el encargo",
        desc: "Otorgar el encargo y desentenderse de los pedimentos que se firman bajo él es arriesgado: la empresa responde por operaciones que quizá ni siquiera revisó.",
      },
      {
        title: "Confundir encargo con contrato comercial",
        desc: "El acuerdo comercial con el agente no sustituye al encargo conferido ante la autoridad. Sin el registro electrónico vigente, el despacho no está formalmente autorizado.",
      },
    ],
    faq: [
      {
        q: "¿Qué es el encargo conferido?",
        a: "Es la autorización con la que un importador o exportador faculta a un agente aduanal para actuar en su nombre en las operaciones de comercio exterior. Se registra electrónicamente ante la autoridad.",
      },
      {
        q: "¿Cómo se revoca un encargo conferido?",
        a: "El importador lo revoca directamente ante la autoridad por medios electrónicos, agente por agente. Conviene hacerlo con cada agente con el que se deja de operar.",
      },
      {
        q: "¿La empresa responde por lo que despacha el agente?",
        a: "Sí. Los pedimentos firmados bajo un encargo vigente se imputan al importador. Por eso el control de a quién se le confiere y qué se despacha bajo él es parte del cumplimiento.",
      },
    ],
    ctaTitulo: "¿Sabes a cuántos agentes tienes el encargo conferido abierto hoy?",
    servicio: { slug: "compliance-and-assurance", label: "Cumplimiento y control de operación aduanera" },
    relacionadas: ["pedimento", "manifestacion-de-valor", "clasificacion-arancelaria", "regimenes-aduaneros"],
    actualizado: "2026-07-10",
  },
  {
    slug: "clasificacion-arancelaria",
    eyebrow: "Guía · Aduanas",
    h1: "Clasificación arancelaria: el número del que dependen tus impuestos y permisos",
    seoTitle: "Clasificación arancelaria: qué es la fracción y cómo se determina",
    seoDescription:
      "Qué es la clasificación arancelaria, cómo se determina la fracción de una mercancía con las Reglas Generales de Interpretación y qué riesgo trae clasificar mal.",
    definicion: [
      "La fracción arancelaria es el número que identifica a cada mercancía dentro de la tarifa aduanera. Clasificar es el ejercicio de encontrar, con reglas, la fracción exacta que le corresponde, y de ese número dependen el arancel que se paga, el IVA, las regulaciones no arancelarias, los permisos y hasta si aplica un trato preferencial.",
      "La fracción se determina aplicando las Reglas Generales de Interpretación del Sistema Armonizado, las notas legales de sección y capítulo y los criterios aplicables, no por parecido con otra mercancía. Dos mercancías casi idénticas pueden clasificar distinto según su composición, su función o su grado de elaboración, y esa diferencia cambia los impuestos.",
      "Por eso la clasificación es uno de los terrenos donde más se controvierte con la autoridad. Una fracción mal determinada arrastra impuestos mal pagados y permisos omitidos, y corregirla después, en plena auditoría, cuesta mucho más que sustentarla bien desde el principio.",
    ],
    fundamento: {
      cita: "LIGIE y sus Reglas Generales y Complementarias · Sistema Armonizado · art. 47 Ley Aduanera",
      texto:
        "La tarifa de la Ley de los Impuestos Generales de Importación y de Exportación, basada en el Sistema Armonizado de la Organización Mundial de Aduanas, clasifica todas las mercancías. Las Reglas Generales de Interpretación fijan cómo determinar la fracción. El artículo 47 de la Ley Aduanera permite al importador consultar a la autoridad la clasificación cuando existe duda razonable.",
    },
    puntosClave: [
      {
        title: "Determina impuestos y regulaciones",
        desc: "El arancel, el IVA aplicable, las cuotas compensatorias y las regulaciones no arancelarias (NOM, permisos) dependen de la fracción en la que se clasifique la mercancía.",
      },
      {
        title: "Se determina con reglas, no por parecido",
        desc: "Las Reglas Generales de Interpretación y las notas legales de sección y capítulo son el método. La clasificación se sustenta, no se supone.",
      },
      {
        title: "Habilita o niega el trato preferencial",
        desc: "La fracción es la que se coteja contra las reglas de origen de un tratado o la lista de un programa. Si está mal, se pierde o se aplica indebidamente un beneficio arancelario.",
      },
      {
        title: "Puede consultarse ante la autoridad",
        desc: "Cuando hay duda razonable, el artículo 47 permite consultar la clasificación al SAT y obtener certeza antes de operar, en lugar de arriesgar una reclasificación posterior.",
      },
    ],
    distincion: [
      {
        title: "Clasificación vs. valoración",
        desc: "La clasificación determina qué es la mercancía (su fracción); la valoración determina cuánto vale para efectos de impuestos. Ambas alimentan el pedimento y ambas se revisan por separado.",
      },
    ],
    errores: [
      {
        title: "Clasificar por semejanza comercial",
        desc: "Elegir la fracción por el nombre comercial o por parecido, sin aplicar las reglas de interpretación, deriva en reclasificaciones. La autoridad determina la fracción correcta y cobra la diferencia de impuestos.",
      },
      {
        title: "Ignorar las notas legales",
        desc: "Las notas de sección y capítulo excluyen o incluyen mercancías de forma específica. Pasarlas por alto lleva a fracciones que no resisten un análisis técnico.",
      },
      {
        title: "No documentar el criterio de clasificación",
        desc: "Clasificar sin dejar sustento técnico deja a la empresa sin defensa cuando la autoridad cuestiona la fracción. El criterio se sostiene con un dictamen, no con la costumbre.",
      },
    ],
    faq: [
      {
        q: "¿Qué es la clasificación arancelaria?",
        a: "Es el proceso de asignar a una mercancía la fracción arancelaria que le corresponde en la tarifa, de la que dependen los impuestos, los permisos y el trato preferencial.",
      },
      {
        q: "¿Cómo se determina la fracción arancelaria?",
        a: "Aplicando las Reglas Generales de Interpretación del Sistema Armonizado, las notas legales de sección y capítulo y los criterios técnicos aplicables a la mercancía.",
      },
      {
        q: "¿Qué pasa si clasifico mal una mercancía?",
        a: "La autoridad puede reclasificarla, cobrar la diferencia de impuestos con recargos y multas, y exigir permisos que se hayan omitido. Sustentar bien la fracción desde el inicio evita ese costo.",
      },
      {
        q: "¿Puedo pedir certeza sobre la clasificación?",
        a: "Sí. El artículo 47 de la Ley Aduanera permite consultar la clasificación a la autoridad cuando existe duda razonable, para operar con criterio confirmado.",
      },
    ],
    ctaTitulo: "¿Tus fracciones arancelarias resistirían una reclasificación?",
    servicio: { slug: "international-trade-experts", label: "Dictamen de clasificación arancelaria" },
    relacionadas: ["valoracion-aduanera", "pedimento", "manifestacion-de-valor", "regimenes-aduaneros"],
    actualizado: "2026-07-10",
  },
  {
    slug: "valoracion-aduanera",
    eyebrow: "Guía · Aduanas",
    h1: "Valoración aduanera: cómo se determina la base sobre la que pagas impuestos",
    seoTitle: "Valoración aduanera: qué es el valor en aduana y cómo se calcula",
    seoDescription:
      "Qué es la valoración aduanera, cómo se determina el valor en aduana con el valor de transacción y sus incrementables, y qué métodos aplican cuando ese valor no procede.",
    definicion: [
      "Los impuestos de una importación no se calculan sobre lo que diga la factura sin más, sino sobre el valor en aduana de la mercancía. La valoración aduanera es el conjunto de reglas para determinar ese valor: la base gravable sobre la que se aplican el arancel, el IVA y las demás contribuciones.",
      "El punto de partida es el valor de transacción, es decir, el precio realmente pagado o por pagar por la mercancía, ajustado con los conceptos que la ley manda sumar: fletes hasta la aduana, seguros, comisiones, regalías y otros incrementables. Ese valor ajustado, no el precio suelto de la factura, es el que grava la operación.",
      "Cuando el valor de transacción no puede usarse, por ejemplo si hay vinculación entre las partes que afecta el precio, la ley prevé métodos secundarios que se aplican en orden. Entender cuál corresponde evita dos extremos igual de caros: subvaluar y exponerse a un crédito, o sobrevaluar y pagar de más.",
    ],
    fundamento: {
      cita: "Arts. 64 a 78 Ley Aduanera (Acuerdo de Valoración de la OMC)",
      texto:
        "Los artículos 64 a 78 de la Ley Aduanera, alineados con el Acuerdo relativo a la aplicación del artículo VII del GATT sobre valoración, definen el valor en aduana. El artículo 64 fija el valor de transacción como método principal, el 65 los incrementables, y los siguientes los métodos secundarios que se aplican sucesivamente cuando el primero no procede.",
    },
    puntosClave: [
      {
        title: "El valor de transacción es la regla",
        desc: "El método principal es el precio pagado o por pagar por la mercancía, ajustado con los incrementables. Solo cuando no procede se pasa a los métodos secundarios.",
      },
      {
        title: "Los incrementables se suman",
        desc: "Fletes y seguros hasta la aduana, comisiones, regalías y otros conceptos previstos en la ley forman parte del valor en aduana aunque no vengan en la factura de la mercancía.",
      },
      {
        title: "La vinculación se analiza",
        desc: "Cuando comprador y vendedor están vinculados, la autoridad revisa si esa relación influyó en el precio. Si lo distorsionó, el valor de transacción puede rechazarse.",
      },
      {
        title: "Métodos secundarios en orden",
        desc: "Valor de mercancías idénticas, de similares, precio unitario de venta y valor reconstruido se aplican sucesivamente, no a elección, cuando el valor de transacción no es aceptable.",
      },
    ],
    distincion: [
      {
        title: "Valoración vs. manifestación de valor",
        desc: "La valoración es el método legal para determinar el valor; la manifestación de valor es el documento con el que el importador declara y sustenta ese valor. El método produce la cifra, la manifestación la respalda.",
      },
    ],
    errores: [
      {
        title: "Declarar solo el precio de factura",
        desc: "Omitir los incrementables reduce la base gravable por debajo de la correcta. La autoridad recalcula el valor en aduana y determina un crédito por los impuestos omitidos.",
      },
      {
        title: "Ignorar el efecto de la vinculación",
        desc: "Operar entre partes vinculadas sin analizar si el precio refleja condiciones de mercado expone el valor de transacción a ser rechazado, con determinación de un valor mayor.",
      },
      {
        title: "Sobrevaluar por precaución",
        desc: "Declarar de más para evitar problemas también cuesta: se pagan impuestos que no correspondían. La valoración correcta no es la más alta ni la más baja, es la que la ley determina.",
      },
    ],
    faq: [
      {
        q: "¿Qué es el valor en aduana?",
        a: "Es la base gravable de una importación: el valor sobre el que se calculan el arancel, el IVA y las demás contribuciones. Se determina con las reglas de valoración aduanera, partiendo del valor de transacción.",
      },
      {
        q: "¿El valor en aduana es el precio de la factura?",
        a: "No exactamente. Parte del precio pagado o por pagar, pero se le suman los incrementables que marca la ley, como fletes hasta la aduana, seguros, comisiones y regalías.",
      },
      {
        q: "¿Qué pasa si comprador y vendedor están vinculados?",
        a: "La autoridad analiza si la vinculación influyó en el precio. Si lo distorsionó, puede rechazar el valor de transacción y determinar el valor por un método secundario.",
      },
    ],
    ctaTitulo: "¿Estás pagando impuestos sobre el valor correcto, ni de más ni de menos?",
    servicio: { slug: "international-trade-experts", label: "Dictamen de valor en aduana" },
    relacionadas: ["manifestacion-de-valor", "clasificacion-arancelaria", "pedimento", "drawback"],
    actualizado: "2026-07-10",
  },
  {
    slug: "regimenes-aduaneros",
    eyebrow: "Guía · Aduanas",
    h1: "Regímenes aduaneros: los seis destinos que puede tener tu mercancía",
    seoTitle: "Regímenes aduaneros en México: cuáles son y en qué se diferencian",
    seoDescription:
      "Cuáles son los regímenes aduaneros del artículo 90 de la Ley Aduanera (definitivo, temporal, depósito fiscal, tránsito, elaboración en recinto y RFE) y cómo elegir.",
    definicion: [
      "El régimen aduanero es el marco legal que define qué puede hacerse con una mercancía cuando entra o sale del país: cuánto tiempo permanece, qué impuestos causa y bajo qué condiciones. Elegir el régimen es la decisión que determina el costo fiscal y las obligaciones de toda la operación.",
      "La Ley Aduanera agrupa los regímenes en seis grandes destinos. Van desde el más simple, la importación o exportación definitiva, donde la mercancía se nacionaliza y paga todo, hasta figuras que difieren impuestos a cambio de control, como la importación temporal que usa IMMEX o el recinto fiscalizado estratégico.",
      "La misma mercancía puede costar muy distinto según el régimen bajo el que entre. Por eso conviene decidirlo con criterio desde el inicio: cambiar de régimen después es posible, pero rara vez es gratis ni inmediato.",
    ],
    fundamento: {
      cita: "Art. 90 Ley Aduanera",
      texto:
        "El artículo 90 de la Ley Aduanera clasifica los regímenes aduaneros en seis: definitivos de importación y exportación; temporales; depósito fiscal; tránsito de mercancías; elaboración, transformación o reparación en recinto fiscalizado; y recinto fiscalizado estratégico. Cada uno tiene sus propias reglas de permanencia, impuestos y control en la misma ley y en las Reglas Generales de Comercio Exterior.",
    },
    puntosClave: [
      {
        title: "Definitivo",
        desc: "La mercancía se nacionaliza (importación) o sale de forma definitiva (exportación) y paga las contribuciones que correspondan. Es el régimen más común y el de mayor carga fiscal inmediata.",
      },
      {
        title: "Temporal",
        desc: "La mercancía entra o sale por tiempo limitado y con una finalidad específica, sin pagar de entrada los impuestos, condicionada a retornar. Es el régimen sobre el que opera IMMEX.",
      },
      {
        title: "Depósito fiscal y tránsito",
        desc: "El depósito fiscal almacena mercancía con impuestos determinados y suspendidos hasta su destino; el tránsito ampara el traslado de mercancía bajo control aduanero entre dos puntos, dentro o hacia el país.",
      },
      {
        title: "Recinto fiscalizado y RFE",
        desc: "Permiten elaborar, transformar o reparar mercancía dentro de un espacio habilitado, con impuestos diferidos y plazos amplios. El recinto fiscalizado estratégico es la figura más completa de este grupo.",
      },
    ],
    distincion: [
      {
        title: "Definitivo vs. temporal",
        desc: "En el definitivo la mercancía se queda y paga todo al entrar; en el temporal entra sin esos impuestos pero debe retornar en plazo. La diferencia de flujo entre uno y otro es la razón de ser de IMMEX.",
      },
    ],
    errores: [
      {
        title: "Nacionalizar lo que debía entrar temporal",
        desc: "Importar en definitivo insumos que se van a transformar y exportar hace pagar impuestos que el régimen temporal habría diferido. Es dinero inmovilizado sin necesidad.",
      },
      {
        title: "No cambiar de régimen en plazo",
        desc: "Dejar mercancía temporal sin retornar ni cambiar de régimen dentro del plazo la convierte en una estancia irregular, con crédito fiscal por los impuestos diferidos.",
      },
      {
        title: "Elegir el régimen sin ver la operación completa",
        desc: "El régimen correcto depende del destino real de la mercancía y de la cadena posterior. Decidirlo pedimento por pedimento, sin visión de conjunto, acumula ineficiencias y riesgo.",
      },
    ],
    faq: [
      {
        q: "¿Cuántos regímenes aduaneros hay en México?",
        a: "Seis, según el artículo 90 de la Ley Aduanera: definitivo, temporal, depósito fiscal, tránsito de mercancías, elaboración o transformación en recinto fiscalizado y recinto fiscalizado estratégico.",
      },
      {
        q: "¿Qué régimen usa una empresa IMMEX?",
        a: "El de importación temporal: la mercancía entra sin pagar de entrada los impuestos, condicionada a producir y retornar dentro de los plazos del programa.",
      },
      {
        q: "¿Se puede cambiar de régimen?",
        a: "Sí, la ley prevé el cambio de régimen en ciertos supuestos, pero implica cumplir requisitos y a veces pagar las contribuciones diferidas. Conviene planear el régimen correcto desde el inicio.",
      },
    ],
    ctaTitulo: "Elige el régimen que menos impuestos inmoviliza en tu operación.",
    servicio: { slug: "foreign-trade", label: "Estrategia de regímenes y comercio exterior" },
    relacionadas: ["que-es-immex", "drawback", "pedimento", "clasificacion-arancelaria"],
    actualizado: "2026-07-10",
  },
  {
    slug: "drawback",
    eyebrow: "Guía · Fiscal aduanero",
    h1: "Drawback: recuperar el arancel que pagaste por insumos que después exportaste",
    seoTitle: "Drawback: qué es, cómo funciona y quién puede solicitarlo",
    seoDescription:
      "Qué es el drawback, cómo permite recuperar el impuesto general de importación pagado por insumos incorporados a mercancía exportada, y cuándo conviene frente a IMMEX.",
    definicion: [
      "Cuando una empresa paga aranceles al importar insumos y después incorpora esos insumos a un producto que exporta, el impuesto que pagó a la entrada deja de tener sentido: la mercancía no se quedó en el país. El drawback es el mecanismo que permite recuperar ese impuesto general de importación.",
      "Funciona como una devolución. La empresa importa de forma definitiva, paga el arancel, y una vez que exporta el producto que incorporó esos insumos, o los retorna, solicita al SAT la devolución del impuesto pagado, dentro de los plazos y con la documentación que acredita la trazabilidad entre lo importado y lo exportado.",
      "Es una herramienta valiosa para quien no opera bajo un programa de importación temporal, pero tiene un límite claro: no se puede usar el drawback para recuperar un impuesto que un programa como IMMEX ya permitió diferir. La ley evita el doble beneficio sobre la misma mercancía.",
    ],
    fundamento: {
      cita: "Decreto que establece la devolución de impuestos de importación a los exportadores (Decreto Drawback) y sus reformas",
      texto:
        "El Decreto Drawback regula la devolución del impuesto general de importación pagado por insumos, materias primas, partes o mercancías que se incorporan a bienes exportados o que se retornan. Fija los plazos para solicitar la devolución, los requisitos de trazabilidad y la incompatibilidad con recuperar por esta vía impuestos ya diferidos bajo otro programa.",
    },
    puntosClave: [
      {
        title: "Devuelve el IGI de insumos exportados",
        desc: "Recupera el impuesto general de importación pagado por los insumos que se incorporaron a un producto exportado o que se retornaron en el mismo estado.",
      },
      {
        title: "Exige trazabilidad",
        desc: "Hay que acreditar el vínculo entre la importación que pagó el impuesto y la exportación posterior. Sin esa trazabilidad documentada, la devolución no procede.",
      },
      {
        title: "Opera con plazos",
        desc: "La solicitud de devolución debe presentarse dentro del plazo que fija el decreto, contado desde la exportación. Fuera de plazo, el derecho se pierde.",
      },
    ],
    distincion: [
      {
        title: "Drawback vs. IMMEX",
        desc: "IMMEX difiere el impuesto: la mercancía entra sin pagarlo. El drawback lo paga y luego lo devuelve. IMMEX conviene a la operación recurrente de exportación; el drawback, a quien importa en definitivo y exporta de forma más puntual.",
      },
      {
        title: "No se acumulan sobre la misma mercancía",
        desc: "No se puede diferir el impuesto con IMMEX y además pedir su devolución por drawback. La ley impide el doble beneficio sobre el mismo insumo.",
      },
    ],
    errores: [
      {
        title: "Perder el plazo de solicitud",
        desc: "El drawback se solicita dentro de un plazo desde la exportación. Dejarlo pasar convierte un impuesto recuperable en un costo definitivo.",
      },
      {
        title: "No documentar la trazabilidad",
        desc: "Sin acreditar que el insumo importado se incorporó a lo exportado, la autoridad niega la devolución. La trazabilidad se construye durante la operación, no al final.",
      },
      {
        title: "Intentar duplicar el beneficio",
        desc: "Solicitar drawback por impuestos que un programa temporal ya difirió no procede y expone a la empresa. Conviene definir de entrada qué mecanismo se usa para cada operación.",
      },
    ],
    faq: [
      {
        q: "¿Qué es el drawback?",
        a: "Es el mecanismo que permite recuperar el impuesto general de importación pagado por insumos que después se incorporan a mercancía exportada o que se retornan. Funciona como una devolución que solicita el exportador.",
      },
      {
        q: "¿Puedo usar drawback si tengo IMMEX?",
        a: "No sobre la misma mercancía. IMMEX difiere el impuesto y el drawback lo devuelve; la ley impide obtener ambos beneficios sobre el mismo insumo. Cada operación usa un mecanismo.",
      },
      {
        q: "¿Cuánto tiempo tengo para solicitar el drawback?",
        a: "El decreto fija un plazo desde la exportación para presentar la solicitud de devolución. Fuera de ese plazo se pierde el derecho, por lo que conviene tener la trazabilidad lista.",
      },
    ],
    ctaTitulo: "Recupera los aranceles que ya pagaste por insumos que exportaste.",
    servicio: { slug: "fiscal-services", label: "Recuperación de contribuciones y drawback" },
    relacionadas: ["regimenes-aduaneros", "que-es-immex", "valoracion-aduanera", "pedimento"],
    actualizado: "2026-07-10",
  },
  {
    slug: "anexo-30",
    eyebrow: "Guía · Comercio exterior",
    h1: "Anexo 30: el control de descargos que sostiene tu certificación IVA e IEPS",
    seoTitle: "Anexo 30: qué es y para qué sirve | Control de descargos IVA/IEPS",
    seoDescription:
      "Qué es el Anexo 30, qué reporta el sistema de control de descargos de una empresa certificada en IVA e IEPS y en qué se diferencia del Anexo 24 y del Anexo 31.",
    definicion: [
      "Estar certificado en IVA e IEPS obliga a demostrar todos los días que el beneficio se sostiene. El Anexo 30 es el estándar del sistema de control de descargos con el que una empresa IMMEX certificada le informa a la autoridad cómo va descargando su mercancía contra el crédito fiscal que la certificación le otorga.",
      "La certificación permite no desembolsar el IVA ni el IEPS de las importaciones temporales: se acreditan al 100% contra un crédito fiscal. A cambio, la empresa debe probar que cada mercancía amparada por ese crédito retornó, se transfirió o cambió de régimen en plazo. El Anexo 30 es el sistema que lleva ese descargo y lo reporta.",
      "Sin un Anexo 30 que cuadre, la certificación pierde su piso. La autoridad puede presumir que la mercancía no retornó y exigir el IVA e IEPS que se dejaron de pagar. Es el sistema que sostiene el beneficio, no un accesorio administrativo.",
    ],
    fundamento: {
      cita: "Art. 28-A Ley del IVA · Art. 15-A Ley del IEPS · Anexo 30 de las RGCE",
      texto:
        "Los artículos 28-A de la Ley del IVA y 15-A de la Ley del IEPS crean el crédito fiscal equivalente al impuesto que causaría la importación temporal, para las empresas certificadas. El Anexo 30 de las Reglas Generales de Comercio Exterior define el sistema de control de descargos que la empresa certificada debe operar y reportar para conservar ese crédito.",
    },
    puntosClave: [
      {
        title: "Descarga contra el crédito fiscal",
        desc: "Cada importación temporal carga el crédito de la certificación; el retorno o la transferencia lo descarga. El sistema mantiene ese saldo vivo, ligado al pedimento.",
      },
      {
        title: "Reporta a la autoridad",
        desc: "El Anexo 30 no es solo control interno: alimenta la información con la que el SAT valida que la mercancía amparada por el crédito salió del país o cambió de régimen en plazo.",
      },
      {
        title: "Vive mientras dure la certificación",
        desc: "El sistema debe operar todo el tiempo que dure la certificación. Un descargo que no se refleja pone en riesgo la renovación y, con ella, el beneficio del crédito.",
      },
    ],
    distincion: [
      {
        title: "Anexo 30 vs. Anexo 24",
        desc: "El Anexo 24 controla el inventario físico de la mercancía temporal; el Anexo 30 controla los descargos contra el crédito fiscal de la certificación. Una empresa certificada suele necesitar ambos y deben ser consistentes entre sí.",
      },
      {
        title: "Anexo 30 vs. Anexo 31",
        desc: "El Anexo 30 descarga el crédito de la empresa certificada; el Anexo 31 lleva el control de las cuentas de créditos y garantías, relevante sobre todo cuando el impuesto se garantiza por no contar con certificación.",
      },
    ],
    errores: [
      {
        title: "Descargos que no cuadran con el Anexo 24",
        desc: "Cuando el control de descargos no concilia con el de inventarios, la autoridad detecta la inconsistencia y presume mercancía no retornada. El resultado es un crédito fiscal por el IVA e IEPS acreditados.",
      },
      {
        title: "No descargar en plazo",
        desc: "El crédito está condicionado al retorno oportuno. Un descargo tardío o ausente convierte el beneficio en un impuesto exigible con recargos.",
      },
      {
        title: "Reconstruir el Anexo 30 en la revisión",
        desc: "El descargo debe estar automatizado y conciliado en tiempo. Armarlo a mano cuando ya llegó la autoridad rara vez resiste y suele confirmar la observación.",
      },
    ],
    faq: [
      {
        q: "¿Qué diferencia hay entre el Anexo 24 y el Anexo 30?",
        a: "El Anexo 24 controla el inventario de la mercancía temporal; el Anexo 30 controla cómo se descarga esa mercancía contra el crédito fiscal de la certificación IVA e IEPS. Se relacionan y deben ser consistentes.",
      },
      {
        q: "¿Quién necesita el Anexo 30?",
        a: "Las empresas IMMEX certificadas en materia de IVA e IEPS. Es el sistema con el que sostienen el crédito fiscal que les evita pagar esos impuestos en la importación temporal.",
      },
      {
        q: "¿Qué pasa si el Anexo 30 no cuadra?",
        a: "La autoridad puede presumir que la mercancía no retornó y determinar un crédito fiscal por el IVA e IEPS acreditados, además de poner en riesgo la renovación de la certificación.",
      },
    ],
    ctaTitulo: "Tu certificación se sostiene con un control de descargos que cuadre, no solo con el sello.",
    servicio: { slug: "compliance-and-assurance", label: "Certificación IVA/IEPS y control de descargos" },
    relacionadas: ["anexo-24", "que-es-immex", "regimenes-aduaneros", "pedimento"],
    actualizado: "2026-07-10",
  },
  {
    slug: "vucem",
    eyebrow: "Guía · Aduanas",
    h1: "Qué es la VUCEM: la ventanilla digital por la que pasa todo tu comercio exterior",
    seoTitle: "Qué es la VUCEM: para qué sirve, COVE, e-document y tips de uso",
    seoDescription:
      "Qué es la VUCEM (Ventanilla Única de Comercio Exterior), qué trámites se hacen ahí, cómo funcionan el COVE y el e-document, y consejos para evitar rechazos.",
    definicion: [
      "La VUCEM, Ventanilla Única de Comercio Exterior Mexicana, es la plataforma digital del gobierno por la que se realizan de forma electrónica los trámites de comercio exterior. Reúne en un solo punto lo que antes se hacía en papel y en varias dependencias: pedimentos, permisos, certificados, la digitalización de documentos y la información de valor de cada operación.",
      "Su lógica es de ventanilla única. En vez de tocar la puerta de cada autoridad por separado (SAT, ANAM, Economía, Salud, entre otras), el importador o exportador y su agente aduanal capturan y consultan todo desde un mismo sistema, ligado a la e.firma de la empresa. Cada documento sube una vez y queda disponible para las operaciones que lo necesiten.",
      "Para una empresa, la VUCEM es el canal por el que fluye toda su operación aduanera. Un problema ahí, una e.firma vencida o un documento mal digitalizado, detiene el despacho aunque la mercancía ya esté en la aduana.",
    ],
    fundamento: {
      cita: "Decreto de la Ventanilla Digital Mexicana de Comercio Exterior (DOF 14 de enero de 2011) · arts. 36 y 36-A Ley Aduanera",
      texto:
        "El Decreto de la Ventanilla Digital creó el sistema y llevó a medios electrónicos los trámites de comercio exterior. Los artículos 36 y 36-A de la Ley Aduanera sustentan el despacho electrónico y la transmisión digital de la información y los documentos que acompañan al pedimento. Las Reglas Generales de Comercio Exterior detallan cada trámite dentro de la ventanilla.",
    },
    puntosClave: [
      {
        title: "COVE, el comprobante de valor electrónico",
        desc: "Antes del pedimento se transmite el COVE con los datos de la factura y el valor de la mercancía. El pedimento se liga a ese COVE; si no coinciden, la operación se traba.",
      },
      {
        title: "e-document, la digitalización",
        desc: "Los documentos que soportan la operación (factura, documento de transporte, permisos) se digitalizan y suben a la ventanilla, que genera un acuse que se declara en el pedimento.",
      },
      {
        title: "Trámites de varias dependencias",
        desc: "Permisos y regulaciones de Economía, Salud, SEMARNAT y otras autoridades se gestionan y consultan dentro de la misma ventanilla, ligados a la operación.",
      },
      {
        title: "Acceso con e.firma y roles",
        desc: "El acceso se controla con la e.firma de la empresa y con los usuarios y roles que se dan de alta. Quién puede hacer qué dentro de la VUCEM es parte del control interno.",
      },
    ],
    distincion: [
      {
        title: "VUCEM vs. pedimento",
        desc: "El pedimento es el documento que declara la operación; la VUCEM es la plataforma por la que ese pedimento y sus anexos se transmiten y validan. Uno es el documento, la otra es el canal.",
      },
      {
        title: "COVE vs. factura",
        desc: "La factura es el documento comercial; el COVE es su representación electrónica en la ventanilla, con los datos de valor que se ligan al pedimento. El COVE no sustituye a la factura, la declara.",
      },
    ],
    errores: [
      {
        title: "e.firma o sellos vencidos",
        desc: "Si la e.firma de la empresa o los sellos con los que se opera están vencidos, la ventanilla no deja transmitir. Renovarlos antes de que caduquen evita frenar el despacho con la mercancía ya en aduana.",
      },
      {
        title: "COVE que no coincide con el pedimento",
        desc: "Diferencias entre el COVE y el pedimento en valor, cantidades o datos del proveedor traban la operación. Conviene revisar la captura del COVE antes de pagar el pedimento.",
      },
      {
        title: "Documentos digitalizados ilegibles o incompletos",
        desc: "Un e-document borroso, incompleto o que no corresponde genera rechazos y observaciones. La digitalización se cuida como parte del expediente, no como un requisito de forma.",
      },
      {
        title: "Usuarios y permisos sin control",
        desc: "Dejar accesos abiertos a personas que ya no operan, o sin definir roles, es un riesgo de control interno. Quién entra a la VUCEM y qué puede hacer se revisa igual que cualquier acceso sensible.",
      },
    ],
    faq: [
      {
        q: "¿Qué es la VUCEM?",
        a: "Es la Ventanilla Única de Comercio Exterior Mexicana, la plataforma digital por la que se realizan de forma electrónica los trámites de comercio exterior: pedimentos, permisos, digitalización de documentos y el COVE.",
      },
      {
        q: "¿Qué es el COVE en la VUCEM?",
        a: "El Comprobante de Valor Electrónico: la transmisión electrónica de los datos de la factura y el valor de la mercancía. El pedimento se liga al COVE, y ambos deben coincidir.",
      },
      {
        q: "¿Qué se necesita para operar en la VUCEM?",
        a: "La e.firma vigente de la empresa, los usuarios dados de alta con sus roles y, en la práctica, el acompañamiento del agente aduanal, que opera buena parte de los trámites ligados al despacho.",
      },
      {
        q: "¿Por qué se rechaza una operación en la VUCEM?",
        a: "Las causas frecuentes son e.firma o sellos vencidos, diferencias entre el COVE y el pedimento, y documentos digitalizados ilegibles o incompletos. Revisarlo antes evita frenar la mercancía en aduana.",
      },
    ],
    ctaTitulo: "Ordena tu operación en la VUCEM antes de que un rechazo frene la mercancía en aduana.",
    servicio: { slug: "information-technology", label: "Tecnología y operación de comercio exterior" },
    relacionadas: ["pedimento", "encargo-conferido", "clasificacion-arancelaria", "manifestacion-de-valor"],
    actualizado: "2026-07-10",
  },
];

export const GUIA_SLUGS = GUIAS.map((g) => g.slug);

export function getGuia(slug: string): Guia | undefined {
  return GUIAS.find((g) => g.slug === slug);
}
