<?php  /* Template name: Bysykkel */


ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


$curl = curl_init();

curl_setopt_array($curl, array(
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
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);  //TODO: security issue. Remove when using SSL


$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}
?>
