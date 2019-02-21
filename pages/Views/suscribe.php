<?php
  $title="Suscribe";
  echo '<form action="?action=suscribe" method="post">';
      echo '<input type="text" name="username" placeholder="Enter your username" required>';
      echo '<input type="text" name="name" placeholder="Enter your name" required>';
      echo '<input type="text" name="email" placeholder="Enter your e-mail" required>';
      echo '<input type="password" name="password" placeholder="Enter your password" required>';
      echo '<input type="submit" value="Login">';
  echo '</form>';
  $content=ob_get_clean();
  require("pages/Views/layout.php");
?>
