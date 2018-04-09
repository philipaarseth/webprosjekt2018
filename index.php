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
          <button class="tablinks tab-left active" onclick="openTab(event, 'directions')">Directions</button>
          <button class="tablinks tab-mid" onclick="openTab(event, 'poi')">POI</button>
          <button class="tablinks tab-right" onclick="openTab(event, 'campus')">Campus</button>
        </div>

        <div id="directions" class="padding tab-content active">
          <div class="button-half-container">
            <button class="button button-half button-left" type="button" value="test1">clickme</button>
            <button class="button button-half button-right" type="button">clickme</button>
          </div>
          <div class="button-third-container">
            <button class="button button-third button-left" type="button">clickme</button>
            <button class="button button-third button-mid" type="button">clickme</button>
            <button class="button button-third button-right" type="button">clickme</button>
          </div>
          <form action="/action_page.php">
            <input type="text" name="FirstName" placeholder="Name"><br>
            <input class="input-submit" type="submit" value="Go!">
          </form>
        </div>

        <div id="poi" class="padding tab-content">
          <div class="button-half-container">
            <button class="button button-half button-left" type="button">clickme</button>
            <button class="button button-half button-right" type="button">clickme</button>
          </div>
        </div>

        <div id="campus" class="padding tab-content">
          <div class="button-third-container">
            <button class="button button-third button-left" type="button">clickme</button>
            <button class="button button-third button-mid" type="button">clickme</button>
            <button class="button button-third button-right" type="button">clickme</button>
          </div>
        </div>
        <div class="padding">
          <button id="reset-button" class="button" type="button" onclick="alertAllVariables()">console.log all variables</button>
        </div>

      </div><!-- END slide-down-container -->

    </div>



  </body>
</html>
