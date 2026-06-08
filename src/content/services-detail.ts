// Contenido por servicio: factual, redactado a partir de las viñetas reales del sitio
// + conocimiento aduanero/fiscal correcto (benchmarking de fuentes oficiales y firmas del ramo).
// Sin inventar cifras, clientes ni promesas. Índice alineado a SERVICE_SLUGS / services.items.

export type ServiceDetail = {
  intro: string;
  context: string;
  points: { title: string; desc: string }[];
  close: string;
};

export const SERVICE_DETAIL: Record<"es" | "en", readonly ServiceDetail[]> = {
  es: [
    // 1. legal-consulting
    {
      intro:
        "Defensa y representación de la empresa ante la autoridad aduanera y fiscal cuando hay diferencias de criterio, créditos o procedimientos en curso. El objetivo es resolver con el menor riesgo y costo posible, agotando primero las vías que evitan el litigio.",
      context:
        "La mayoría de los créditos en comercio exterior se pueden discutir, reducir o anular si se actúa a tiempo y por la vía correcta. La defensa empieza desde la visita de verificación y, según el caso, escala a recurso administrativo, juicio de nulidad o amparo.",
      points: [
        { title: "Recursos administrativos", desc: "Impugnación de resoluciones de la autoridad por la vía administrativa, antes de acudir al tribunal." },
        { title: "Juicio de amparo", desc: "Recurso constitucional para combatir actos de autoridad que vulneran los derechos del contribuyente." },
        { title: "Tribunal Federal de Justicia Administrativa", desc: "Juicio de nulidad ante el TFJA contra créditos y resoluciones en materia aduanera y fiscal." },
        { title: "Acuerdos conclusivos", desc: "Mecanismo alternativo ante PRODECON para resolver diferencias con el SAT sin llegar a juicio." },
      ],
      close: "El criterio legal que sostiene cada pedimento cuando llega una revisión.",
    },
    // 2. compliance-and-assurance
    {
      intro:
        "Estructuras de control para identificar, medir y reducir el riesgo de comercio exterior antes de que llegue una revisión. Se trata de blindar la operación, no de reaccionar cuando ya existe un crédito.",
      context:
        "La autoridad revisa cada vez con más datos y cruces de información. Una estructura de cumplimiento documentada baja la probabilidad y el impacto de una observación, y sostiene programas como IMMEX, OEA o CTPAT.",
      points: [
        { title: "Evaluación de riesgos de comercio exterior", desc: "Diagnóstico de los puntos donde la operación es vulnerable a observaciones o sanciones." },
        { title: "NAFTA 303", desc: "Cumplimiento de las reglas que limitan la exención o devolución de aranceles a insumos no originarios en programas IMMEX." },
        { title: "Auditorías preventivas", desc: "Revisión interna de operaciones y pedimentos para corregir antes de que lo haga la autoridad." },
        { title: "Análisis de control interno", desc: "Revisión de procesos y responsables para que el cumplimiento sea sostenible, no un esfuerzo aislado." },
      ],
      close: "Identificar y corregir el riesgo antes de que se vuelva un crédito.",
    },
    // 3. foreign-trade
    {
      intro:
        "El criterio técnico detrás de cada importación y exportación: que la mercancía entre y salga con el valor, la fracción y el soporte correctos. Los errores aquí son la causa más común de créditos y demoras.",
      context:
        "Cada pedimento es una declaración ante la autoridad. Un valor, una fracción o un dato mal asentado puede derivar en multas, en el embargo de la mercancía o en la pérdida de beneficios. El trabajo es que la operación sea correcta antes de declararla.",
      points: [
        { title: "Valor en aduana", desc: "Determinación de la base gravable conforme al valor de transacción y los ajustes del Acuerdo de Valoración de la OMC." },
        { title: "Criterios de valoración", desc: "Aplicación de los métodos de valoración cuando el valor de transacción no procede." },
        { title: "Correcta presentación de pedimentos", desc: "Que el pedimento refleje la operación real y resista una eventual revisión." },
        { title: "Análisis de riesgo aduanero", desc: "Anticipar los puntos que la autoridad revisa con mayor frecuencia." },
      ],
      close: "El soporte técnico que evita que una operación rutinaria termine en sanción.",
    },
    // 4. international-trade-experts
    {
      intro:
        "Clasificación, origen y avalúo resueltos con respaldo técnico. La fracción arancelaria correcta define aranceles, permisos y regulaciones no arancelarias; equivocarla tiene costo directo.",
      context:
        "Una sola fracción arancelaria define el arancel, los permisos y las NOM aplicables a la mercancía. Clasificar mal expone a sanciones y a pagar de más o de menos; clasificar con criterio técnico evita ambas.",
      points: [
        { title: "Clasificación arancelaria", desc: "Asignación de la fracción de 8 dígitos del Sistema Armonizado; define aranceles y permisos aplicables." },
        { title: "Origen de la mercancía", desc: "Determinación del país de origen para aplicar tratados y reglas de origen." },
        { title: "Criterios aduaneros", desc: "Sustento técnico ante consultas y discrepancias de clasificación con la autoridad." },
        { title: "Avalúos", desc: "Valoración técnica de la mercancía cuando se requiere soporte adicional." },
      ],
      close: "Que cada mercancía cruce bajo la fracción y el origen que le corresponden.",
    },
    // 5. information-technology
    {
      intro:
        "La capa operativa que ordena el movimiento físico de la mercancía y lo conecta con la trazabilidad documental: lo que entra al inventario tiene que poder reportarse.",
      context:
        "El cumplimiento documental no sirve si la operación física no está ordenada. Esta capa conecta el movimiento real de la mercancía con la información que después se reporta a la autoridad, por ejemplo en el control de inventarios del Anexo 24.",
      points: [
        { title: "Logística", desc: "Coordinación del flujo de mercancía entre proveedor, aduana y destino." },
        { title: "Almacenaje", desc: "Resguardo y control de inventario conforme a los requisitos aplicables." },
        { title: "Distribución", desc: "Entrega de la mercancía ya despachada hasta su destino final." },
        { title: "Monitoreo", desc: "Seguimiento de cada movimiento para mantener la trazabilidad de la operación." },
      ],
      close: "La operación física, ordenada y rastreable de origen a destino.",
    },
    // 6. fiscal-services
    {
      intro:
        "Recuperación de IVA y gestión de devoluciones ante la autoridad, con el soporte documental que exige el SAT. Un saldo a favor mal soportado se queda sin recuperar.",
      context:
        "El IVA pagado en importaciones genera con frecuencia saldos a favor, sobre todo en empresas con exportación o tasa 0%. Recuperarlo depende del soporte documental: bien integrado se devuelve, mal integrado se rechaza o se difiere por la autoridad.",
      points: [
        { title: "Revisión del IVA", desc: "Análisis de los saldos a favor y de la procedencia de la devolución." },
        { title: "Solicitud de devolución", desc: "Integración y presentación del trámite ante el SAT con el soporte requerido." },
      ],
      close: "Recuperar lo que corresponde, con el respaldo que resiste una revisión.",
    },
    // 7. trade-agreements
    {
      intro:
        "Gestión del origen de la mercancía de proveedor a aduana, para aprovechar las preferencias arancelarias de los tratados sin quedar expuesto en una verificación de origen.",
      context:
        "Las preferencias arancelarias de los tratados solo se sostienen si el origen está bien documentado. En una verificación de origen la carga de la prueba es de la empresa; sin registros sólidos se pierde el beneficio y se generan diferencias.",
      points: [
        { title: "Registros de origen", desc: "Revisión y creación de los registros que sustentan el origen de la mercancía." },
        { title: "Diseño de formatos para solicitudes de origen", desc: "Formatos estandarizados para pedir y documentar el origen a proveedores." },
        { title: "Gestión con proveedores nacionales", desc: "Obtención y resguardo de la información de origen de proveedores en México." },
        { title: "Auditoría de certificación de origen", desc: "Revisión de los procesos de determinación y certificación para que resistan una verificación." },
      ],
      close: "El origen documentado para que la preferencia arancelaria se sostenga.",
    },
    // 8. import-services
    {
      intro:
        "La operación de importación cubierta de principio a fin: del permiso al despacho, con el agente aduanal coordinado y los requisitos del producto resueltos antes de que la mercancía llegue.",
      context:
        "Una importación se complica cuando el permiso, la NOM o la documentación llegan tarde. Resolver los requisitos antes de que la mercancía toque la aduana evita demoras, almacenajes y rechazos.",
      points: [
        { title: "Almacén", desc: "Resguardo de la mercancía durante el proceso de importación." },
        { title: "Normas específicas (NOM)", desc: "Cumplimiento de las normas oficiales mexicanas que apliquen al producto." },
        { title: "Gestión de permisos", desc: "Tramitación de permisos y regulaciones no arancelarias previos al despacho." },
        { title: "Agente aduanal", desc: "Coordinación con el agente aduanal que realiza el despacho." },
      ],
      close: "La importación resuelta antes de que se vuelva un problema en la aduana.",
    },
  ],
  en: [
    {
      intro:
        "Defense and representation of the company before the customs and tax authority when there are differences in criteria, assessments or ongoing proceedings. The goal is to resolve at the lowest possible risk and cost, first exhausting the paths that avoid litigation.",
      context:
        "Most foreign-trade assessments can be disputed, reduced or overturned if you act in time and through the right channel. Defense starts at the verification visit and, depending on the case, escalates to an administrative resource, nullity proceedings or amparo.",
      points: [
        { title: "Administrative resources", desc: "Challenging the authority's resolutions through the administrative path, before going to court." },
        { title: "Writ of amparo", desc: "Constitutional remedy against authority actions that violate the taxpayer's rights." },
        { title: "Federal Court of Administrative Justice", desc: "Nullity proceedings before the TFJA against customs and tax assessments and resolutions." },
        { title: "Conclusive agreements", desc: "Alternative mechanism before PRODECON to settle differences with the tax authority without going to trial." },
      ],
      close: "The legal grounds that support every entry when a review arrives.",
    },
    {
      intro:
        "Control structures to identify, measure and reduce foreign-trade risk before a review arrives. The point is to shield the operation, not to react once an assessment already exists.",
      context:
        "The authority reviews with more data and cross-checks every year. A documented compliance structure lowers the likelihood and impact of a finding, and sustains programs like IMMEX, AEO or CTPAT.",
      points: [
        { title: "Foreign trade risk evaluation", desc: "Diagnosis of the points where the operation is vulnerable to findings or penalties." },
        { title: "NAFTA 303", desc: "Compliance with the rules that limit duty exemption or refund on non-originating inputs in IMMEX programs." },
        { title: "Preventive audits", desc: "Internal review of operations and entries to correct before the authority does." },
        { title: "Internal control analysis", desc: "Review of processes and owners so compliance is sustainable, not a one-off effort." },
      ],
      close: "Find and fix the risk before it turns into an assessment.",
    },
    {
      intro:
        "The technical judgment behind every import and export: that goods enter and leave with the right value, code and supporting documents. Errors here are the most common cause of assessments and delays.",
      context:
        "Every entry is a declaration before the authority. A wrong value, code or data point can lead to fines, seizure of the goods or loss of benefits. The work is to make the operation correct before it is declared.",
      points: [
        { title: "Customs value", desc: "Determining the dutiable base under the transaction value and the adjustments of the WTO Valuation Agreement." },
        { title: "Valuation criteria", desc: "Applying the valuation methods when transaction value does not apply." },
        { title: "Correct filing of entries", desc: "So the entry reflects the real operation and withstands a review." },
        { title: "Customs risk analysis", desc: "Anticipating the points the authority reviews most often." },
      ],
      close: "The technical backing that keeps a routine operation from ending in a penalty.",
    },
    {
      intro:
        "Classification, origin and appraisal resolved with technical backing. The right tariff code defines duties, permits and non-tariff regulations; getting it wrong has a direct cost.",
      context:
        "A single tariff code defines the duty, the permits and the official standards (NOM) that apply to the goods. Misclassifying exposes you to penalties and to overpaying or underpaying; classifying with technical criteria avoids both.",
      points: [
        { title: "Tariff classification", desc: "Assigning the 8-digit Harmonized System code; it defines the applicable duties and permits." },
        { title: "Origin of merchandise", desc: "Determining country of origin to apply treaties and rules of origin." },
        { title: "Customs criteria", desc: "Technical grounds for consultations and classification disputes with the authority." },
        { title: "Appraisals", desc: "Technical valuation of the goods when additional support is required." },
      ],
      close: "So every shipment clears under the code and origin that actually apply.",
    },
    {
      intro:
        "The operational layer that orders the physical movement of goods and ties it to documentary traceability: whatever enters inventory has to be reportable.",
      context:
        "Documentary compliance is worthless if the physical operation is disorganized. This layer connects the real movement of goods with the information later reported to the authority, for example in Annex 24 inventory control.",
      points: [
        { title: "Logistics", desc: "Coordinating the flow of goods between supplier, customs and destination." },
        { title: "Storage", desc: "Safekeeping and inventory control under the applicable requirements." },
        { title: "Distribution", desc: "Delivering cleared goods to their final destination." },
        { title: "Monitoring", desc: "Tracking every move to keep the operation traceable." },
      ],
      close: "The physical operation, ordered and traceable from origin to destination.",
    },
    {
      intro:
        "VAT recovery and refund management before the authority, with the documentation the tax authority requires. A poorly supported credit balance simply goes unrecovered.",
      context:
        "VAT paid on imports often produces credit balances, especially for companies with exports or zero-rated sales. Recovering it depends on the documentation: well assembled it is refunded, poorly assembled it is rejected or deferred by the authority.",
      points: [
        { title: "VAT review", desc: "Analysis of credit balances and whether a refund applies." },
        { title: "Refund request", desc: "Assembling and filing the request before the tax authority with the required support." },
      ],
      close: "Recover what is owed, with backing that holds up under review.",
    },
    {
      intro:
        "Managing the origin of goods from supplier to customs, to use the treaties' tariff preferences without being exposed in an origin verification.",
      context:
        "The treaties' tariff preferences only hold if origin is well documented. In an origin verification the burden of proof is on the company; without solid records the benefit is lost and assessments arise.",
      points: [
        { title: "Origin records", desc: "Review and creation of the records that support the origin of the goods." },
        { title: "Request format design", desc: "Standardized formats to request and document origin from suppliers." },
        { title: "Domestic supplier management", desc: "Obtaining and safekeeping origin information from suppliers in Mexico." },
        { title: "Origin certification audit", desc: "Review of determination and certification processes so they withstand a verification." },
      ],
      close: "Documented origin so the tariff preference holds.",
    },
    {
      intro:
        "The import operation covered end to end: from permit to clearance, with the customs broker coordinated and the product's requirements resolved before the goods arrive.",
      context:
        "An import gets complicated when the permit, the NOM or the documentation arrive late. Resolving the requirements before the goods reach customs avoids delays, storage costs and rejections.",
      points: [
        { title: "Warehouse", desc: "Safekeeping of the goods during the import process." },
        { title: "Specific standards (NOM)", desc: "Compliance with the Mexican official standards that apply to the product." },
        { title: "Permit management", desc: "Processing the permits and non-tariff regulations required before clearance." },
        { title: "Customs broker", desc: "Coordination with the customs broker who handles clearance." },
      ],
      close: "The import resolved before it becomes a problem at customs.",
    },
  ],
};
