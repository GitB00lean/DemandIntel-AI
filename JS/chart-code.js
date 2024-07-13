const ctx = document.getElementById('Chart-canvas');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6','Day 7'],
      datasets: [{
        label: 'Sales for the last week',
        data: [12, 19, 3, 5, 2, 3,3],
        borderWidth: 0.5
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });