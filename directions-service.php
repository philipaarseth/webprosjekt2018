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
        <script>var wppath =  "<?php echo get_theme_file_uri(); ?>"</script>


  </head>
  <body>
      <button onclick="myFunction()">Click me</button><br>
    <h3>Directions service</h3>
    <div id="map"></div>
    <script>
        
      var directionsDisplay;
        
     var directionsService;
        var kristiania = {lat: 59.9110873, lng: 10.7437619};
        
      function initMap() {
        var fjerdingen = {placeId: "ChIJ3UCFx2BuQUYROgQ5yTKAm6E"}
        

        var map = new google.maps.Map(document.getElementById('map'), {
          center: kristiania,
          zoom: 7
        });
          
          directionsDisplay = new google.maps.DirectionsRenderer({
          map: map
        });
          directionsService = new google.maps.DirectionsService();
        

        // Set destination, origin and travel mode.
        /*var request = {
          destination: kristiania,
          origin: fjerdingen,
          travelMode: 'TRANSIT'
        };

        // Pass the directions request to the directions service.
       
        directionsService.route(request, function(response, status) {
          if (status == 'OK') {
            // Display the route on the map.
            directionsDisplay.setDirections(response);
            console.log(response);
          }
        });*/
      }
        function myFunction(){
           
            
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function(){
                
              if(this.readyState == 4 && this.status == 200){
                 
                  var te = JSON.parse(this.responseText);
                  console.log(te[0].placeID);
                  newDirectionsRequest(kristiania,{placeId: te[0].placeID});
              }
                
            }
            xmlhttp.open("GET", wppath + "/Timeedit.php", true);
            xmlhttp.send();
            
            
        }
        
        function newDirectionsRequest(origin, dest){
            
            var request = {
                origin: origin,
                destination: dest,
                travelMode: google.maps.DirectionsTravelMode.TRANSIT
              };

  
          directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
              directionsDisplay.setDirections(response);
              //directionsDisplay.setMap(map);
              //renderer.setPanel(panel);
             // renderDirectionsPolylines(response);
             // console.log(renderer.getDirections());
            } else {
              directionsDisplay.setMap(null);
              directionsDisplay.setPanel(null);
            }

          });
        }
    </script>
    <script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAcEPRn3WzY8AXDvnFP_WIgVTfbXodNhU4&callback=initMap">
    </script>
  </body>
</html>
