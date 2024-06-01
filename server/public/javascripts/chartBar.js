
const base_url = 'http://localhost:5555';

document.addEventListener('DOMContentLoaded', async function() {


  const response = await fetch(`${base_url}/dashboard/data/spots-by-category`, {
    headers: {"Content-Type": "application/json"},
    method: 'GET'
  })

  if(response) {
    var data = await response.json();
  } else {
    throw new Error(response.status);
  }

  console.log(data);
  
   
  // Gráfico de Barras
  const barCtx = document.getElementById('myBarChart').getContext('2d');


  const myBarChart = new Chart(barCtx, {
      type: 'bar',
      data: {
          labels: data.map(row => row.category),
          datasets: [{
              label: 'Quantidade',
              backgroundColor: "rgba(2,117,216,1)",
              borderColor: "rgba(2,117,216,1)",
              data: data.map(row => row.count),
          }],
      },
      options: {
          scales: {
              x: {
                  grid: {
                      display: false
                  },
                  ticks: {
                      
                      maxTicksLimit: 6
                  }
              },
              y: {
                  ticks: {
                      minTicksLimit: 6,
                      beginAtZero: true,
                      maxTicksLimit: 6
                  },
                  grid: {
                      display: true
                  }
              }
          },
          plugins: {
              legend: {
                  display: false
              }
          }
      }
  });    
});

