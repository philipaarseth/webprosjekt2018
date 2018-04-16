<?php /* Template name: Andreas Testing */ ?>

<?php echo "andreas testing";


?>
<!DOCTYPE html>
<html>
  <head>
    <style>
       #map {
        height: 400px;
        width: 100%;
       }
    </style>
  </head>
  <body>
    <h3>Directions service</h3>
    <div id="map"></div>
    <script>
      function initMap() {
        var fjerdingen = {lat: 59.9162093, lng: 10.7599091};
        var kristiania = {lat: 59.9112117, lng: 10.7426654};

        var map = new google.maps.Map(document.getElementById('map'), {
          center: fjerdingen,
          zoom: 7
        });

        var directionsDisplay = new google.maps.DirectionsRenderer({
          map: map
        });

        // Set destination, origin and travel mode.
        var request = {
          destination: kristiania,
          origin: fjerdingen,
          travelMode: 'TRANSIT'
        };

        // Pass the directions request to the directions service.
        var directionsService = new google.maps.DirectionsService();
        directionsService.route(request, function(response, status) {
          if (status == 'OK') {
            // Display the route on the map.
            directionsDisplay.setDirections(response);
            consol.log(status, response)
          }
        });
      }
    </script>
    <script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAnmyT7iUyNklKrx2LFCMVQMxw8PQDm5B4&callback=initMap">
    </script>
  </body>
</html>
