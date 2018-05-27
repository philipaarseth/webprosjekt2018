var map;
var service;
var isPlaced = false;
var poiDirectClick = true;
var markersIsHidden = true;
var markersIsSmall = false;
var isHighContrast = false;
var popupTxt;
var popupDiv;
var id, target, options;
var pos;
var posMark;
var infowindow;
var markers_array = [];
var bicyclemarkers = [];
var POI = [];
var bicycles = [];


var t0,t1;


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

function getBicycles() {
  t0 = performance.now();

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var bikes = JSON.parse(this.responseText);
      Object.keys(bikes).forEach(function(k) {
        if (typeof bikes[k].center !== "undefined"){
          //console.log(distance(bikes[k].center.latitude, bikes[k].center.longitude, 59.9110873, 10.7437619, 'K'));
          if(distance(bikes[k].center.latitude, bikes[k].center.longitude, 59.9110873, 10.7437619, 'K') > .3
          && distance(bikes[k].center.latitude, bikes[k].center.longitude, 59.9161644, 10.7574865, 'K') > .3
          && distance(bikes[k].center.latitude, bikes[k].center.longitude, 59.9233391, 10.7503081, 'K') > .3
          && distance(bikes[k].center.latitude, bikes[k].center.longitude, currentLocation.lat, currentLocation.lng, 'K') > .5
          ) return;
          bicycles.push({
            lat: bikes[k].center.latitude,
            lng: bikes[k].center.longitude,
            name: bikes[k].title,
            availability: bikes[k].availability
          });
        }
      });
      drawBicycleMarkers();
    }
  }
  xmlhttp.open("GET", wppath + "/bysykkel.php", true);
  xmlhttp.send();
}


//Initializing google maps
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
    styles: normalStyle
  }); // end maps

  map.addListener('zoom_changed', function() {
    if (map.getZoom() < 15 && !markersIsHidden) {
      hideMarkers("poi");
      markersIsHidden = true;
    }
    if (map.getZoom() > 13 && markersIsHidden) {
      showMarkers("poi");
      markersIsHidden = false;
    }
    if (map.getZoom() < 16 && !markersIsSmall && !markersIsHidden) {
      changeIconSize("poi", "smallest");
      markersIsSmall = true;
    }
    if (map.getZoom() > 15 && markersIsSmall && !markersIsHidden) {
      changeIconSize("poi", "small");
      markersIsSmall = false;
    }
  });

  directionsInit(map); //run the 'initMap' function of directions.js. After initalizing the map as it is used in directions.js

  //Geolocation
	//Inspiration from https://developers.google.com/maps/documentation/javascript/examples/map-geolocation
  if (isserver) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        let icon = {
          url: wppath + '/img/currentLocation.svg',
          scaledSize: new google.maps.Size(20, 20)
        };
        posMark = new google.maps.Marker({
          position: new google.maps.LatLng(pos.lat, pos.lng),
          map: map,
          icon: icon
        });

				//Adding pulse effect to location icon.
				//addPulseToLocation();

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
  }//End geolocation

	// Sets viewport center to geolocation porsition.
	function setGeoCenter(){
	  map.setCenter(pos);
	}

	//Overlay for custom popup
	//Inspiration from https://developers.google.com/maps/documentation/javascript/examples/overlay-simple
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
	};

	CustomMarker.prototype.remove = function() {
	  if (this.div) {
	    this.div.parentNode.removeChild(this.div);
	    this.div = null;
	  }
	};

	CustomMarker.prototype.getPosition = function() {
	  return this.latlng;
	};

	function CustomMarker(latlng, map, args) {
	  this.latlng = latlng;
	  this.args = args;
	  this.setMap(map);
	};

	var overlay = new CustomMarker(
	  POIdb[0].position,
	  map, {}
	);
	// End Custom overlay

	//Initializing PlacesService variable
  service = new google.maps.places.PlacesService(map);

  //Drawing school markers on map.
  drawMarkers(campusdb, "big");

  //citybikes loading
  getBicycles();
}; // End initMap

//Changes map style. Parameter style variable.
function changeMap(style){
	var mapOptions = {
    zoom: 14,
    disableDefaultUI: true,
    zoomControl: !detectmob(),
    styles: style
  };
	map.setOptions(mapOptions);
};

//When clicking campus buttons
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
//From https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
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
//From http://krasimirtsonev.com/blog/article/google-maps-api-v3-convert-latlng-object-to-actual-pixels-point-object
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

function showPopupFromHere(marker){
	let content = "Travel from different place? <br> <button onclick='travelFrom()'>Click here</button>"
	showInfoView(marker, content);
}

//When "not travel from here"-button is clicked.
function travelFrom(){
	console.log("xd");
}

//function for toggeling high contrast
function toggleHighContrast(){
	if(isHighContrast){
		changeMap(normalStyle);
		isHighContrast = false;
	}
	else{
		changeMap(highContrastStyle);
		isHighContrast = true;
	}
}

//Showing infowindow when clicking a marker
function showInfoView(point, content) {
  if (infowindow) {
    infowindow.close();
  }
  infowindow = new google.maps.InfoWindow({
    content: content
  });
  infowindow.open(map, point);
};

//hide all markers of a certain type
function hideMarkers(type) {
  for (let i = 0; i < markers_array.length; i++) {
    if (markers_array[i].type == type) {
      markers_array[i].setVisible(false);
    }
  }
};

//Change icon size of a certain type
function changeIconSize(type, size) {
  for (let i = 0; i < markers_array.length; i++) {
    if (markers_array[i].type == type) {
      //markers_array[i].setVisible(false);
      let iconUrl = markers_array[i].getIcon().url;
      markers_array[i].setIcon(getIconSize(iconUrl, size));
    }
  }
};

//show all markers of a certain type
function showMarkers(type) {
  for (let i = 0; i < markers_array.length; i++) {
    if (markers_array[i].type == type) {
      markers_array[i].setVisible(true);
    }
  }
};

//Marker bouncing for an amount of time
function toggleBounce(point) {
  point.setAnimation(google.maps.Animation.BOUNCE);
  window.setTimeout(function() {
    point.setAnimation(null);
  }, 3000); //Amount of time the marker is bouncing (ms)
};

//Getting an icon object of a certain size
function getIconSize(url, size) {
  let mIcon;
  if (size === "big") {
    return {
      url: url,
      scaledSize: new google.maps.Size(50, 50) //The size of Campus icons
    }
  }
  if (size === "smallest") {
    return {
      url: url,
      scaledSize: new google.maps.Size(12, 20) //The size of icons
    }
  } else {
    return {
      url: url,
      scaledSize: new google.maps.Size(25, 40) //The size of POI icons
    }
  }
};

//Adding markers to map from a database variable
function drawMarkers(db, size) {
  for (var i = 0; i < db.length; i++) {
    let pos = new google.maps.LatLng(db[i].lat,db[i].lng);
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
			//showPopupFromHere(point);
			//addPulseToLocation();
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
    bpoint.setVisible(false);
    bicyclemarkers.push(bpoint);

    let pointName = bicycles[i].name;

    bpoint.addListener('click', function() {
        showInfoView(bpoint, bpoint.title + "<br>Sykler: " + bpoint.availability.bikes + ", låser: " + bpoint.availability.locks);
    });
  } //End if
  t1 = performance.now();
  console.log("Call to showBicycles2 took " + (t1 - t0) + " milliseconds.");
};

function showBicycles(sb) {
  for (var i = 0; i < bicyclemarkers.length; i++) {
      bicyclemarkers[i].setVisible(sb);
    }
      if (infowindow) {
    infowindow.close();
  }
};//End bicycles

function addPulseToLocation(){
  var allImages = document.getElementsByTagName("img");
  var target;
  for(var i = 0, max = allImages.length; i < max; i++)
    if (allImages[i].src === wppath + '/img/currentLocation.svg' ){
       target = allImages[i];
       break;
    }
    target.id = 'position-marker-pulse';
    console.log(target);
};
