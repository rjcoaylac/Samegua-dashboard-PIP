document.addEventListener('DOMContentLoaded', () => {
  // Tabs navegación
  const tabs = {
    ranking: document.getElementById('tabRanking'),
    funciones: document.getElementById('tabFunciones'),
    proyectos: document.getElementById('tabProyectos')
  };
  const vistas = {
    ranking: document.getElementById('vistaRanking'),
    funciones: document.getElementById('vistaFunciones'),
    proyectos: document.getElementById('vistaProyectos')
  };

  function showVista(vistaKey) {
    Object.values(tabs).forEach(tab => tab.classList.replace('bg-white', 'bg-gray-200'));
    Object.values(tabs).forEach(tab => tab.classList.replace('dark:bg-gray-800', 'dark:bg-gray-700'));
    tabs[vistaKey].classList.replace('bg-gray-200', 'bg-white');
    tabs[vistaKey].classList.replace('dark:bg-gray-700', 'dark:bg-gray-800');
    Object.values(vistas).forEach(vista => vista.classList.add('hidden'));
    vistas[vistaKey].classList.remove('hidden');
  }

  tabs.ranking.addEventListener('click', () => showVista('ranking'));
  tabs.funciones.addEventListener('click', () => showVista('funciones'));
  tabs.proyectos.addEventListener('click', () => showVista('proyectos'));
  showVista('ranking'); // Vista inicial

  // Dark Mode Toggle
  const body = document.getElementById('bodyElement');
  const toggle = document.getElementById('darkModeToggle');
  toggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    toggle.innerHTML = body.classList.contains('dark') ? '<i class="fas fa-sun"></i> Modo Claro' : '<i class="fas fa-moon"></i> Modo Oscuro';
  });

  // KPIs generales (se repiten en todas vistas, pero para simplicidad, asume se renderizan en HTML)

  // Vista Ranking
  // Pie para Segmentar (Actividades vs Proyectos)
  new Chart(document.getElementById('chartRankingPie'), {
    type: 'doughnut',
    data: {
      labels: ['Actividades', 'Proyectos'],
      datasets: [{ data: [50, 50], backgroundColor: ['#3B82F6', '#10B981'] }]
    },
    options: { plugins: { datalabels: { color: '#fff' } } }
  });

  // Barra horizontal para Ranking
  new Chart(document.getElementById('chartRankingBar'), {
    type: 'bar',
    data: {
      labels: dashboardData.ranking.municipios.map(m => m.name),
      datasets: [{
        label: 'Avance %',
        data: dashboardData.ranking.municipios.map(m => m.avance),
        backgroundColor: '#10B981'
      }]
    },
    options: { indexAxis: 'y', scales: { x: { beginAtZero: true } } }
  });

  // Gauge para Avance Total
  new Chart(document.getElementById('chartRankingGauge'), {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [dashboardData.ranking.avanceTotal, 100 - dashboardData.ranking.avanceTotal],
        backgroundColor: ['#10B981', '#E5E7EB'],
        borderWidth: 0
      }]
    },
    options: { cutout: '80%', rotation: -90, circumference: 180, plugins: { legend: false, tooltip: false } }
  });

  // Gauge para Avance Programado
  new Chart(document.getElementById('chartRankingMonthlyGauge'), {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [dashboardData.ranking.avanceProgramado, 100 - dashboardData.ranking.avanceProgramado],
        backgroundColor: ['#10B981', '#E5E7EB'],
        borderWidth: 0
      }]
    },
    options: { cutout: '80%', rotation: -90, circumference: 180, plugins: { legend: false, tooltip: false } }
  });

  // Barras verticales para Progresión Mensual
  new Chart(document.getElementById('chartRankingMonthlyBar'), {
    type: 'bar',
    data: {
      labels: dashboardData.ranking.progresionMensual.map(p => p.mes),
      datasets: [{
        label: 'Avance %',
        data: dashboardData.ranking.progresionMensual.map(p => p.avance),
        backgroundColor: '#3B82F6'
      }]
    },
    options: { scales: { y: { beginAtZero: true } } }
  });

  // Vista Funciones - Similar
  // Pie para Distribución
  new Chart(document.getElementById('chartFuncionesPie'), {
    type: 'doughnut',
    data: {
      labels: dashboardData.funciones.map(f => f.nombre),
      datasets: [{
        data: dashboardData.funciones.map(f => f.pim),
        backgroundColor: ['#A7F3D0', '#BFDBFE', '#FEF08A', '#FCA5A5', '#DDD6FE']
      }]
    }
  });

  // Barra para Avance por Funciones
  new Chart(document.getElementById('chartFuncionesBar'), {
    type: 'bar',
    data: {
      labels: dashboardData.funciones.map(f => f.nombre),
      datasets: [{
        label: 'Avance %',
        data: dashboardData.funciones.map(f => f.avance),
        backgroundColor: '#10B981'
      }]
    },
    options: { indexAxis: 'y' }
  });

  // Gauges similares (usa datos totales)
  new Chart(document.getElementById('chartFuncionesGauge'), {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [dashboardData.total.avance, 100 - dashboardData.total.avance],
        backgroundColor: ['#10B981', '#E5E7EB'],
        borderWidth: 0
      }]
    },
    options: { cutout: '80%', rotation: -90, circumference: 180, plugins: { legend: false } }
  });

  new Chart(document.getElementById('chartFuncionesMonthlyGauge'), {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [25.2, 100 - 25.2], // Placeholder
        backgroundColor: ['#10B981', '#E5E7EB'],
        borderWidth: 0
      }]
    },
    options: { cutout: '80%', rotation: -90, circumference: 180, plugins: { legend: false } }
  });

  // Barras mensual funciones (placeholder)
  new Chart(document.getElementById('chartFuncionesMonthlyBar'), {
    type: 'bar',
    data: {
      labels: ['Enero', 'Febrero'],
      datasets: [{
        label: 'Avance %',
        data: [0, 6.6],
        backgroundColor: '#3B82F6'
      }]
    }
  });

  // Vista Proyectos
  // Pie para Distribución Proyectos
  new Chart(document.getElementById('chartProyectosPie'), {
    type: 'doughnut',
    data: {
      labels: dashboardData.proyectos.map(p => p.nombre),
      datasets: [{
        data: dashboardData.proyectos.map(p => p.pim),
        backgroundColor: ['#A7F3D0', '#BFDBFE', '#FEF08A', '#FCA5A5', '#DDD6FE', '#A5B4FC', '#FBBF24']
      }]
    }
  });

  // Tabla Proyectos con Progress
  const bodyProyectos = document.getElementById('bodyProyectos');
  dashboardData.proyectos.forEach((p, index) => {
    const row = document.createElement('tr');
    const progressCell = document.createElement('td');
    progressCell.className = 'px-6 py-4';
    const canvas = document.createElement('canvas');
    canvas.id = `progress-proj-${index}`;
    canvas.width = 50;
    canvas.height = 50;
    progressCell.appendChild(canvas);

    row.innerHTML = `
      <td class="px-6 py-4 whitespace-nowrap text-sm">${p.nombre}</td>
      <td class="px-6 py-4 text-sm">${(p.pim / 1000).toFixed(0)} k</td>
      <td class="px-6 py-4 text-sm">${(p.devengado / 1000).toFixed(0)} k</td>
      <td class="px-6 py-4 text-sm \( {p.avance > 15 ? 'text-green-600' : p.avance < 5 ? 'text-red-600' : 'text-yellow-600'} font-bold"> \){p.avance}%</td>
    `;
    row.appendChild(progressCell);
    bodyProyectos.appendChild(row);

    new Chart(canvas, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [p.avance, 100 - p.avance],
          backgroundColor: [p.avance > 15 ? '#A7F3D0' : p.avance < 5 ? '#FCA5A5' : '#FEF08A', '#E5E7EB']
        }]
      },
      options: { cutout: '70%', plugins: { legend: false } }
    });
  });

  // Gauges para Proyectos
  new Chart(document.getElementById('chartProyectosGauge'), {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [8.0, 100 - 8.0], // Avance promedio proyectos placeholder
        backgroundColor: ['#10B981', '#E5E7EB'],
        borderWidth: 0
      }]
    },
    options: { cutout: '80%', rotation: -90, circumference: 180, plugins: { legend: false } }
  });

  new Chart(document.getElementById('chartProyectosMonthlyGauge'), {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [25.2, 100 - 25.2],
        backgroundColor: ['#10B981', '#E5E7EB'],
        borderWidth: 0
      }]
    },
    options: { cutout: '80%', rotation: -90, circumference: 180, plugins: { legend: false } }
  });

  // Barras mensual proyectos
  new Chart(document.getElementById('chartProyectosMonthlyBar'), {
    type: 'bar',
    data: {
      labels: ['Enero', 'Febrero'],
      datasets: [{
        label: 'Avance %',
        data: [0, 5], // Placeholder
        backgroundColor: '#3B82F6'
      }]
    }
  });
});
