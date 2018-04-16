<?php /* Template name: finnrom */ ?>
<?php
DELETE this file ?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <title>Timeedit</title>

</head>
<body>

<form action="" method="get">
    <input type="text" name="studentnavn"/>
    <button type="submit">Submit</button>
</form>
<br/>

<?php


    /*$html  = file_get_contents('https://no.timeedit.net/web/westerdals/db1/student/objects.html?max=15&fr=t&partajax=t&im=f&sid=3&l=nb_NO&search_text='
    . urlencode($_GET['studentnavn'])
    .'&types=10');
    $search_doc = new DOMDocument();
    libxml_use_internal_errors(TRUE);

    if(!empty($html)){
    	$search_doc->loadHTML($html);
    	libxml_clear_errors();

    	$te_xpath = new DOMXPath($search_doc);
      $studentIdRow = $te_xpath->query('//div[@id="objectbasketitemX0"]/@data-idonly');


      if($studentIdRow->length > 0){
    		foreach($studentIdRow as $row){
          $studentID = $row->nodeValue;
    		}
    	} */


      $romreservations  = array();



      $romids = array("f205" => 62, "f206" => 63, "f207" => 64, "f504" => 83);
      foreach($romids as $key =>  $id){
        $courses_url = 'https://no.timeedit.net/web/westerdals/db1/student/ri.json?h=f&sid=3&p=0.m%2C12.n&objects='. $id . '&ox=0&types=0&fe=0&h2=f';


        $courses_json = file_get_contents($courses_url);
        $courses_array = json_decode($courses_json, true);

        $roomreservations[$key] = $courses_array['reservations'];
      }

      $ledigidag = array();

      foreach($roomreservations as  $key => $result) {
          echo $key, $result[0]['startdate'], '<br>', $result[0]['startdate'], '<br><br>';

          //echo "I dag" . date("d.m.Y") . '<br/>';
          if($result[0]['startdate'] != date("d.m.Y")){
            echo "omg " . $key . " ledig i dag";
          }
          $ledigidag[] = $key;

      }





    /*  for($i = 0; $i < $COURSELIMIT; $i++){
          $res = $reservations[$i];
          $temp  = explode(" ", $res['columns'][4]);
          $output[$i] = array("startdate" => $res['startdate'], "starttime" => $res['starttime'], "loc" => $temp[1][0], "placeID" => $locationIDs[$temp[1][0]]);
      }
      echo json_encode($output); */



?>

<script>var xd = <?php echo json_encode($roomreservations); ?></script>

</body>
</html>
