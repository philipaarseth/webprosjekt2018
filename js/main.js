var timeMargin, googleMapsInput, timeEditUser, destinationLoc, departureLoc;
var weatherDataIs = "";

//direction settings
var ds = {
  timeMargin: 15,
  googleMapsInput: "timeEdit",
  timeEditUser: "John Smith",
  destinationLoc: "four",
  departureLoc: "five",
  TRAVELMODE: "TRANSIT"
}

var campusLocInfo = {
  "fjerdingen": "ChIJ3UCFx2BuQUYROgQ5yTKAm6E",
  "vulkan": "ChIJRa81lmRuQUYR3l1Nit90vao",
  "kvadraturen": "ChIJ-wIZN4huQUYR5ZhO0YexXl0"
}

// TESTING & SQL
function alertAllVariables(){
  console.log('----- ALL VARIABLES: -----');
  // console.log('TimeMargin: ' + ds.timeMargin);
  // console.log('googleMapsInput: ' + ds.googleMapsInput);
  // console.log('timeEditUser: ' + ds.timeEditUser);
  // console.log('destinationLoc: ' + ds.destinationLoc);
  // console.log('departureLoc: ' + ds.departureLoc);
  /*console.log('fastestOn: ' + ds.fastestOn);
  console.log('walkingOn: ' + ds.walkingOn);
  console.log('bicyclingOn: ' + ds.bicyclingOn);
  console.log('drivingOn: ' + ds.drivingOn);
  console.log('transitOn: ' + ds.transitOn);*/
  console.log('TRAVELMODE: ' + ds.TRAVELMODE);
}

// import and export mysql dumps
$(document).ready(function() {
  $('#dump-sql').click(function(){
    $.ajax({
      type: "POST",
      url: wppath + "/mysql-dump.php",
      success: function(data){
          console.log('Return: ' + data);
      }
    });
  });
  $('#import-sql').click(function(){
    $.ajax({
      type: "POST",
      url: wppath + "/mysql-import.php",
      success: function(data){
          console.log('Return: ' + data);
      }
    });
  });
});
// TESTING & SQL END


// CONTROLS
function toggleTab(tabCode) {

  $tabCode = tabCode;

  if ($tabCode.includes("main-")) {
    $tab = $tabCode.substring(5).toLowerCase();
    // console.log("trying to show " + $tab);

    $('.main-tab-content').hide();
    $('.tablinks-main').removeClass('active');
    $('#main-tab-' + $tab).show();
    expandControls();

  } else if ($tabCode.includes("dir-")) {
    $tab = $tabCode.substring(4);
    // console.log("trying to show " + "#dir-tab-" + $tab);

    $('.dir-tab-content').hide();
    $('#dir-tab-' + $tab).show();

  }
}

// TOGGLE CONTROLS COLLAPSE & EXPAND + switch main-tab
$(document).ready(function() {
  $('.tablinks-main').click(function(){

    if ($(this).hasClass('active')) {
      collapseControls();
    } else {

      if ($(this).text().startsWith("Where")) {
        toggleTab('main-directions');
      } else if ($(this).text().startsWith("About")) {
        toggleTab('main-campus');
      } else if ($(this).text().startsWith("Options")) {
        toggleTab('main-alternativer');
      }
      $(this).addClass('active');
    }

  });
  $('[class*="tablinks-dir-"]').click(function(){

    if ($(this).hasClass('highlight')) {
    } else {

      if ($(this).text().startsWith("Next Lecture")) {
        toggleTab('dir-timeEdit');
      } else if ($(this).text().startsWith("To Campus")) {
        toggleTab('dir-campus');
      } else if ($(this).text().startsWith("Custom")) {
        toggleTab('dir-custom');
      }

      $(this).addClass('highlight');
    }

  });
});

//currently set with onclick, probably should bind all of these eventually..
function changeDirectionsSettings(prop, val){
  ds[prop] = val;
  console.log(prop,val);
}

// toggle button highlight
$(document).ready(function() {
  $('.button, .button-third, .button-half').click(function() {
    $(this).siblings().removeClass('highlight');
    $(this).addClass('highlight');
  });
});

// SIDEBAR TOGGLE CONTENT - BUTTONS
$(document).ready(function() {
  $('.sidebar-toggle').click(function(){
    $thisBtnValue = $(this).val();

    if ($thisBtnValue.includes("campus-poi-")) {
      toggleSidebar(false, false, true, $thisBtnValue.substring(11) );
      $('.campus-content-toggle-container').children().removeClass('active');
      $(this).addClass('active');
      console.log($(this));

    } else if ($thisBtnValue.includes("campus-dir-")) {
      toggleSidebar(false, true, false, $thisBtnValue.substring(11), true);
      $('.campus-content-toggle-container').children().removeClass('active');
      $(this).addClass('active');

    } else if ($thisBtnValue.includes("campus-") && !$thisBtnValue.includes("campus-dir")) {
      toggleSidebar(false, false, true, $thisBtnValue.substring(7) );
      $('.campus-emphasis-'+$thisBtnValue.substring(7)+' .campus-content-toggle-container').children().removeClass('active');
      $('.campus-emphasis-'+$thisBtnValue.substring(7)+' .campus-content-toggle-container button').first().addClass('active');

      if (weatherDataIs) {
        changeWeatherWhenTimeEditUsed($thisBtnValue.substring(7));
        console.log("obj");
      }
    }

  });
});

async function changeWeatherWhenTimeEditUsed(campusName) {
  var campusPlaceId = getPlaceIdOrCampus(campusName);
  var weather = await placeIdToWeather(campusPlaceId);
  changeWeather(campusName, weather.product.time[0].location.temperature["@attributes"].value, weather.product.time[1].location.symbol["@attributes"].id);
  weatherDataIs = "";
}

function toggleSidebar(weatherOn, directionsOn, poiOn, campusSelect, lectureOn) {
  //set 'hidden' på alle children til #slide-container
  $('#slide-container').children().not('#back-btn-container').addClass('hidden');

  if (weatherOn == true) {
    $('#weather-box').removeClass('hidden');
    // console.log("weather on");
  }
  if (directionsOn == true) {
    $('.direction-emphasis').removeClass('hidden');
    // console.log("dir on");
  }
  if (campusSelect) {
    $('.campus-emphasis-' + campusSelect).removeClass('hidden');
    // console.log(campusSelect + " on");
    // $('.tablinks-campus').removeClass('active');
    // $('.campus-content-toggle-container').child(even).addClass('active');
  }
  if (poiOn == true) {
    $('.campus-emphasis-' + campusSelect + '-pois').removeClass('hidden');
    // console.log("poi on");
  }
  if (lectureOn == true) {
    document.querySelector(".campus-emphasis-"+ campusSelect +" .campus-info .campus-info-bottom").classList.remove("hidden");
  } else {
    document.querySelector(".campus-info-bottom").classList.add("hidden");
  }

}

// COLLAPSE CONTROLS
$(document).ready(function() {
  $('.collapse-controls').click(function() {
    collapseControls();
  });
});

function collapseControls() {
  // add border radius to bottom left & right corners
  $('.tab-left').removeClass('tab-left').addClass('tab-left-collapsed');
  $('.tab-mid').removeClass('tab-mid').addClass('tab-mid-collapsed');
  $('.tab-right').removeClass('tab-right').addClass('tab-right-collapsed');

  //set display: none på alle .main-tab-content
  $('.main-tab-content').hide();
  $('.tablinks-main').removeClass('active');
}

function expandControls() {
  // remove border radius to bottom left & right corners
  $('.tab-left-collapsed').removeClass('tab-left-collapsed').addClass('tab-left');
  $('.tab-mid-collapsed').removeClass('tab-mid-collapsed').addClass('tab-mid');
  $('.tab-right-collapsed').removeClass('tab-right-collapsed').addClass('tab-right');
}

// TIME MARGIN - change text when toggling between them
$(document).ready(function() {
  $('#timeMargin15').click(function() {
    $('#timeMargin10').text('10min');
    $('#timeMargin5').text('5min');
    setTimeout(function(){
      $('#timeMargin15').text('15m before lecture');
    },85);
  });
  $('#timeMargin10').click(function() {
    $('#timeMargin5').text('5min');
    $('#timeMargin15').text('15min');
    setTimeout(function(){
      $('#timeMargin10').text('10min before lecture');
    },85);
  });
  $('#timeMargin5').click(function() {
    $('#timeMargin15').text('15min');
    $('#timeMargin10').text('10min');
    setTimeout(function(){
      $('#timeMargin5').text('5min before lecture');
    },85);
  });
});

// DRIVING MODE - shifts background-color and sets boolean values
$(document).ready(function() {
  $('.switch').click(function() {
    changeDirectionsSettings('TRAVELMODE', $(this).val());
      if($(this).val() === 'BICYCLING'){
          showBicycles(true);
      }
      else {
          showBicycles(false);
      }
    $('.switch').css('background-color', '#aeaeae');
    $(this).css('background-color', '#0088f6');
  });
});
// CONTROLS END

// CAMPUS POI
// POI CLICK -> VOTE + LOCK
$(document).ready(function() {
  $('.not-locked').click(function(){
    if ($(this).hasClass('poi-vote-up')) {
      poiVoteIncrement(1, $(this).attr("value"));

      $(this).removeClass('not-locked').addClass('poi-locked').unbind( "click" );
      $(this).siblings().unbind( "click" ).removeClass('not-locked').addClass('poi-locked-dis');
    } else if ($(this).hasClass('poi-vote-down')) {
      poiVoteIncrement(-1, $(this).attr("value"));

      $(this).removeClass('not-locked').addClass('poi-locked').unbind( "click" );
      $(this).siblings().unbind( "click" ).removeClass('not-locked').addClass('poi-locked-dis');

    }
  });
});

function poiVoteIncrement(thisNumber, thisPlaceId){
  $.ajax({
    type: "POST",
    url: wppath + "/poi-vote.php",
    data: {postValue: thisNumber, postPlaceId: thisPlaceId},
    success: function(data){
        $('#poi-vote-points-' + data.assocPlaceId).text(data.newValue);
    }
  });
}
// CAMPUS POI END

// WELCOME
// IMG HIGHLIGHT toggle
$(document).ready(function() {
  $('#welcome-container > .img-container > img').click(function() {
    $(this).siblings().removeClass('img-highlight');
    $(this).addClass('img-highlight');
  });
});
// WELCOME END


// WEATHER
// takes placeID -> gives weather details
async function placeIdToWeather(placeIDin, time) {
  var placeID = placeIDin;

  var latLng = placeIdToLatLon(placeID);
  if(time){
    var weatherData = await latLngToWeatherTime(latLng.lat, latLng.lng, time);
    return weatherData;

  }else{
    var weatherData = await latLngToWeather(latLng.lat, latLng.lng);
    return weatherData;
  }

}

function placeIdToLatLon(placeIDin) {
  var placeID = placeIDin;

  if (placeID == 'ChIJ3UCFx2BuQUYROgQ5yTKAm6E') {
    var fjerdingenLatLon = {
                "lat": 59.9161644,
                "lng": 10.7596752
            };
    return fjerdingenLatLon;
  } else if (placeID == 'ChIJRa81lmRuQUYR3l1Nit90vao') {
    var vulkanLatLon = {
                "lat": 59.92333909999999,
                "lng": 10.7524968
            };
    return vulkanLatLon;
  } else if (placeID == 'ChIJ-wIZN4huQUYR5ZhO0YexXl0') {
    var kvadraturenLatLon = {
                "lat": 59.9111522,
                "lng": 10.7450746
            };
    return kvadraturenLatLon;
  }

  // console.log(placeID + " - placeIdToLatLon");
  // $.ajax({
  //   type: "GET",
  //   dataType: "json",
  //   url: "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + placeID + "&key=AIzaSyAcEPRn3WzY8AXDvnFP_WIgVTfbXodNhU4",
  //   success: function(data){
  //       console.log(data);
  //   }
  // });
}

async function latLngToWeather(lat, lng) {
  var yrURL = "https://api.met.no/weatherapi/locationforecast/1.9/?lat="+lat+"&lon="+lng;
  var localJSON = wppath + "/json/yrVulkan.json";

  try {
    const dataset = await $.ajax({
          type: "POST",
          data: {postURL: yrURL, postWordpressPath: wppath},
          dataType: "JSON",
          url: wppath + "/php/yr.php",
          success: function(data) {
            // console.log(data);
          }
      });
      return dataset;
  } catch (e) {
    console.log(e);
  }
}

async function latLngToWeatherTime(lat, lng, time) {
  var yrURL = "https://api.met.no/weatherapi/locationforecast/1.9/?lat="+lat+"&lon="+lng;
  var localJSON = wppath + "/json/yrVulkan.json";
  //  var xd = "2018-05-22T13:00:00Z";

  try {
    const dataset = await $.ajax({
          type: "POST",
          data: {postURL: yrURL, postWordpressPath: wppath, time: time },
          dataType: "JSON",
          url: wppath + "/php/yr.php",
          success: function(data) {
            // console.log(data);
          }
      });
      return dataset;
  } catch (e) {
    console.log(e);
  }
}

function enableWeather(placeID, temperature, icon) {
  var campusName = "";
  console.log(placeID);
  if (placeID == 'ChIJ3UCFx2BuQUYROgQ5yTKAm6E') {
    campusName = 'Fjerdingen';
  } else if (placeID == 'ChIJRa81lmRuQUYR3l1Nit90vao') {
    campusName = 'Vulkan';
  } else if (placeID == 'ChIJ-wIZN4huQUYR5ZhO0YexXl0') {
    campusName = 'Kvadraturen';
  }
  console.log(campusName);

  $('#weather-box').removeClass('hidden');
  $('.weather-temperature').text(temperature);
  $('.weather-title').text(campusName);
  $('.weather-icon img').attr('src', wppath + '/img/' + icon + '.svg');
}

async function onPageLoadChangeWeather() {


  for (var key in campusLocInfo) {
    var weather = await placeIdToWeather(campusLocInfo[key]);
    // console.log(weather);
    changeWeather(key, weather.product.time[0].location.temperature["@attributes"].value, weather.product.time[1].location.symbol["@attributes"].id);
  }
}

function changeWeather(place, temp, icon) {
    document.querySelector(".campus-emphasis-"+ place +" .campus-info .weather-temperature h3").innerHTML = temp.slice(0, -2) + "°";
    document.querySelector(".campus-emphasis-"+ place +" .campus-info .weather-icon img").src = wppath + "/img/"+ icon +".svg";
}
// WEATHER END

// SHOW LOGGED IN
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function showNotification(text, initialDelay, duration, color) {
  // console.log("showNotification fired");
  var element = document.getElementById("notification-container");

  if (text) {
    document.getElementById("prompt-text").innerHTML = text;
  }

  if (color !== undefined) {
    document.getElementById("notification-container").style.backgroundColor = color;
  } else {
    document.getElementById("notification-container").style.backgroundColor = "#44CF6C";
  }

  await sleep(initialDelay);
  animate(element, 'top', '0px');
  await sleep(duration);
  animate(element, 'top', '-65px');
}

function animate(element, what, endValue) {
  $(element).css(what, endValue);
}
// SHOW LOGGED IN END


function getPlaceIdOrCampus(t){
  for (var key in campusLocInfo) {
  	if(campusLocInfo[key] === t){
  	   return key;
  	}
    if(key === t){
      return campusLocInfo[key];
    }
  }
  return false;
}

// LECTURE
function changeLectureInCampus(campus, name, type, room, startDate, startTime, endTime) {
  // remove lecture code
  var lectureName = name.slice(0, name.indexOf("("));
  document.querySelector(".campus-emphasis-"+ campus +" .campus-info .campus-info-bottom .lecture-container .lecture-title").innerHTML = lectureName + (type == "Forelesning" ? "" : "Øving" );
  document.querySelector(".campus-emphasis-"+ campus +" .campus-info .campus-info-bottom .lecture-container .lecture-room").innerHTML = room;
  document.querySelector(".campus-emphasis-"+ campus +" .campus-info .campus-info-bottom .lecture-container .lecture-time").innerHTML = startTime + " - " + endTime;
  document.querySelector(".campus-emphasis-"+ campus +" .campus-info .campus-info-bottom .lecture-container .lecture-date").innerHTML = startDate.slice(0,5);
  document.querySelector(".campus-emphasis-"+ campus +" .campus-info .campus-info-bottom").classList.remove("hidden");
}
// LECTURE END


// DRAG SLIDE-CONTAINER
// var $MB = $('#slide-container'),
//     $M = $('#slide-container'),
//     $DOM = $(document),
//     startAtY = 10, // CSS px
//     endAtY = 270,  // CSS #menu height px
//     clickedAtY,
//     clickEventType= document.ontouchstart !== null ? 'mousedown' : 'touchstart',
//     moveEventType = document.ontouchmove  !== null ? 'mousemove' : 'touchmove' ,
//     endEventType  = document.ontouchend   !== null ? 'mouseup'   : 'touchend'  ;
//
// $MB.on(clickEventType, function( e ) {
//
//   e.preventDefault();
//
//   clickedAtY	= e.pageY - $(this).offset().top;
//   if(clickEventType === 'touchstart'){
//     clickedAtY = e.originalEvent.touches[0].pageY - $(this).offset().top;
//   }
//
//   $DOM.on(moveEventType, moveHandler)
//       .on(endEventType, stopHandler);
//
// });
//
// function moveHandler( e ) {
//   var posY = e.pageY - clickedAtY;
//   if(moveEventType === 'touchmove') {
//     posY = e.originalEvent.touches[0].pageY - clickedAtY;
//   }
//   posY = Math.min( Math.max(0, posY), endAtY - startAtY);
//   $M.css({top: posY});
// }
//
// function stopHandler() {
//   $DOM.off(moveEventType, moveHandler)
//       .off(endEventType,  stopHandler);
// }
// DRAG SLIDE-CONTAINER END

// auto scroll
// function scrollWhenDir() {
//   window.scrollTo(1000, 1000);
// }
// $(document).ready(function() {
//
// });

// help/ info button
$(document).ready(function() {
  $('.help-toggle').click(function() {
    $('.help-text').toggleClass('hidden');
    $('.button-container').children().toggleClass('button-help-margin');
    $('.button-container').children().not('.not-help-btn-margin-toggle').toggleClass('button-help-margin');
    $('#help-box').toggleClass('hidden');
  });
});

// back to campus
$(document).ready(function() {
  $('#back-btn-container').click(function() {
    var campusName = $(this).attr('value').substring(7);
    // console.log(campusName);
    toggleSidebar(false, false, true, campusName, false);
    $('#back-btn-container').addClass('hidden');
    removeDirections();
    clickPoiMarker(campusName.charAt(0).toUpperCase()  + campusName.substr(1));
    $('.campus-emphasis-'+campusName+' .campus-content-toggle-container').children().removeClass('active');
    $('.campus-emphasis-'+campusName+' .campus-content-toggle-container button').first().addClass('active');
  });
});
// poi dir
$(document).ready(function() {
  $('.poi-direction-container button').click(function() {
    $('#back-btn-container').removeClass('hidden');

    var campusClassName = $(this).closest(".emphasis-poi-container").attr('class');
    var campusClassArray = campusClassName.split(' ');
    var className = campusClassArray[1];
    className = className.slice(16,-5);
    $('#back-btn-container').attr('value', "campus-" + className);

    var elem = $(this).parent().siblings('.poi-content').find('.poi-title').html();
    currentPoiName = elem;
  });
});
