Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';


document.addEventListener('DOMContentLoaded', async function() {


  const response = await fetch(`${base_url}/dashboard/data/spots-by-rating`, {
    headers: {"Content-Type": "application/json"},
    method: 'GET'
  })

  if(response) {
    var data = await response.json();
  } else {
    throw new Error(response.status);
  }


  console.log(data);
  const bins = [0, 1, 2, 3, 4, 5]; // Intervalos dos bins

        function calculateBinFrequencies(data, bins) {
            const frequencies = new Array(bins.length - 1).fill(0);
            data.forEach(row => {
                console.log(row)
                for (let i = 0; i < bins.length - 1 ; i++) {
                    if (row.rating  >= bins[i] && row.rating <= bins[i + 1]) {
                        frequencies[i]++;
                        break;
                    }
                }
            });
            return frequencies;
        }
      

 const frequencies = calculateBinFrequencies(data, bins);

 const histogramCtx = document.getElementById('myHistogram').getContext('2d');
 new Chart(histogramCtx, {
     type: 'bar',
     data: {
         labels: bins.slice(0, -1).map((bin, index) => `${bin}-${bins[index + 1]}`),
         datasets: [{
             label: 'Museus',
             data: frequencies,
             backgroundColor: 'rgba(2, 117, 216, 0.7)',
             borderColor: 'rgba(2, 117, 216, 1)',
             borderWidth: 1,
             barPercentage: 1,
             categoryPercentage: 1
         }]
     },
     options: {
         scales: {
             xAxes: {
                 grid: [{
                  scaleLabel:{
                    display: true,
                    labelString : 'Museus'
                  },
                 ticks: {
                     maxTicksLimit: bins.length
                 },
                }],
              
             yAxes: [{
              scaleLabel:{
                display: true,
                    labelString : 'Museus'
              },
                 ticks: {
                     beginAtZero: true
                 },
                 gridLines: {
                     display: true
                 }
             }]
         },
     
             legend: {
                 display: true
             }
         }
     }
 });
      
      
      })

