<?php /* Template name: TimeEdit Testing */ ?>
<?php $COURSELIMIT = 6;
$locationIDs = array("F" => "ChIJ3UCFx2BuQUYROgQ5yTKAm6E", "V" => "ChIJRa81lmRuQUYR3l1Nit90vao", "K" => "ChIJ-wIZN4huQUYR5ZhO0YexXl0");
?>

<?php
/*ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
*/
if (!empty($_COOKIE['name'])) {

    $html  = file_get_contents('https://no.timeedit.net/web/westerdals/db1/student/objects.html?max=15&fr=t&partajax=t&im=f&sid=3&l=nb_NO&search_text='
    . urlencode($_COOKIE['name'])
    .'&types=10');
    $search_doc = new DOMDocument();
    libxml_use_internal_errors(TRUE);

    if(!empty($html)){
    	$search_doc->loadHTML($html);
    	libxml_clear_errors();

    	$te_xpath = new DOMXPath($search_doc);
      $studentIdRow = $te_xpath->query('//div[@id="objectbasketitemX0"]/@data-idonly');
      $namerow = $te_xpath->query('//div[@id="objectbasketitemX0"]/@data-name');


      if($studentIdRow->length > 0){
    		foreach($studentIdRow as $row){
          $studentID = $row->nodeValue;
    		}
    	}

      //få det faktiske navnet
      if($namerow->length > 0){
    		foreach($namerow as $row){
          $studentName = $row->nodeValue;
          $date_of_expiry = time() + 60 * 60 * 24 * 7; //7 days?
          setcookie( "name", $studentName, $date_of_expiry, "/");
    		}
    	}

      $courses_url = 'https://no.timeedit.net/web/westerdals/db1/student/ri.json?h=f&sid=3&p=0.m%2C12.n&objects='. $studentID . '&ox=0&types=0&fe=0&h2=f';

      //$courses_json = file_get_contents($courses_url); SKAL BRUKES NÅR VI IKKE ØNSKER DUMMYDATA
      $courses_json = file_get_contents("json/te.json");

      $courses_array = json_decode($courses_json, true);


      $reservations = $courses_array['reservations'];

      for($i = 0; $i < $COURSELIMIT; $i++){
          $res = $reservations[$i];
          $temp  = explode(" ", $res['columns'][4]);
          $output[$i] = array("startdate" => $res['startdate'], "starttime" => $res['starttime'], "loc" => $temp[1][0], "placeID" => $locationIDs[$temp[1][0]], "name" => $res['columns'][0],
           "type" => $res['columns'][2], "room" => $res['columns'][4], "endtime" => $res['endtime']);
      }
      echo json_encode($output);

    }
}
?>
