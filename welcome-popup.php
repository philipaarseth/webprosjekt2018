

<?php /* Template name: Welcome */ ?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <title>Timeedit</title>
    <link href="<?php echo get_theme_file_uri('css/master.css'); ?>" rel="stylesheet" type="text/css" />
    <script src="<?php echo get_theme_file_uri('js/welcome.js'); ?>"></script>
    <script>var wppath =  "<?php echo get_theme_file_uri(); ?>"</script>

    <style>

    .welcome-popup-container {
      min-height: 400px;
      width: 80%;
      background: cyan;
      margin:auto;
      border-radius: 5px;
    }

    .slogo{
      width: 200px;
    }

    .hidden{
      display: none;
    }



    </style>
</head>
<body>

  <div class="welcome-popup-container <?php echo (!empty($_COOKIE['schoolname']) ?  'hidden' :  '') ?>" id="welcome-popup">
    <span>Velkommen.</span>
    <br/><br/>
    <span>Velg skole:</span>
    <br/>
    <img class="slogo" src="<?php echo get_theme_file_uri('img/wlogo400x400.jpg'); ?>" onclick="setSchool('westerdals');"/>
    <img class="slogo" src="<?php echo get_theme_file_uri('img/klogo960x960.png'); ?>" onclick="setSchool('kristiania');"/>

    <br/>
    <span>This website uses cookies, by clicking continue blabla...</span><br/>
    <span>By clicking continue you accept that we might data timeedit blabla..</span><br/>

    <br/>
    <button type="button" name="setcookie" value="true" onclick="postSchool();">Continue/Set cookie/whatever</button>

  </div>

  <?php echo $_COOKIE['schoolname']?>
  <button id="deletecookie" class="<?php echo (!empty($_COOKIE['schoolname']) ?  '' :  'hidden') ?>" type="button" name="deletecookie" value="true" onclick="deletecookie();">Delete cookie</button>


</body>
</html>
