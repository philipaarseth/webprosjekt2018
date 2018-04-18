<?php



if(!empty($_COOKIE['schoolname'])){
  $validcookie = true;
}
if(!empty($_GET['schoolname'])){
  $date_of_expiry = time() + 60 * 60 * 24 * 7; //7 days?
  setcookie( "schoolname", $_GET['schoolname'], $date_of_expiry, "/");
  setcookie( "name", $_GET['name'], $date_of_expiry, "/");

  //echo $_COOKIE['accepted'];
  echo "success";
}
if(!empty($_GET['deletecookie'])){
  $date_of_expiry = time() - 60 ;
  setcookie( "schoolname", "", $date_of_expiry, "/" );
  setcookie( "name", "", $date_of_expiry, "/");
  $validcookie = false;
  echo "success";

}





//echo ($validcookie ? "success" : "failure");

?>
