// ============================================================
//  script.js  |  Dashboard Presupuestal – Samegua 2026
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ──────────────────────────────────────────
     PALETA
  ────────────────────────────────────────── */
  const VERDE      = '#2E7D52';
  const DORADO     = '#C8A84B';
  const VERDE_OSC  = '#1B4D35';
  const TRACK      = '#E0E6E2';
  const PALETA_FUNC = ['#1B4D35','#2E7D52','#C8A84B','#4CAF80','#A07830'];
  const PALETA_PROY = ['#1B4D35','#2E7D52','#C8A84B','#4CAF80','#A07830','#6EE7A8','#DDD6FE'];

  /* ──────────────────────────────────────────
     HELPERS
  ────────────────────────────────────────── */
  const fmt = n => {
    if (n >= 1e6) return 'S/ ' + (n/1e6).toFixed(1) + ' mill.';
    if (n >= 1e3) return 'S/ ' + (n/1e3).toFixed(1) + ' mil';
    return 'S/ ' + n.toFixed(0);
  };

  const mkGauge = (id, value, max = 100) => {
    const v = Math.min(Math.max(+value, 0), max);
    return new Chart(document.getElementById(id), {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [v, max - v],
          backgroundColor: [VERDE, TRACK],
          borderWidth: 0,
          borderRadius: [5, 0]
        }]
      },
      options: {
        cutout: '78%', rotation: -90, circumference: 180,
        plugins: { legend: { display:false }, tooltip:{ enabled:false } },
        animation: { animateRotate:true, duration:900 }
      }
    });
  };

  const mkBar = (id, labels, data, colors, horiz = false, unit = '%') => {
    const bg = Array.isArray(colors) ? colors : Array(data.length).fill(colors);
    return new Chart(document.getElementById(id), {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Avance %', data,
          backgroundColor: bg,
          borderRadius: 5, borderSkipped: false
        }]
      },
      options: {
        indexAxis: horiz ? 'y' : 'x',
        responsive: true,
        plugins: {
          legend: { display:false },
          datalabels: {
            anchor: 'end', align: 'end',
            color: VERDE_OSC,
            font: { size: 10, weight:'700' },
            formatter: v => v + unit
          }
        },
        scales: {
          x: { beginAtZero:true, grid:{ color:'rgba(0,0,0,.05)' }, ticks:{ font:{size:10} } },
          y: { grid:{ display:false }, ticks:{ font:{size:10} } }
        }
      },
      plugins: [ChartDataLabels]
    });
  };

  /* ──────────────────────────────────────────
     TABS
  ────────────────────────────────────────── */
  const VISTAS = ['Ranking','Funciones','Proyectos'];

  function showVista(key) {
    VISTAS.forEach(v => {
      const activo = v.toLowerCase() === key.toLowerCase();
      document.getElementById('tab'+v).classList.toggle('active', activo);
      const el = document.getElementById('vista'+v);
      el.classList.toggle('active', activo);
      el.style.display = activo ? 'block' : 'none';
    });
  }

  document.getElementById('tabRanking').addEventListener('click',  () => showVista('ranking'));
  document.getElementById('tabFunciones').addEventListener('click', () => showVista('funciones'));
  document.getElementById('tabProyectos').addEventListener('click', () => showVista('proyectos'));

  /* ──────────────────────────────────────────
     DARK MODE
  ────────────────────────────────────────── */
  document.getElementById('darkModeToggle').addEventListener('click', () => {
    const body  = document.getElementById('bodyElement');
    const isDark = body.classList.toggle('dark');
    document.getElementById('darkModeToggle').innerHTML = isDark
      ? '<i class="fas fa-sun"></i> Modo Claro'
      : '<i class="fas fa-moon"></i> Modo Oscuro';
  });

  /* ──────────────────────────────────────────
     KPI CARDS  (desde data.js)
  ────────────────────────────────────────── */
  const t = dashboardData.total;
  document.getElementById('kpiPia').textContent  = fmt(t.pia);
  document.getElementById('kpiPim').textContent  = fmt(t.pim);
  document.getElementById('kpiCert').textContent = fmt(t.certificacion);
  document.getElementById('kpiComp').textContent = fmt(t.compromisoMensual);
  document.getElementById('kpiDev').textContent  = fmt(t.devengado);
  document.getElementById('kpiGir').textContent  = fmt(t.girado);

  /* ──────────────────────────────────────────
     ═══  VISTA RANKING  ═══
  ────────────────────────────────────────── */
  const R = dashboardData.ranking;

  // Textos dinámicos
  document.getElementById('gAnualVal').textContent   = R.avanceTotal + '%';
  document.getElementById('gMensVal').textContent    = R.avanceProgramado + '%';
  document.getElementById('puestoBadge').textContent = R.puesto;
  document.getElementById('cierreMesLabel').textContent = R.cierreMes || 'Febrero';
  document.getElementById('segMontos').textContent   = fmt(t.devengado) + ' / ' + fmt(t.pim);
  document.getElementById('segPct').textContent      = t.avance + '%';

  // Donut "Avance % Devengado/PIM"
  new Chart(document.getElementById('chartSegPie'), {
    type: 'doughnut',
    data: {
      labels: ['Devengado','Saldo PIM'],
      datasets: [{
        data: [t.devengado, t.pim - t.devengado],
        backgroundColor: [VERDE, TRACK],
        borderWidth: 3, borderColor: '#fff'
      }]
    },
    options: {
      cutout: '70%',
      plugins: {
        legend: { display:true, position:'bottom', labels:{ font:{size:10}, padding:8 } },
        tooltip: { callbacks:{ label: ctx => ' ' + fmt(ctx.raw) } },
        datalabels: { display:false }
      }
    }
  });

  // Barras horizontales ranking (SAMEGUA en dorado, top 3 en verde oscuro)
  const rankColors = R.municipios.map((m, i) => {
    if (m.name === 'SAMEGUA') return DORADO;
    if (i === 0) return '#0F3D22';
    if (i === 1) return '#1B6B42';
    return VERDE;
  });

  new Chart(document.getElementById('chartRankBar'), {
    type: 'bar',
    data: {
      labels: R.municipios.map(m => m.name),
      datasets: [{
        label: 'Avance %',
        data: R.municipios.map(m => m.avance),
        backgroundColor: rankColors,
        borderRadius: 4,
        borderSkipped: false
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        datalabels: {
          anchor: 'end', align: 'end',
          color: ctx => ctx.dataIndex === R.municipios.findIndex(m => m.name === 'SAMEGUA') ? '#A07830' : VERDE_OSC,
          font: { size: 10, weight: '700' },
          formatter: v => v + '%'
        },
        tooltip: {
          callbacks: {
            label: ctx => {
              const m = R.municipios[ctx.dataIndex];
              return [
                ' Avance: ' + m.avance + '%',
                ' PIM: ' + fmt(m.pim),
                ' Devengado: ' + fmt(m.devengado)
              ];
            }
          }
        }
      },
      scales: {
        x: {
          beginAtZero: true, max: 65,
          grid: { color: 'rgba(0,0,0,.05)' },
          ticks: { font: { size: 10 }, callback: v => v + '%' }
        },
        y: {
          grid: { display: false },
          ticks: {
            font: { size: 10 },
            color: ctx => R.municipios[ctx.index]?.name === 'SAMEGUA' ? '#A07830' : '#1A2E22'
          }
        }
      }
    },
    plugins: [ChartDataLabels]
  });

  // Gauges ranking
  mkGauge('chartRankGaugeAnual', R.avanceTotal);
  mkGauge('chartRankGaugeMens',  R.avanceProgramado);

  // Progresión mensual
  mkBar('chartRankMonthBar',
    R.progresionMensual.map(p => p.mes),
    R.progresionMensual.map(p => p.avance),
    R.progresionMensual.map((_, i) => i === R.progresionMensual.length - 1 ? DORADO : VERDE),
    false
  );

  /* ──────────────────────────────────────────
     ═══  VISTA FUNCIONES  ═══
  ────────────────────────────────────────── */
  const F = dashboardData.funciones;
  const totalPimF = F.reduce((s, f) => s + f.pim, 0);
  const totalDevF = F.reduce((s, f) => s + f.devengado, 0);
  const avF = ((totalDevF / totalPimF) * 100).toFixed(1);

  document.getElementById('funcGVal').textContent = avF + '%';

  // Pie funciones
  new Chart(document.getElementById('chartFuncPie'), {
    type: 'doughnut',
    data: {
      labels: F.map(f => f.nombre),
      datasets: [{
        data: F.map(f => f.pim),
        backgroundColor: PALETA_FUNC,
        borderWidth: 3, borderColor: '#fff'
      }]
    },
    options: {
      plugins: {
        legend: { display:false },
        tooltip: { callbacks:{ label: ctx => ' ' + fmt(ctx.raw) } },
        datalabels: { display:false }
      }
    }
  });

  // Leyenda personalizada
  const leg = document.getElementById('funcLegend');
  F.forEach((f, i) => {
    const d = document.createElement('div');
    d.className = 'fl-item';
    d.innerHTML = `<div class="fl-dot" style="background:${PALETA_FUNC[i]}"></div>
      <span>${f.nombre} — <strong>${fmt(f.pim)}</strong></span>`;
    leg.appendChild(d);
  });

  // Barras funciones
  mkBar('chartFuncBar',
    F.map(f => f.nombre),
    F.map(f => f.avance),
    PALETA_FUNC, true
  );

  // Gauges funciones
  mkGauge('chartFuncGauge',      parseFloat(avF));
  mkGauge('chartFuncGaugeMens',  25.2);

  // Progresión mensual funciones
  mkBar('chartFuncMonthBar',
    R.progresionMensual.map(p => p.mes),
    R.progresionMensual.map(p => p.avance),
    R.progresionMensual.map((_, i) => i === R.progresionMensual.length - 1 ? DORADO : VERDE),
    false
  );

  /* ──────────────────────────────────────────
     ═══  VISTA PROYECTOS  ═══
  ────────────────────────────────────────── */
  const P = dashboardData.proyectos;
  const totalPimP = P.reduce((s, p) => s + p.pim, 0);
  const totalDevP = P.reduce((s, p) => s + p.devengado, 0);
  const avP = ((totalDevP / totalPimP) * 100).toFixed(1);

  document.getElementById('proyGVal').textContent = avP + '%';

  // Pie proyectos
  new Chart(document.getElementById('chartProyPie'), {
    type: 'doughnut',
    data: {
      labels: P.map(p => p.nombre),
      datasets: [{
        data: P.map(p => p.pim),
        backgroundColor: PALETA_PROY,
        borderWidth: 3, borderColor: '#fff'
      }]
    },
    options: {
      plugins: {
        legend: { display:true, position:'bottom', labels:{ font:{size:9}, padding:5 } },
        tooltip: { callbacks:{ label: ctx => ' ' + fmt(ctx.raw) } },
        datalabels: { display:false }
      }
    }
  });

  // Tabla proyectos
  const tbody = document.getElementById('bodyProyectos');
  P.forEach(p => {
    const bClass = p.avance >= 15 ? 'bg' : p.avance < 5 ? 'br' : 'by';
    const bColor = p.avance >= 15 ? '#2E7D52' : p.avance < 5 ? '#E53E3E' : '#C8A84B';
    const w = Math.min(p.avance, 100);
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="max-width:160px;word-break:break-word">${p.nombre}</td>
      <td style="white-space:nowrap">${fmt(p.pim)}</td>
      <td style="white-space:nowrap">${fmt(p.devengado)}</td>
      <td><span class="badge ${bClass}">${p.avance}%</span></td>
      <td>
        <div class="pbar-wrap">
          <div class="pbar-fill" style="width:${w}%;background:${bColor}"></div>
        </div>
      </td>`;
    tbody.appendChild(tr);
  });

  // Gauges proyectos
  mkGauge('chartProyGauge',      parseFloat(avP));
  mkGauge('chartProyGaugeMens',  25.2);

  // Progresión mensual proyectos
  mkBar('chartProyMonthBar',
    R.progresionMensual.map(p => p.mes),
    R.progresionMensual.map(p => p.avance),
    R.progresionMensual.map((_, i) => i === R.progresionMensual.length - 1 ? DORADO : VERDE),
    false
  );

  /* ── inicializar en Ranking ── */
  showVista('ranking');

}); // fin DOMContentLoaded
