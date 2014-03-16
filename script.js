var directionsDisplay, google, map,
	directionsService = new google.maps.DirectionsService();

function
initialize()
{
	var loc = new google.maps.LatLng( 55.8580, -4.2590 ),
		myOptions = {
			zoom:12,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			center: loc
		};

	directionsDisplay = new google.maps.DirectionsRenderer();
	map = new google.maps.Map( document.getElementById( 'map' ), myOptions );
	directionsDisplay.setMap( map );

	document.getElementById( 'routing' ).onclick = function ( event ) {
		event.preventDefault();
		calcRoute();
	};
}

function
calcRoute()
{
	var start = document.getElementById( 'start' ).value,
		end = document.getElementById( 'end' ).value,
		distanceInput = document.getElementById( 'distance' ),
		footprintInput = document.getElementById( 'footprint' ),
		methodTransport = document.getElementById( 'method' ).value,
		request = {
			origin: start,
			destination: end,
			travelMode: google.maps.DirectionsTravelMode[methodTransport]
		};

	directionsService.route( request, function ( response, status ) {
		if ( status == google.maps.DirectionsStatus.OK ) {
			directionsDisplay.setDirections( response );
			distanceInput.value = response.routes[0].legs[0].distance.value / 1000;
			if ( methodTransport == 'DRIVING' ) {
				footprintInput.value = distanceInput.value * 430 * 0.62137;
			} else if ( methodTransport == 'TRANSIT' ) {
				footprintInput.value = distanceInput.value * 89;
			} else {
				footprintInput.value = 0;
			}
		}
	});
}

window.onload = initialize;
