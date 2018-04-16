<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>->Campus</title>
    <link href="<?php echo get_theme_file_uri('css/master.css'); ?>" rel="stylesheet" type="text/css" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="<?php echo get_theme_file_uri('js/main.js'); ?>"></script>
    <script src="<?php echo get_theme_file_uri('js/map.js'); ?>"></script>
  </head>
  <body>

    <div class="page-container">
      <h1 class="page-title hidden">->Campus</h1>
      <div id="map"></div>

      <div class="slide-down-container fixed">
        <div class="tab-container">
          <button class="tablinks tab-left active" onclick="toggleTab(event, 'main-tab-directions', 'main-tab')">Directions</button>
          <button class="tablinks tab-mid" onclick="toggleTab(event, 'main-tab-poi', 'main-tab')">POI</button>
          <button class="tablinks tab-right" onclick="toggleTab(event, 'main-tab-campus', 'main-tab')">Campus</button>
        </div>
        <!-- DIRECTIONS TAB START -->
        <div id="main-tab-directions" class="padding main-tab-content active">
          <!-- SELECTORS START -->
          <div class="button-container dir-tab-toggles">
            <button class="button-third toggle button-left highlight" onclick="toggleTab(event, 'dir-tab-timeEdit', 'dir-tab'); changeDirectionsSettings('googleMapsInput', 'timeEdit');">TimeEdit</button>
            <button class="button-third toggle button-mid" onclick="toggleTab(event, 'dir-tab-campus', 'dir-tab'); changeDirectionsSettings('googleMapsInput', 'campus');">Campus</button>
            <button class="button-third toggle button-right" onclick="toggleTab(event, 'dir-tab-custom', 'dir-tab'); changeDirectionsSettings('googleMapsInput', 'custom');">Custom</button>
          </div>
          <!-- SELECTORS END -->
          <!-- TIMEEDIT START -->
          <div id="dir-tab-timeEdit" class="dir-tab-content active">
            <div class="button-container">
              <button class="button-third toggle button-left highlight" onclick="changeDirectionsSettings('timeMargin', 10)">+10 min</button>
              <button class="button-third toggle button-mid" onclick="changeDirectionsSettings('timeMargin', 5)">+5 min</button>
              <button class="button-third toggle button-right" onclick="changeDirectionsSettings('timeMargin', 0)">0 min</button>
            </div>
            <form action="/action_page.php">
              <input type="text" name="FirstName" placeholder="Name"  onchange="changeDirectionsSettings('timeEditUser', this.value)"><br>
              <input class="input-submit" type="submit" value="Go!" disabled>
            </form>
          </div>
          <!-- TIMEEDIT END -->
          <!-- CAMPUS START -->
          <div id="dir-tab-campus" class="dir-tab-content">
            <div class="button-container">
              <button class="button-triple">Fjerdingen</button>
              <button class="button-triple">Vulkan</button>
              <button class="button-triple">Kristiania</button>
            </div>
          </div>
          <!-- CAMPUS END -->
          <!-- CUSTOM START -->
          <div id="dir-tab-custom" class="dir-tab-content">
            <form action="/action_page.php">
              <input type="text" name="FirstName" placeholder="From" onchange="changeDirectionsSettings('departureLoc', this.value)"><br>
              <input type="text" name="FirstName" placeholder="To" onchange="changeDirectionsSettings('destinationLoc', this.value)"><br>
              <input class="input-submit" type="submit" value="Go!" disabled>
            </form>
          </div>
          <!-- CUSTOM END -->

        </div>
        <!-- DIRECTIONS TAB END  -->

        <!-- POI TAB START -->
        <div id="main-tab-poi" class="padding main-tab-content">
          <div class="button-container">
            <button class="button-double">mat</button>
            <button class="button-double">sosialt</button>
          </div>
        </div>
        <!-- POI TAB END -->

        <!-- CAMPUS TAB START -->
        <div id="main-tab-campus" class="padding main-tab-content">
          <div class="button-container">
            <button class="button-triple">Fjerdingen</button>
            <button class="button-triple">Vulkan</button>
            <button class="button-triple">Kristiania</button>
          </div>
        </div>
        <!-- CAMPUS TAB END -->

        <!-- DEV -->
        <div class="padding">
          <button id="alert-button" class="button" onclick="alertAllVariables()">console.log all variables</button>
        </div>
        <!-- DEV END -->

      </div><!-- END slide-down-container -->

      <div class="slide-container">





        <div id="campus-emphasis" class="slide-up-container">
          <div class="padding">
            <div class="button-container ">
              <button class="button-double">Directions</button>
              <button class="button-double">Nærmiljø</button>
            </div>
            <h1 class="campus-emphasis-title">Fjerdingen</h1>
            <h3 class="campus-emphasis-subtitle">Christian Kroghs Gate 32</h3>
            <img class="campus-pic" src="<?php echo get_theme_file_uri('img/fjerdingen.jpg'); ?>" alt="">
            <div class="emphasis-poi-container">
              <?php for ($i=0; $i < 10; $i++) { ?>
                <div class="poi">
                  <div class="poi-vote">
                    <svg class="poi-vote-up" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" enable-background="new 0 0 24 24">
                      <path fill="#000000" stroke-miterlimit="10"  d="M23 6.5c-.3-.3-.8-.3-1.1 0l-9.9 9.9-9.9-9.9c-.3-.3-.8-.3-1.1 0s-.3.8 0 1.1l10.5 10.4c.1.1.3.2.5.2s.4-.1.5-.2l10.5-10.4c.3-.3.3-.8 0-1.1z"/>
                    </svg>
                    <p class="poi-vote-points">74</p>
                    <svg class="poi-vote-down" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" enable-background="new 0 0 24 24">
                      <path fill="#000000" stroke-miterlimit="10"  d="M23 6.5c-.3-.3-.8-.3-1.1 0l-9.9 9.9-9.9-9.9c-.3-.3-.8-.3-1.1 0s-.3.8 0 1.1l10.5 10.4c.1.1.3.2.5.2s.4-.1.5-.2l10.5-10.4c.3-.3.3-.8 0-1.1z"/>
                    </svg>
                  </div>
                  <div class="poi-content">
                    <div class="poi-info-container">
                      <div class="poi-title-opening-container">
                        <h3 class="poi-title">Rema 1000</h3>
                        <p class="poi-opening">10-22(20)</p>
                      </div>
                    </div>
                    <div class="poi-tag-container">
                      <button class="button tag">mat</button>
                      <button class="button tag">billig</button>
                      <button class="button tag">billig</button>
                      <button class="button tag">billig</button>
                    </div>

                  </div><!-- POI-CONTENT END -->
                  <div class="poi-direction-container">
                    <button class="button">Directions</button>
                  </div>
                </div>
              <?php } ?>

              <div class="poi">
                  <button id="poi-suggest" class="button">Is your favorite place not here? <br /> Let us know!</button>
              </div>

            </div>
          </div>
        </div>

        <div id="directions-emphasis" class="slide-up-container hidden">
          <div class="padding">
            <h1 class="direction-title">Directions to Vulkan:</h1>

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
                  <p class="route-time-before-class"><?php echo $minBeforeClass . " before class" ?></p>
                </div>

              </div>
            <?php } ?>



          </div>
        </div> <!-- SLIDE UP CONTAINER END -->


      </div> <!-- SLIDE CONTAINER END -->



      <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAcEPRn3WzY8AXDvnFP_WIgVTfbXodNhU4&callback=initMap"></script>
    </div><!-- PAGE CONTAINER END -->

  </body>
</html>
