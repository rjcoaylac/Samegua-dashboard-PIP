// ============================================================
//  script.js — Lógica del Dashboard Presupuestal Samegua 2026
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ──────────────────────────────────────────
  //  PALETA DE COLORES
  // ──────────────────────────────────────────
  const VERDE      = '#2E7D52';
  const DORADO     = '#C8A84B';
  const GRIS_TRACK = '#E0E6E2';
  const PALETA_FUNC = ['#1B4D35','#2E7D52','#C8A84B','#4CAF80','#A07830'];
  const PALETA_PROY = ['#1B4D35','#2E7D52','#C8A84B','#4CAF80','#A07830','#6EE7A8','#F5E6B8'];

  // ──────────────────────────────────────────
  //  HELPER: formatear montos
  // ──────────────────────────────────────────
  function fmt(n) {
    if (n >= 1e6) return 'S/ ' + (n / 1e6).toFixed(1) + ' mill.';
    if (n >= 1e3) return 'S/ ' + (n / 1e3).toFixed(1) + ' mil';
    return 'S/ ' + n.toFixed(0);
  }

  // ──────────────────────────────────────────
  //  HELPER: crear gauge (semicírculo)
  // ──────────────────────────────────────────
  function crearGauge(id, value, max) {
    const v = Math.min(Math.max(value, 0), max);
    return new Chart(document.getElementById(id), {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [v, max - v],
          backgroundColor: [VERDE, GRIS_TRACK],
          borderWidth: 0,
          borderRadius: [4, 0]
        }]
      },
      options: {
        cutout: '78%',
        rotation: -90,
        circumference: 180,
        plugins: {
          legend:  { display: false },
          tooltip: { enabled: false }
        },
        animation: { animateRotate: true, duration: 900 }
      }
    });
  }

  // ──────────────────────────────────────────
  //  HELPER: crear barra (horizontal o vertical)
  // ──────────────────────────────────────────
  function crearBarra(id, labels, data, colors, horizontal) {
    const bgColors = Array.isArray(colors) ? colors : Array(data.length).fill(colors);
    return new Chart(document.getElementById(id), {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Avance %',
          data,
          backgroundColor: bgColors,
          borderRadius: 5,
          borderSkipped: false
        }]
      },
      options: {
        indexAxis: horizontal ? 'y' : 'x',
        responsive: true,
        plugins: {
          legend: { display: false },
          datalabels: {
            anchor: 'end',
            align:  'end',
            color:  '#1B4D35',
            font:   { size: 10, weight: '700' },
            formatter: v => v + '%'
          }
        },
        scales: {
          x: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { font: { size: 10 } } },
          y: { grid: { display: false }, ticks: { font: { size: 10 } } }
        }
      },
      plugins: [ChartDataLabels]
    });
  }

  // ──────────────────────────────────────────
  //  TABS: navegación entre vistas
  // ──────────────────────────────────────────
  function showVista(key) {
    ['Ranking', 'Funciones', 'Proyectos'].forEach(nombre => {
      const tab   = document.getElementById('tab' + nombre);
      const vista = document.getElementById('vista' + nombre);
      const activo = nombre.toLowerCase() === key.toLowerCase();
      tab.classList.toggle('active', activo);
      vista.classList.toggle('active', activo);
      vista.style.display = activo ? 'block' : 'none';
    });
  }

  document.getElementById('tabRanking').addEventListener('click',   () => showVista('ranking'));
  document.getElementById('tabFunciones').addEventListener('click',  () => showVista('funciones'));
  document.getElementById('tabProyectos').addEventListener('click',  () => showVista('proyectos'));

  // ──────────────────────────────────────────
  //  DARK MODE
  // ──────────────────────────────────────────
  document.getElementById('darkModeToggle').addEventListener('click', () => {
    document.getElementById('bodyElement').classList.toggle('dark');
    const isDark = document.getElementById('bodyElement').classList.contains('dark');
    document.getElementById('darkModeToggle').innerHTML = isDark
      ? '<i class="fas fa-sun"></i> Modo Claro'
      : '<i class="fas fa-moon"></i> Modo Oscuro';
  });

  // ──────────────────────────────────────────
  //  KPI CARDS: llenar desde datos
  // ──────────────────────────────────────────
  const t = dashboardData.total;
  document.getElementById('kpiPia').textContent  = fmt(t.pia);
  document.getElementById('kpiPim').textContent  = fmt(t.pim);
  document.getElementById('kpiCert').textContent = fmt(t.certificacion);
  document.getElementById('kpiComp').textContent = fmt(t.compromisoMensual);
  document.getElementById('kpiDev').textContent  = fmt(t.devengado);
  document.getElementById('kpiGir').textContent  = fmt(t.girado);

  // ──────────────────────────────────────────
  //  VISTA RANKING
  // ──────────────────────────────────────────

  // Puesto badge
  document.getElementById('puestoBadge').textContent = dashboardData.ranking.puesto;

  // Gauge textos
  document.getElementById('gaugeAnualVal').textContent  = dashboardData.ranking.avanceTotal + '%';
  document.getElementById('gaugeMensualVal').textContent = dashboardData.ranking.avanceProgramado + '%';

  // Segmentar pie
  const segData = {
    todos:       { labels: ['Actividades', 'Proyectos'], data: [31390000, 12910000], colors: [VERDE, DORADO] },
    actividades: { labels: ['Actividades'],              data: [31390000],           colors: [VERDE] },
    proyectos:   { labels: ['Proyectos'],                data: [12910000],           colors: [DORADO] }
  };

  document.getElementById('segMontos').textContent =
    fmt(t.devengado) + ' / ' + fmt(t.pim);

  const segPieChart = new Chart(document.getElementById('chartSegPie'), {
    type: 'doughnut',
    data: {
      labels: segData.todos.labels,
      datasets: [{
        data: segData.todos.data,
        backgroundColor: segData.todos.colors,
        borderWidth: 3, borderColor: '#fff'
      }]
    },
    options: {
      cutout: '68%',
      plugins: {
        legend: { display: true, position: 'bottom', labels: { font: { size: 10 }, padding: 8 } },
        tooltip: { callbacks: { label: ctx => ' ' + fmt(ctx.raw) } }
      }
    }
  });

  // Botones segmentar
  document.querySelectorAll('.seg-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.seg-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const seg = this.dataset.seg;
      const d   = segData[seg];
      segPieChart.data.labels                      = d.labels;
      segPieChart.data.datasets[0].data            = d.data;
      segPieChart.data.datasets[0].backgroundColor = d.colors;
      segPieChart.update();
    });
  });

  // Ranking barras horizontales (SAMEGUA resaltada en dorado)
  const rankColors = dashboardData.ranking.municipios.map(m =>
    m.name === 'SAMEGUA' ? DORADO : VERDE
  );
  crearBarra(
    'chartRankingBar',
    dashboardData.ranking.municipios.map(m => m.name),
    dashboardData.ranking.municipios.map(m => m.avance),
    rankColors,
    true
  );

  // Gauges Ranking
  crearGauge('chartRankingGauge',       dashboardData.ranking.avanceTotal,      100);
  crearGauge('chartRankingMonthlyGauge', dashboardData.ranking.avanceProgramado, 100);

  // Progresión mensual ranking
  crearBarra(
    'chartRankingMonthlyBar',
    dashboardData.ranking.progresionMensual.map(p => p.mes),
    dashboardData.ranking.progresionMensual.map(p => p.avance),
    [VERDE, DORADO],
    false
  );

  // ──────────────────────────────────────────
  //  VISTA FUNCIONES
  // ──────────────────────────────────────────

  const totalPimFunc = dashboardData.funciones.reduce((s, f) => s + f.pim, 0);
  const totalDevFunc = dashboardData.funciones.reduce((s, f) => s + f.devengado, 0);
  const avanceFunc   = ((totalDevFunc / totalPimFunc) * 100).toFixed(1);
  document.getElementById('funcGaugeVal').textContent = avanceFunc + '%';

  // Pie funciones
  new Chart(document.getElementById('chartFuncionesPie'), {
    type: 'doughnut',
    data: {
      labels: dashboardData.funciones.map(f => f.nombre),
      datasets: [{
        data: dashboardData.funciones.map(f => f.pim),
        backgroundColor: PALETA_FUNC,
        borderWidth: 3, borderColor: '#fff'
      }]
    },
    options: {
      plugins: {
        legend:  { display: false },
        tooltip: { callbacks: { label: ctx => ' ' + fmt(ctx.raw) } }
      }
    }
  });

  // Leyenda personalizada funciones
  const funcLegend = document.getElementById('funcLegend');
  dashboardData.funciones.forEach((f, i) => {
    const item = document.createElement('div');
    item.className = 'func-legend-item';
    item.innerHTML = `
      <div class="func-legend-dot" style="background:${PALETA_FUNC[i]}"></div>
      <span>${f.nombre} — <strong>${fmt(f.pim)}</strong></span>`;
    funcLegend.appendChild(item);
  });

  // Barras funciones
  crearBarra(
    'chartFuncionesBar',
    dashboardData.funciones.map(f => f.nombre),
    dashboardData.funciones.map(f => f.avance),
    PALETA_FUNC,
    true
  );

  // Gauges funciones
  crearGauge('chartFuncionesGauge',        parseFloat(avanceFunc), 100);
  crearGauge('chartFuncionesMonthlyGauge', 25.2,                   100);

  // Progresión mensual funciones
  crearBarra(
    'chartFuncionesMonthlyBar',
    ['Enero', 'Febrero'],
    [0.0, parseFloat(avanceFunc)],
    [VERDE, DORADO],
    false
  );

  // ──────────────────────────────────────────
  //  VISTA PROYECTOS
  // ──────────────────────────────────────────

  const totalPimProy = dashboardData.proyectos.reduce((s, p) => s + p.pim, 0);
  const totalDevProy = dashboardData.proyectos.reduce((s, p) => s + p.devengado, 0);
  const avanceProy   = ((totalDevProy / totalPimProy) * 100).toFixed(1);
  document.getElementById('proyGaugeVal').textContent = avanceProy + '%';

  // Pie proyectos
  new Chart(document.getElementById('chartProyectosPie'), {
    type: 'doughnut',
    data: {
      labels: dashboardData.proyectos.map(p => p.nombre),
      datasets: [{
        data: dashboardData.proyectos.map(p => p.pim),
        backgroundColor: PALETA_PROY,
        borderWidth: 3, borderColor: '#fff'
      }]
    },
    options: {
      plugins: {
        legend: { display: true, position: 'bottom', labels: { font: { size: 9 }, padding: 6 } },
        tooltip: { callbacks: { label: ctx => ' ' + fmt(ctx.raw) } }
      }
    }
  });

  // Tabla proyectos
  const bodyProy = document.getElementById('bodyProyectos');
  dashboardData.proyectos.forEach(p => {
    const badgeClass = p.avance >= 15 ? 'badge-green' : p.avance < 5 ? 'badge-red' : 'badge-yellow';
    const barColor   = p.avance >= 15 ? '#2E7D52' : p.avance < 5 ? '#E53E3E' : '#C8A84B';
    const barW       = Math.min(p.avance, 100);
    const tr         = document.createElement('tr');
    tr.innerHTML = `
      <td style="max-width:180px;word-break:break-word;">${p.nombre}</td>
      <td>${fmt(p.pim)}</td>
      <td>${fmt(p.devengado)}</td>
      <td><span class="badge ${badgeClass}">${p.avance}%</span></td>
      <td>
        <div class="progress-bar-wrap">
          <div class="progress-bar-fill" style="width:${barW}%;background:${barColor};"></div>
        </div>
      </td>`;
    bodyProy.appendChild(tr);
  });

  // Gauges proyectos
  crearGauge('chartProyectosGauge',        parseFloat(avanceProy), 100);
  crearGauge('chartProyectosMonthlyGauge', 25.2,                   100);

  // Progresión mensual proyectos
  crearBarra(
    'chartProyectosMonthlyBar',
    ['Enero', 'Febrero'],
    [0.0, parseFloat(avanceProy)],
    [VERDE, DORADO],
    false
  );

  // Inicializar en vista Ranking
  showVista('ranking');

}); // fin DOMContentLoaded
