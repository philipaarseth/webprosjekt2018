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
    $('.button, .button-third, .button-half, #welcome-container > .img-container > img').click(function() {
        $(this).siblings().removeClass('highlight');
        $(this).addClass('highlight');
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
// $(document).ready(function() {
//     $('.switch').click(function() {
//       // $this = this;
//       $('#slide-container').children().addClass('hidden');
//       if ($(this).attr("enabled") == "true") {
//
//
//         changeDirectionsSettings('googleMapsInput', 'timeEdit');
//
//         console.log($(this).val() + ": "+ $(this).attr("enabled"));
//         if ($(this).siblings().attr("enabled") == "true") {
//
//         }
//       } else {
//
//
//         console.log($(this).val() + ": "+ $(this).attr("enabled"));
//       }
//       // alert($(this).attr("enabled"));
//
//     });
// });
// fastestOn
// walkingOn
// bicyclingOn
// drivingOn
// transitOn

// shifts background-color of switches and sets boolean values
$(document).ready(function() {
    $('.switch').click(function() {

      if (ds[$(this).val()] == true) {
        // disable
        $(this).css('background-color', '#aeaeae');
        changeDirectionsSettings($(this).val(), false);
        // console.log($(this).val() + ": " + ds[$(this).val()]);
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
        // console.log($(this).val() + ": " + ds[$(this).val()]);
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
