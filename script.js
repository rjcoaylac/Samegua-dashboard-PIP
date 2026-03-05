document.addEventListener('DOMContentLoaded', () => {
  // KPIs
  document.getElementById('kpiAvance').textContent = dashboardData.total.avance + '%';
  document.getElementById('kpiPIM').textContent = 'S/ ' + (dashboardData.total.pim / 1000000).toFixed(2) + ' M';
  document.getElementById('kpiDevengado').textContent = 'S/ ' + (dashboardData.total.devengado / 1000000).toFixed(2) + ' M';

  // Dark Mode Toggle
  const body = document.getElementById('bodyElement');
  const toggle = document.getElementById('darkModeToggle');
  toggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    body.classList.toggle('bg-bg-light');
    body.classList.toggle('bg-gray-900');
    toggle.innerHTML = body.classList.contains('dark') ? '<i class="fas fa-sun"></i> Modo Claro' : '<i class="fas fa-moon"></i> Modo Oscuro';
  });

  // Chart Ranking (barras horizontales)
  const ctxRanking = document.getElementById('chartRanking').getContext('2d');
  const chartRanking = new Chart(ctxRanking, {
    type: 'bar',
    data: {
      labels: dashboardData.ranking.map(r => r.municipalidad),
      datasets: [{
        label: 'Avance %',
        data: dashboardData.ranking.map(r => r.avance),
        backgroundColor: dashboardData.ranking.map(r => r.color || '#BFDBFE'),
        borderWidth: 1
      }]
    },
    options: {
      indexAxis: 'y',
      scales: { x: { beginAtZero: true, max: 100 } },
      plugins: { legend: { labels: { color: 'text-text-dark' } } }
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
        backgroundColor: '#A7F3D0'
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
        backgroundColor: ['#A7F3D0', '#BFDBFE', '#FEF08A', '#FCA5A5', '#DDD6FE']
      }]
    }
  });

  // Tabla Proyectos con Progress Circles
  const bodyProyectos = document.getElementById('bodyProyectos');
  dashboardData.proyectos.forEach((p, index) => {
    const row = document.createElement('tr');
    const progressCell = document.createElement('td');
    progressCell.className = 'px-6 py-4';
    const canvas = document.createElement('canvas');
    canvas.id = `progress-${index}`;
    canvas.width = 50;
    canvas.height = 50;
    progressCell.appendChild(canvas);

    row.innerHTML = `
      <td class="px-6 py-4 whitespace-nowrap">${p.nombre}</td>
      <td class="px-6 py-4">${(p.pim / 1000).toFixed(0)} k</td>
      <td class="px-6 py-4">${(p.devengado / 1000).toFixed(0)} k</td>
      <td class="px-6 py-4 \( {p.avance > 15 ? 'text-green-600' : p.avance < 5 ? 'text-red-600' : 'text-yellow-600'} font-bold"> \){p.avance}%</td>
    `;
    row.appendChild(progressCell);
    bodyProyectos.appendChild(row);

    // Crear progress circle
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

  // Filtro Proyecto
  document.getElementById('filtroProyecto').addEventListener('input', e => {
    const term = e.target.value.toLowerCase();
    Array.from(bodyProyectos.children).forEach(row => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(term) ? '' : 'none';
    });
  });

  // Export CSV (Proyectos y Funciones)
  document.getElementById('exportCSV').addEventListener('click', () => {
    const data = dashboardData.proyectos.map(p => ({
      Proyecto: p.nombre,
      PIM: p.pim,
      Devengado: p.devengado,
      Avance: p.avance
    }));
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'samegua_proyectos.csv';
    link.click();
  });

  // Export PDF (Simple resumen)
  document.getElementById('exportPDF').addEventListener('click', () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text('Dashboard Samegua 2026', 10, 10);
    doc.text(`Avance General: ${dashboardData.total.avance}%`, 10, 20);
    // Agrega más contenido si necesitas
    doc.save('samegua_dashboard.pdf');
  });
});
