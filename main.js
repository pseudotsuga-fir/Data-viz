const BASE_URL = "https://zagster-service.herokuapp.com"

$(updateView)

function updateView() {
  $.getJSON(BASE_URL + "/rides/count" , updateRideCount)
}

function updateRideCount(data) {
  numberOfRides = data.count
  $("h4#rideCount").html(numberOfRides)
}
$(document).ready(function() {
const countUp = new CountUp('rideCount',0, 19777);
if (!countUp.error) {
  countUp.start();
} else {
  console.error(countUp.error);
}
})