<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>->Campus</title>
    <script>var wppath =  "<?php echo get_theme_file_uri(); ?>"</script>
    <link href="<?php echo get_theme_file_uri('css/master.css'); ?>" rel="stylesheet" type="text/css" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="<?php echo get_theme_file_uri('js/main.js'); ?>"></script>
    <script src="<?php echo get_theme_file_uri('js/map.js'); ?>"></script>
    <script src="<?php echo get_theme_file_uri('js/directions.js'); ?>"></script>
    <script src="<?php echo get_theme_file_uri('js/welcome.js'); ?>"></script>

  </head>
  <body>

    <?php if(empty($_COOKIE['schoolname'])){
            include("Welcome.php");
          } else {
            // echo '<script type="text/javascript">',
            //      'teDirectionReq();',
            //      '</script>';
           }
    ?>

    <div class="page-container">


      <h1 class="page-title hidden">->Campus</h1>

      <div id="map"></div>
      <div id="poi-marker-popup"></div>

      <div class="controls-container">
        <div class="tab-container">
          <button class="tablinks tab-left active" onclick="toggleTab(event, 'main-tab-directions', 'main-tab')">Directions</button>
          <button class="tablinks tab-mid" onclick="toggleTab(event, 'main-tab-campus', 'main-tab')">Campus</button>
          <button class="tablinks tab-right" onclick="toggleTab(event, 'main-tab-filter', 'main-tab')">Alternativer</button>
        </div>
        <!-- DIRECTIONS TAB START -->
        <div id="main-tab-directions" class="padding main-tab-content" style="display: block;">
          <!-- SELECTORS START -->
          <div class="button-container">

            <button class="button-quad switch highlight" value="TRANSIT">
              <svg viewBox="0 0 384 384" xmlns="http://www.w3.org/2000/svg">
                <title>Transit</title>
                <path d="M48 120c0-4.416-3.584-8-8-8-22.064 0-40 17.952-40 40v16c0 13.232 10.768 24 24 24h16c4.416 0 8-3.584 8-8s-3.584-8-8-8v-48c4.416 0 8-3.584 8-8zM344 112c-4.416 0-8 3.584-8 8s3.584 8 8 8v48c-4.416 0-8 3.584-8 8s3.584 8 8 8h16c13.232 0 24-10.768 24-24v-16c0-22.048-17.936-40-40-40zM136 336c-4.416 0-8 3.584-8 8h-48c0-4.416-3.584-8-8-8s-8 3.584-8 8v16c0 13.232 10.768 24 24    24h32c13.232 0 24-10.768 24-24v-16c0-4.416-3.584-8-8-8zM312 336c-4.416 0-8 3.584-8 8h-48c0-4.416-3.584-8-8-8s-8 3.584-8 8v16c0 13.232 10.768 24 24 24h32c13.232 0 24-10.768 24-24v-16c0-4.416-3.584-8-8-8zM312 0h-240c-22.064 0-40 17.952-40 40v272c0 22.048 17.936 40 40 40h240c22.064 0 40-17.952 40-40v-272c0-22.048-17.936-40-40-40zm-208 32h176c13.232 0 24 10.768 24 24s-10.768 24-24 24h-176c-13.232 0-24-10.768-24-24s10.768-24 24-24zm0 272c-13.232 0-24-10.768-24-24s10.768-24 24-24 24 10.768 24 24-10.768 24-24 24zm176 0c-13.232 0-24-10.768-24-24s10.768-24 24-24 24 10.768 24 24-10.768 24-24 24zm40-104c0 13.232-10.768 24-24 24h-208c-13.232 0-24-10.768-24-24v-80c0-13.232 10.768-24 24-24h208c13.232 0 24 10.768 24 24v80z"/>
              </svg>
              <!-- <img title="transit" src="<?php //echo get_theme_file_uri('img/transit.svg'); ?>" width="35px;"/> -->
            </button>

            <button class="button-quad switch" value="WALKING">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64.06 95.8">
                <title>walking</title>
                <circle cx="35.67" cy="7.95" r="7.95"/><path d="M77.92 42.85c-2.21-.38-11-1.92-11.55-2.08l-.19-.28c-.18-.29-7.9-16.56-8.65-17.41a13.78 13.78 0 0 0-5.74-3.95 8.45 8.45 0 0 0-5.79.57s-14.53 8.3-15.47 8.74a6 6 0 0 0-1.79 2.17l-6.74 12.71a4 4 0 0 0-.89 2.54 4.09 4.09 0 0 0 8.07 1l6.31-11.93 4-2.21c-.28.85-3.9 18.49-3.9 18.49l-3.74 20.84-12.85 15.49a4.72 4.72 0 1 0 7.06 6.18c2.34-2.72 14.19-16.72 15.33-18.05a6.39 6.39 0 0 0 1.79-3.24c.19-1 2.31-13.74 2.31-13.74l12.13 12.14v21.4a4.75 4.75 0 0 0 9.45 0v-.58c0-3.26-.12-19.5 0-23.17.15-4.1-1.31-5-1.64-5.37l-11.62-12.41 2.49-12.09s3.25 6.35 3.58 7a4.35 4.35 0 0 0 2.44 2.21c1.09.24 14.59 3 14.59 3a4.07 4.07 0 0 0 .61.06 4 4 0 0 0 .4-8z" transform="translate(-17.48 -.69)"/>
              </svg>

              <!-- <img title="walking" src="<?php //echo get_theme_file_uri('img/walking.svg'); ?>" width="35px;"/> -->
            </button>
            <button class="button-quad switch" value="BICYCLING">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 780.3 780.4" enable-background="new 0 0 780.3 780.4">
                <title>Bicycling</title>
                <g id="layer1"><path id="path9848" class="st0" d="M618.222 328.495c-14.2 0-28 2.1-41 5.6l-25.6-56.5c-.2-.6-.8-1-1-1.5-2.6-7-9-12-16.8-12h-244l38.2-79.6h65c4.8 0 8.8-4.1 8.8-9v-27.9c0-5-4-9-8.8-9h-80.6l-.6.2c-7.2-.4-14 3.3-17.4 10.1l-86.4 180.3c-.2.7-.4 1.3-.4 2-14.6-4.4-29.8-6.8-45.6-6.8-86.4 0-156.6 70.1-156.6 156.6s70.2 156.6 156.6 156.6c86.6 0 156.6-70.1 156.6-156.6 0-54.6-28-102.6-70.4-130.7.4-.4.8-.8 1-1.3l18.8-39.2h248l19.4 42.7c-44.2 27.7-73.8 76.7-73.8 132.6 0 86.5 70.2 156.6 156.6 156.6 86.6 0 156.6-70.1 156.6-156.6 0-86.4-70-156.5-156.6-156.6zm-342.8 152.4c0 62.6-50.6 113.5-113.4 113.5-62.6 0-113.4-50.8-113.4-113.5 0-62.6 50.8-113.4 113.4-113.4 9.2 0 18.2 1.2 27 3.3l-47.6 101.8c-5.4 11.4-.4 25 11 30.4 11.2 5.4 25 .5 30.4-10.9l47.4-101.7c27.4 20.7 45.2 53.5 45.2 90.5zm342.8 117.7c-62.6 0-113.4-50.8-113.4-113.5 0-38.5 19.2-72.4 48.4-92.9l46.8 103.1c5 11.5 18.6 16.7 30.2 11.5 11.4-5.1 16.6-18.6 11.4-30.2l-46.4-102.6c7.4-1.6 15.2-2.4 23-2.4 62.8 0 113.6 50.8 113.6 113.5s-50.8 113.5-113.6 113.5"/><path id="path9850" class="st0" d="M600.222 203.395l-130.6-.8s-12 2.4-13.6 14.7c-1.6 12.3 11 17.4 11 17.4l82.6 10.9s40.2 6.4 50.6-42.2"/></g>
              </svg>
              <!-- <img title="bicycling" src="<?php //echo get_theme_file_uri('img/bicycling.svg'); ?>" width="35px;"/> -->
            </button>
            <button class="button-quad switch" value="DRIVING">
              <svg viewBox="0 0 384 384" xmlns="http://www.w3.org/2000/svg">
                <title>Driving</title>
                <path d="M324.288 223.024l-24.976 24.976h83.504c.704-7.52 1.184-15.616 1.184-24 0-2.8-.192-5.36-.336-8h-42.416c-6.304 0-12.496 2.56-16.96 7.024zM147.744 248h88.512l26.672-32h-141.856zM59.712 223.024c-4.464-4.464-10.656-7.024-16.96-7.024h-42.416c-.144 2.64-.336 5.2-.336 8 0 8.384.48 16.48 1.184 24h83.504l-24.976-24.976zM280 264c-3.232 0-6.16-1.952-7.392-4.944-1.232-2.992-.544-6.432 1.728-8.72l38.624-38.624c7.568-7.552 17.6-11.712 28.288-11.712h40.672c-4.256-22.24-15.264-37.184-34.224-47.088-22.048-11.536-71.536-16.912-155.696-16.912s-133.648 5.376-155.696 16.912c-18.96 9.904-29.968 24.848-34.224 47.088h40.672c10.688 0 20.72 4.16 28.288 11.712l38.624 38.624c2.288 2.288 2.976 5.728 1.728 8.72-1.248 2.992-4.16 4.944-7.392 4.944h-100.832c2.256 15.024 4.912 25.344 5.104 26.064.928 3.504 4.096 5.936 7.728 5.936h70.112l30.32 15.152c1.104.56 2.336.848 3.568.848h144c1.232 0 2.464-.288 3.584-.848l30.32-15.152h70.096c3.632 0 6.8-2.432 7.728-5.936.192-.72 2.848-11.04 5.104-26.064h-100.832zm-33.856-2.88c-1.52 1.824-3.776 2.88-6.144 2.88h-96c-2.368 0-4.624-1.056-6.144-2.88l-40-48c-2-2.384-2.416-5.712-1.104-8.512 1.328-2.816 4.144-4.608 7.248-4.608h176c3.104 0 5.92 1.792 7.248 4.608 1.312 2.8.896 6.128-1.104 8.512l-40 48zM344 168c-3.072 0-6.032-1.792-7.344-4.816-18.064-41.6-40.16-87.792-45.872-93.12-6.128-5.2-32.192-14.064-90.784-14.064h-16c-58.592 0-84.656 8.864-90.816 14.096-5.68 5.296-27.776 51.504-45.84 93.088-1.76 4.064-6.496 5.904-10.528 4.144-4.048-1.76-5.904-6.464-4.16-10.528 9.088-20.928 39.568-89.904 50.16-98.912 13.2-11.2 51.008-17.888 101.184-17.888h16c50.176 0 87.984 6.688 101.184 17.904 10.592 9.008 41.056 77.984 50.16 98.912 1.744 4.048-.112 8.768-4.16 10.528-1.024.448-2.128.656-3.184.656zM104 288c-4.144 0-7.424 3.184-7.84 7.216l-64.16-6.416v-.8c0-4.416-3.584-8-8-8s-8 3.584-8 8v32c0 13.232 10.768 24 24 24h48c13.232 0 24-10.768 24-24v-24c0-4.416-3.584-8-8-8zM360 280c-4.416 0-8 3.584-8 8v.8l-64.16 6.416c-.416-4.032-3.696-7.216-7.84-7.216-4.416 0-8 3.584-8 8v24c0 13.232 10.768 24 24 24h48c13.232 0 24-10.768 24-24v-32c0-4.416-3.584-8-8-8z"/>
              </svg>
              <!-- <img title="driving" src="<?php //echo get_theme_file_uri('img/driving.svg'); ?>" width="35px;"/> -->
            </button>

          </div>
          <div class="button-container dir-tab-toggles">
            <button class="button-third toggle button-left highlight" onclick="toggleTab(event, 'dir-tab-timeEdit', 'dir-tab'); changeDirectionsSettings('googleMapsInput', 'timeEdit');">Neste forelesning</button>
            <button class="button-third toggle button-mid" onclick="toggleTab(event, 'dir-tab-campus', 'dir-tab'); changeDirectionsSettings('googleMapsInput', 'campus');">Campus</button>
            <button class="button-third toggle button-right" onclick="toggleTab(event, 'dir-tab-custom', 'dir-tab'); changeDirectionsSettings('googleMapsInput', 'custom');">Custom</button>
          </div>
          <!-- SELECTORS END -->
          <!-- TIMEEDIT START -->
          <div id="dir-tab-timeEdit" class="dir-tab-content active">

            <div class="button-container">
              <button id="timeMargin15" class="button-third toggle button-left highlight" onclick="changeDirectionsSettings('timeMargin', 15);">15m før forelesning</button>
              <button id="timeMargin10" class="button-third toggle button-mid" onclick="changeDirectionsSettings('timeMargin', 10);">10 min</button>
              <button id="timeMargin5" class="button-third toggle button-right" onclick="changeDirectionsSettings('timeMargin', 5);">5 min</button>
            </div>
            <!--<form action="/action_page.php">-->
              <!--<input type="text" name="FirstName" placeholder="Name"  onchange="changeDirectionsSettings('timeEditUser', this.value)"><br> //getting name from cookie -->
              <input class="input-submit go-button" type="submit" value="Go!" onclick="teDirectionReq()">
            <!--</form>-->
          </div>
          <!-- TIMEEDIT END -->
          <!-- CAMPUS START -->
          <div id="dir-tab-campus" class="dir-tab-content">
            <div class="button-container">
              <button class="button-triple go-button" onclick="placeIdDirectionReq('ChIJ3UCFx2BuQUYROgQ5yTKAm6E')">Fjerdingen</button>
              <button class="button-triple go-button" onclick="placeIdDirectionReq('ChIJRa81lmRuQUYR3l1Nit90vao')">Vulkan</button>
              <button class="button-triple go-button" onclick="placeIdDirectionReq('ChIJ-wIZN4huQUYR5ZhO0YexXl0')">Kvadraturen</button>
            </div>
          </div>
          <!-- CAMPUS END -->
          <!-- CUSTOM START -->
          <div id="dir-tab-custom" class="dir-tab-content">
            <input id="departure" type="text" name="FirstName" placeholder="From" onchange="changeDirectionsSettings('departureLoc', this.value)"><br>
            <input id="destination" type="text" name="FirstName" placeholder="To" onchange="changeDirectionsSettings('destinationLoc', this.value)"><br>
            <input class="input-submit go-button" type="submit" value="Go!" onclick="customDirectionReq()">
          </div>
          <!-- CUSTOM END -->

        </div>
        <!-- DIRECTIONS TAB END  -->

        <!-- CAMPUS TAB START -->
        <div id="main-tab-campus" class="padding main-tab-content">
          <div class="button-container last-btn-container">
            <button class="button-triple sidebar-toggle" value="campus-emphasis-fjerdingen" onclick="clickPoiMarker('Fjerdingen'); removeDirections()">Fjerdingen</button>
            <button class="button-triple sidebar-toggle" value="campus-emphasis-vulkan" onclick="clickPoiMarker('Vulkan'); removeDirections()">Vulkan</button>
            <button class="button-triple sidebar-toggle" value="campus-emphasis-kvadraturen" onclick="clickPoiMarker('Kvadraturen'); removeDirections()">Kvadraturen</button>
          </div>
        </div>
        <!-- CAMPUS TAB END -->

        <!-- FILTER TAB START -->
        <div id="main-tab-filter" class="padding main-tab-content">
          <div class="button-container ">
            <button class="button-double btn-disabled">mat</button>
            <button class="button-double btn-disabled">sosialt</button>
          </div>
          <div class="button-container">
            <button id="dump-sql" class="button-double mySqlButton">Export SQL</button>
            <button id="import-sql" class="button-double mySqlButton">Import SQL</button>
          </div>
          <div class="button-container">
            <button class="button-double" onclick="deletecookie();">Delete Cookie</button>
            <button class="button-double" onclick="getTE();">Get TimeEdit JSON</button>
          </div>
          <div class="button-container last-btn-container">
            <button class="button-double" onclick="showBicycles();">Show bicycles(lag :( )</button>
            <button class="button-double" onclick="" >dunno</button>
          </div>
        </div>
        <!-- FILTER TAB END -->



        <!-- DEV -->
        <!-- <div class="padding">
          <button id="alert-button" class="button" onclick="alertAllVariables()">console.log all variables</button>
        </div> -->
        <!-- DEV END -->

      </div><!-- END CONTROLS-CONTAINER -->

      <div id="slide-container" class="padding">

        <div id="weather-fje" class="weather-container flex flexCenter">
          <div class="weather-icon"><img src="<?php echo get_theme_file_uri('img/Partly_sunny.svg'); ?>" alt=""></div>
          <div class="weather-temperature">22°</div>
          <h3 class="weather-title">Fjerdingen</h3>
        </div>
        <div id="weather-vul" class="weather-container flex flexCenter">
          <div class="weather-icon"><img src="<?php echo get_theme_file_uri('img/Sunny.svg'); ?>" alt=""></div>
          <div class="weather-temperature">24°</div>
          <h3 class="weather-title">Vulkan</h3>
        </div>

        <?php // Campus query

          // display errors
          ini_set('display_errors', 1);
          ini_set('display_startup_errors', 1);
          error_reporting(E_ALL);


          // MySQLi connection settings
          $host = 'localhost';
          $user = 'root';
          $pass = 'root';
          $dbname = 'webpro_';
          $port = 3306;

          // Create connection
          $conn = new mysqli($host, $user, $pass, $dbname, $port);
          // Check connection
          if (mysqli_connect_error()) {
              die("Database connection failed: " . mysqli_connect_error());
          }
            //echo "Connected successfully";


          $POIArray = array();
          $campusArray = array();

          // campus query
          $result = $conn->query("SELECT id, placeID, name, address, img_path, icon_path FROM campus");

          if ($result->num_rows > 0) { // Campus Query
            // output data of each row
            while($row = $result->fetch_assoc()) {

              // set temp variables to current campus
              $campusId = $row["id"];
              $campusPlaceId = $row["placeID"];
              $campusName = $row["name"];
              $campusAddress = $row["address"];
              $campusImgPath = $row["img_path"];

              $campusArray[] = $row;

              // display results from campus
              ?>
              <div class="campus-emphasis campus-emphasis-<?php echo strtolower($campusName) ?> hidden">
                <h1 class="campus-emphasis-title"><?php echo $campusName ?></h1>
                <h3 class="campus-emphasis-subtitle"><?php echo $campusAddress ?></h3>
                <img class="campus-pic" src="<?php echo get_theme_file_uri($campusImgPath); ?>" alt="">
                <div class="button-container ">
                  <button class="button-double" onclick="destinationDirectionReq({placeId: '<?php echo $campusPlaceId ?>'})">Directions</button>
                  <button class="button-double">Nærmiljø</button>
                </div>
                <div class="emphasis-poi-container">

                  <?php // POI Query

                  // second query
                  $result2 = $conn->query("SELECT placeID, tags, vote, name, tags, icon_path FROM poi WHERE campus_assoc LIKE '{$campusId}'");

                  if ($result2->num_rows > 0) {
                      // output data of each row
                      while($row2 = $result2->fetch_assoc()) {

                        $POIArray[] = $row2;
                        // set temp variables to current campus
                        $poiPlaceId = $row2["placeID"];
                        $poiTagsImploded = $row2["tags"];
                        $poiVote = $row2["vote"];

                        // separate tag single string into string array
                        $tagsArray = explode(" ", $poiTagsImploded);

                        // Get details about place ID
                        $googleMaps_placeIdRequest = 'https://maps.googleapis.com/maps/api/place/details/json?placeid='. $poiPlaceId . '&key=AIzaSyAcEPRn3WzY8AXDvnFP_WIgVTfbXodNhU4';
                        $placeID_getDetails_json = file_get_contents($googleMaps_placeIdRequest);
                        $placeID_getDetails_array = json_decode($placeID_getDetails_json, true);

                        // Get name from placeID
                        $poi_name = $placeID_getDetails_array['result']['name'];

                        // display results from pois matching campus
                        ?>
                        <div class="poi">
                          <div class="poi-vote">
                            <svg class="poi-vote-up" value="<?php echo $poiPlaceId ?>" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" enable-background="new 0 0 24 24">
                              <path fill="#000000" stroke-miterlimit="10"  d="M23 6.5c-.3-.3-.8-.3-1.1 0l-9.9 9.9-9.9-9.9c-.3-.3-.8-.3-1.1 0s-.3.8 0 1.1l10.5 10.4c.1.1.3.2.5.2s.4-.1.5-.2l10.5-10.4c.3-.3.3-.8 0-1.1z"/>
                            </svg>
                            <p id="poi-vote-points-<?php echo $poiPlaceId ?>" class="poi-vote-points"><?php echo $poiVote ?></p>
                            <svg class="poi-vote-down" value="<?php echo $poiPlaceId ?>" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" enable-background="new 0 0 24 24">
                              <path fill="#000000" stroke-miterlimit="10"  d="M23 6.5c-.3-.3-.8-.3-1.1 0l-9.9 9.9-9.9-9.9c-.3-.3-.8-.3-1.1 0s-.3.8 0 1.1l10.5 10.4c.1.1.3.2.5.2s.4-.1.5-.2l10.5-10.4c.3-.3.3-.8 0-1.1z"/>
                            </svg>
                          </div> <!-- POI-VOTE END -->
                          <div class="poi-content">
                            <div class="poi-info-container">
                              <div class="poi-title-opening-container">
                                <h3 class="poi-title"><?php echo $poi_name ?></h3>
                                <p class="poi-opening"><?php //echo $poiPlaceId ?></p>
                              </div>
                            </div>
                            <div class="poi-tag-container">
                              <?php
                                for ($i=0; $i < count($tagsArray); $i++) { ?>
                                  <button class="button tag"><?php echo $tagsArray[$i] ?></button>
                              <?php  }
                               ?>
                            </div>

                          </div> <!-- POI-CONTENT END -->
                          <div class="poi-direction-container">
                            <button class="button" onclick="destinationDirectionReq(<?php echo "{placeId: '" . $poiPlaceId . "'}" ?>)">Directions</button>
                          </div>
                        </div>

                        <?php
                      } // end $result 2 loop
                  } else {
                      echo "0 poi";
                  } // end poi ?>


                  <div class="poi">
                    <button id="poi-suggest" class="button">Is your favorite place not here? <br /> Let us know!</button>
                  </div>
                </div>
              </div> <!-- CAMPUS FJERDINGEN END -->


                <?php

              } // end $result loop
          } else {
              echo "0 campus";
          }

          $conn->close();
        ?>
        <script type="text/javascript">
          var POIdb = <?php echo json_encode($POIArray); ?>;
          var campusdb = <?php echo json_encode($campusArray); ?>;
        </script>

        <div class="direction-emphasis">
            <!-- <h1 class="direction-title">Directions to Vulkan:</h1> -->
            <div id="routes">
            <?php for ($i=0; $i < 4; $i++) { ?>
              <?php
                $timeFrom = "08.15";
                $timeTo = "08.35";
                $totalTime = "20m";
                $minBeforeClass = "10m";
               ?>
              <div class="route">
                <div class="route-directions">
                  <h3 class="route-time"><?php echo $timeFrom ?> - <?php echo $timeTo ?></h3>
                  <div class="route-icons">
                    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
                      <path d="M678.02 85.46c0 47.266-38.255 85.503-85.529 85.503-47.254 0-85.554-38.237-85.554-85.503 0-47.201 38.3-85.46 85.554-85.46 47.274 0 85.529 38.259 85.529 85.46zm42.103 275.998c-43.254 9.093-73.185 11.286-94.029 9.875-36.518-2.431-45.472-15.756-49.753-22.265-8.435-12.435-11.217-28.429-13.891-47.983l-37.298 115.973c-4.783 12.239-12.608 43.88-23.216 65.474 2.869 3.473 5.632 6.837 8.304 10.025 37.604 45.421 55.731 68.315 58.166 91.928 1.456 13.976 4.412 43.056-123.854 201.062-8.303 10.221-20.758 15.19-32.995 14.366-7.78-.522-15.519-3.364-22.019-8.658-16.78-13.542-19.28-38.217-5.717-54.927 42.819-52.778 91.443-119.206 104.397-145.228-3.563-5.469-9.304-12.954-15.52-20.833-26.279 45.291-87.813 132.684-126.896 187.153-8.15 11.395-21.323 17.103-34.407 16.209-6.979-.454-13.934-2.798-20.106-7.204-17.52-12.521-21.541-36.936-8.999-54.491 55.883-78.036 120.656-172.655 127.872-189.476 2-5.836 4.413-13.064 6.695-21.006-18.063-23.396-33.365-46.139-40.494-66.318-6.651-18.838-1.349-39.693 4.456-58.052 19.562-62.066 57.209-117.338 81.749-177.517-38.669-1.584-96.639 5.1-170.736 40.212-2.521 1.172-5.086 2.019-7.716 2.496l14.955 27.126-42.842 23.525 20.237 36.805-125.982 69.161-95.484-173.76 125.917-69.141 19.28 35.091 42.864-23.524 12.52 22.744c2.608-2.8 5.761-5.209 9.477-6.988 140.631-66.688 237.77-44.64 267.635-34.853 4.848 1.085 9.848 2.691 15.193 4.949 17.236 7.205 28.388 14.821 35.234 22.764 3.434 2.17 6.586 5.1 9.085 8.68 21.91 31.836 27.278 71.789 31.213 100.869.935 7.4 2.261 16.688 3.564 23.089 15.673.477 50.059-2.191 80.271-8.551 17.084-3.515 33.495 7.292 37.082 24.176 3.523 16.927-7.323 33.463-24.212 37.023zm-463.52-104.384l-25.931-47.114-13.716 7.51 25.888 47.114 13.759-7.51z"/>
                    </svg>
                    <p class="route-part-time"><?php echo "3m - " ?></p>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" enable-background="new 0 0 24 24">
                      <path d="M4 24c-.109 0-.22-.036-.312-.109-.215-.173-.25-.487-.078-.703l4-5c.174-.214.488-.25.703-.078.215.173.25.487.078.703l-4 5c-.099.123-.245.187-.391.187zM20 24c-.147 0-.292-.064-.391-.188l-4-5c-.172-.216-.137-.53.078-.703.216-.173.531-.136.703.078l4 5c.172.216.137.53-.078.703-.092.074-.202.11-.312.11zM19 23h-14c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h14c.276 0 .5.224.5.5s-.224.5-.5.5zM17.5 21h-11c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h11c.276 0 .5.224.5.5s-.224.5-.5.5zM17.886 19h-11.772c-.694 0-1.339-.278-1.816-.782-.477-.504-.719-1.164-.68-1.857l.726-13.055c.102-1.854 1.637-3.306 3.494-3.306h8.324c1.857 0 3.392 1.452 3.494 3.306l.726 13.056c.039.693-.203 1.353-.68 1.857-.477.503-1.122.781-1.816.781zm-10.048-18c-1.326 0-2.423 1.037-2.496 2.361l-.726 13.056c-.023.416.122.812.408 1.114.287.302.674.469 1.09.469h11.771c.417 0 .804-.167 1.09-.469.286-.302.431-.698.408-1.114l-.725-13.056c-.073-1.324-1.17-2.361-2.496-2.361h-8.324zM12 4c-.827 0-1.5-.673-1.5-1.5s.673-1.5 1.5-1.5 1.5.673 1.5 1.5-.673 1.5-1.5 1.5zm0-2c-.276 0-.5.224-.5.5s.224.5.5.5.5-.224.5-.5-.224-.5-.5-.5zM6.5 9c-.123 0-.241-.045-.333-.127-.106-.095-.167-.231-.167-.373v-3.5c0-.255.191-.469.445-.497l4.5-.5c.142-.015.283.029.389.125.105.094.166.23.166.372v3.5c0 .255-.191.469-.445.497l-4.5.5-.055.003zm.5-3.552v2.494l3.5-.389v-2.494l-3.5.389zM17.5 9l-.055-.003-4.5-.5c-.254-.028-.445-.242-.445-.497v-3.5c0-.142.061-.278.167-.373.106-.095.247-.139.389-.125l4.5.5c.253.029.444.243.444.498v3.5c0 .142-.061.278-.167.373-.092.082-.21.127-.333.127zm-4-1.448l3.5.389v-2.493l-3.5-.389v2.493zM12 15c-.141 0-.28-.059-.379-.174-.042-.049-4.18-4.826-7.121-4.826-.276 0-.5-.224-.5-.5s.224-.5.5-.5c3.399 0 7.698 4.963 7.879 5.174.18.209.156.525-.054.705-.094.081-.209.121-.325.121zM12 15c-.116 0-.231-.04-.326-.121-.209-.18-.233-.496-.054-.705.182-.211 4.481-5.174 7.88-5.174.276 0 .5.224.5.5s-.224.5-.5.5c-2.443 0-5.969 3.483-7.121 4.826-.098.115-.238.174-.379.174zM7 17c-.827 0-1.5-.673-1.5-1.5s.673-1.5 1.5-1.5 1.5.673 1.5 1.5-.673 1.5-1.5 1.5zm0-2c-.276 0-.5.224-.5.5s.224.5.5.5.5-.224.5-.5-.224-.5-.5-.5zM17 17c-.827 0-1.5-.673-1.5-1.5s.673-1.5 1.5-1.5 1.5.673 1.5 1.5-.673 1.5-1.5 1.5zm0-2c-.276 0-.5.224-.5.5s.224.5.5.5.5-.224.5-.5-.224-.5-.5-.5z" />
                    </svg>
                    <p class="route-part-time"><?php echo "15m - " ?></p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
                      <path d="M678.02 85.46c0 47.266-38.255 85.503-85.529 85.503-47.254 0-85.554-38.237-85.554-85.503 0-47.201 38.3-85.46 85.554-85.46 47.274 0 85.529 38.259 85.529 85.46zm42.103 275.998c-43.254 9.093-73.185 11.286-94.029 9.875-36.518-2.431-45.472-15.756-49.753-22.265-8.435-12.435-11.217-28.429-13.891-47.983l-37.298 115.973c-4.783 12.239-12.608 43.88-23.216 65.474 2.869 3.473 5.632 6.837 8.304 10.025 37.604 45.421 55.731 68.315 58.166 91.928 1.456 13.976 4.412 43.056-123.854 201.062-8.303 10.221-20.758 15.19-32.995 14.366-7.78-.522-15.519-3.364-22.019-8.658-16.78-13.542-19.28-38.217-5.717-54.927 42.819-52.778 91.443-119.206 104.397-145.228-3.563-5.469-9.304-12.954-15.52-20.833-26.279 45.291-87.813 132.684-126.896 187.153-8.15 11.395-21.323 17.103-34.407 16.209-6.979-.454-13.934-2.798-20.106-7.204-17.52-12.521-21.541-36.936-8.999-54.491 55.883-78.036 120.656-172.655 127.872-189.476 2-5.836 4.413-13.064 6.695-21.006-18.063-23.396-33.365-46.139-40.494-66.318-6.651-18.838-1.349-39.693 4.456-58.052 19.562-62.066 57.209-117.338 81.749-177.517-38.669-1.584-96.639 5.1-170.736 40.212-2.521 1.172-5.086 2.019-7.716 2.496l14.955 27.126-42.842 23.525 20.237 36.805-125.982 69.161-95.484-173.76 125.917-69.141 19.28 35.091 42.864-23.524 12.52 22.744c2.608-2.8 5.761-5.209 9.477-6.988 140.631-66.688 237.77-44.64 267.635-34.853 4.848 1.085 9.848 2.691 15.193 4.949 17.236 7.205 28.388 14.821 35.234 22.764 3.434 2.17 6.586 5.1 9.085 8.68 21.91 31.836 27.278 71.789 31.213 100.869.935 7.4 2.261 16.688 3.564 23.089 15.673.477 50.059-2.191 80.271-8.551 17.084-3.515 33.495 7.292 37.082 24.176 3.523 16.927-7.323 33.463-24.212 37.023zm-463.52-104.384l-25.931-47.114-13.716 7.51 25.888 47.114 13.759-7.51z"/>
                    </svg>
                    <p class="route-part-time"><?php echo "2m" ?></p>
                  </div>
                </div>
                <div class="route-meta">
                  <p class="route-total-time"><?php echo $totalTime ?></p>
                  <p class="route-time-before-class"><?php echo $minBeforeClass . " to class" ?></p>
                </div>

              </div>
            <?php } ?>
          </div>

        </div> <!-- SLIDE UP CONTAINER END -->


      </div> <!-- SLIDE CONTAINER END -->



      <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAcEPRn3WzY8AXDvnFP_WIgVTfbXodNhU4&libraries=places&callback=initMap"></script>
    </div><!-- PAGE CONTAINER END -->

  </body>
</html>
