const data = [12, 19, 3, 5, 2, 3, 8, 15, 20, 10, 7, 6, 8, 5, 18, 13, 4, 1, 9, 11];
    const bins = [0, 5, 10, 15, 20, 25]; // Intervalos dos bins

    // Função para calcular a frequência de cada bin
    function calculateBinFrequencies(data, bins) {
      const frequencies = new Array(bins.length - 1).fill(0);
      data.forEach(value => {
        for (let i = 0; i < bins.length - 1; i++) {
          if (value >= bins[i] && value < bins[i + 1]) {
            frequencies[i]++;
            break;
          }
        }
      });
      return frequencies;
    }

    const frequencies = calculateBinFrequencies(data, bins);

    var ctx = document.getElementById('myHistogram').getContext('2d');
    var myHistogram = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: bins.slice(0, -1).map((bin, index) => `${bin}-${bins[index + 1]}`),
        datasets: [{
          label: 'Frequency',
          data: frequencies,
          backgroundColor: 'rgba(2, 117, 216, 0.7)',
          borderColor: 'rgba(2, 117, 216, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          xAxes: [{
            gridLines: {
              display: false
            },
            ticks: {
              maxTicksLimit: bins.length
            },
            barPercentage: 1.0,
            categoryPercentage: 1.0
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: true
            }
          }]
        },
        legend: {
          display: false
        }
      }
    });