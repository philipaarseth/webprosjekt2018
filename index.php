<?php $config = parse_ini_file("config.ini");?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta charset="utf-8">

    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-title" content="->Campus">
    <meta name="application-name" content="->Campus">

    <link rel="apple-touch-icon" sizes="57x57" href="<?php echo get_theme_file_uri('img/favicons/apple-icon-57x57.png')?>">
    <link rel="apple-touch-icon" sizes="60x60" href="<?php echo get_theme_file_uri('img/favicons/apple-icon-60x60.png')?>">
    <link rel="apple-touch-icon" sizes="72x72" href="<?php echo get_theme_file_uri('img/favicons/apple-icon-72x72.png')?>">
    <link rel="apple-touch-icon" sizes="76x76" href="<?php echo get_theme_file_uri('img/favicons/apple-icon-76x76.png')?>">
    <link rel="apple-touch-icon" sizes="114x114" href="<?php echo get_theme_file_uri('img/favicons/apple-icon-114x114.png')?>">
    <link rel="apple-touch-icon" sizes="120x120" href="<?php echo get_theme_file_uri('img/favicons/apple-icon-120x120.png')?>">
    <link rel="apple-touch-icon" sizes="144x144" href="<?php echo get_theme_file_uri('img/favicons/apple-icon-144x144.png')?>">
    <link rel="apple-touch-icon" sizes="152x152" href="<?php echo get_theme_file_uri('img/favicons/apple-icon-152x152.png')?>">
    <link rel="apple-touch-icon" sizes="180x180" href="<?php echo get_theme_file_uri('img/favicons/apple-icon-180x180.png')?>">
    <link rel="icon" type="image/png" sizes="192x192"  href="<?php echo get_theme_file_uri('img/favicons/android-icon-192x192.png')?>">
    <link rel="icon" type="image/png" sizes="32x32" href="<?php echo get_theme_file_uri('img/favicons/favicon-32x32.png')?>">
    <link rel="icon" type="image/png" sizes="96x96" href="<?php echo get_theme_file_uri('img/favicons/favicon-96x96.png')?>">
    <link rel="icon" type="image/png" sizes="16x16" href="<?php echo get_theme_file_uri('img/favicons/favicon-16x16.png')?>">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="<?php echo get_theme_file_uri('img/favicons/ms-icon-144x144.png')?>">
    <meta name="theme-color" content="#ffffff">

    <title>->Campus</title>
    <script>var wppath =  "<?php echo get_theme_file_uri(); ?>"; var isserver = "<?php echo $config['isserver']?>"; console.log(isserver);</script>
    <link href="<?php echo get_theme_file_uri('css/master.css'); ?>" rel="stylesheet" type="text/css" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="<?php echo get_theme_file_uri('js/main.js'); ?>"></script>
    <script src="<?php echo get_theme_file_uri('js/map.js'); ?>"></script>
    <script src="<?php echo get_theme_file_uri('js/directions.js'); ?>"></script>
    <script src="<?php echo get_theme_file_uri('js/welcome.js'); ?>"></script>
    <script src="<?php echo get_theme_file_uri('js/styles.js'); ?>"></script>
    <style>
    #mydiv {
        position: fixed;
        z-index: 9;
        background-color: #f1f1f1;
        text-align: center;
        border: 1px solid #d3d3d3;
      width: 100%;
      touch-action: none;
    }

    #mydivheader {
        padding: 10px;
        cursor: move;
        z-index: 10;
        background-color: #2196F3;
        color: #fff;
        touch-action: none;

    }

    .anim-sidebar{
      transition: top 0.5s 0s ease-in-out;
    }
    </style>

  </head>
  <body>
    <?php if(empty($_COOKIE['schoolname'])){
            include("Welcome.php");
          } else {
            echo '<script type="text/javascript">',
                 // 'teDirectionReq();',
                 '</script>';
            // dagsoversikt
           }
    ?>

    <div class="page-container">
      <hr id="XD" style="position: fixed; top: 500px; width: 100%; z-index: 100;" class="">
      <!-- // display: block !Important -->

      <div id="notification-container">
        <p id="prompt-text"><?php echo "logged in as " . $_COOKIE['name'] ?></p>
      </div>

      <div id="map"></div>
      <div id="poi-marker-popup"></div>

      <div class="controls-container">
        <div class="tab-container">
          <button class="tablinks-main tab-left active disable-selection">Where to?</button>
          <button class="tablinks-main tab-mid disable-selection">About Campus</button>
          <button class="tablinks-main tab-right disable-selection">Options</button>
        </div>
        <!-- DIRECTIONS TAB START -->
        <div id="main-tab-directions" class="padding main-tab-content" style="display: block;">
          <!-- SELECTORS START -->
          <p class="help-text hidden">How do you want to travel?</p>
          <div id="driving-mode-buttons" class="button-container">
            <button class="button-quin switch highlight" value="TRANSIT">
              <svg viewBox="0 0 384 384" xmlns="http://www.w3.org/2000/svg">
                <title>Transit</title>
                <path d="M48 120c0-4.416-3.584-8-8-8-22.064 0-40 17.952-40 40v16c0 13.232 10.768 24 24 24h16c4.416 0 8-3.584 8-8s-3.584-8-8-8v-48c4.416 0 8-3.584 8-8zM344 112c-4.416 0-8 3.584-8 8s3.584 8 8 8v48c-4.416 0-8 3.584-8 8s3.584 8 8 8h16c13.232 0 24-10.768 24-24v-16c0-22.048-17.936-40-40-40zM136 336c-4.416 0-8 3.584-8 8h-48c0-4.416-3.584-8-8-8s-8 3.584-8 8v16c0 13.232 10.768 24 24    24h32c13.232 0 24-10.768 24-24v-16c0-4.416-3.584-8-8-8zM312 336c-4.416 0-8 3.584-8 8h-48c0-4.416-3.584-8-8-8s-8 3.584-8 8v16c0 13.232 10.768 24 24 24h32c13.232 0 24-10.768 24-24v-16c0-4.416-3.584-8-8-8zM312 0h-240c-22.064 0-40 17.952-40 40v272c0 22.048 17.936 40 40 40h240c22.064 0 40-17.952 40-40v-272c0-22.048-17.936-40-40-40zm-208 32h176c13.232 0 24 10.768 24 24s-10.768 24-24 24h-176c-13.232 0-24-10.768-24-24s10.768-24 24-24zm0 272c-13.232 0-24-10.768-24-24s10.768-24 24-24 24 10.768 24 24-10.768 24-24 24zm176 0c-13.232 0-24-10.768-24-24s10.768-24 24-24 24 10.768 24 24-10.768 24-24 24zm40-104c0 13.232-10.768 24-24 24h-208c-13.232 0-24-10.768-24-24v-80c0-13.232 10.768-24 24-24h208c13.232 0 24 10.768 24 24v80z"/>
              </svg>
              <!-- <img title="transit" src="<?php //echo get_theme_file_uri('img/transit.svg'); ?>" width="35px;"/> -->
            </button>

            <button class="button-quin switch" value="WALKING">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64.06 95.8">
                <title>walking</title>
                <circle cx="35.67" cy="7.95" r="7.95"/><path d="M77.92 42.85c-2.21-.38-11-1.92-11.55-2.08l-.19-.28c-.18-.29-7.9-16.56-8.65-17.41a13.78 13.78 0 0 0-5.74-3.95 8.45 8.45 0 0 0-5.79.57s-14.53 8.3-15.47 8.74a6 6 0 0 0-1.79 2.17l-6.74 12.71a4 4 0 0 0-.89 2.54 4.09 4.09 0 0 0 8.07 1l6.31-11.93 4-2.21c-.28.85-3.9 18.49-3.9 18.49l-3.74 20.84-12.85 15.49a4.72 4.72 0 1 0 7.06 6.18c2.34-2.72 14.19-16.72 15.33-18.05a6.39 6.39 0 0 0 1.79-3.24c.19-1 2.31-13.74 2.31-13.74l12.13 12.14v21.4a4.75 4.75 0 0 0 9.45 0v-.58c0-3.26-.12-19.5 0-23.17.15-4.1-1.31-5-1.64-5.37l-11.62-12.41 2.49-12.09s3.25 6.35 3.58 7a4.35 4.35 0 0 0 2.44 2.21c1.09.24 14.59 3 14.59 3a4.07 4.07 0 0 0 .61.06 4 4 0 0 0 .4-8z" transform="translate(-17.48 -.69)"/>
              </svg>

              <!-- <img title="walking" src="<?php //echo get_theme_file_uri('img/walking.svg'); ?>" width="35px;"/> -->
            </button>
            <button class="button-quin switch" value="BICYCLING" onclick="showBicycles()">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 780.3 780.4" enable-background="new 0 0 780.3 780.4">
                <title>Bicycling</title>
                <g id="layer1"><path id="path9848" class="st0" d="M618.222 328.495c-14.2 0-28 2.1-41 5.6l-25.6-56.5c-.2-.6-.8-1-1-1.5-2.6-7-9-12-16.8-12h-244l38.2-79.6h65c4.8 0 8.8-4.1 8.8-9v-27.9c0-5-4-9-8.8-9h-80.6l-.6.2c-7.2-.4-14 3.3-17.4 10.1l-86.4 180.3c-.2.7-.4 1.3-.4 2-14.6-4.4-29.8-6.8-45.6-6.8-86.4 0-156.6 70.1-156.6 156.6s70.2 156.6 156.6 156.6c86.6 0 156.6-70.1 156.6-156.6 0-54.6-28-102.6-70.4-130.7.4-.4.8-.8 1-1.3l18.8-39.2h248l19.4 42.7c-44.2 27.7-73.8 76.7-73.8 132.6 0 86.5 70.2 156.6 156.6 156.6 86.6 0 156.6-70.1 156.6-156.6 0-86.4-70-156.5-156.6-156.6zm-342.8 152.4c0 62.6-50.6 113.5-113.4 113.5-62.6 0-113.4-50.8-113.4-113.5 0-62.6 50.8-113.4 113.4-113.4 9.2 0 18.2 1.2 27 3.3l-47.6 101.8c-5.4 11.4-.4 25 11 30.4 11.2 5.4 25 .5 30.4-10.9l47.4-101.7c27.4 20.7 45.2 53.5 45.2 90.5zm342.8 117.7c-62.6 0-113.4-50.8-113.4-113.5 0-38.5 19.2-72.4 48.4-92.9l46.8 103.1c5 11.5 18.6 16.7 30.2 11.5 11.4-5.1 16.6-18.6 11.4-30.2l-46.4-102.6c7.4-1.6 15.2-2.4 23-2.4 62.8 0 113.6 50.8 113.6 113.5s-50.8 113.5-113.6 113.5"/><path id="path9850" class="st0" d="M600.222 203.395l-130.6-.8s-12 2.4-13.6 14.7c-1.6 12.3 11 17.4 11 17.4l82.6 10.9s40.2 6.4 50.6-42.2"/></g>
              </svg>
              <!-- <img title="bicycling" src="<?php //echo get_theme_file_uri('img/bicycling.svg'); ?>" width="35px;"/> -->
            </button>
            <button class="button-quin switch" value="DRIVING">
              <svg viewBox="0 0 384 384" xmlns="http://www.w3.org/2000/svg">
                <title>Driving</title>
                <path d="M324.288 223.024l-24.976 24.976h83.504c.704-7.52 1.184-15.616 1.184-24 0-2.8-.192-5.36-.336-8h-42.416c-6.304 0-12.496 2.56-16.96 7.024zM147.744 248h88.512l26.672-32h-141.856zM59.712 223.024c-4.464-4.464-10.656-7.024-16.96-7.024h-42.416c-.144 2.64-.336 5.2-.336 8 0 8.384.48 16.48 1.184 24h83.504l-24.976-24.976zM280 264c-3.232 0-6.16-1.952-7.392-4.944-1.232-2.992-.544-6.432 1.728-8.72l38.624-38.624c7.568-7.552 17.6-11.712 28.288-11.712h40.672c-4.256-22.24-15.264-37.184-34.224-47.088-22.048-11.536-71.536-16.912-155.696-16.912s-133.648 5.376-155.696 16.912c-18.96 9.904-29.968 24.848-34.224 47.088h40.672c10.688 0 20.72 4.16 28.288 11.712l38.624 38.624c2.288 2.288 2.976 5.728 1.728 8.72-1.248 2.992-4.16 4.944-7.392 4.944h-100.832c2.256 15.024 4.912 25.344 5.104 26.064.928 3.504 4.096 5.936 7.728 5.936h70.112l30.32 15.152c1.104.56 2.336.848 3.568.848h144c1.232 0 2.464-.288 3.584-.848l30.32-15.152h70.096c3.632 0 6.8-2.432 7.728-5.936.192-.72 2.848-11.04 5.104-26.064h-100.832zm-33.856-2.88c-1.52 1.824-3.776 2.88-6.144 2.88h-96c-2.368 0-4.624-1.056-6.144-2.88l-40-48c-2-2.384-2.416-5.712-1.104-8.512 1.328-2.816 4.144-4.608 7.248-4.608h176c3.104 0 5.92 1.792 7.248 4.608 1.312 2.8.896 6.128-1.104 8.512l-40 48zM344 168c-3.072 0-6.032-1.792-7.344-4.816-18.064-41.6-40.16-87.792-45.872-93.12-6.128-5.2-32.192-14.064-90.784-14.064h-16c-58.592 0-84.656 8.864-90.816 14.096-5.68 5.296-27.776 51.504-45.84 93.088-1.76 4.064-6.496 5.904-10.528 4.144-4.048-1.76-5.904-6.464-4.16-10.528 9.088-20.928 39.568-89.904 50.16-98.912 13.2-11.2 51.008-17.888 101.184-17.888h16c50.176 0 87.984 6.688 101.184 17.904 10.592 9.008 41.056 77.984 50.16 98.912 1.744 4.048-.112 8.768-4.16 10.528-1.024.448-2.128.656-3.184.656zM104 288c-4.144 0-7.424 3.184-7.84 7.216l-64.16-6.416v-.8c0-4.416-3.584-8-8-8s-8 3.584-8 8v32c0 13.232 10.768 24 24 24h48c13.232 0 24-10.768 24-24v-24c0-4.416-3.584-8-8-8zM360 280c-4.416 0-8 3.584-8 8v.8l-64.16 6.416c-.416-4.032-3.696-7.216-7.84-7.216-4.416 0-8 3.584-8 8v24c0 13.232 10.768 24 24 24h48c13.232 0 24-10.768 24-24v-32c0-4.416-3.584-8-8-8z"/>
              </svg>
              <!-- <img title="driving" src="<?php //echo get_theme_file_uri('img/driving.svg'); ?>" width="35px;"/> -->
            </button>
            <button class="button-quin help-toggle" value="DRIVING">
              <svg enable-background="new 0 0 50 50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"><path d="m33.8 46.9c-2 .8-3.7 1.4-4.9 1.8s-2.6.6-4.2.6c-2.5 0-4.4-.6-5.8-1.8s-2-2.7-2-4.6c0-.7.1-1.5.2-2.2.1-.8.3-1.6.5-2.6l2.6-9c.2-.9.4-1.7.6-2.5s.2-1.5.2-2.1c0-1.1-.2-2-.7-2.4-.5-.5-1.4-.7-2.7-.7-.7 0-1.3.1-2 .3s-1.3.4-1.8.6l.7-2.8c1.7-.7 3.3-1.3 4.8-1.7 1.5-.5 3-.7 4.3-.7 2.5 0 4.4.6 5.7 1.8s2 2.7 2 4.6c0 .4 0 1.1-.1 2.1s-.3 1.9-.5 2.7l-2.5 9c-.2.7-.4 1.5-.6 2.5-.2.9-.2 1.6-.2 2.1 0 1.2.3 2 .8 2.5.5.4 1.5.6 2.8.6.6 0 1.3-.1 2.1-.3s1.3-.4 1.7-.6zm-.5-36.6c-1.2 1.1-2.6 1.7-4.3 1.7s-3.1-.6-4.3-1.7-1.8-2.4-1.8-4 .6-2.9 1.8-4 2.6-1.7 4.3-1.7 3.1.6 4.3 1.7 1.8 2.5 1.8 4c0 1.6-.6 2.9-1.8 4z"/></svg>
            </button>

          </div>
          <p class="help-text hidden">Where do you want to go?</p>
          <div class="dir-tab-toggles button-container">
            <?php if($_COOKIE['schoolname'] == 'westerdals' || empty($_COOKIE['schoolname'])){ ?>
              <button class="button-third toggle tablinks-dir-timeEdit button-left highlight" onclick="changeDirectionsSettings('googleMapsInput', 'timeEdit');">Next Lecture</button>
              <button class="button-third toggle tablinks-dir-campus button-mid" onclick="changeDirectionsSettings('googleMapsInput', 'campus');">To Campus</button>
              <button class="button-third toggle tablinks-dir-custom button-right" onclick="changeDirectionsSettings('googleMapsInput', 'custom');">Custom</button>
            <?php  } else { ?>
              <button class="button-half toggle tablinks-dir-campus button-left highlight" onclick="changeDirectionsSettings('googleMapsInput', 'campus');">To Campus</button>
              <button class="button-half toggle tablinks-dir-custom button-right" onclick="changeDirectionsSettings('googleMapsInput', 'custom');">Custom</button>
            <?php } ?>
          </div>
          <!-- SELECTORS END -->
          <!-- TIMEEDIT START -->
          <div id="dir-tab-timeEdit" class="dir-tab-content <?php if(empty($_COOKIE['schoolname']) || $_COOKIE['schoolname'] == 'westerdals'){ echo 'active'; }?>">

            <p class="help-text hidden">How long before lecture starts would you like to arrive?</p>
            <div class="button-container not-help-btn-margin-toggle">
              <button id="timeMargin15" class="button-third toggle button-left highlight" onclick="changeDirectionsSettings('timeMargin', 15);">15m before lecture</button>
              <button id="timeMargin10" class="button-third toggle button-mid" onclick="changeDirectionsSettings('timeMargin', 10);">10 min</button>
              <button id="timeMargin5" class="button-third toggle button-right" onclick="changeDirectionsSettings('timeMargin', 5);">5 min</button>
            </div>
            <div class="last-btn-container">
              <button class="button button-full collapse-controls highlight" onclick="teDirectionReq();">Go!</button>
            </div>
          </div>
          <!-- TIMEEDIT END -->
          <!-- CAMPUS START -->
          <div id="dir-tab-campus" class="dir-tab-content <?php if($_COOKIE['schoolname'] == 'kristiania'){ echo 'active'; }?>">
            <div class="button-container">
              <button class="button-triple collapse-controls" onclick="placeIdDirectionReq('ChIJ3UCFx2BuQUYROgQ5yTKAm6E')">Fjerdingen</button>
              <button class="button-triple collapse-controls" onclick="placeIdDirectionReq('ChIJRa81lmRuQUYR3l1Nit90vao')">Vulkan</button>
              <button class="button-triple collapse-controls" onclick="placeIdDirectionReq('ChIJ-wIZN4huQUYR5ZhO0YexXl0')">Kvadraturen</button>
            </div>
          </div>
          <!-- CAMPUS END -->
          <!-- CUSTOM START -->
          <div id="dir-tab-custom" class="dir-tab-content">
            <div id="departure-container">
              <input id="departure" type="text" name="FirstName" placeholder="From" onclick="clearInputText();" onchange="changeDirectionsSettings('departureLoc', this.value); ">
              <button class="button myLoc-btn" onclick="changeDirectionsSettings('departureLoc', currentLocation); changeInputValue();">
                <svg height="30" viewBox="0 0 384 384" width="30" xmlns="http://www.w3.org/2000/svg">
                  <title>My Location</title>
                  <g fill="white" transform="scale(16)"><path d="m12 16.5c-2.481 0-4.5-2.019-4.5-4.5s2.019-4.5 4.5-4.5 4.5 2.019 4.5 4.5-2.019 4.5-4.5 4.5zm0-8c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5z"/><path d="m12 21.5c-5.238 0-9.5-4.262-9.5-9.5s4.262-9.5 9.5-9.5 9.5 4.262 9.5 9.5-4.262 9.5-9.5 9.5zm0-18c-4.687 0-8.5 3.813-8.5 8.5s3.813 8.5 8.5 8.5 8.5-3.813 8.5-8.5-3.813-8.5-8.5-8.5z"/><path d="m12 3.5c-.276 0-.5-.224-.5-.5v-2c0-.276.224-.5.5-.5s.5.224.5.5v2c0 .276-.224.5-.5.5z"/><path d="m23 12.5h-2c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h2c.276 0 .5.224.5.5s-.224.5-.5.5z"/><path d="m3 12.5h-2c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h2c.276 0 .5.224.5.5s-.224.5-.5.5z"/><path d="m12 23.5c-.276 0-.5-.224-.5-.5v-2c0-.276.224-.5.5-.5s.5.224.5.5v2c0 .276-.224.5-.5.5z"/></g></svg>
              </button>
            </div>
            <br>
            <input id="destination" type="text" name="FirstName" placeholder="To" onchange="changeDirectionsSettings('destinationLoc', this.value)"><br>
            <div class="last-btn-container">
              <button class="button button-full highlight" onclick="customDirectionReq()">Go!</button>
            </div>
          </div>
          <!-- CUSTOM END -->

        </div>
        <!-- DIRECTIONS TAB END  -->

        <!-- CAMPUS TAB START -->
        <div id="main-tab-campus" class="padding main-tab-content">
          <div class="button-container last-btn-container">
            <button class="button-triple sidebar-toggle" value="campus-fjerdingen" onclick="clickPoiMarker('Fjerdingen'); removeDirections()">Fjerdingen</button>
            <button class="button-triple sidebar-toggle" value="campus-vulkan" onclick="clickPoiMarker('Vulkan'); removeDirections()">Vulkan</button>
            <button class="button-triple sidebar-toggle" value="campus-kvadraturen" onclick="clickPoiMarker('Kvadraturen'); removeDirections()">Kvadraturen</button>
          </div>
        </div>
        <!-- CAMPUS TAB END -->

        <!-- ALTERNATIVER TAB START -->
        <div id="main-tab-alternativer" class="padding main-tab-content">
          <!-- <div class="button-container ">
            <button class="button-double btn-disabled">mat</button>
            <button class="button-double btn-disabled" onclick="alertThis();">sosialt</button>
          </div> -->
          <div class="button-container">
            <button id="dump-sql" class="button-double mySqlButton">Export SQL</button>
            <button id="import-sql" class="button-double mySqlButton">Import SQL</button>
          </div>
          <div class="button-container">
            <button class="button-double" onclick="showNotification('logged out', 0, 5000, 'red'); deletecookie();">Logg ut/ Delete Cookie</button>
            <button class="button-double" onclick="getTE();">Get TimeEdit JSON</button>
          </div>
          <input id="alternativeDeparture" type="text" name="fromhere" placeholder="From here" onchange="changeDirectionsSettings('altDepartureLoc', this.value)"><br>

          <div class="button-container last-btn-container">
            <button class="button-double" onclick="showBicycles();">Show bicycles</button>
            <button class="button-double" onclick="directionsReqNewDep()" >Herfra isteden</button>
          </div>
        </div>
        <!-- ALTERNATIVER TAB END -->

      </div><!-- END CONTROLS-CONTAINER -->
      <!--<div id="slide-container-pull"><p>pull</p>-->
      <div id="slide-container" class="slide-container-anim">
        <div id="slide-containerheader">
          <div id="slide-containerheader-top" class="flexRowNo disable-selection">
            <svg class='open-close-slidebar' style='height: 30px; position:absolute; right: 1em; transform: rotate(180deg);' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' enable-background='new 0 0 24 24'>
                    <path fill='#000000' stroke-miterlimit='10'  d='M23 6.5c-.3-.3-.8-.3-1.1 0l-9.9 9.9-9.9-9.9c-.3-.3-.8-.3-1.1 0s-.3.8 0 1.1l10.5 10.4c.1.1.3.2.5.2s.4-.1.5-.2l10.5-10.4c.3-.3.3-.8 0-1.1z'/>
            </svg>
          </div>
          <div id="slide-containerheader-bottom">

          </div>
         </div>
                 <?php //include("overview.php"); ?>
        <div id="back-btn-container" value="campus-kvadraturen" class="hidden">
          <button class="button">
            <svg height="30" viewBox="0 0 384 384" width="30" xmlns="http://www.w3.org/2000/svg"><path fill="white" d="m11.5 4h-1.5v-3.5c0-.197-.115-.375-.295-.456-.179-.082-.39-.048-.537.083l-9 8c-.107.095-.168.231-.168.374s.061.279.168.374l9 8c.148.132.358.164.537.083s.295-.259.295-.456v-3.512c.049.001.097.003.146.004.117.004.235.007.354.007 4.178 0 8.5 2.244 8.5 6 0 1.383-.973 3.132-1.878 4.172-.158.181-.164.449-.015.638.098.124.244.19.393.19.079 0 .158-.019.231-.058 3.691-1.929 6.269-5.812 6.269-9.443 0-5.691-5.724-10.5-12.5-10.5zm7.771 17.714c.434-.888.73-1.844.73-2.713 0-4.382-4.83-7-9.5-7-.109 0-.216-.004-.323-.007-.117-.004-.232-.007-.347-.007-.127 0-.253.004-.378.016-.256.025-.452.241-.452.498v2.887l-7.748-6.887 7.748-6.887v2.887c0 .276.224.5.5.5h2c6.233 0 11.5 4.351 11.5 9.5 0 2.578-1.461 5.308-3.73 7.213z" transform="scale(16)"/></svg>
          </button>
        </div>

        <div id="weather-box" class="weather-emphasis weather-container flex flexCenter hidden">
          <div class="weather-icon"><img src="<?php echo get_theme_file_uri('img/Partlycloud.svg'); ?>" alt=""></div>
          <div class="weather-temperature">00°</div>
          <h3 class="weather-title">Vulkan</h3>
        </div>

        <div id="help-box" class="hidden">
          <h3 class="">HEELP!</h3>
        </div>

        <?php // Campus query

          // display errors
          ini_set('display_errors', 1);
          ini_set('display_startup_errors', 1);
          error_reporting(E_ALL);

          // MySQLi connection settings
          $host = $config['host'];
          $user = $config['user'];
          $pass = $config['pass'];
          $dbname = $config['name'];
          $port = $config['port'];

          /*// MySQLi connection settings
          $host = 'tek.westerdals.no';
          $user = 'heijon17_user';
          $pass = 'Webprosjekt18';
          $dbname = 'heijon17_webpro_';
          $port = 3306*/
          // Create connection
          $conn = new mysqli($host, $user, $pass, $dbname, $port);
          // Check connection
          if (mysqli_connect_error()) {
              die("Database connection failed: " . mysqli_connect_error());
          }
          /* change character set to utf8 */
          if (!$conn->set_charset("utf8")) {
              printf("Error loading character set utf8: %s\n", $mysqli->error);
              exit();
          } else {
              // printf("Current character set: %s\n", $conn->character_set_name());
          }
            //echo "Connected successfully";


          $POIArray = array();
          $campusArray = array();

          // campus query
          $result = $conn->query("SELECT * FROM campus");

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
                <div class="campus-info flexColNo" style="background-image: linear-gradient(60deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.4)), url('<?php echo get_theme_file_uri($campusImgPath); ?>');">
                  <div class="campus-info-top flexRowNo">
                    <div class="campus-titles-container">
                      <h1 class="campus-emphasis-title"><?php echo $campusName ?></h1>
                      <h3 class="campus-emphasis-subtitle"><?php echo $campusAddress ?></h3>
                    </div>

                    <div class="campus-weather-container flexRowNo">
                      <div class="weather-icon"><img src="<?php echo get_theme_file_uri('img/Partlycloud.svg'); ?>" alt=""></div>
                      <div class="weather-temperature">
                        <h3>24°</h3>
                      </div>
                    </div>
                  </div>

                  <div class="campus-info-bottom hidden">
                    <div class="lecture-container">
                      <hr>
                      <h1 class="lecture-title">Programmering</h1>
                      <h3 class="lecture-room">Auditorium - F101</h3>
                      <p class="lecture-time">13.15 - 15.15</p>
                      <p class="lecture-date">15.05</p>
                    </div>
                  </div>



                </div>
                <div class="tab-container-half campus-content-toggle-container">
                  <button class="tablinks-campus sidebar-toggle disable-selection active" value="campus-poi-<?php echo strtolower($campusName) ?>" onclick="clickPoiMarker('<?php echo $campusName ?>'); removeDirections();">Local Area</button>
                  <button class="tablinks-campus sidebar-toggle disable-selection" value="campus-dir-<?php echo strtolower($campusName) ?>" onclick="destinationDirectionReq({placeId: '<?php echo $campusPlaceId ?>'})">Directions</button>
                </div>


              </div>
              <div class="emphasis-poi-container campus-emphasis-<?php echo strtolower($campusName) ?>-pois hidden">

                <?php // POI Query

                // second query
                $result2 = $conn->query("SELECT * FROM poi WHERE campus_assoc LIKE '{$campusId}' ORDER BY vote DESC"); //WHERE campus_assoc LIKE '{$campusId}' ORDER BY vote DESC");

                if ($result2->num_rows > 0) {
                    // output data of each row
                    while($row2 = $result2->fetch_assoc()) {

                      $POIArray[] = $row2;
                      // set temp variables to current campus
                      $poiPlaceId = $row2["placeID"];
                      $poiTagsImploded = $row2["tags"];
                      $poiVote = $row2["vote"];
                      $poi_name = $row2["name"];

                      // separate tag single string into string array
                      $tagsArray = explode(" ", $poiTagsImploded);

                      // Get details about place ID
                      // $googleMaps_placeIdRequest = 'https://maps.googleapis.com/maps/api/place/details/json?placeid='. $poiPlaceId . '&key=AIzaSyAcEPRn3WzY8AXDvnFP_WIgVTfbXodNhU4';
                      // $placeID_getDetails_json = file_get_contents($googleMaps_placeIdRequest);
                      // $placeID_getDetails_array = json_decode($placeID_getDetails_json, true);
                      //
                      // // Get name from placeID
                      // $poi_name = $placeID_getDetails_array['result']['name'];

                      // display results from pois matching campus
                      ?>
                      <div class="poi">
                        <div class="poi-vote">
                          <svg class="poi-vote-up not-locked" value="<?php echo $poiPlaceId ?>" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" enable-background="new 0 0 24 24">
                            <path fill="#000000" stroke-miterlimit="10"  d="M23 6.5c-.3-.3-.8-.3-1.1 0l-9.9 9.9-9.9-9.9c-.3-.3-.8-.3-1.1 0s-.3.8 0 1.1l10.5 10.4c.1.1.3.2.5.2s.4-.1.5-.2l10.5-10.4c.3-.3.3-.8 0-1.1z"/>
                          </svg>
                          <p id="poi-vote-points-<?php echo $poiPlaceId ?>" class="poi-vote-points"><?php echo $poiVote ?></p>
                          <svg class="poi-vote-down not-locked" value="<?php echo $poiPlaceId ?>" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" enable-background="new 0 0 24 24">
                            <path fill="#000000" stroke-miterlimit="10"  d="M23 6.5c-.3-.3-.8-.3-1.1 0l-9.9 9.9-9.9-9.9c-.3-.3-.8-.3-1.1 0s-.3.8 0 1.1l10.5 10.4c.1.1.3.2.5.2s.4-.1.5-.2l10.5-10.4c.3-.3.3-.8 0-1.1z"/>
                          </svg>
                        </div> <!-- POI-VOTE END -->
                        <div class="poi-content">
                          <div class="poi-info-container">
                            <div class="poi-title-opening-container">
                              <h3 class="poi-title" onclick="clickPoiMarker('<?php echo $poi_name ?>')"><?php echo $poi_name ?></h3>
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
                          <button class="button" onclick="destinationDirectionReq(<?php echo "{placeId: '" . $poiPlaceId . "'}" ?>,true)">Directions</button>
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
               <!-- CAMPUS <?php echo strtoupper($campusName) ?> END -->

                <?php

              } // end $result loop
          } else {
              echo "0 campus";
          }

          $conn->close();
        ?>

        <script type="text/javascript">
          var POIdb = <?php echo json_encode($POIArray);?>;
          var campusdb = <?php echo json_encode($campusArray);?>;
        </script>

        <div class="direction-emphasis">
            <h3 class="direction-title">Directions to Vulkan: </h3>
          <div id="routes">
          </div>
        </div> <!-- DIRECTION CONTAINER END -->


      </div> <!-- SLIDE CONTAINER END -->
    <!--</div> --><!-- slide container container end lul -->

    <?php if(empty($_COOKIE['schoolname'])){

      } else {
          echo '<script type="text/javascript">',
               'showNotification("", 1500, 1500);',
               '</script>';
     } ?>
      <script type="text/javascript">
      $(document).ready(function() {
        onPageLoadChangeWeather();
      });
      </script>
      <script>
      var isMobile = detectmob(); //
      dragElement(document.getElementById("slide-container"), isMobile);  //skal være isMobile
      </script>
      <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCBJMaLWrLYd6guyZ-AkGsXQBLxXQnipvM&libraries=places&callback=initMap&v=3.exp"></script>
    </div><!-- PAGE CONTAINER END -->

  </body>
</html>
