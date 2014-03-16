 var directionsDisplay;
 var google, directionsService = new google.maps.DirectionsService();
 var map;

 function initialize()
 {
   directionsDisplay = new google.maps.DirectionsRenderer();
   var loc = new google.maps.LatLng(55.8580, -4.2590);
   var myOptions = {
	 zoom:12,
	 mapTypeId: google.maps.MapTypeId.ROADMAP,
	 center: loc
   };

   map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
   directionsDisplay.setMap(map);

   document.getElementById("select_route").onclick = function(event) {
	 event.preventDefault();
	 calcRoute();
   };
 }

function calcRoute()
 {
   var start = document.getElementById("start").value;
   var end = document.getElementById("end").value;
   var distanceInput = document.getElementById("distance");
   var footprintInput = document.getElementById("footprint");
   var methodTransport = document.getElementById("method").value;
   var request = {
	 origin:start,
	 destination:end,
	 travelMode: google.maps.DirectionsTravelMode[methodTransport]
   };

   directionsService.route(request, function(response, status) {
	 if (status == google.maps.DirectionsStatus.OK) {
	   directionsDisplay.setDirections(response);
	   distanceInput.value = response.routes[0].legs[0].distance.value / 1000;
	   if (methodTransport == "DRIVING") {
		 footprintInput.value = distanceInput.value * 430 * 0.62137;
	   } else if (methodTransport == "TRANSIT") {
	   footprintInput.value = distanceInput.value * 89;
	   } else {
		 footprintInput.value = 0;
	   }
	 }
   });
 }

 window.onload = initialize;
