const BASE_URL = "https://zagster-service.herokuapp.com"

$(updateView)

function updateView() {
  $.getJSON(BASE_URL + "/rides/count" , updateRideCount)
}

function updateRideCount(data) {
  numberOfRides = data.count
  $("h4#rideCount").html(numberOfRides)
}