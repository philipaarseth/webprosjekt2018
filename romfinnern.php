<?php /* Template name: RomFinnern */ ?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link href="<?php echo get_theme_file_uri('css/rom.css'); ?>" rel="stylesheet" type="text/css" />
  <title>Romfinnern</title>
</head>
  <body>
    <?php
          //trenger manuell plotting af aktuelle rom + ID, eller en liknende løsning.
          $romids = array("f201" => 58, "f205" => 62, "f206" => 63, "f207" => 64, "f504" => 83, "f208" => 65, "f301" => 68,
          "f301" => 68, "f305" => 72, "f306" => 73, "f307" => 74, "f309" => 76);
          foreach($romids as $key =>  $id){
            $courses_url = 'https://no.timeedit.net/web/westerdals/db1/student/ri.json?h=f&sid=3&p=0.m%2C12.n&objects='. $id . '&ox=0&types=0&fe=0&h2=f';
            $courses_json = file_get_contents($courses_url);
            $courses_array = json_decode($courses_json, true);
            $roomreservations[$key] = $courses_array['reservations'];
          }

          $ledigidag = array();
          $ledigdeler = array();
          foreach($roomreservations as  $key => $result) {
              //echo $key, $result[0]['startdate'], '<br>', $result[0]['startdate'], '<br><br>';
              if($result[0]['startdate'] != date("d.m.Y")){
                $ledigidag[] = $key;
              }
              if($result[0]['startdate'] == date("d.m.Y") && $result[0]['starttime']){

              }
          }
           ?>
    <div class="page-container">

      <div class="suggestion-container">
        <h1 class="free-rooms">Rom som er ledige hele dagen:</h1>
        <?php foreach ($ledigidag as $ledig) { ?>
          <div class="suggestion flex flexCenter">
            <h1 class="suggestion-title"><?php echo "Rom" . $ledig ?></h1>
          </div>

        <?php } ?>
        <h1 class="free-rooms">Rom som er ledige deler av dagen:</h1>
        <?php for ($i=0; $i < 3; $i++) { ?>
          <div class="suggestion flex flexCenter">
            <h1 class="suggestion-title"><?php echo "Rom 310 - ledig mellom 12 - 14" ?></h1>
          </div>
        <?php } ?>
      </div> <!-- SUGGESTION CONTAINER END -->

    </div> <!-- PAGE CONTAINER END -->

  </body>
</html>
