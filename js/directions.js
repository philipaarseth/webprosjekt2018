var directionsDisplay;
var directionsService;
var autocompleteDep;
var autocompleteDest;
var kristiania = {lat: 59.9110873, lng: 10.7437619};
var fjerdingen = {placeId: "ChIJ3UCFx2BuQUYROgQ5yTKAm6E"}
var inputDep;
var inputAltDep;
var inputDest;
var currentPoiName = "";

var currentLocation;
if(isserver){
  navigator.geolocation.getCurrentPosition(function(position) {
     currentLocation = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
  });
  } else {
  currentLocation = kristiania;
}


var prevDirReq = {request:'',};

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

 inputDep = document.getElementById('departure');
 inputAltDep = document.getElementById('alternativeDeparture');
 inputDest = document.getElementById('destination');
 
  var defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(59.911491, 10.757933),
      new google.maps.LatLng(59.924545, 10.768063));
  var options = {
      bounds: defaultBounds,
      types: ['establishment']
  };
  autocompleteDep = new google.maps.places.Autocomplete(inputDep,options);
  autocompleteAltDep = new google.maps.places.Autocomplete(inputAltDep, options);
  autocompleteDest = new google.maps.places.Autocomplete(inputDest, options);


  autocompleteDep.addListener('place_changed',function(){
    let place = autocompleteDep.getPlace();
  //  if(place.place_id != null) var x = 2;
    changeDirectionsSettings('departureLoc', {placeId: place.place_id});
  });

  autocompleteDest.addListener('place_changed',function(){
    let place = autocompleteDest.getPlace();
    changeDirectionsSettings('destinationLoc', {placeId: place.place_id});
  });
  autocompleteAltDep.addListener('place_changed',function(){
    let place = autocompleteAltDep.getPlace();
    changeDirectionsSettings('altDepartureLoc', {placeId: place.place_id});
  });
  /*google.maps.event.addDomListener(
    document.getElementById("pac-input"), 'blur', function() {
  if (jQuery('.pac-item:hover').length === 0 ) {
    google.maps.event.trigger(this, 'focus', {});
    google.maps.event.trigger(this, 'keydown', {
        keyCode: 13
    });
  }
  });*/
  /*  google.maps.event.addDomListener(document.getElementById("departure"), 'blur', function() {
        if (jQuery('#destination:hover').length === 0 ) {
          google.maps.event.trigger(this, 'focus', {});
          google.maps.event.trigger(this, 'keydown', {
              keyCode: 13
          });
        }
      });*/
}

function teDirectionReq(){ //teDirectionReq
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = async function(){
    if(this.readyState == 4 && this.status == 200){
      var te = JSON.parse(this.responseText);

      var date = te[0].startdate.split(".");
      var time = te[0].starttime.split(":"); //prepare date and time from timeedit for use in arrivalTimeDat
      //construct arrivalTime Date object
      var arrivalTime = new Date(date[2], date[1] - 1, date[0], time[0], time[1], 0, 0);

      //adjust arrivalTime to account for user's set timeMargin

      arrivalTime.setMinutes(arrivalTime.getMinutes() - ds.timeMargin);

      yrtime =  `${date[2]}-${date[1]}-${date[0]}T${time[0]}:00:00Z`;
      var request = {
          provideRouteAlternatives: true,
          origin: currentLocation, //TODO: preferrably users current location
          destination: {placeId: te[0].placeID},
          travelMode: google.maps.DirectionsTravelMode[ds.TRAVELMODE],
          transitOptions: {
            arrivalTime: arrivalTime, //new Date("April 17, 2018 04:13:00") - test
          },
      };
      var teinfo = te[0];
      teinfo.yrTime = yrtime;

      newDirectionsRequest(request, true, true, teinfo);
    }
  }
  xmlhttp.open("GET", wppath + "/Timeedit.php", true);
  xmlhttp.send();
}

function directionsReqNewDep(){
  //  console.log("redo request with new departure loc: " + ds.altDepartureLoc);
  var req = prevDirReq.request;
  req.origin = ds.altDepartureLoc;
  newDirectionsRequest(req, false, prevDirReq.timeEditInUse, prevDirReq.teinfo);
}

function destinationDirectionReq(dest){
  var request = {
        provideRouteAlternatives: true,
        origin: currentLocation, //TODO: preferrably users current location
        destination: dest,
        travelMode: google.maps.DirectionsTravelMode[ds.TRAVELMODE],
    };
    //"cache" request til samme destination, bør gå på tid
    if(JSON.stringify(dest) === JSON.stringify(prevDirReq.request.destination)){
      directionsDisplay.setRouteIndex(0);
      var campusNavn = getPlaceIdOrCampus(dest.placeId);
      if (campusNavn && prevDirReq.timeEditInUse) {
        toggleSidebar(false, true, false, campusNavn, true);
      }
    }else{
      newDirectionsRequest(request, true, false);
    }
    service.getDetails(dest, function(result, status) {
         if (status == google.maps.places.PlacesServiceStatus.OK) {
           console.log(result.photos[0].getUrl({maxHeight: 400}));
         }else{
             console.log(status);
         }
       });
}

async function placeIdDirectionReq(dest){
  var request = {
        provideRouteAlternatives: true,
        origin: currentLocation, //TODO: preferrably users current location
        destination: {placeId: dest},
        travelMode: google.maps.DirectionsTravelMode[ds.TRAVELMODE],
    };
    newDirectionsRequest(request, true, false);
}

function customDirectionReq(){
  var request = {
        provideRouteAlternatives: true,
        origin: ds.departureLoc, //TODO: preferrably users current location
        destination: ds.destinationLoc,
        travelMode: google.maps.DirectionsTravelMode[ds.TRAVELMODE],
  };
  newDirectionsRequest(request, false, false);
}

function newDirectionsRequest(request, departureLocIsCurrentPos, timeEditInUse, teinfo){
  // console.log(teinfo);
  directionsService.route(request, function(response, status) {
  if (status == google.maps.DirectionsStatus.OK) {
    directionsSuccess(response, request, departureLocIsCurrentPos, timeEditInUse, teinfo);
    collapseControls();
    inputDep.classList.remove("input-error");
    inputDest.classList.remove("input-error");
  }else {
     if(response.geocoded_waypoints[0].geocoder_status === "ZERO_RESULTS" && response.geocoded_waypoints[1].geocoder_status === "ZERO_RESULTS"){
          inputDep.value = "";
          inputDest.value = "";
          inputDep.classList.add("input-error");
          inputDest.classList.add("input-error");
          showNotification('Stedene du har skrevet inn er ikke gyldig, vennligst prøv igjen', 0, 5000, 'red');
      }
     else if(response.geocoded_waypoints[0].geocoder_status === "ZERO_RESULTS"){
          inputDep.value = "";
          inputDep.classList.add("input-error");
          inputDest.classList.remove("input-error");
          showNotification('Det stedet du ønsker å reise fra er ikke gyldig, vennligst prøv igjen.', 0, 5000, 'red');
      }
      else if(response.geocoded_waypoints[1].geocoder_status === "ZERO_RESULTS"){
          inputDest.value = "";
          inputDest.classList.add("input-error");
          inputDep.classList.remove("input-error");
          showNotification('Det stedet du ønsker å reise til er ikke gyldig, vennligst prøv igjen.', 0, 5000, 'red');
      }

  //TODO:  //vis nytt søkefelt med feilmelding
      //directionsDisplay.setMap(null);
      //directionsDisplay.setPanel(null);
    }
  });
}

async function directionsSuccess(response, request, departureLocIsCurrentPos, timeEditInUse, teinfo){

      prevDirReq = {
        request: request,
        departureLocIsCurrentPos: departureLocIsCurrentPos,
        timeEditInUse: timeEditInUse,
        teinfo: teinfo,
      }

      if(departureLocIsCurrentPos){
        //console.log("SHOW 'NOT FROM HERE' ");
        // $('.tab-right-collapsed').trigger("click");
        //$('.last-btn-container button:nth-child(2)').click();
      }
      //change weather to the date and time of next lecture
      if(timeEditInUse){
        var weather = await placeIdToWeather(request.destination.placeId, teinfo.yrTime);
        changeWeather(getPlaceIdOrCampus(request.destination.placeId), weather[0]["@attributes"].value, weather[1]["@attributes"].id);
        // console.log(teinfo);
        changeLectureInCampus(getPlaceIdOrCampus(request.destination.placeId), teinfo.name, teinfo.type, teinfo.room, teinfo.startdate, teinfo.starttime, teinfo.endtime);
        weatherDataIs = getPlaceIdOrCampus(request.destination.placeId);
      }
      //toggle sidebar
      var campusNavn = getPlaceIdOrCampus(request.destination.placeId);
      if (campusNavn && timeEditInUse) {
        toggleSidebar(false, true, false, campusNavn, true);
      } else if(campusNavn){
        toggleSidebar(false, true, false, campusNavn);
      }else{
        toggleSidebar(false, true);
      }

      //generate sidebar route html
      var routes = document.getElementById("routes");
      var newHtml = "";
      var teStartDate = ( timeEditInUse ? teinfo.startdate : "");

      for(var i = 0; i < 3/*response.routes.length*/; i++){
          newHtml+= routeToHTML(response.request.travelMode, response.routes[i], i, teStartDate );
      }
      routes.innerHTML = newHtml;
      directionsDisplay.setRouteIndex(0);
      directionsDisplay.setDirections(response);

      var destinationName1 = request.destination.placeId;
      var destinationName = getPlaceIdOrCampus(request.destination.placeId);

      if (destinationName == false) {
        destinationName = currentPoiName;
      }


      //set title for routes
      if (timeEditInUse) {
        $('.direction-title').text("Directions for next lecture:");
      } else {
        // if campus
        if(destinationName)
          $('.direction-title').text("Directions to " + destinationName.charAt(0).toUpperCase()  + destinationName.substr(1) +":");// TODO: change with actual place name
      }

      //change sidebar tab to directions
      $('.campus-content-toggle-container').children().removeClass('active');
      $('.campus-content-toggle-container button:nth-child(2)').addClass('active');
      // auto enable index 0
      transitOpen($('#routeIndex0').get());

}

function changeDirectionsIndex(idx){
  directionsDisplay.setRouteIndex(idx);
}

function removeDirections(){
    directionsDisplay.setRouteIndex(-1);
}

$(document).ready(function() {
  $(document).on("click", ".route-transit", function(){
    transitOpen($(this));
  });
  $(document).on("click", ".route-walk-bic", function(){
    walkOrBicOpen($(this));
  });
});

function transitOpen(thisObj) {
  $(thisObj).siblings().css('height', 70);
  $(thisObj).siblings().find('.route-icons').css('height', 22);

  $('.route-icons',thisObj).css('height', 0);
  $(thisObj).css('height', 250);
}
function walkOrBicOpen(thisObj) {
  $(this).siblings().css('background-color', '#f3f3f3');
  $(this).css('background-color', '#eaeaea');
}

function routeToHTML(travelMode, route, idx, teDate){

  //step.transit.line.vehicle.icon  -> icon -> transit undefined
  var r = route.legs[0];
  //console.log(r);
  var date = teDate.split(".");
  var arrivalTime = new Date(date[2], date[1] - 1, date[0]);

  var weekDay = (teDate ? arrivalTime.toLocaleDateString('nb-NO', { weekday: 'long'}) : ''); //TODO: fikse, r.departure_time funker ikke med sykkel/gå//r.departure_time.value.toLocaleDateString('nb-NO', { weekday: 'long'});
  var weekDay = weekDay.charAt(0).toUpperCase()  + weekDay.substr(1);
  //heller se om r.departure_time eksisterer, enn å sjekke travelmode == transit
  const markup =
    ( r.departure_time ?  `
  <div id="routeIndex${idx}" class="route route-transit" onclick="changeDirectionsIndex(${idx})">
    <div class="route-dir-meta-container">
      <div class="route-directions">
        <h3 class="route-time">` +
        ( weekDay ?  `${weekDay}` : `` )
         + ` ${r.departure_time ? r.departure_time.value.toLocaleTimeString('nb-NO', { hour12: false, hour: '2-digit', minute:'2-digit'}) : ""} - ${ r.arrival_time ? r.arrival_time.value.toLocaleTimeString('nb-NO', { hour12: false, hour: '2-digit', minute:'2-digit'}) : ''}</h3>
        <div class="route-icons flexRowNo">
          ${r.steps.map(step => `<img src="` + wppath + `/img/` +
          ( step.travel_mode  == "TRANSIT" ?  `${step.transit.line.vehicle.type}` : `${step.travel_mode}` )
           + `.svg" width="16px;"/>` +
          ( step.travel_mode  == "TRANSIT" ?  `<p class='transit-line'>${step.transit.line.short_name}</p>` : "" )
           + `<p class="route-part-time">${Math.round(step.duration.value / 60)}m > </p>`).join('')}
        </div>
      </div>
      <div class="route-meta">
        <p class="route-total-time">${r.duration.text}</p>
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
              <!--<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 30.7" enable-background="new 0 0 24 30.7">
                <path d="M23 18.4c-.3-.3-.8-.3-1.1 0l-9.9 9.9-9.9-9.9c-.3-.3-.8-.3-1.1 0-.3.3-.3.8 0 1.1l10.5 10.4c.1.1.3.2.5.2s.4-.1.5-.2l10.5-10.4c.3-.3.3-.8 0-1.1zM1 12.2c.3.3.8.3 1.1 0l9.9-9.9 9.9 9.9c.3.3.8.3 1.1 0 .3-.3.3-.8 0-1.1l-10.5-10.4c-.1-.1-.3-.2-.5-.2s-.4.1-.5.2l-10.5 10.4c-.3.3-.3.8 0 1.1z"/>
              </svg>-->
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
          <div class="route-step-time flexColNo ` + ( index  == r.steps.length - 1 ?  `route-step-time-end` : index  == 0 ? `route-step-time-start` : "" ) + `">
          <p>` +
            ( index  == r.steps.length - 1 ? `${r.arrival_time.value.toLocaleTimeString('nb-NO', { hour12: false, hour: '2-digit', minute:'2-digit'})}`
            : index  == 0 ? `${r.departure_time.value.toLocaleTimeString('nb-NO', { hour12: false, hour: '2-digit', minute:'2-digit'})}`
            : "" )
           + `</p>
          </div>
          <div class="route-step-line flexColNo ` + ( index  == r.steps.length - 1 ?  `route-step-line-end` : index  == 0 ? `route-step-line-start` : "" ) + `">
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
    </div>` : // TRAVEL MODE IS NOT TRANSIT
    `
    <div class="route route-walk-bic" onclick="changeDirectionsIndex(${idx})">
      <div class="route-dir-meta-container flexRowNo">
        <img src="` + wppath + `/img/` +
        ( travelMode  == "WALKING" ?  `WALKING`
        : travelMode  == "BICYCLING" ?  `BICYCLING` : `DRIVING` )
         + `.svg" height="20px;"/>
        <p>`+ ( weekDay ?  `${weekDay}` : `` ) +` - ${r.duration.text} / ${r.distance.text}</p>
      </div>
    </div>
  ` );
  return markup;
}
