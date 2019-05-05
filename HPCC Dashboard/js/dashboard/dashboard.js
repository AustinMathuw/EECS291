(function($) {
    "use strict"; // Start of use strict

    $(document).ready(function() {
        var settings = {
        "async": true,
        'url': "/js/data.json",
        //'url': 'https://ondemand.case.edu/pun/sys/activejobs/jobs.json?jobcluster=all&jobfilter=all',
        'dataType': "json",
        "method": "GET"
        }
        
        $.ajax(settings).done(function (response) {
          //When the call is done, build the visuals
          onResponse(response);
        });
    });

})(jQuery); // End of use strict

function onResponse(data) {
    // Get the datatable html
    var tableRef = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    
    var times = [];
    var numQueued = 0;
    var numActive = 0;
    var averageTime = 0.0;

    // Parse through each job
    for(var x = 0; x < data.data.length; x++) {
        var job = data.data[x];
        var newRow = tableRef.insertRow(tableRef.rows.length);

        // Build the job row in our table
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

        // Check to see if the job is queued. If so, say Queued in the status, or say Running if job is running
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
    
    // Build the datatable
    $('#dataTable').DataTable();

    // Determine the average time
    averageTime = averageTime/numActive;

    // Build comparison pie between queued and running jobs
    render_chart(numQueued, numActive)

    //Fill the data sections of the document
    document.getElementById("queued-jobs-num").innerHTML = numQueued;
    document.getElementById("running-jobs-num").innerHTML = numActive;
    document.getElementById("average-run-time").innerHTML = moment.utc(averageTime).format("HH:mm:ss");

    var loadingDiv = document.getElementById("loading_div");
    var contentDiv = document.getElementById("content_div");

    //Turn off loading screen
    loadingDiv.style = "display: none";
    //Show the Dashboard
    contentDiv.style = "display: block";
}

// Show comparison pie between queued and running jobs.
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

// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

