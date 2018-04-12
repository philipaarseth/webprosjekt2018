var school = "";


function setSchool(s){
  school = s;
  console.log(school);
}

function postSchool(){
  if(school.length != 0){
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
    xmlhttp.open("GET", wppath + "/cookies.php?setcookie=true&schoolname=" + school, true);
    xmlhttp.send();
  }else{
    console.log("prompt no school selected.");
  }
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
    document.getElementById("welcome-container").classList.add("hidden");
    document.getElementById("deletecookie").classList.remove("hidden");
  }else {
    document.getElementById("welcome-container").classList.remove("hidden");
    document.getElementById("deletecookie").classList.add("hidden");

  }

}
