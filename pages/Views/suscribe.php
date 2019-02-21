<?php
  $title="Suscribe";
  echo '<div class="container bg-info mt-5">';
    echo '<form action="?action=suscribe" method="post" class="px-4 py-3">';
        echo '<div class="form-group">';
          echo '<label>Username</label>';
          echo '<input type="text" class="form-control" name="username" placeholder="Enter your username" required>';
        echo '</div>';
        echo '<div class="form-group">';
          echo '<label>Name</label>';
          echo '<input type="text" class="form-control" name="name" placeholder="Enter your name" required>';
        echo '</div>';
        echo '<div class="form-group">';
          echo '<label>E-mail</label>';
          echo '<input type="text" class="form-control" name="email" placeholder="Enter your e-mail" required>';
        echo '</div>';
        echo '<div class="form-group">';
          echo '<label>Pasword</label>';
          echo '<input type="password" class="form-control" name="password" placeholder="Enter your password" required>';
        echo '</div>';
        echo '<input type="submit" value="Suscribe" class="btn btn-warning send">';
    echo '</form>';
  echo '</div>';
  $content=ob_get_clean();
  require("pages/Views/layout.php");
?>
