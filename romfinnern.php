<?php /* Template name: RomFinnern */ ?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link href="<?php echo get_theme_file_uri('css/rom.css'); ?>" rel="stylesheet" type="text/css" />
  <title>Romfinnern</title>
</head>
  <body>
    <div class="page-container">

      <div class="suggestion-container">
        <h1 class="free-rooms">Rom som er ledige hele dagen:</h1>
        <?php for ($i=0; $i < 2; $i++) { ?>
          <div class="suggestion flex flexCenter">
            <h1 class="suggestion-title"><?php echo "Rom 310" ?></h1>
          </div>

        <?php } ?>
        <h1 class="free-rooms">Rom som er ledige deler av dagen:</h1>
        <?php for ($i=0; $i < 3; $i++) { ?>
          <div class="suggestion flex flexCenter">
            <h1 class="suggestion-title"><?php echo "Rom 310 - ledig mellom 12 - 14" ?></h1>
          </div>
        <?php } ?>
      </div> <!-- SUGGESTION CONTAINER END -->

    </div> <!-- PAGE CONTAINER END -->

  </body>
</html>
