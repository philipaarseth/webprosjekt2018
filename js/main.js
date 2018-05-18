var timeMargin, googleMapsInput, timeEditUser, destinationLoc, departureLoc;

//direction settings
var ds = {
  timeMargin: 15,
  googleMapsInput: "timeEdit",
  timeEditUser: "Jon",
  destinationLoc: "four",
  departureLoc: "five",
  TRAVELMODE: "TRANSIT"
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
function toggleTab(evt, tabName, tabArea) {
  var i, tabcontent, tablinks;
  if (tabArea == 'main-tab') {
    // gets all main-tab-content
    tabcontent = document.getElementsByClassName("main-tab-content");
    // hides all main-tab-content
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    // gets all tab links
    tablinks = document.getElementsByClassName("tablinks");

    // removes active from all tablinks
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  } else if (tabArea == 'dir-tab') {
    // gets all main-tab-content
    tabcontent = document.getElementsByClassName("dir-tab-content");
    // hides all main-tab-content
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
  }




  // displays the corrolating tab-content to what you clicked on
  document.getElementById(tabName).style.display = "block";
  // adds active class to the tablink
  evt.currentTarget.className += " active";
}

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


// SIDEBAR TOGGLE CONTENT
$(document).ready(function() {
  $('.sidebar-toggle').click(function(){
    // save the button value to the button that is pressed
    $this = $(this).val();

    toggleSidebar($this, "button");
  });
});

function toggleSidebar(ButtonValue, Method) {
  if (Method == "button") {
    // når .sidebar-toggle klikkes
    $this = ButtonValue;
    // console.log($this);

    //set 'hidden' på alle children til #campus-toggle
    $('#slide-container').children().addClass('hidden');
    // fjern hidden class fra element hvis den har class == $(this).val()
    $('.' + $this).removeClass('hidden');

  } else if (Method == "directions") {

    //set 'hidden' på alle children til #campus-toggle
    $('#slide-container').children().addClass('hidden');
    // fjern hidden class fra element hvis den har class == $(this).val()
    $('.direction-emphasis').removeClass('hidden');
  }
}

// auto-hide controls & add border-radius when init directions
$(document).ready(function() {
  $('.go-button').click(function() {

    // add border radius to bottom left & right corners
    $('.tab-left').removeClass('tab-left').addClass('tab-left-collapsed');
    $('.tab-right').removeClass('tab-right').addClass('tab-right-collapsed');

    //set display: none på alle .main-tab-content
    $('.main-tab-content').hide();

  });
});

// fix border radius when controls expanded
$(document).ready(function() {
  $('.tablinks').click(function() {

    // remove border radius to bottom left & right corners
    $('.tab-left-collapsed').removeClass('tab-left-collapsed').addClass('tab-left');
    $('.tab-right-collapsed').removeClass('tab-right-collapsed').addClass('tab-right');

  });
});

// TIME MARGIN - change text when toggling between them
$(document).ready(function() {
  $('#timeMargin15').click(function() {
    $('#timeMargin10').text('10min');
    $('#timeMargin5').text('5min');
    setTimeout(function(){
      $('#timeMargin15').text('15m før forelesning');
    },85);
  });
  $('#timeMargin10').click(function() {
    $('#timeMargin5').text('5min');
    $('#timeMargin15').text('15min');
    setTimeout(function(){
      $('#timeMargin10').text('10min før forelesning');
    },85);
  });
  $('#timeMargin5').click(function() {
    $('#timeMargin15').text('15min');
    $('#timeMargin10').text('10min');
    setTimeout(function(){
      $('#timeMargin5').text('5min før forelesning');
    },85);
  });
});

// DRIVING MODE - shifts background-color and sets boolean values
$(document).ready(function() {
  $('.switch').click(function() {
    changeDirectionsSettings('TRAVELMODE', $(this).val());
    $('.switch').css('background-color', '#aeaeae');
    $(this).css('background-color', '#5757FF');
  });
});
// CONTROLS END

// CAMPUS POI
$(document).ready(function() {
  $('.not-locked').click(function(){
    if ($(this).hasClass('poi-vote-up')) {
      console.log("UP!");
      poiVoteIncrement(1, $(this).attr("value"));

      $(this).removeClass('not-locked').addClass('poi-locked').unbind( "click" );
      $(this).siblings().unbind( "click" ).removeClass('not-locked').addClass('poi-locked-dis');
    } else if ($(this).hasClass('poi-vote-down')) {
      console.log("DOWN!");
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
async function placeIdToWeather(placeIDin) {
  var placeID = placeIDin;

  var latLng = placeIdToLatLon(placeID);
  var weatherData = await latLngToWeather(latLng.lat, latLng.lng);
  return weatherData;
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
            console.log(data);
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
// WEATHER END

// SHOW LOGGED IN
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function showLoggedIn() {
  console.log("showLoggedIn fired");
  var element = document.getElementById("logged-in-container");

  await sleep(1500);
  animate(element, 'top', '0px');
  await sleep(5000);
  animate(element, 'top', '-60px');
}

function animate(element, what, endValue) {
  $(element).css(what, endValue);
}
// SHOW LOGGED IN END
