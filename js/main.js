var timeMargin, googleMapsInput, timeEditUser, destinationLoc, departureLoc;
timeMargin = 10;
googleMapsInput = "two";
timeEditUser = "three";
destinationLoc = "four";
departureLoc = "five";

function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tab-content");
  for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

function alertAllVariables(){
  console.log('----- ALL VARIABLES: -----');
  console.log('TimeMargin: ' + timeMargin);
  console.log('googleMapsInput: ' + googleMapsInput);
  console.log('timeEditUser: ' + timeEditUser);
  console.log('destinationLoc: ' + destinationLoc);
  console.log('departureLoc: ' + departureLoc);

}

$(document).ready(function() {
    $('.button').click(function() {
        $(this).siblings().removeClass('highlight');
        $(this).toggleClass('highlight');
    });
});
