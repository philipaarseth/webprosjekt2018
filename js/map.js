var map;
var service;
var isPlaced

var popupTxt;
var popupDiv;


var iconPath = wppath + "/img/";
var icons = {
  wschool: {
    icon: iconPath + 'wlogo400x400.jpg',
  },
  kschool: {
    icon: iconPath + 'klogo960x960.png'
  },
  food: {
    icon: iconPath + 'food.png'
  },
  wine: {
    icon: iconPath + 'vinmonopolet.png'
  }
};

var markers_array = [];

var POI = [];

function initMap() {
  var pos_center = {
    lat: 59.9187791,
    lng: 10.7491923
  };



  POI = [{
      placeId: 'ChIJOT-_V2BuQUYRtUQG33il1iI',
      type: 'school',
      name: 'Fjerdingen',
      icon: icons.wschool.icon
    },
    {
      placeId: 'ChIJRa81lmRuQUYR3l1Nit90vao',
      type: 'school',
      name: 'Vulkan',
      icon: icons.wschool.icon
    },
    {
      placeId: 'ChIJ-wIZN4huQUYRTaKsn4K7Ekg',
      type: 'school',
      name: 'Kvadraturen',
      icon: icons.kschool.icon
    },
    {
      placeId: 'ChIJLSeTf2VuQUYRw9V12gQwpqU',
      type: 'poi',
      name: 'Mathallen',
      icon: icons.food.icon
    },
    {
      placeId: 'ChIJf9hZu2VuQUYRiu4EGiwGEoQ',
      type: 'poi',
      name: 'Døgnvill Burger',
      icon: icons.food.icon
    },
    {
      placeId: 'ChIJYVkeFWZuQUYRVl4NRBw8asQ',
      type: 'poi',
      name: 'Lille Asia',
      icon: icons.food.icon
    },
    {
      placeId: 'ChIJ18i8aWZuQUYR3I6OulZK07o',
      type: 'poi',
      name: 'Vinmonopolet',
      icon: icons.wine.icon
    }
  ]

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
    POI["0"].position,
    map, {}
  );

  service = new google.maps.places.PlacesService(map);

  //Drawing school markers on map.
  drawMarkers("school");

}; // End initMap


function CustomMarker(latlng, map, args) {
  this.latlng = latlng;
  this.args = args;
  this.setMap(map);
};

function clickPoiMarker(name) {
  let pt = markers_array.filter(point => point.title === name);
  focusMarker(pt[0]);
};

function focusMarker(point) {
  var zoomTime = 0;
  console.log(point);
//   if(point.type == 'school'){ //only zoom out if school is clicked. not POIs
//     zoomTime = 1500;
//     map.setZoom(14);
// }
  map.panTo(point.getPosition());
  if (!isPlaced) {
    window.setTimeout(function() {
      drawMarkers("poi");
    }, 2500);
    isPlaced = true;
  }
  toggleBounce(point);
  setTimeout("map.setZoom(17)",zoomTime);
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
  popupDiv.style.top = pixelPoint.y - 120+ 'px';
};

function mOutPoi() {
  popupDiv.style.opacity = 0;
  window.setTimeout(function() {
    if (popupDiv.style.opacity == 0) {
      popupDiv.style.display = 'none';
    }
  }, 600);
};

function hideMarkers(type){
  for(let i = 0; i < markers_array.length; i++){
    if(markers_array[i].type == type){
      markers_array[i].setVisible(false);
    }
  }
};

function showMarkers(type){
  for(let i = 0; i < markers_array.length; i++){
    if(markers_array[i].type == type){
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

function drawMarkers(markerType) {
  for (var i = 0; i < POI.length; i++) {
    if (markerType == POI[i].type) {
      let newPoi = {
        placeId: POI[i].placeId,
        type: POI[i].type,
        name: POI[i].name,
        icon: POI[i].icon
       };
      service.getDetails({
        placeId: newPoi.placeId
      }, function(result, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          var point = new google.maps.Marker({
            position: result.geometry.location,
            map: map,
            animation: google.maps.Animation.DROP,
            icon: {
              url: newPoi.icon,
              scaledSize: new google.maps.Size(50, 50)
            },
            title: newPoi.name,
            type: newPoi.type
          });
          markers_array.push(point);
        } //End if

        map.addListener('zoom_changed', function() {
          if (map.getZoom() < 15){
            hideMarkers("poi");
          }
          if (map.getZoom() > 15){
            showMarkers("poi");
          }
        });

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
    } //End if
  } //End for
}; // End Markers
