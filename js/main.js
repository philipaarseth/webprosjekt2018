var timeMargin, googleMapsInput, timeEditUser, destinationLoc, departureLoc;

//direction settings
var ds = {
  timeMargin: 10,
  googleMapsInput: "timeEdit",
  timeEditUser: "Jon",
  destinationLoc: "four",
  departureLoc: "five"
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
  console.log('TimeMargin: ' + ds.timeMargin);
  console.log('googleMapsInput: ' + ds.googleMapsInput);
  console.log('timeEditUser: ' + ds.timeEditUser);
  console.log('destinationLoc: ' + ds.destinationLoc);
  console.log('departureLoc: ' + ds.departureLoc);

}

// toggle button highlight
$(document).ready(function() {
    $('.button, .button-third, .button-half').click(function() {
        $(this).siblings().removeClass('highlight');
        $(this).addClass('highlight');
    });
});

/*
// set vote arrow color to red on click
$('.poi-vote-up').on("click", function() {
    alert('msg');
    //$('.up-path').css({ fill: "#ff0000" });
    // attr("fill","#0000ff");
});
*/
