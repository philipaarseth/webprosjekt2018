<?php /* Template name: GoogleMaps Testing */ ?>

<!DOCTYPE html>
<html>
  <head>
    <link href="<?php echo get_theme_file_uri('css/master.css'); ?>" rel="stylesheet" type="text/css" />
    <script src="<?php echo get_theme_file_uri('js/map.js'); ?>"></script>
    <script src="<?php echo get_theme_file_uri('js/directions.js'); ?>"></script>
  </head>
  <body>
    <div class="page-container">
      <button style="position: absolute; z-index: 100;" onclick="zoomThing2('Vulkan')">Zoom kristiania</button>

      <div id="map">

      </div>
      <div id="poi-marker-popup">

      </div>
    </div>
    <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAcEPRn3WzY8AXDvnFP_WIgVTfbXodNhU4&libraries=places&callback=initMap"></script>
    </script>


  </body>
</html>
