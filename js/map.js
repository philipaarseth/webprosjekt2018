var map;
var service;
var isPlaced = false;

var popupTxt;
var popupDiv;


function showBicycles() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var xd = JSON.parse(this.responseText);
      //bicycles.push({placeID: 'ChIJOT-_V2BuQUYRtUQG33il1iI', type: 'bicycle', name: "SYKKELTEST", icon: icons.wschool.icon});
      Object.keys(xd).forEach(function(k) {
        //console.log(k + ' - ' + xd[k]);
        if (typeof xd[k].center !== "undefined")
          bicycles.push({
            lat: xd[k].center.latitude,
            lng: xd[k].center.longitude,
            name: xd[k].title,
            availability: xd[k].availability
          })
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
    zoomControl: true,
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
    if (map.getZoom() < 15) {
      hideMarkers("poi");
    }
    if (map.getZoom() > 15) {
      showMarkers("poi");
    }
  });
  directionsInit(map); //run the 'initMap' function of directions.js. After initalizing the map as it is used in directions.js


  //Geolocation
  /* (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      posMark = new google.maps.Marker({
        position: new google.maps.LatLng(pos.lat, pos.lng),
        map: map,
        icon: {
          url: POI[0].icon,
          scaledSize: new google.maps.Size(50, 50)
        }
      })

      map.setCenter(pos);
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

  //End geolocation
  */

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

}; // End initMap


function CustomMarker(latlng, map, args) {
  this.latlng = latlng;
  this.args = args;
  this.setMap(map);
};

function clickPoiMarker(name) {
  let pt = markers_array.filter(point => point.name == name);
  console.log(pt);
  focusMarker(pt[0]);
};

//When a Marker is clicked
function focusMarker(point) {
  var zoomTime = 0;

  //toggle sidebar when a school is clicked.
  let pointName = "campus-emphasis-" + point.name;
  let pointNameLower = pointName.toLowerCase();
  if(point.name === "Fjerdingen" || point.name === "Vulkan" || point.name === "Kvadraturen"){
    toggleSidebar(pointNameLower, "button");
  }

  //   if(point.type == 'school'){ //only zoom out if school is clicked. not POIs
  //     zoomTime = 1500;
  //     map.setZoom(14);
  // }
  map.panTo(point.getPosition());
  if (!isPlaced) {
    window.setTimeout(function() {
      drawMarkers(POIdb, "small");
    }, 2500);
    isPlaced = true;
  }
  toggleBounce(point);
  setTimeout("map.setZoom(17)", zoomTime);
};

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

function getIconSize(newPoi, size){
  let mIcon;
  if(size === "big"){
    return {
      url: newPoi.icon,
      scaledSize: new google.maps.Size(50, 50) //The size of Campus icons
    }
  }
  else {
    return {
      url: newPoi.icon,
      scaledSize: new google.maps.Size(30, 30) //The size of POI icons
    }
  }
};

function drawMarkers(db, size) {
  for (var i = 0; i < db.length; i++) {
    //if (markerType == POIdb[i].poi_type) {
    let newPoi = {
      placeId: db[i].placeID,
      type: db[i].type,
      name: db[i].name,
      icon: wppath + db[i].icon_path
    };

    service.getDetails({
      placeId: newPoi.placeId
    }, function(result, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        let markerIcon = getIconSize(newPoi, size);
        var point = new google.maps.Marker({
          position: result.geometry.location,
          map: map,
          animation: google.maps.Animation.DROP,
          icon: markerIcon,
          name: newPoi.name,
          type: newPoi.type
        });
        markers_array.push(point);
      } //End if



      let pointName = newPoi.name;

      point.addListener('mouseover', function() {
        pixelPoint = fromLatLngToPoint(point.getPosition(), map);
        mOverPoi(point, pointName);
      });

      point.addListener('mouseout', function() {
        mOutPoi();
      });

      point.addListener('click', function() {

        focusMarker(point);
      });


    }); //End function
    //} //End if
  } //End for
}; // End Markers


function drawBicycleMarkers() {
  for (var i = 0; i < bicycles.length; i++) {
    /*let newPoi = {
      placeId: bicycles[i].placeId,
      type: bicycles[i].type,
      name: bicycles[i].name,
      icon: bicycles[i].icon
    };*/
    let icon = {
      //url: map.getZoom() < 15 ? wppath + '/img/bysykkel_big.svg' : wppath + '/img/bysykkel_sml.svg',
      //scaledSize:  map.getZoom() < 15 ? new google.maps.Size(15, 15) : new google.maps.Size(9, 9)
      url: wppath + '/img/bysykkel_big.svg',
      scaledSize: new google.maps.Size(20, 20)
    };
    var point = new google.maps.Marker({
      position: {
        lat: bicycles[i].lat,
        lng: bicycles[i].lng
      },
      map: map,
      //animation: google.maps.Animation.DROP,
      icon: icon,
      title: bicycles[i].name,
      type: bicycles[i].type
    });
    bicyclemarkers.push(point);

    /*map.addListener('zoom_changed', function() {
      if(map.getZoom() > 15){
        //setBicycleIcon("sml");
      }
      if(map.getZoom() < 15){
        //setBicycleIcon("big");
      }
    });*/


    let pointName = bicycles[i].name;

    point.addListener('mouseover', function() {
      //pixelPoint = fromLatLngToPoint(point.getPosition(), map);
      //mOverPoi(point, pointName);
    });

    point.addListener('mouseout', function() {
      //mOutPoi();
    });

    /*point.addListener('click', function() {

      focusMarker(point);
    }); */


  } //End if
}; // End Markers
