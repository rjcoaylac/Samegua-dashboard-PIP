// ============================================================
//  data.js  |  Dashboard Presupuestal – Samegua 2026
//  Fuente   :  MEF – Consulta Amigable (Actividades/Proyectos)
//  Corte    :  03 de Marzo de 2026
// ============================================================

const dashboardData = {
  anio:  2026,
  corte: "03 de Marzo de 2026",

  // ─────────────────────────────────────────────────────────
  //  TOTALES  –  Municipalidad Distrital de SAMEGUA
  //  Fuente: fila 180104-301484 resaltada en Consulta Amigable
  // ─────────────────────────────────────────────────────────
  total: {
    pia:               30128622,   // S/ 30.1 mill.
    pim:               44950427,   // S/ 44.9 mill.
    certificacion:     15788067,   // S/ 15.8 mill.
    compromisoAnual:    5601292,   // S/  5.6 mill.
    compromisoMensual:  5536994,   // S/  5.5 mill.
    devengado:          2985927,   // S/  3.0 mill.
    girado:             2679234,   // S/  2.7 mill.
    avance:                 6.6    // %  Devengado / PIM
  },

  // ─────────────────────────────────────────────────────────
  //  RANKING  –  21 municipios de Moquegua
  //  Datos reales del MEF al 03/03/2026, orden desc avance
  // ─────────────────────────────────────────────────────────
  ranking: {
    municipios: [
      // Código   Nombre                                  PIA           PIM           Devengado   Avance%
      { code:"180202", name:"CHOJATA",                           pia:  1255522, pim:  3309617, devengado: 1980107, avance: 59.8 },
      { code:"180208", name:"PUQUINA",                           pia:  5067514, pim:  5952502, devengado: 1458623, avance: 24.5 },
      { code:"180105", name:"SAN CRISTOBAL",                     pia:  7416604, pim:  9290094, devengado: 1945015, avance: 20.9 },
      { code:"180209", name:"QUINISTAQUILLAS",                   pia:  1177145, pim:  1177845, devengado:  210864, avance: 17.9 },
      { code:"180207", name:"MATALAQUE",                         pia:  1085630, pim:  1149930, devengado:  170133, avance: 14.8 },
      { code:"180103", name:"CUCHUMBAYA",                        pia:  3603268, pim:  4396674, devengado:  601331, avance: 13.7 },
      { code:"180210", name:"UBINAS",                            pia:  2460512, pim:  2719505, devengado:  310265, avance: 11.4 },
      { code:"180101", name:"MARISCAL NIETO - MOQUEGUA",         pia:167950697, pim:185000090, devengado:17508356, avance:  9.5 },
      { code:"180301", name:"SANCHEZ CERRO - OMATE",             pia:  7525846, pim:  7825700, devengado:  737765, avance:  9.4 },
      { code:"180206", name:"LLOQUE",                            pia:  1287116, pim:  2328898, devengado:  199765, avance:  8.6 },
      { code:"180102", name:"CARUMAS",                           pia: 11237352, pim: 16252041, devengado: 1376610, avance:  8.5 },
      { code:"180305", name:"PACOCHA",                           pia: 10912683, pim: 13400807, devengado: 1120272, avance:  8.4 },
      { code:"180205", name:"LA CAPILLA",                        pia:  2250736, pim:  3223393, devengado:  259586, avance:  8.1 },
      { code:"180203", name:"COALAQUE",                          pia:  1560280, pim:  1705835, devengado:  137226, avance:  8.0 },
      { code:"180302", name:"ILO",                               pia:161819778, pim:175748432, devengado:12336044, avance:  7.0 },
      { code:"180107", name:"SAN ANTONIO",                       pia:221997211, pim:222986265, devengado:15256412, avance:  6.8 },
      { code:"180302b",name:"EL ALGARROBAL",                     pia: 55165928, pim: 77489358, devengado: 5228223, avance:  6.7 },
      { code:"180104", name:"SAMEGUA",                           pia: 30128622, pim: 44950427, devengado: 2985927, avance:  6.6 },
      { code:"180211", name:"YUNGA",                             pia:  1636231, pim:  1798056, devengado:  114851, avance:  6.4 },
      { code:"180106", name:"TORATA",                            pia:132605309, pim:160605621, devengado: 6481989, avance:  4.0 },
      { code:"180204", name:"ICHUÑA",                            pia: 13769473, pim: 14344496, devengado:  556411, avance:  3.9 }
    ],
    avanceTotal:      6.6,
    avanceProgramado: 25.2,
    puesto:           18,         // posición real en ranking de 21 municipios
    cierreMes:        "Febrero",
    progresionMensual: [
      { mes: "Enero",  avance: 0.0 },
      { mes: "Feb.",   avance: 2.1 },
      { mes: "Mar.*",  avance: 6.6 }
    ]
  },

  // ─────────────────────────────────────────────────────────
  //  FUNCIONES  (Actividades + Proyectos – Samegua)
  // ─────────────────────────────────────────────────────────
  funciones: [
    { codigo:"05", nombre:"Orden Público y Seguridad", pim: 1966685,  devengado:  334754, avance: 17.0 },
    { codigo:"03", nombre:"Planeamiento y Gestión",    pim:11493191,  devengado: 1115268, avance:  9.7 },
    { codigo:"14", nombre:"Ambiente",                  pim: 2074681,  devengado:  176800, avance:  8.5 },
    { codigo:"20", nombre:"Salud",                     pim:   24609,  devengado:    1791, avance:  7.3 },
    { codigo:"21", nombre:"Educación y Deporte",       pim: 1054962,  devengado:   30317, avance:  2.9 }
  ],

  // ─────────────────────────────────────────────────────────
  //  PROYECTOS DE INVERSIÓN  (Samegua)
  // ─────────────────────────────────────────────────────────
  proyectos: [
    { nombre:"Mejora seguridad ciudadana (serenazgo)",       pim:  960685, devengado:222062, avance:23.1 },
    { nombre:"Otros proyectos menores",                      pim: 5000000, devengado:500000, avance:10.0 },
    { nombre:"Mejora servicios productivos (fruta)",         pim: 1200000, devengado: 95975, avance: 8.0 },
    { nombre:"Mejora servicios operativos/institucionales",  pim: 1400000, devengado: 64654, avance: 4.6 },
    { nombre:"Adquisición sistema tecnología / software",    pim: 1674174, devengado: 35206, avance: 2.1 },
    { nombre:"Creación movilidad urbana (varios sectores)",  pim: 4308057, devengado: 79722, avance: 1.8 },
    { nombre:"Mejora transitabilidad calles principales",    pim:  637705, devengado:     0, avance: 0.0 }
  ]
};
