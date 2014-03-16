var google,
	maps = google.maps;

window.onload = function () {
	'use strict';

	var map = new maps.Map( document.getElementById( 'map' ), {
		zoom: 12,
		mapTypeId: maps.MapTypeId.ROADMAP,
		center: new maps.LatLng( 55.8580, -4.2590 )
	}),
		directions = {
			service: new maps.DirectionsService(),
			renderer: new maps.DirectionsRenderer()
		};

	document.getElementById( 'routing' ).onclick = function ( event ) {
		event.preventDefault();

		directions.renderer.setMap( map );

		directions.service.route({
			origin: document.getElementById( 'start' ).value,
			destination: document.getElementById( 'end' ).value,
			travelMode: document.getElementById( 'method' ).value.toUpperCase()
		}, function ( response, status ) {
			if ( status == 'OK' ) {
				var distance = response.routes[0].legs[0].distance.value / 1000;

				directions.renderer.setDirections( response );
				document.getElementById( 'distance' ).textContent = distance;
				document.getElementById( 'footprint' ).textContent
					= kmToGCO2( distance, document.getElementById( 'method' ).value );
			}
		});
	};
};

function
kmToGCO2( distance, transport )
{
	var multiplier = 0;

	if ( transport.toLowerCase() == 'transit' ) {
		multiplier = 89;
	} else if ( transport.toLowerCase() == 'driving' ) {
		multiplier = 430 * 0.62137;
	}

	return distance * multiplier;
}
