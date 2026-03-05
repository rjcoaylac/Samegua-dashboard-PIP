// ============================================================
//  data.js — Datos del Dashboard Presupuestal Samegua 2026
//  Fuente: MEF | Actualización: 20 Febrero 2026
// ============================================================

const dashboardData = {
  anio: 2026,
  corte: "20 de Febrero de 2026",

  total: {
    pia:              30100000,
    pim:              44300000,
    certificacion:    11700000,
    compromisoMensual: 2700000,
    devengado:          913000,
    girado:             903900
  },

  ranking: {
    municipios: [
      { name: "CHOJATA",                  avance: 56.9 },
      { name: "PUQUINA",                  avance: 18.7 },
      { name: "SAN CRISTOBAL",            avance: 18.4 },
      { name: "QUINISTAQUILLAS",          avance: 10.1 },
      { name: "UBINAS",                   avance:  6.5 },
      { name: "MATALAQUE",                avance:  6.3 },
      { name: "YUNGA",                    avance:  6.3 },
      { name: "SANCHEZ CERRO - OMATE",    avance:  6.2 },
      { name: "COALAQUE",                 avance:  5.5 },
      { name: "PACCHA",                   avance:  5.4 },
      { name: "MARISCAL NIETO - MOQUEGUA",avance:  4.6 },
      { name: "ILO",                      avance:  4.3 },
      { name: "CUCHUMBAYA",               avance:  3.7 },
      { name: "CARUMAS",                  avance:  3.6 },
      { name: "LLOQUE",                   avance:  3.5 },
      { name: "EL ALGARROBAL",            avance:  3.4 },
      { name: "LA CAPILLA",               avance:  3.4 },
      { name: "SAN ANTONIO",              avance:  3.1 },
      { name: "SAMEGUA",                  avance:  2.1 },
      { name: "TORATA",                   avance:  1.5 }
    ],
    avanceTotal:      2.1,
    avanceProgramado: 25.2,
    puesto:           20,
    progresionMensual: [
      { mes: "Enero",   avance: 0.0 },
      { mes: "Febrero", avance: 2.1 }
    ]
  },

  // Distribución estimada para segmentar (Actividades vs Proyectos)
  segmentar: {
    todos:       { actividades: 31390000, proyectos: 12910000 },
    actividades: { actividades: 31390000, proyectos: 0 },
    proyectos:   { actividades: 0,        proyectos: 12910000 }
  },

  funciones: [
    { codigo: "05", nombre: "Orden Público y Seguridad", pim: 1966685,  devengado: 334754,  avance: 17.1 },
    { codigo: "03", nombre: "Planeamiento y Gestión",    pim: 11493191, devengado: 1115268, avance:  9.7 },
    { codigo: "14", nombre: "Ambiente",                  pim: 2074681,  devengado: 176800,  avance:  8.5 },
    { codigo: "20", nombre: "Salud",                     pim: 24609,    devengado: 1791,    avance:  7.3 },
    { codigo: "21", nombre: "Educación y Deporte",       pim: 1054962,  devengado: 30317,   avance:  2.9 }
  ],

  proyectos: [
    { nombre: "Mejora seguridad ciudadana (serenazgo)",    pim: 960685,  devengado: 222062, avance: 23.1 },
    { nombre: "Mejora servicios productivos (fruta)",      pim: 1200000, devengado: 95975,  avance:  8.0 },
    { nombre: "Mejora servicios operativos/institucionales",pim:1400000, devengado: 64654,  avance:  4.6 },
    { nombre: "Mejora transitabilidad calles principales", pim: 637705,  devengado: 0,      avance:  0.0 },
    { nombre: "Adquisición sistema tecnología / software", pim: 1674174, devengado: 35206,  avance:  2.1 },
    { nombre: "Creación movilidad urbana (varios sectores)",pim:4308057, devengado: 79722,  avance:  1.8 },
    { nombre: "Otros proyectos menores",                   pim: 5000000, devengado: 500000, avance: 10.0 }
  ]
};
