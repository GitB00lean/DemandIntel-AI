const ctx = document.getElementById('Chart-canvas');

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    datasets: [
      {
        type: 'bar',
        label: 'Bar Dataset',
        data: [12, 19, 3, 5, 2, 3, 7],
        borderWidth: 1,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)'
      },
      {
        type: 'line',
        label: 'Line Dataset',
        data: [15, 10, 13, 8, 7, 4, 5],
        borderWidth: 1,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: false
      }
    ]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});