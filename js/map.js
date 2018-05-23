var map;
var service;
var isPlaced = false;
var poiDirectClick = true;
var markersIsHidden = true;

var popupTxt;
var popupDiv;
var id, target, options;
var pos;

var infowindow;

var finishedpidtoll  = false;
var t0,t1;
var pidtoll = {
/*"ChIJQeIbU2BuQUYRr_lOy1UB1bw":{lat: 59.90, lng: 10.7 },
"ChIJ69po0mBuQUYRW23gdKIqjSc":{lat: 59.90, lng: 10.7 },
"ChIJ-XAFPmduQUYRxIZJGLteyWo":{lat: 59.90, lng: 10.7 },
"ChIJK_v8GGduQUYRraQO5m9mUu4":{lat: 59.90, lng: 10.7 },
"ChIJFRLUbmduQUYRzXOGF7yq8ew":{lat: 59.90, lng: 10.7 },
"ChIJbbryrGZuQUYRtz169fSMEG4":{lat: 59.90, lng: 10.7 },
"ChIJLaEY3WZuQUYRO8sj9kIsakU":{lat: 59.90, lng: 10.7 },
"ChIJWcbDcGBuQUYRX3-G130GXNs":{lat: 59.90, lng: 10.7 },
"ChIJLSeTf2VuQUYRw9V12gQwpqU":{lat: 59.90, lng: 10.7 },
"ChIJf9hZu2VuQUYRiu4EGiwGEoQ":{lat: 59.90, lng: 10.7 },
"ChIJYVkeFWZuQUYRVl4NRBw8asQ":{lat: 59.90, lng: 10.7 },
"ChIJ18i8aWZuQUYR3I6OulZK07o":{lat: 59.95, lng: 10.5},
"ChIJKabHf2VuQUYRb7U7kVuQl-M": {lat: 59.90, lng: 10.7 },
"ChIJafNVh2JuQUYRS87dbb5wUrM": {lat: 59.90, lng: 10.7 }, */
"ChIJ3UCFx2BuQUYROgQ5yTKAm6E": {lat: 59.916175, lng: 10.760207 },
 "ChIJRa81lmRuQUYR3l1Nit90vao": {lat: 59.923339, lng: 10.752497 },
 "ChIJ-wIZN4huQUYR5ZhO0YexXl0":{lat: 59.911087, lng: 10.745956 }
}
function distance(lat1, lon1, lat2, lon2, unit) {
	var radlat1 = Math.PI * lat1/180
	var radlat2 = Math.PI * lat2/180
	var theta = lon1-lon2
	var radtheta = Math.PI * theta/180
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist)
	dist = dist * 180/Math.PI
	dist = dist * 60 * 1.1515
	if (unit=="K") { dist = dist * 1.609344 }
	if (unit=="N") { dist = dist * 0.8684 }
	return dist
}

function showBicycles() {
  t0 = performance.now();

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var xd = JSON.parse(this.responseText);
      Object.keys(xd).forEach(function(k) {
        if (typeof xd[k].center !== "undefined"){
          //console.log(distance(xd[k].center.latitude, xd[k].center.longitude, 59.9110873, 10.7437619, 'K'));
          if(distance(xd[k].center.latitude, xd[k].center.longitude, 59.9110873, 10.7437619, 'K') > .3
          && distance(xd[k].center.latitude, xd[k].center.longitude, 59.9161644, 10.7574865, 'K') > .3
          && distance(xd[k].center.latitude, xd[k].center.longitude, 59.9233391, 10.7503081, 'K') > .3
          && distance(xd[k].center.latitude, xd[k].center.longitude, currentLocation.lat, currentLocation.lng, 'K') > .5
          ) return;
          bicycles.push({
            lat: xd[k].center.latitude,
            lng: xd[k].center.longitude,
            name: xd[k].title,
            availability: xd[k].availability
          });
        }
      });
      drawBicycleMarkers();
    }
  }
  xmlhttp.open("GET", wppath + "/bysykkel.php", true);
  xmlhttp.send();
}

var markers_array = [];
var bicyclemarkers = [];

var POI = [];
var bicycles = [];

function initMap() {
  var pos_center = {
    lat: 59.9187791,
    lng: 10.7491923
  };


  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    disableDefaultUI: true,
    zoomControl: !detectmob(),
    center: pos_center,
    styles: [{
        "stylers": [{
          "visibility": "on"
        }]
      },
      {
        "featureType": "administrative",
        "elementType": "labels",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "administrative",
        "elementType": "labels.icon",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "landscape",
        "stylers": [{
          "visibility": "on"
        }]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "poi.attraction",
        "stylers": [{
          "visibility": "on"
        }]
      },
      {
        "featureType": "poi.attraction",
        "elementType": "labels",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "poi.attraction",
        "elementType": "labels.icon",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "poi.business",
        "stylers": [{
          "visibility": "on"
        }]
      },
      {
        "featureType": "poi.business",
        "elementType": "labels",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "poi.government",
        "stylers": [{
          "visibility": "on"
        }]
      },
      {
        "featureType": "poi.government",
        "elementType": "labels",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "poi.medical",
        "stylers": [{
          "visibility": "on"
        }]
      },
      {
        "featureType": "poi.medical",
        "elementType": "labels",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "poi.park",
        "stylers": [{
          "visibility": "on"
        }]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "poi.place_of_worship",
        "stylers": [{
          "visibility": "on"
        }]
      },
      {
        "featureType": "poi.place_of_worship",
        "elementType": "labels",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "poi.school",
        "stylers": [{
          "visibility": "on"
        }]
      },
      {
        "featureType": "poi.school",
        "elementType": "labels",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "poi.sports_complex",
        "stylers": [{
          "visibility": "on"
        }]
      },
      {
        "featureType": "poi.sports_complex",
        "elementType": "labels",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels",
        "stylers": [{
          "visibility": "on"
        }]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "road.local",
        "stylers": [{
          "visibility": "on"
        }]
      },
      {
        "featureType": "road.local",
        "elementType": "labels",
        "stylers": [{
          "visibility": "on"
        }]
      },
      {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#444444"
        }]
      },
      {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [{
          "color": "#f2f2f2"
        }]
      },
      {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "road",
        "elementType": "all",
        "stylers": [{
            "saturation": -100
          },
          {
            "lightness": 45
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [{
          "visibility": "simplified"
        }]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "water",
        "elementType": "all",
        "stylers": [{
            "color": "#0088f6"
          },
          {
            "visibility": "on"
          }
        ]
      }

    ]
  }); // end maps

  map.addListener('zoom_changed', function() {
    if (map.getZoom() < 15 && !markersIsHidden) {
      hideMarkers("poi");
      markersIsHidden = true;
    }
    if (map.getZoom() > 15 && markersIsHidden) {
      showMarkers("poi");
      markersIsHidden = false;
    }
  });
  directionsInit(map); //run the 'initMap' function of directions.js. After initalizing the map as it is used in directions.js

  //Geolocation
  if (isserver) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        posMark = new google.maps.Marker({
          position: new google.maps.LatLng(pos.lat, pos.lng),
          map: map,

        });

        function updatePos(pos) {
          console.log("newpos");
          posMark.setPosition(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
          //navigator.geolocation.clearWatch(id);
        }

        function error(err) {
          console.warn('ERROR(' + err.code + '): ' + err.message);
        }


        options = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        };

        id = navigator.geolocation.watchPosition(updatePos, error, options);

        //map.setCenter(pos);
      }, function() {
        handleLocationError(true, map.getCenter());
        console.log("error");
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, map.getCenter());
    }


    function handleLocationError(browserHasGeolocation, pos) {

    }
  }


  //End geolocation

// Sets viewport center to geolocation porsition.
function setGeoCenter(){
  map.setCenter(pos);
}

  //Overlay for custom markers
  CustomMarker.prototype = new google.maps.OverlayView();

  CustomMarker.prototype.draw = function() {

    var self = this;
    var div = this.div;

    if (!div) {

      div = this.div = document.getElementById('poi-marker-popup');
      popupDiv = div;
      popupTxt = document.createElement('p');
      popupTxt.id = 'poi-popup-text';
      div.appendChild(popupTxt);
      div.className = 'poi-marker-popup';
      popupDiv.style.opacity = 0;

      if (typeof(self.args.marker_id) !== 'undefined') {
        div.dataset.marker_id = self.args.marker_id;
      }

      var panes = this.getPanes();
    }
  }; // End overlay

  CustomMarker.prototype.remove = function() {
    if (this.div) {
      this.div.parentNode.removeChild(this.div);
      this.div = null;
    }
  };

  CustomMarker.prototype.getPosition = function() {
    return this.latlng;
  };


  var overlay = new CustomMarker(
    POIdb[0].position,
    map, {}
  );


  service = new google.maps.places.PlacesService(map);

  //Drawing school markers on map.
  drawMarkers(campusdb, "big");
  mapPlaceIdToLatLng(POIdb);

}; // End initMap


function CustomMarker(latlng, map, args) {
  this.latlng = latlng;
  this.args = args;
  this.setMap(map);
};

function clickPoiMarker(name) {
  let pt = markers_array.filter(point => point.name == name);
  // console.log(pt);
  poiDirectClick = false;
  focusMarker(pt[0], poiDirectClick);
};

//When a Marker is clicked
function focusMarker(point, directClick) {
  var zoomTime = 0;

  //toggle sidebar when a school is clicked.
  let pointNameLower = point.name.toLowerCase();
  if (point.name === "Fjerdingen" ||
    point.name === "Vulkan" ||
    point.name === "Kvadraturen" ||
    !directClick) {
    if (point.name === "Fjerdingen" ||
      point.name === "Vulkan" ||
      point.name === "Kvadraturen") {
      toggleSidebar(false, false, true, pointNameLower);
    };

    map.panTo(point.getPosition());
    if (!isPlaced) {
      window.setTimeout(function() {
        drawMarkers(POIdb, "small");
      }, 1000);
      isPlaced = true;
    }
    toggleBounce(point);
    setTimeout("map.setZoom(17)", zoomTime);
  }
  poiDirectClick = true;

  //   if(point.type == 'school'){ //only zoom out if school is clicked. not POIs
  //     zoomTime = 1500;
  //     map.setZoom(14);
  // }

};

//returns true if browser is on a mobile unit
function detectmob() {
  if (navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
  ) {
    return true;
  } else {
    return false;
  }
}

//convert from latlng to pixel position as a Point object with .x and .y property
function fromLatLngToPoint(latLng, map) {
  var topRight = map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast());
  var bottomLeft = map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest());
  var scale = Math.pow(2, map.getZoom());
  var worldPoint = map.getProjection().fromLatLngToPoint(latLng);
  return new google.maps.Point((worldPoint.x - bottomLeft.x) * scale, (worldPoint.y - topRight.y) * scale);
};

function mOverPoi(marker, campName) {
  popupTxt.innerHTML = campName;
  popupDiv.style.display = 'block';
  popupDiv.style.opacity = 1;
  popupDiv.style.left = pixelPoint.x - (popupDiv.offsetWidth / 2) + 'px';
  popupDiv.style.top = pixelPoint.y - 100 + 'px';
};

function mOutPoi() {
  popupDiv.style.opacity = 0;
  window.setTimeout(function() {
    if (popupDiv.style.opacity == 0) {
      popupDiv.style.display = 'none';
    }
  }, 600);
};

function setBicycleIcon(size) {

  if (size === "big") {
    var icon = {
      url: wppath + '/img/bysykkel_big.svg',
      scaledSize: new google.maps.Size(15, 15)
    };
  } else {
    var icon = {
      url: wppath + '/img/bysykkel_sml.svg',
      scaledSize: new google.maps.Size(10, 10)
    };
  }
  for (let i = 0; i < bicyclemarkers.length; i++) {
    bicyclemarkers[i].setIcon(icon);
  }
  /*icon: {
    url: map.getZoom() < 15 ? wppath + '/img/bysykkel_big.svg' : wppath + '/img/bysykkel_sml.svg',
    scaledSize:  map.getZoom() < 15 ? new google.maps.Size(2, 2) : new google.maps.Size(1, 1)
  }, */
};

//Showing infowindow when clicking a marker
function showInfoView(point, pointName) {
  if (infowindow) {
    infowindow.close();
  }
  infowindow = new google.maps.InfoWindow({
    content: pointName
  });
  infowindow.open(map, point);
};


function hideMarkers(type) {
  for (let i = 0; i < markers_array.length; i++) {
    if (markers_array[i].type == type) {
      markers_array[i].setVisible(false);
    }
  }
};

function showMarkers(type) {
  for (let i = 0; i < markers_array.length; i++) {
    if (markers_array[i].type == type) {
      markers_array[i].setVisible(true);
    }
  }
};

function toggleBounce(point) {
  point.setAnimation(google.maps.Animation.BOUNCE);
  window.setTimeout(function() {
    point.setAnimation(null);
  }, 3000); //Amount of time the marker is bouncing (ms)
};

function getIconSize(url, size) {
  let mIcon;
  if (size === "big") {
    return {
      url: url,
      scaledSize: new google.maps.Size(50, 50) //The size of Campus icons
    }
  } else {
    return {
      url: url,
      scaledSize: new google.maps.Size(30, 30) //The size of POI icons
    }
  }
};
function placeIdToLL(placeID){
  return pidtoll[placeID];
}

async function mapPlaceIdToLatLng(db){
  for(var i = 0; i < db.length; i++){
    if(i % 5 === 0 && i != 0){
      await sleep(2000);
    }

    let pid = db[i].placeID;
    service.getDetails({
      placeId: db[i].placeID
    }, function(result, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        pidtoll[pid] = result.geometry.location;
      }
      else {
        //console.log(status);
      }
    });
  }
  //console.log(pidtoll);
  finishedpidtoll = true;
}


//kjøres
function drawMarkers(db, size) {
  for (var i = 0; i < db.length; i++) {
      let pos = placeIdToLL(db[i].placeID);
      let markerIcon = getIconSize(wppath + db[i].icon_path, size); //wppath + db[i].icon_path,
      let point = new google.maps.Marker({
        position: pos, //{lat: db[i].lat, lng: db[i].lng} //newPoi.position, //HER MÅ DET VÆRE NOE //result.geometry.location,
        map: map,
        animation: google.maps.Animation.DROP,
        icon: markerIcon,
        name: db[i].name,
        type: db[i].type
      });
      markers_array.push(point);

      let pointName = db[i].name;

      point.addListener('mouseover', function() {
        pixelPoint = fromLatLngToPoint(point.getPosition(), map);
        mOverPoi(point, pointName);
      });
      point.addListener('mouseout', function() {
        mOutPoi();
      });
      point.addListener('click', function() {
        if (detectmob()) {
          showInfoView(point, pointName);
        } else {
          focusMarker(point, poiDirectClick);
        };
      });


    //}); //End function
    //} //End if
  } //End for
}; // End drawMarkers


function drawBicycleMarkers() {
  console.log("thinking face");
  for (var i = 0; i < bicycles.length; i++) {

    let icon = {
      url: wppath + '/img/bysykkel_big.svg',
      scaledSize: new google.maps.Size(20, 20)
    };
    let bpoint = new google.maps.Marker({
      position: {
        lat: bicycles[i].lat,
        lng: bicycles[i].lng
      },
      map: map,
      icon: icon,
      title: bicycles[i].name,
      type: bicycles[i].type,
      availability: bicycles[i].availability,
    });
    bicyclemarkers.push(bpoint);

    let pointName = bicycles[i].name;

    /*bpoint.addListener('mouseover', function() {
      //pixelPoint = fromLatLngToPoint(bpoint.getPosition(), map);
      //mOverPoi(bpoint, pointName);
    });

    bpoint.addListener('mouseout', function() {
      //mOutPoi();
    });*/

    bpoint.addListener('click', function() {
      console.log(bpoint.availability);
        showInfoView(bpoint, "Sykler: " +bpoint.availability.bikes + ", låser: " + bpoint.availability.locks);
    });




  } //End if
  t1 = performance.now();
  console.log("Call to showBicycles2 took " + (t1 - t0) + " milliseconds.");
}; // End Markers
