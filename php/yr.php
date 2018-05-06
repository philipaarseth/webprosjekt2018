<?php

$url = $_POST['postURL'];
$wordpressPath = $_POST['postWordpressPath'];


ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Get details about place ID
$yrRequest = $url;

// // request from YR
// $yrXML = file_get_contents($yrRequest);
// $xml = simplexml_load_string($yrXML);
// // XML -> JSON
// $json = json_encode($xml);
// // $array = json_decode($json,TRUE);

// $jsonFile = file_get_contents($wordpressPath . '/json/yrVulkan.json');
$jsonFile = file_get_contents($url);
$jsonn = json_encode($jsonFile);
$json = json_decode($jsonn);


header('Content-Type: application/json; charset=utf-8');
echo $json;

?>
