<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>->Campus</title>
    <link href="<?php echo get_theme_file_uri('css/master.css'); ?>" rel="stylesheet" type="text/css" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="<?php echo get_theme_file_uri('js/main.js'); ?>"></script>
  </head>
  <body>

    <div class="page-container">
      <h1 class="page-title">->Campus</h1>

      <div class="slide-down-container hidden">
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

      <div class="slide-up-container">
        <div id="campus-emphasis" class="padding">
          <div class="button-container ">
            <button class="button-double">Directions</button>
            <button class="button-double">Nærmiljø</button>
          </div>
          <h1 class="campus-emphasis-name">Fjerdingen</h1>
          <h3>Christian Kroghs Gate 32</h3>
          <img src="<?php echo get_theme_file_uri('img/fjerdingen.jpg'); ?>" alt="">
        </div>
      </div>

    </div><!-- PAGE CONTAINER END -->




  </body>
</html>
