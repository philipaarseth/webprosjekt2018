var timeMargin, googleMapsInput, timeEditUser, destinationLoc, departureLoc;

//direction settings
var ds = {
  timeMargin: 15,
  googleMapsInput: "timeEdit",
  timeEditUser: "Jon",
  destinationLoc: "four",
  departureLoc: "five",
  fastestOn: true,
  walkingOn: true,
  bicyclingOn: true,
  drivingOn: true,
  transitOn: true
}



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

function alertAllVariables(){
  console.log('----- ALL VARIABLES: -----');
  // console.log('TimeMargin: ' + ds.timeMargin);
  // console.log('googleMapsInput: ' + ds.googleMapsInput);
  // console.log('timeEditUser: ' + ds.timeEditUser);
  // console.log('destinationLoc: ' + ds.destinationLoc);
  // console.log('departureLoc: ' + ds.departureLoc);
  console.log('fastestOn: ' + ds.fastestOn);
  console.log('walkingOn: ' + ds.walkingOn);
  console.log('bicyclingOn: ' + ds.bicyclingOn);
  console.log('drivingOn: ' + ds.drivingOn);
  console.log('transitOn: ' + ds.transitOn);
}

// toggle button highlight
$(document).ready(function() {
  $('.button, .button-third, .button-half').click(function() {
    $(this).siblings().removeClass('highlight');
    $(this).addClass('highlight');
  });
});
$(document).ready(function() {
  $('#welcome-container > .img-container > img').click(function() {
    $(this).siblings().removeClass('img-highlight');
    $(this).addClass('img-highlight');
  });
});


// toggle sidebar/ slide-up content
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

$(document).ready(function() {
  $('.poi-vote-up').click(function(){
    poiVoteIncrement(1, $(this).attr("value"))
  });
  $('.poi-vote-down').click(function() {
    poiVoteIncrement(-1, $(this).attr("value"))
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

// change text of margin buttons when toggling between them
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


// shifts background-color of switches and sets boolean values
$(document).ready(function() {
  $('.switch').click(function() {

    if (ds[$(this).val()] == true) {
      // disable
      $(this).css('background-color', '#aeaeae');
      changeDirectionsSettings($(this).val(), false);

      if (ds['walkingOn'] == false ||
          ds['bicyclingOn'] == false ||
          ds['drivingOn'] == false ||
          ds['transitOn'] == false ) {
        changeDirectionsSettings('fastestOn', false);
        $('#fastestOn').css('background-color', '#aeaeae');
      }

    } else if (ds[$(this).val()] == false){
      // enable
      $(this).css('background-color', '#5757FF');
      changeDirectionsSettings($(this).val(), true);

      if (ds['walkingOn'] == true &&
          ds['bicyclingOn'] == true &&
          ds['drivingOn'] == true &&
          ds['transitOn'] == true ) {
        changeDirectionsSettings('fastestOn', true);
        $('#fastestOn').css('background-color', '#5757FF');
      }
    }
  });
});

// takes placeID -> gives weather details
function placeIdToWeather(placeIDin) {
  var placeID = placeIDin;

  var latLng = placeIdToLatLon(placeID);
  latLngToWeather(latLng.lat, latLng.lng)
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

function latLngToWeather(lat, lng) {
  var yrURL = "https://api.met.no/weatherapi/locationforecast/1.9/?lat="+lat+"&lon="+lng;
  // console.log(yrURL);
  console.log("latLngToWeather fired");

  $.ajax({
        type: "POST",
        data: {postURL: wppath + "/json/yrVulkan.json", postWordpressPath: wppath},
        dataType: "JSON",
        url: wppath + "/php/yr.php",
        success: function(data) {
          console.log(data.product.time[0].location.temperature["@attributes"].value);
          // console.log(data);
            // $(xml).find('name').each(function(){
            //             var name = $(this).text();
            //             alert(name);
            // });
        }
    });




  // https://api.met.no/weatherapi/locationforecast/1.9/?lat=60.10&lon=9.58
}
