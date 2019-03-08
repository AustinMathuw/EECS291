(function($) {
    "use strict"; // Start of use strict

    $(document).ready(function() {
        setCookie('MOD_AUTH_CAS_S','3cbb605155fd4dd7234195302d954755','/pun/sys/','',100);

        var settings = {
        "async": true,
        'url': "/js/data.json",
        'dataType': "json",
        "method": "GET"
        }
        
        $.ajax(settings).done(function (response) {
        console.log(response);
        onResponse(response);
        });
    });

})(jQuery); // End of use strict

function onResponse(data) {
    var tableRef = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    console.log(tableRef);
    var times = [];
    var numQueued = 0;
    var numActive = 0;
    var averageTime = 0.0;

    for(var x = 0; x < data.data.length; x++) {
        var job = data.data[x];
        var newRow = tableRef.insertRow(tableRef.rows.length);

        var name = newRow.insertCell(0);
        var username = newRow.insertCell(1);
        var account = newRow.insertCell(2);
        var walltime_used = newRow.insertCell(3);
        var queue = newRow.insertCell(4);
        var status = newRow.insertCell(5);
        var cluster_title = newRow.insertCell(6);

        name.innerHTML = job.jobname;
        username.innerHTML = job.username;
        account.innerHTML = job.account;
        walltime_used.innerHTML = job.walltime_used;
        queue.innerHTML = job.queue;

        if(job.status.indexOf("Queued") != -1) {
            numQueued++;
            status.innerHTML = "Queued";
        } else {
            numActive++;
            averageTime += moment.duration(job.walltime_used).asMilliseconds();
            times.push(moment.duration(job.walltime_used).asMilliseconds());
            status.innerHTML = "Running";
        }
        cluster_title.innerHTML = job.cluster_title;
    };

    
    $('#dataTable').DataTable();

    averageTime = averageTime/numActive;

    console.log(times);
    console.log(numQueued);
    console.log(numActive);
    console.log(moment.utc(averageTime).format("HH:mm:ss"));

    render_chart(numQueued, numActive)

    var loadingDiv = document.getElementById("loading_div");
    var contentDiv = document.getElementById("content_div");
    document.getElementById("queued-jobs-num").innerHTML = numQueued;
    document.getElementById("running-jobs-num").innerHTML = numActive;
    document.getElementById("average-run-time").innerHTML = moment.utc(averageTime).format("HH:mm:ss");

    loadingDiv.style = "display: none";
    contentDiv.style = "display: block";
}

// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

// Area Chart Example
var ctx = document.getElementById("myAreaChart");
var myLineChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [{
      label: "Earnings",
      lineTension: 0.3,
      backgroundColor: "rgba(78, 115, 223, 0.05)",
      borderColor: "rgba(78, 115, 223, 1)",
      pointRadius: 3,
      pointBackgroundColor: "rgba(78, 115, 223, 1)",
      pointBorderColor: "rgba(78, 115, 223, 1)",
      pointHoverRadius: 3,
      pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
      pointHoverBorderColor: "rgba(78, 115, 223, 1)",
      pointHitRadius: 10,
      pointBorderWidth: 2,
      data: [0, 10000, 5000, 15000, 10000, 20000, 15000, 25000, 20000, 30000, 25000, 40000],
    }],
  },
  options: {
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 25,
        top: 25,
        bottom: 0
      }
    },
    scales: {
      xAxes: [{
        time: {
          unit: 'date'
        },
        gridLines: {
          display: false,
          drawBorder: false
        },
        ticks: {
          maxTicksLimit: 7
        }
      }],
      yAxes: [{
        ticks: {
          maxTicksLimit: 5,
          padding: 10,
          // Include a dollar sign in the ticks
          callback: function(value, index, values) {
            return '$' + number_format(value);
          }
        },
        gridLines: {
          color: "rgb(234, 236, 244)",
          zeroLineColor: "rgb(234, 236, 244)",
          drawBorder: false,
          borderDash: [2],
          zeroLineBorderDash: [2]
        }
      }],
    },
    legend: {
      display: false
    },
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      titleMarginBottom: 10,
      titleFontColor: '#6e707e',
      titleFontSize: 14,
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      intersect: false,
      mode: 'index',
      caretPadding: 10,
      callbacks: {
        label: function(tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          return datasetLabel + ': $' + number_format(tooltipItem.yLabel);
        }
      }
    }
  }
});

// Pie Chart Example
function render_chart(queued, active) {
    var ctx = document.getElementById("myPieChart");
    new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ["Queued", "Running"],
        datasets: [{
        data: [queued, active],
        backgroundColor: ['#4e73df', '#1cc88a'],
        hoverBackgroundColor: ['#2e59d9', '#17a673'],
        hoverBorderColor: "rgba(234, 236, 244, 1)",
        }],
    },
    options: {
        maintainAspectRatio: false,
        tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        caretPadding: 10,
        },
        legend: {
        display: false
        },
        cutoutPercentage: 80,
    },
    });
}
