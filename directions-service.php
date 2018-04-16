<?php /* Template name: Andreas Testing */ ?>

<?php echo "andreas testing";
?>
<!DOCTYPE html>
<html>
  <head>
    <style>
       #map {
         height: 400px;
         width: 100%;
       }
    </style>
    <script>var wppath =  "<?php echo get_theme_file_uri(); ?>"</script>
    <script src="<?php echo get_theme_file_uri('js/directions.js'); ?>"></script>

</head>
<body>
    <button onclick="teDirectionReq()">Click me</button><br>
    <h3>Directions service</h3>
    <div id="map"></div>

    <script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAcEPRn3WzY8AXDvnFP_WIgVTfbXodNhU4&callback=directionsInitFallback">
    </script>
  </body>
</html>
