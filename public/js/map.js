
var map;
var marker;

function initialize() {

	var mapOptions = {
		center: new google.maps.LatLng(40.6,-2.3),
		zoom: 7,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

 var address1 = document.getElementById("address").value;

	map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
searchAddress(address1);
console.log(address1);
}


google.maps.event.addDomListener(window, 'load', initialize);

function searchAddress(address1) {

	var addressInput = address1;

// document.getElementById('address').value

	var geocoder = new google.maps.Geocoder();

	geocoder.geocode({address: addressInput}, function(results, status) {

		if (status == google.maps.GeocoderStatus.OK) {

      var myResult = results[0].geometry.location;

      createMarker(myResult);

      map.setCenter(myResult);

      map.setZoom(17);
		}
	});

}

function createMarker(latlng) {

  if(marker != undefined && marker != ''){
    marker.setMap(null);
    marker = '';
  }

  marker = new google.maps.Marker({
    map: map,
    position: latlng
  });
}
