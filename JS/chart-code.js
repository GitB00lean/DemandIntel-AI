const ctx = document.getElementById('Chart-canvas');
const num1= parseInt(document.querySelector("num1"));
const num2= parseInt(document.querySelector("num2"));
const num3= parseInt(document.querySelector("num3"));
const num4= parseInt(document.querySelector("num4"));
const num5= parseInt(document.querySelector("num5"));
const num6= parseInt(document.querySelector("num6"));
const num7= parseInt(document.querySelector("num7"));

const pastdata= [num1,num2,num3,num4,num5,num6,num7]
//pass this data to the api model
// callback function for chart js
//no reload function for chart js


new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    datasets: [
      {
        type: 'bar',
        label: 'Bar Dataset',
        data: pastdata,
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