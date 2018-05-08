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

      arrivalTime.setMinutes(arrivalTime.getMinutes() - ds.timeMargin);


      var request = {
          provideRouteAlternatives: true,
          origin: kristiania, //TODO: preferrably users current location
          destination: {placeId: te[0].placeID},
          travelMode: google.maps.DirectionsTravelMode[ds.TRAVELMODE],
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
        travelMode: google.maps.DirectionsTravelMode[ds.TRAVELMODE],
    };

    toggleSidebar("", "directions");
    newDirectionsRequest(request, false);
}
function placeIdDirectionReq(dest){
  var request = {
        provideRouteAlternatives: true,
        origin: kristiania, //TODO: preferrably users current location
        destination: {placeId: dest},
        travelMode: google.maps.DirectionsTravelMode[ds.TRAVELMODE],
    };
    // if campus
    if (dest == 'ChIJ3UCFx2BuQUYROgQ5yTKAm6E'
     || dest == 'ChIJRa81lmRuQUYR3l1Nit90vao'
     || dest == 'ChIJ-wIZN4huQUYR5ZhO0YexXl0' ) {
      console.log(placeIdToWeather(dest));
    }

    toggleSidebar("", "directions");
    newDirectionsRequest(request, false);
}

function customDirectionReq(){
  console.log(ds.departureLoc, ds.destinationLoc);
  var request = {
        provideRouteAlternatives: true,
        origin: ds.departureLoc, //TODO: preferrably users current location
        destination: ds.destinationLoc,
        travelMode: google.maps.DirectionsTravelMode[ds.TRAVELMODE],
  };

  toggleSidebar("", "directions");
  newDirectionsRequest(request, false);
}

function removeDirections(){
    directionsDisplay.setDirections({routes: []});
}

$(document).ready(function() {
  $(document).on("click", ".route", function(){
    // console.log($(this));
    $(this).siblings().css('height', 70);
    $(this).siblings().find('.route-icons').css('height', 22);
    $('.route-icons',this).css('height', 0);
    $(this).css('height', 210);
  });
});

function routeToHTML(route,idx){

  //step.transit.line.vehicle.icon  -> icon -> transit undefined
  var r = route.legs[0];
  console.log(r);


  const markup = `
    <div class="route" onclick="changeDirectionsIndex(${idx})">
    <div class="route-dir-meta-container">
      <div class="route-directions">
        <h3 class="route-time">${r.departure_time ? r.departure_time.value.toLocaleTimeString('nb-NO', { hour12: false, hour: '2-digit', minute:'2-digit'}) : "Total reisetid: XD"} ${ r.arrival_time ? r.arrival_time.value.toLocaleTimeString('nb-NO', { hour12: false, hour: '2-digit', minute:'2-digit'}): ''}</h3>
        <div class="route-icons">
          ${r.steps.map(step => `<img src="` + wppath + `/img/` +
          ( step.travel_mode  == "TRANSIT" ?  `${step.transit.line.vehicle.type}` : `${step.travel_mode}` )
           + `.svg" width="16px;"/>` +
          ( step.travel_mode  == "TRANSIT" ?  `<p class='transit-line'>${step.transit.line.short_name}</p>` : "" )
           + `<p class="route-part-time">${Math.round(step.duration.value / 60)}m > </p>`).join('')}
        </div>
      </div>
      <div class="route-meta">
        <p class="route-total-time">${r.duration.text}</p>
        <!--<p class="route-time-before-class">${0}</p> we wont always know if you're trying to reach a class-->
      </div>
      </div>
      <div class="route-details flexColNo"> ${r.steps.map( (step, index) => ( step.travel_mode  == "TRANSIT" ?

        // step is transit
       `<div class="route-step-transit flexRowNo">
          <div class="route-step-time-transit flexColNo">
            <p>${step.transit.departure_time.value.toLocaleTimeString('nb-NO', { hour12: false, hour: '2-digit', minute:'2-digit'})}</p>
            <p>${step.transit.arrival_time.value.toLocaleTimeString('nb-NO', { hour12: false, hour: '2-digit', minute:'2-digit'})}</p>
          </div>
          <div class="route-step-line-transit"></div>
          <div class="route-step-icons flexColNo"><img src="` + wppath + `/img/` +
          ( step.travel_mode  == "TRANSIT" ?  `${step.transit.line.vehicle.type}` : `${step.travel_mode}` )
           + `.svg" height="20px;"/></div>
          <div class="route-step-content-transit flexColNo">
            <p>${step.transit.departure_stop.name}</p>
            <div class="route-step-content-transit-line flexColNo">
              <div class="route-step-content-transit-line-info flexRowNo">
              <p class="transit-line">${step.transit.line.short_name}</p>
              <p>${step.transit.headsign}</p>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 30.7" enable-background="new 0 0 24 30.7">
                <path d="M23 18.4c-.3-.3-.8-.3-1.1 0l-9.9 9.9-9.9-9.9c-.3-.3-.8-.3-1.1 0-.3.3-.3.8 0 1.1l10.5 10.4c.1.1.3.2.5.2s.4-.1.5-.2l10.5-10.4c.3-.3.3-.8 0-1.1zM1 12.2c.3.3.8.3 1.1 0l9.9-9.9 9.9 9.9c.3.3.8.3 1.1 0 .3-.3.3-.8 0-1.1l-10.5-10.4c-.1-.1-.3-.2-.5-.2s-.4.1-.5.2l-10.5 10.4c-.3.3-.3.8 0 1.1z"/>
              </svg>
              <p>${step.transit.num_stops} stops</p>
              </div>
              <div class="route-step-content-transit-line-duration"><p>${Math.round(step.duration.value / 60)} min</p></div>
            </div>
            <p>${step.transit.arrival_stop.name}</p>
          </div>
        </div>` :

        // TODO: can use r.departure_time.value and r.arrival_time.value, but needs to know if first or last step
        // step is not transit
       `<div class="route-step flexRowNo">
          <div class="route-step-time flexColNo">
          <p style="color: orange;">10:00</p>
          </div>
          <div class="route-step-line flexColNo">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><circle cx="24" cy="24" r="24"/></svg>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><circle cx="24" cy="24" r="24"/></svg>
          </div>
          <div class="route-step-icons flexColNo"><img src="` + wppath + `/img/` +
          ( step.travel_mode  == "TRANSIT" ?  `${step.transit.line.vehicle.type}` : `${step.travel_mode}` )
           + `.svg" height="100%;"/></div>
          <div class="route-step-content">
            <div class="route-step-content-duration"><p>${Math.round(step.duration.value / 60)} min</p></div>
          </div>
        </div>` )).join('')}
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
          $('.direction-title').text("Directions to neste forelesning:");
        } else {
          $('.direction-title').text("Directions to somewhere:");// TODO: change with actual place name
        }

      /*  response.routes.forEach(function(entry) {
            newHtml += routeToHTML(entry);
        });*/
        for(var i = 0; i < response.routes.length; i++){
          //if(typeof response.routes[i].legs[0].arrival_time != "undefined"){
            newHtml+= routeToHTML(response.routes[i], i);
          //}
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
