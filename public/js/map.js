/*
 * Learning Google Maps Geocoding by example
 * Miguel Marnoto
 * 2015 - en.marnoto.com
 *
 */

var map;
var marker;

function initMap() {

  const mapOptions = {
    center: new google.maps.LatLng(40.380898, -3.684059),
    zoom: 10,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  searchAddress();
  map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

}


function searchAddress() {

  let addressInput = document.getElementById('address-input').innerHTML;
  let town = document.getElementById('town-input').innerHTML;
  let address = addressInput.concat(' , ').concat(town);

  let geocoder = new google.maps.Geocoder();

  geocoder.geocode({
    address
  }, function(results, status) {

    if (status == google.maps.GeocoderStatus.OK) {

      var myResult = results[0].geometry.location;

      createMarker(myResult);

      map.setCenter(myResult);

      map.setZoom(17);
    }
  });

}

function createMarker(latlng) {

  if (marker != undefined && marker != '') {
    marker.setMap(null);
    marker = '';
  }

  marker = new google.maps.Marker({map: map, position: latlng});
}
