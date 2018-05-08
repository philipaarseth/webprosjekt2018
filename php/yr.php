<?php

$yrURL = $_POST['postURL'];
$wordpressPath = $_POST['postWordpressPath'];

ini_set("allow_url_fopen", 1);

// Reports all errors
error_reporting(E_ALL);
// Do not display errors for the end-users (security issue)
ini_set('display_errors','Off');
// Set a logging file
ini_set('error_log',$wppath2 . 'error_file.log');


// Override the default error handler behavior
set_exception_handler(function($exception) {
   error_log($exception);
   error_page("Something went wrong!");
});


// API request from YR example
// $yrXML = file_get_contents($yrURL);
// $xml = simplexml_load_string($yrXML);
// $json = json_encode($xml);

// Local file example
// $jsonFile = file_get_contents($wordpressPath . '/json/yrVulkan.json'); // fixed path
// // $jsonFile = file_get_contents($url); // relative path
// $jsonn = json_encode($jsonFile);
// $json = json_decode($jsonn);

function getXML($wppath2, $url){

  $cacheFile = $_SERVER['DOCUMENT_ROOT'] . '/wp-content/themes/divichild/cache/' . md5($url);

  if (file_exists($cacheFile)) {
      $fh = fopen($cacheFile, 'r');
      $cacheTime = trim(fgets($fh));

      // if data was cached recently, return cached data
      if ($cacheTime > strtotime('-10 minutes')) {
          return fread($fh, 999999);
      }

      // else delete cache file
      fclose($fh);
      unlink($cacheFile);
  }


  // api req
  $yrXML = file_get_contents($url);
  $response = simplexml_load_string($yrXML);
  $json = json_encode($response);


  $fh = fopen($cacheFile, 'w');
  fwrite($fh, time() . "\n");
  fwrite($fh, $json);
  fclose($fh);

  return $json;
}

function getJSON($wppath2, $url){

  $cacheFile = $_SERVER['DOCUMENT_ROOT'] . '/wp-content/themes/divichild/cache/' . md5($url);

  if (file_exists($cacheFile)) {
      $fh = fopen($cacheFile, 'r');
      $cacheTime = trim(fgets($fh));

      // if data was cached recently, return cached data
      if ($cacheTime > strtotime('-10 minutes')) {
          return fread($fh, 999999);
      }

      // else delete cache file
      fclose($fh);
      unlink($cacheFile);
  }


  // api req
  $response = file_get_contents($url);
  $json = json_encode($response);


  $fh = fopen($cacheFile, 'w');
  fwrite($fh, time() . "\n");
  fwrite($fh, $json);
  fclose($fh);

  return $json;
}

$result = getXML($wordpressPath, $yrURL);


header('Content-Type: application/json; charset=utf-8');
echo $result;

?>
