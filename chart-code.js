const ctx = document.getElementById('Chart-canvas');
const day1 = parseInt(document.getElementById('num1').value);
const day2 = parseInt(document.getElementById('num2').value);
const day3 = parseInt(document.getElementById('num3').value);
const day4 = parseInt(document.getElementById('num4').value);
const day5 = parseInt(document.getElementById('num5').value);
const day6 = parseInt(document.getElementById('num6').value);
const day7 = parseInt(document.getElementById('num7').value);
const reloadButton= document.querySelector('.predict');

const userdata= [day1,day2,day3,day4,day5,day6,day7]
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6','Day 7'],
      datasets: [{
        label: 'Sales for the last week',
        data: userdata,
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

reloadButton.addEventListener('click', function(){
    location.reload();
  });