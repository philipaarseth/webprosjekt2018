var directionsDisplay;
var directionsService;
var kristiania = {lat: 59.9110873, lng: 10.7437619};
var fjerdingen = {placeId: "ChIJ3UCFx2BuQUYROgQ5yTKAm6E"}

function directionsInitFallback(map){
  var map = new google.maps.Map(document.getElementById('map'), {
    center: kristiania,
    zoom: 7
  });

  directionsInit(map);
}

function directionsInit(map) {

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
  function teDirectionReq(){ //teDirectionReq
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
      if(this.readyState == 4 && this.status == 200){
          var te = JSON.parse(this.responseText);

          var date = te[0].startdate.split(".");
          var time = te[0].starttime.split(":"); //prepare date and time from timeedit for use in arrivalTimeDate

          //construct arrivalTime Date object
          var arrivalTime = new Date(date[2], date[1], date[0], time[0], time[1], 0, 0);

          //adjust arrivalTime to account for user's set timeMargin
         
          //arrivalTime.setMinutes(arrivalTime.getMinutes() - ds.timeMargin);


          var request = {
              provideRouteAlternatives: true,
              origin: kristiania, //TODO: preferrably users current location
              destination: {placeId: te[0].placeID},
              travelMode: google.maps.DirectionsTravelMode.TRANSIT,
              transitOptions: {
                arrivalTime: arrivalTime, //new Date("April 17, 2018 04:13:00") - test
              },
          };


          newDirectionsRequest(request);
      }
    }
    xmlhttp.open("GET", wppath + "/Timeedit.php", true);
    xmlhttp.send();
  } 
    function campusDirectionReq(dest){
        var request = {
              provideRouteAlternatives: true,
              origin: kristiania, //TODO: preferrably users current location
              destination: dest,
              travelMode: google.maps.DirectionsTravelMode.TRANSIT, 
          };


          newDirectionsRequest(request);
    }
  function newDirectionsRequest(request){


      directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        console.log(response);
          directionsDisplay.setDirections(response);
          //directionsDisplay.setMap(map);
          //renderer.setPanel(panel);
          // renderDirectionsPolylines(response);
          // console.log(renderer.getDirections());
      }else {
          directionsDisplay.setMap(null);
          directionsDisplay.setPanel(null);
      }
    });
  }
