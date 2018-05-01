
  <div id="welcome-container-philip">
  <div id="welcome-container" class="welcome-container padding <?php echo (!empty($_COOKIE['schoolname']) ?  'hidden' :  '') ?>">
    <h1 class="page-title">Velg skole:</h1>

    <div class="text-container">
      <p class="disclaimer">
        This website uses cookies, by clicking continue blabla... <br />
        By clicking continue you accept that we might data timeedit blabla..
      </p>
    </div>
    <div class="img-container">
      <img class="highlight" src="<?php echo get_theme_file_uri('img/wlogo400x400.jpg'); ?>" alt="westerdals-logo" onclick="setSchool('westerdals');">
      <img class="" src="<?php echo get_theme_file_uri('img/klogo960x960.png'); ?>" alt="kristiania-logo" onclick="setSchool('kristiania');">
    </div>

    <input type="text" name="fullName" placeholder="Full Name" id="nameInput">

    <div class="button-container" id="continue-button-container">
      <button class="button-double" id="approve-disclaimer" name="setcookie" value="true" onclick="postSchool();">Save settings & continue</button>
      <button class="button-double">Continue without timeEdit</button>
    </div>



  </div><!-- welcome-container END -->

</div>
