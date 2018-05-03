var directionsDisplay;
var directionsService;
var autocompleteDep;
var autocompleteDest;
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


  var inputDep = document.getElementById('departure');
  var inputDest = document.getElementById('destination');

  autocompleteDep = new google.maps.places.Autocomplete(inputDep);
  autocompleteDest = new google.maps.places.Autocomplete(inputDest);

  autocompleteDep.addListener('place_changed',function(){
    let place = autocompleteDep.getPlace();
    changeDirectionsSettings('departureLoc', {placeId: place.place_id});
  });

  autocompleteDest.addListener('place_changed',function(){
    let place = autocompleteDest.getPlace();
    console.log(place);
    changeDirectionsSettings('destinationLoc', {placeId: place.place_id});
  });

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

          toggleSidebar("", "directions");
          newDirectionsRequest(request, true);
      }
    }
    xmlhttp.open("GET", wppath + "/Timeedit.php", true);
    xmlhttp.send();
  }
    function destinationDirectionReq(dest){
        var request = {
              provideRouteAlternatives: true,
              origin: kristiania, //TODO: preferrably users current location
              destination: dest,
              travelMode: google.maps.DirectionsTravelMode.TRANSIT,
          };

          toggleSidebar("", "directions");
          newDirectionsRequest(request, false);
    }

    function customDirectionReq(){
        console.log(ds.departureLoc, ds.destinationLoc);
        var request = {
              provideRouteAlternatives: true,
              origin: ds.departureLoc, //TODO: preferrably users current location
              destination: ds.destinationLoc,
              travelMode: google.maps.DirectionsTravelMode.TRANSIT,
          };

          toggleSidebar("", "directions");
          newDirectionsRequest(request, false);
    }

    function removeDirections(){
        directionsDisplay.setDirections({routes: []});
    }

    function routeToHTML(route,idx){

        //step.transit.line.vehicle.icon  -> icon -> transit undefined
        var r = route.legs[0];
        // console.log(r);
        // console.log(r.steps[1].travel_mode);

        // TODO: change step.travel_mode to if transit -> get transit vehicle type

        const markup = `
              <div class="route" onclick="changeDirectionsIndex(${idx})">
                <div class="route-directions">
                  <h3 class="route-time">${r.departure_time.value.toLocaleTimeString('nb-NO', { hour12: false, hour: '2-digit', minute:'2-digit'})} - ${r.arrival_time.value.toLocaleTimeString('nb-NO', { hour12: false, hour: '2-digit', minute:'2-digit'})}</h3>
                  <div class="route-icons">
                    ${r.steps.map(step => `<img src="` + wppath + `/img/${step.travel_mode}.svg" width="16px;"/>` +
                    ( step.travel_mode  == "TRANSIT" ?  `<p class='transit-line'>${step.transit.line.short_name}</p>` : "" )
                     + `<p class="route-part-time">${Math.round(step.duration.value / 60)}m > </p>`).join('')}

                  </div>
                </div>
                <div class="route-meta">
                  <p class="route-total-time">${r.duration.text}</p>
                  <!--<p class="route-time-before-class">${0}</p> we wont always know if you're trying to reach a class-->
                </div>
                </div>
              `;
          return markup;
      }

  function changeDirectionsIndex(idx){
   console.log(idx);
   directionsDisplay.setRouteIndex(idx);

 }


  function newDirectionsRequest(request, useTimeEdit){

      var timeEditInUse = useTimeEdit;

      directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        console.log(response);
            var routes = document.getElementById("routes");
            var newHtml = "";
            if (timeEditInUse) {
              var newHtml = "<h1 class='direction-title'>Directions to neste forelesning:</h1>";
            } else {
              var newHtml = "<h1 class='direction-title'>Directions to somewhere:</h1>";
            }

          /*  response.routes.forEach(function(entry) {
                newHtml += routeToHTML(entry);
            });*/
            for(var i = 0; i < response.routes.length; i++){
              newHtml+= routeToHTML(response.routes[i], i);
            }
            routes.innerHTML = newHtml;
            directionsDisplay.setRouteIndex(0);
            directionsDisplay.setDirections(response);
      }else {
          directionsDisplay.setMap(null);
          directionsDisplay.setPanel(null);
      }
    });
  }
