document.addEventListener('DOMContentLoaded', () => {
  // KPIs
  document.getElementById('kpiAvance').textContent = dashboardData.total.avance + '%';
  document.getElementById('kpiPIM').textContent = 'S/ ' + (dashboardData.total.pim / 1000000).toFixed(2) + ' M';
  document.getElementById('kpiDevengado').textContent = 'S/ ' + (dashboardData.total.devengado / 1000000).toFixed(2) + ' M';

  // Chart Ranking (barras horizontales)
  const ctxRanking = document.getElementById('chartRanking').getContext('2d');
  new Chart(ctxRanking, {
    type: 'bar',
    data: {
      labels: dashboardData.ranking.map(r => r.municipalidad),
      datasets: [{
        label: 'Avance %',
        data: dashboardData.ranking.map(r => r.avance),
        backgroundColor: dashboardData.ranking.map(r => r.color || '#3B82F6'),
        borderWidth: 1
      }]
    },
    options: {
      indexAxis: 'y',
      scales: { x: { beginAtZero: true, max: 100 } }
    }
  });

  // Chart Funciones Bar
  const ctxBar = document.getElementById('chartFuncionesBar').getContext('2d');
  new Chart(ctxBar, {
    type: 'bar',
    data: {
      labels: dashboardData.funciones.map(f => f.nombre),
      datasets: [{
        label: 'Avance %',
        data: dashboardData.funciones.map(f => f.avance),
        backgroundColor: '#10B981'
      }]
    },
    options: { scales: { y: { beginAtZero: true } } }
  });

  // Chart Funciones Pie
  const ctxPie = document.getElementById('chartFuncionesPie').getContext('2d');
  new Chart(ctxPie, {
    type: 'pie',
    data: {
      labels: dashboardData.funciones.map(f => f.nombre),
      datasets: [{
        data: dashboardData.funciones.map(f => f.pim),
        backgroundColor: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6']
      }]
    }
  });

  // Tabla Proyectos
  const body = document.getElementById('bodyProyectos');
  dashboardData.proyectos.forEach(p => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="px-6 py-4 whitespace-nowrap">${p.nombre}</td>
      <td class="px-6 py-4">${(p.pim / 1000).toFixed(0)} k</td>
      <td class="px-6 py-4">${(p.devengado / 1000).toFixed(0)} k</td>
      <td class="px-6 py-4 \( {p.avance > 15 ? 'text-green-600' : p.avance < 5 ? 'text-red-600' : 'text-yellow-600'} font-bold"> \){p.avance}%</td>
    `;
    body.appendChild(row);
  });

  // Filtros básicos (puedes expandir)
  document.getElementById('filtroProyecto').addEventListener('input', e => {
    const term = e.target.value.toLowerCase();
    Array.from(body.children).forEach(row => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(term) ? '' : 'none';
    });
  });
});
