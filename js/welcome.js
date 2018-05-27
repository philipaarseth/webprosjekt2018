var school = "";
var name  = "";

function setSchool(s){
  school = s;
  console.log("School is now: " + school);
}

function setName(n){
  name = n;
  console.log("Name is now: " + n);
}


$(document).ready(function() {
  $("#nameInput").on('change keydown paste input', function(){
        setName($("#nameInput").val());
  });
});

function postSchool(){
  if (school == "" && name == "") {
    //alert('You need to click on a school logo and fill out your name :)');
    showNotification('You need to click on a school logo and fill out your name :)', 0, 5000, 'red');
    return;
  }
  if (school == "") {
    //alert('You need to click on a school logo :)');
    showNotification('You need to click on a school logo :)', 0, 5000, 'red');
    return;
  }
  if (name == "") {
    //alert('You need to fill out your name :)');
    showNotification('You need to fill out your name :)', 0, 5000, 'red');

    return;
  }

  if(school.length != 0 && name.length){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
      if(this.readyState == 4 && this.status == 200){
        if(this.responseText === "success") {
          enableWelcomePopup(true);
        }else{
          console.log("issue with setting cookie");
        }
      }
    }
    xmlhttp.open("GET", wppath + "/cookies.php?setcookie=true&schoolname=" + school + "&name=" + name, true);
    xmlhttp.send();
  }else{
    console.log("prompt no school selected.");
  }
}


function getTE(){

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
      if(this.readyState == 4 && this.status == 200){
        console.log(this.responseText)
      }
    }
    xmlhttp.open("GET", wppath + "/Timeedit.php", true);
    xmlhttp.send();

}


function deletecookie(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
      if(this.readyState == 4 && this.status == 200){
        if(this.responseText === "success") {
          enableWelcomePopup(false);
        }else{
          console.log("issue with deleting cookie");
        }
      }
    }
    xmlhttp.open("GET", wppath + "/cookies.php?deletecookie=true", true);
    xmlhttp.send();
}

function enableWelcomePopup(active){
  if(active){
    document.getElementById("welcome-page-container").classList.add("hidden");
    // document.getElementById("deletecookie").classList.remove("hidden");
  }else {
    document.getElementById("welcome-page-container").classList.remove("hidden");
    // document.getElementById("deletecookie").classList.add("hidden");

  }

}
