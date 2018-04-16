var school;


function postSchool(str){
    

  if(str.length != 0){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
      if(this.readyState == 4 && this.status == 200){
        document.getElementById("ajaxtest").innerHTML = this.responseText;
      }
    }
    xmlhttp.open("GET", wppath + "/cookies.php?q=" + str, true);
    xmlhttp.send();
  }
}
