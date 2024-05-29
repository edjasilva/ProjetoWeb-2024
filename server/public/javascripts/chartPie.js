// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

// Pie Chart Example
/*
var ctx = document.getElementById("myPieChart");
var myPieChart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: ["Centro Comercial", "Hotel", "Restaurante", "Estádio"],
    datasets: [{
      data: [12.21, 15.58, 11.25, 8.32],
      backgroundColor: ['#007bff', '#dc3545', '#ffc107', '#28a745'],
    }],
  },
});*/


document.addEventListener('DOMContentLoaded', async function() {


  const response = await fetch(`${base_url}/dashboard/data/spots-by-comCategory`, {
    headers: {"Content-Type": "application/json"},
    method: 'GET'
  })

  if(response) {
    var data = await response.json();
  } else {
    throw new Error(response.status);
  }
  console.log(data);


  const pieCtx = document.getElementById('myPieChart').getContext('2d');
              

  const myPieChart = new Chart(pieCtx, {
      type: 'pie',
      data: {
          labels:  data.map(row => row.count),
          datasets: [{
              data: data.map(row => row.category),
              backgroundColor: ['#007bff', '#dc3545', '#ffc107', '#28a745', '#17a2b8', '#6c757d'],
          }],
      },
  });
});
