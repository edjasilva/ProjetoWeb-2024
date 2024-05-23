const data = [3, 4, 2, 3, 2, 4, 5, 1, 2, 1, 2, 1, 3, 4, 5, 4, 5];
    const bins = [0, 1, 2, 3, 4, 5]; // Intervalos dos bins

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