const BASE_URL = "https://zagster-service.herokuapp.com"

$(updateView)

var osu_data = []
var om_data = []
var dp_data = []

function updateView() {
  $.when ($.getJSON(BASE_URL + "/rides/count/osu_cascades/per_month", m_osu),
  $.getJSON(BASE_URL + "/rides/count/old_mill/per_month", m_om),
  $.getJSON(BASE_URL + "/rides/count/drake_park/per_month", m_dp)
    ).then(updateChart);
}
function m_osu(data) {
  var OSUdata2018 = data[2018]
  iterate(osu_data,OSUdata2018)
  console.log(osu_data)
  //console.log(OSUdata2018[11][12])
  //Oh my god I can't believe that worked
}
function m_om(data) {
  var OMdata2018 = data[2018]
  iterate(om_data,OMdata2018)
  console.log(om_data)
}
function m_dp(data) {
  var DPdata2018 = data[2018]
  dp_data.push(0)
  iteratedp(dp_data,DPdata2018)
  console.log(dp_data)
}
//This function adds each query result(LocRaw) into an array(LocArray)
function iterate(LocArray,LocRaw){
let i=0;
do {
  LocArray.push(LocRaw[i][i+1])
  i += 1;
} while (i < 10);
}
//This function does literally the same thing as the one above, but it adds a two to the second part of the query because the Drake Park data refused it any other way.
function iteratedp(LocArray,LocRaw){
  let i=0;
  do {
    LocArray.push(LocRaw[i][i+2])
    i += 1;
  } while (i < 9);
  }

function updateChart() {
  $(document).ready(function() {
    const countUp = new CountUp('rideCount',0, 192777);
    if (!countUp.error) {
      countUp.start();
    } else {
      console.error(countUp.error);
    }
    })
  $("#mid").fadeIn(1500,"swing");
  $("#rideCount").fadeIn(1500,"swing");
var ctx = document.getElementById('canvas').getContext('2d');
var chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October'],
      datasets: [{
          label: 'OSU Cascades',
          backgroundColor: 'rgb(204, 228, 255,0.2)' ,
          borderColor: 'rgb(204, 228, 255)',
          data: osu_data
      },
      {
        label: 'Old Mill',
        backgroundColor: 'rgb(204, 255, 84,0.2)',
        pointBackgroundColor:'rgb(204, 255, 84)',
        borderColor: 'rgb(204, 255, 84)',
        data: om_data
      },
      {
        label: 'Drake Park ',
        backgroundColor: 'rgb(201, 180, 247,0.2)',
        borderColor: 'rgb(201, 180, 247)',
        data: dp_data
        
      },
      
    ]
    },

    // Configuration options go here
    options: {
      animation: {
        duration: 2500,
        easing: 'easeInOutExpo',
      },
      tooltips: {
        mode: 'index',
      },
      hover: {
        mode: 'index'
      },
      scales: {
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Month'
          }
        }],
        yAxes: [{
          stacked: false,
          scaleLabel: {
            display: true,
            labelString: 'Total Rides'
          }
        }]
      }
    }
});
}