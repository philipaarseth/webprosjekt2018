<?php  /* Template name: Bysykkel */
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


$curlavailability = curl_init();
curl_setopt_array($curlavailability, array(
  CURLOPT_URL => "https://oslobysykkel.no/api/v1/stations/availability",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "GET",
  CURLOPT_HTTPHEADER => array(
    "cache-control: no-cache",
    "client-identifier: a7b8b9c1b91fda34a412f1c72205bd40",
    "postman-token: b7af427c-c71d-047f-9ea3-1eef4dce718c"
  ),
));
curl_setopt($curlavailability, CURLOPT_SSL_VERIFYPEER, false);  //TODO: security issue. Remove when using SSL
$availabilityResponse = curl_exec($curlavailability);
$err = curl_error($curlavailability);
curl_close($curlavailability);
if ($err) {
  echo "cURL Error #:" . $err;
} else {
  //echo $availabilityResponse;
}



$curlstations = curl_init();
curl_setopt_array($curlstations, array(
  CURLOPT_URL => "https://oslobysykkel.no/api/v1/stations/",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "GET",
  CURLOPT_HTTPHEADER => array(
    "cache-control: no-cache",
    "client-identifier: a7b8b9c1b91fda34a412f1c72205bd40",
    "postman-token: b7af427c-c71d-047f-9ea3-1eef4dce718c"
  ),
));
curl_setopt($curlstations, CURLOPT_SSL_VERIFYPEER, false);  //TODO: security issue. Remove when using SSL
$stationsResponse = curl_exec($curlstations);
$err = curl_error($curlstations);
curl_close($curlstations);
if ($err) {
  echo "cURL Error #:" . $err;
} else {
  //echo $stationsResponse;
}


$xd = json_decode($availabilityResponse, true)['stations'];
$xd2 = json_decode($stationsResponse, true)['stations'];
$master_array = merge_two_arrays($xd, $xd2);

echo json_encode($master_array);
function merge_two_arrays($array1,$array2) {
    $data = array();
    $arrayAB = array_merge($array1,$array2);
    foreach ($arrayAB as $value) {
      $id = $value['id'];
      if (!isset($data[$id])) {
        $data[$id] = array();
      }
      $data[$id] = array_merge($data[$id],$value);
    }
    return $data;
  }
?>
