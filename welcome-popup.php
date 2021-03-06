<?php /* Template name: Welcome */ ?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

  <link href="<?php echo get_theme_file_uri('css/master.css'); ?>" rel="stylesheet" type="text/css" />
  <script src="<?php echo get_theme_file_uri('js/welcome.js'); ?>"></script>

  <script>var wppath =  "<?php echo get_theme_file_uri(); ?>"</script>
  <title>New welcome test</title>
</head>
<body>
  <div class="page-container">
    <h1 class="page-title">Velg skole:</h1>

    <div id="welcome-container" class="welcome-container padding <?php echo (!empty($_COOKIE['schoolname']) ?  'hidden' :  '') ?>">
      <div class="text-container">
        <p class="disclaimer">
          This website uses cookies, by clicking continue blabla... <br />
          By clicking continue you accept that we might data timeedit blabla..
        </p>
      </div>
      <div class="img-container">
        <img class="highlight" src="<?php echo get_theme_file_uri('img/wlogo400x400.jpg'); ?>" alt="westerdals-logo" onclick="setSchool('westerdals');">
        <img class="" src="<?php echo get_theme_file_uri('img/kristiania.png'); ?>" alt="kristiania-logo" onclick="setSchool('kristiania');">
      </div>

      <input type="text" name="fullName" placeholder="Full Name" id="nameInput">

      <div class="button-container" id="continue-button-container">
        <button class="button-double" id="approve-disclaimer" name="setcookie" value="true" onclick="postSchool();">Save settings & continue</button>
        <button class="button-double">Continue without timeEdit</button>
      </div>



    </div><!-- welcome-container END -->

    <?php echo $_COOKIE['schoolname']?>
    <button id="deletecookie" class="<?php echo (!empty($_COOKIE['schoolname']) ?  '' :  'hidden') ?>" type="button" name="deletecookie" value="true" onclick="deletecookie();">Delete cookie</button>



    <button id="ajaxtimeedit" type="button" name="" value="true" onclick="getTE();">Get timeedit JSON</button>




  </div>

</body>
</html>
