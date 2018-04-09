<?php /* Template name: TimeEdit Testing */ ?>
<?php $COURSELIMIT = 6; ?>

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
if (!empty($_GET['studentnavn'])) {

    $html  = file_get_contents('https://no.timeedit.net/web/westerdals/db1/student/objects.html?max=15&fr=t&partajax=t&im=f&sid=3&l=nb_NO&search_text='
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
    	}

      $courses_url = 'https://no.timeedit.net/web/westerdals/db1/student/ri.json?h=f&sid=3&p=0.m%2C12.n&objects='. $studentID . '&ox=0&types=0&fe=0&h2=f';
      $courses_json = file_get_contents($courses_url);
      $courses_array = json_decode($courses_json, true);

      $reservations = $courses_array['reservations'];

      for($i = 0; $i < $COURSELIMIT; $i++){
          $res = $reservations[$i];
          $temp  = explode(" ", $res['columns'][4]);
          $output[$i] = array("startdate" => $res['startdate'], "starttime" => $res['starttime'], "loc" => $temp[1][0]);
      }
      echo json_encode($output);

    }
}
?>



</body>
</html>