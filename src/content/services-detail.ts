// Contenido por servicio extraído del sitio real (docs/bgcg-site-content.txt).
// ES: traducción limpia del texto real (el sitio está en inglés). EN: texto real pulido.
// points = viñetas reales completas. Índice alineado a SERVICE_SLUGS / services.items.

export type ServiceDetail = {
  intro: string;
  body?: string;
  points: string[];
};

export const SERVICE_DETAIL: Record<"es" | "en", readonly ServiceDetail[]> = {
  es: [
    // 1. legal-consulting
    {
      intro:
        "Dada la complejidad de la legislación a la que están sujetas las empresas de comercio exterior, es indispensable contar con asesores legales con experiencia calificada en materia fiscal que vigilen el cumplimiento al que están obligadas y acompañen las decisiones estratégicas del negocio.",
      body:
        "Incluye defensa especializada, desde la notificación del acto administrativo hasta la conclusión total del asunto, a través de los medios ordinarios y alternativos previstos en la legislación.",
      points: [
        "Derechos humanos",
        "Recursos administrativos",
        "Juicio de amparo",
        "Tribunal Federal de Justicia Administrativa",
        "Acuerdos conclusivos",
        "Arbitraje comercial internacional",
        "Mediación",
        "Peritos del Poder Judicial de la Federación",
        "Peritos del Tribunal de Justicia Administrativa",
      ],
    },
    // 2. compliance-and-assurance
    {
      intro:
        "El programa de manufactura IMMEX es uno de los más importantes. Su operación no solo se refleja en los beneficios, sino en el cumplimiento riguroso de los requisitos para conservar la autorización y no perder los privilegios de exportación.",
      body:
        "Desarrollar programas de auditoría interna y externa en comercio exterior y aduanas valida la certeza jurídica de las operaciones dentro del marco de sus autorizaciones y evita consecuencias legales por incumplimiento o por operaciones que la autoridad pudiera interpretar de forma negativa en una revisión.",
      points: [
        "Evaluación de los riesgos de comercio exterior",
        "NAFTA 303",
        "Auditorías preventivas en comercio exterior",
        "Análisis de control interno",
        "Análisis de riesgo de inventarios",
        "Reingeniería de los distintos departamentos",
        "Reingeniería del departamento de importación-exportación",
        "Reconstrucción de saldos de pedimentos (activo fijo y materia prima)",
        "Bienes de capital y accesorios",
        "Plan anual de aseguramiento continuo",
        "Plan anual de asesoría especializada",
      ],
    },
    // 3. foreign-trade
    {
      intro:
        "El comercio exterior es muy dinámico y la legislación nacional e internacional que lo regula es igual de compleja y cambiante. Ofrecemos consultoría estratégica en comercio exterior, orientada a facilitar la comprensión del contenido legal de las modificaciones que sufre la normativa vigente.",
      body:
        "Nuestros asesores tienen experiencia calificada en materia fiscal y aduanera, lo que les permite guiar a cada cliente de forma personalizada hacia un nivel óptimo de cumplimiento legal y, al mismo tiempo, aprovechar los beneficios fiscal-aduaneros derivados de la legislación que México ha firmado a nivel internacional.",
      points: [
        "Valor en aduana de la mercancía",
        "Criterios de valoración aduanera",
        "Correcta presentación de pedimentos",
        "Análisis de riesgo en materia aduanera",
        "Origen de la mercancía",
        "Cumplimiento de restricciones y regulaciones no arancelarias",
        "Sistema de control de inventarios (Anexo 24)",
        "Sistema de validación Anexo 31",
        "Sistema de obtención Data Stage",
        "Programa IMMEX",
        "Permisos previos ante la Secretaría de Economía",
        "Devolución de impuestos",
        "Drawback",
        "PROSEC",
        "Fomento a la exportación",
        "Tratados de libre comercio",
      ],
    },
    // 4. international-trade-experts
    {
      intro:
        "Nuestros clientes cuentan con soporte pericial para sustentar los agravios que se presentan en la defensa legal ante las autoridades correspondientes en materia de comercio exterior y operaciones aduaneras, así como para los casos en que se requiere un dictamen experto por razones de certeza jurídica.",
      points: [
        "Clasificación arancelaria",
        "Origen de las mercancías",
        "Criterios aduaneros",
        "Avalúos",
        "Anexo 24",
      ],
    },
    // 5. information-technology
    {
      intro:
        "Como parte de nuestra oferta de soluciones reales, contamos con tecnologías de la información capaces de gestionar una operación a gran escala. Las herramientas que desarrollamos para cumplir con la normativa aduanera ayudan a nuestros clientes a alcanzar un nivel óptimo de cumplimiento o a mitigar las observaciones en tiempo real.",
      body: "Servicio de logística internacional, terrestre y marítima:",
      points: ["Logística", "Almacenaje", "Distribución", "Monitoreo"],
    },
    // 6. fiscal-services
    {
      intro:
        "Revisión del Impuesto al Valor Agregado y presentación de la solicitud de devolución. El enfoque revisa la determinación y solicitud del saldo a favor del IVA, soportado por las operaciones de la empresa para que cumpla con los lineamientos y requisitos que establece la autoridad fiscal.",
      body: "Servicios y actividades:",
      points: [
        "Revisión de operaciones que coinciden con sus registros contables, dentro del periodo correspondiente y conforme a la normativa contable.",
        "Revisión de operaciones que cumplen los requisitos fiscales vigentes.",
        "Revisión de la determinación del saldo a favor del IVA.",
        "Revisión de la declaración informativa de operaciones con terceros frente a lo presentado en la declaración mensual ante el SAT.",
        "Presentación de la solicitud del saldo a favor por los meses que indique la empresa.",
        "Seguimiento hasta obtener respuesta de la autoridad.",
      ],
    },
    // 7. trade-agreements
    {
      intro:
        "México es uno de los países con mayor apertura en el ámbito comercial internacional, prueba de ello son los tratados y acuerdos firmados con distintos países del mundo. Cada uno busca ofrecer a las empresas mexicanas oportunidades preferenciales de importación y exportación, y mayor competitividad en las cadenas globales de suministro.",
      body:
        "En BGC somos especialistas en consultoría para la implementación y gestión de los distintos tratados y acuerdos comerciales, garantizando su cumplimiento legal y aprovechando los beneficios que representan en la operación de cada cliente.",
      points: [
        "Revisión y creación de registros de origen de la mercancía",
        "Diseño de formatos para solicitudes de origen",
        "Gestión de solicitudes de origen para proveedores nacionales",
        "Auditoría de procesos de determinación y certificación de origen",
        "Revisión y análisis del cumplimiento de las reglas de origen",
        "Registro de productos elegibles y obtención de certificados de origen",
        "Análisis de factibilidad e identificación de aranceles preferenciales",
        "Correlación de fracciones arancelarias con nomenclaturas regionales (ALADI)",
        "Asesoría en procedimientos aduaneros para obtener preferencias arancelarias",
        "Solicitud de resoluciones anticipadas",
        "Resolución de verificaciones de origen",
      ],
    },
    // 8. import-services
    {
      intro:
        "BG Group ofrece soluciones logísticas para la importación de tus productos a México.",
      points: [
        "Almacén",
        "Normas específicas (NOM)",
        "Gestión de permisos",
        "Agente aduanal",
        "Transporte",
        "Servicio puerta a puerta",
      ],
    },
  ],
  en: [
    {
      intro:
        "Given the complexity of the legislation that Foreign Trade companies are subject to, it is essential to have legal advisors with qualified experience in tax matters who monitor the compliance they are obliged to meet, and who advise on the strategic decisions of the business.",
      body:
        "It includes specialized defense, from the notification of the administrative act to the total conclusion of the matter, through the ordinary and alternative means provided for in the legislation.",
      points: [
        "Human rights",
        "Administrative resources",
        "Writ of amparo",
        "Federal Court of Administrative Justice",
        "Conclusive agreements",
        "International commercial arbitration",
        "Mediation",
        "Experts before the Judicial Branch of the Federation",
        "Experts before the Court of Administrative Justice",
      ],
    },
    {
      intro:
        "The IMMEX manufacturing program is one of the most important. Its operation is reflected not only in the benefits but also in thorough compliance with the operating requirements, to keep the authorization and not lose the export privileges granted to companies.",
      body:
        "Developing internal and external audit programs in Foreign Trade and Customs validates the legal certainty of operations within the framework of their authorizations and avoids legal consequences from non-compliance or from operations an authority could interpret negatively in a review.",
      points: [
        "Evaluation of foreign trade risks",
        "NAFTA 303",
        "Preventive audits in foreign trade matters",
        "Internal control analysis",
        "Inventory risk analysis",
        "Reengineering of the different departments",
        "Reengineering of the Import-Export Department",
        "Reconstruction of pediment balances (fixed assets & raw materials)",
        "Capital goods and accessories",
        "Annual continuous assurance plan",
        "Annual specialized advisory plan",
      ],
    },
    {
      intro:
        "Foreign Trade is very dynamic, and the national and international legislation that regulates it is just as complex and changing. We offer strategic consulting in Foreign Trade, aimed at making it easier to understand the legal content of the modifications that current regulations undergo.",
      body:
        "Our advisors have qualified experience in tax and customs matters, guiding each client in a personalized way toward an optimal level of legal compliance while making full use of the tax-customs benefits derived from the legislation Mexico has signed internationally.",
      points: [
        "Customs value of the merchandise",
        "Customs valuation criteria",
        "Correct filing of entries",
        "Risk analysis in customs matters",
        "Origin of the merchandise",
        "Compliance with non-tariff restrictions and regulations",
        "Inventory control system (Annex 24)",
        "Annex 31 validation system",
        "Data Stage system",
        "IMMEX program",
        "Prior permits (Ministry of Economy)",
        "Tax refunds",
        "Drawback",
        "PROSEC",
        "Export promotion",
        "Free trade agreements",
      ],
    },
    {
      intro:
        "Our clients can count on expert support to substantiate the grievances presented in legal defense before the corresponding authorities in Foreign Trade and customs operations, as well as for cases where an expert opinion is required for legal certainty.",
      points: [
        "Tariff classification",
        "Origin of goods",
        "Customs criteria",
        "Appraisals",
        "Annex 24",
      ],
    },
    {
      intro:
        "As an essential part of our offer of real solutions, we have information technologies capable of managing a large-scale operation. The tools we develop to comply with customs regulations help our clients reach an optimal level of compliance or mitigate findings in real time.",
      body: "International, land and maritime logistics service:",
      points: ["Logistics", "Storage", "Distribution", "Monitoring"],
    },
    {
      intro:
        "Review of the Value Added Tax and presentation of the refund request. The approach reviews the determination and request of the VAT credit balance, supported by the company's operations so it complies with all the guidelines and requirements established by the tax authority.",
      body: "Services and activities:",
      points: [
        "Review of operations that match their accounting records, in the corresponding period and under the applicable accounting standards.",
        "Review of operations that meet current tax requirements.",
        "Review of the determination of the VAT credit balance.",
        "Review of the informative statement of third-party operations against the monthly statement filed with the SAT.",
        "Filing the refund request for the months indicated by the company.",
        "Follow-up until the authority responds.",
      ],
    },
    {
      intro:
        "Mexico is one of the most open countries in international trade, proof of which is the many treaties and agreements signed with countries around the world. Each one aims to offer Mexican companies preferential import and export opportunities and greater competitiveness in global supply chains.",
      body:
        "At BGC we specialize in consulting for the implementation and management of the different treaties and agreements, ensuring legal compliance and putting to work the benefits they represent for each client's operation.",
      points: [
        "Review and creation of records of the origin of the merchandise",
        "Design of formats for origin requests",
        "Management of origin requests for national suppliers",
        "Audit of origin determination and certification processes",
        "Review and analysis of compliance with rules of origin",
        "Registration of eligible products and obtaining certificates of origin",
        "Feasibility analysis and identification of preferential tariffs",
        "Correlation of tariff codes with regional nomenclatures (ALADI)",
        "Advice on customs procedures to obtain tariff preferences",
        "Request for advance resolutions",
        "Resolution of origin verifications",
      ],
    },
    {
      intro:
        "BG Group offers logistics solutions for importing your products into Mexico.",
      points: [
        "Warehouse",
        "Specific standards (NOM)",
        "Permit management",
        "Customs broker",
        "Transportation",
        "Door-to-door service",
      ],
    },
  ],
};
