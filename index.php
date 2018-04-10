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

      <div class="slide-down-container">
        <div class="tab-container">
          <button class="tablinks tab-left active" onclick="toggleTab(event, 'main-tab-directions', 'main-tab')">Directions</button>
          <button class="tablinks tab-mid" onclick="toggleTab(event, 'main-tab-poi', 'main-tab')">POI</button>
          <button class="tablinks tab-right" onclick="toggleTab(event, 'main-tab-campus', 'main-tab')">Campus</button>
        </div>
        <!-- DIRECTIONS TAB START -->
        <div id="main-tab-directions" class="padding main-tab-content active">
          <!-- SELECTORS START -->
          <div class="button-third-container dir-tab-toggles">
            <button class="button button-third button-left highlight" onclick="toggleTab(event, 'dir-tab-timeEdit', 'dir-tab')">TimeEdit</button>
            <button class="button button-third button-mid" onclick="toggleTab(event, 'dir-tab-campus', 'dir-tab')">Campus</button>
            <button class="button button-third button-right" onclick="toggleTab(event, 'dir-tab-custom', 'dir-tab')">Custom</button>
          </div>
          <!-- SELECTORS END -->
          <!-- TIMEEDIT START -->
          <div id="dir-tab-timeEdit" class="dir-tab-content active">
            <div class="button-third-container">
              <button class="button button-third button-left highlight">+10 min</button>
              <button class="button button-third button-mid">+5 min</button>
              <button class="button button-third button-right">0 min</button>
            </div>
            <div class="button-half-container">
              <button class="button button-half button-left highlight">fra her</button>
              <button class="button button-half button-right">fra annet sted</button>
            </div>
            <form action="/action_page.php">
              <input type="text" name="FirstName" placeholder="Name"><br>
              <input class="input-submit" type="submit" value="Go!">
            </form>
          </div>
          <!-- TIMEEDIT END -->
          <!-- CAMPUS START -->
          <div id="dir-tab-campus" class="dir-tab-content">
            <div class="button-third-container">
              <button class="button button-third button-left highlight">Fjerdingen</button>
              <button class="button button-third button-mid">Vulkan</button>
              <button class="button button-third button-right">Kristiania</button>
            </div>
          </div>
          <!-- CAMPUS END -->
          <!-- CUSTOM START -->
          <div id="dir-tab-custom" class="dir-tab-content">
            <form action="/action_page.php">
              <input type="text" name="FirstName" placeholder="From"><br>
              <input type="text" name="FirstName" placeholder="To"><br>
              <input class="input-submit" type="submit" value="Go!">
            </form>
          </div>
          <!-- CUSTOM END -->

        </div>
        <!-- DIRECTIONS TAB END  -->

        <!-- POI TAB START -->
        <div id="main-tab-poi" class="padding main-tab-content">
          <div class="button-half-container">
            <button class="button button-half button-left">clickme</button>
            <button class="button button-half button-right">clickme</button>
          </div>
        </div>
        <!-- POI TAB END -->

        <!-- CAMPUS TAB START -->
        <div id="main-tab-campus" class="padding main-tab-content">
          <div class="button-third-container">
            <button class="button button-third button-left">clickme</button>
            <button class="button button-third button-mid">clickme</button>
            <button class="button button-third button-right">clickme</button>
          </div>
        </div>
        <!-- CAMPUS TAB END -->

        <!-- DEV -->
        <div class="padding">
          <button id="reset-button" class="button" onclick="alertAllVariables()">console.log all variables</button>
        </div>
        <!-- DEV END -->

      </div><!-- END slide-down-container -->

    </div><!-- PAGE CONTAINER END -->




  </body>
</html>
