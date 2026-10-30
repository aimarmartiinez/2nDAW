const statsScript = document.getElementById('stats-data');

if (statsScript) {
  const stats = JSON.parse(statsScript.textContent);
  const categoriesData = stats.categories || [];
  const topProductsData = stats.topProducts || [];

  const categoryLabels = [];
  const categoryValues = [];
  for (let i = 0; i < categoriesData.length; i += 1) {
    categoryLabels.push(categoriesData[i].name);
    categoryValues.push(categoriesData[i].count);
  }

  const topLabels = [];
  const topValues = [];
  for (let i = 0; i < topProductsData.length; i += 1) {
    let label = topProductsData[i].name || 'Producto';
    if (label.length > 18) {
      label = `${label.slice(0, 18)}...`;
    }
    topLabels.push(label);
    topValues.push(topProductsData[i].price);
  }

  const categoriesCtx = document.getElementById('categoriesChart');
  if (categoriesCtx) {
    new Chart(categoriesCtx, {
      type: 'bar',
      data: {
        labels: categoryLabels,
        datasets: [{
          label: 'Cantidad productos',
          data: categoryValues,
          backgroundColor: '#3b82f6'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } }
      }
    });
  }

  const topProductsCtx = document.getElementById('topProductsChart');
  if (topProductsCtx) {
    new Chart(topProductsCtx, {
      type: 'bar',
      data: {
        labels: topLabels,
        datasets: [{
          label: 'Precio',
          data: topValues,
          backgroundColor: '#10b981'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } }
      }
    });
  }
}
