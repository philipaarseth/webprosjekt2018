<?php /* Template name: MySQL dump */ ?>

<?php include(get_theme_file_uri('mysql-dump.php')); ?>

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
    <script type="text/javascript">
      $(document).ready(function() {
        $('#dump-sql').click(function(){
          // alert('msg');
          $.ajax({
              type: "POST",
              url: wppath + "/mysql-dump.php",
              success: function(data){
                  console.log('Return: ' + data);
              }
          });
        });
        $('#import-sql').click(function(){
          // alert('msg');
          $.ajax({
              type: "POST",
              url: wppath + "/mysql-import.php",
              success: function(data){
                  console.log('Return: ' + data);
              }
          });
        });
      });
    </script>
  </head>
  <body>

    <div class="page-container flexColNo flexCenter">
      <h1 class="page-title">->Campus</h1>
      <button id="dump-sql" class="button highlight">Dump SQL</button>
      <button id="import-sql" class="button highlight">import SQL</button>

    </div><!-- PAGE CONTAINER END -->

  </body>
</html>
