<?php
  $title="Suscribe";
?>
  <div class="container bg-info mt-5">
    <form action="?action=suscribe" method="post" class="px-4 py-3">
        <div class="form-group">
          <label>Username</label>
          <input type="text" class="form-control" name="username" placeholder="Enter your username" required>
        </div>
        <div class="form-group">
          <label>Name</label>
          <input type="text" class="form-control" name="name" placeholder="Enter your name" required>
        </div>
        <div class="form-group">
          <label>E-mail</label>
          <input type="text" class="form-control" name="email" placeholder="Enter your e-mail" required>
        </div>
        <div class="form-group">
          <label>Pasword</label>
          <input type="password" class="form-control" name="password" placeholder="Enter your password" required>
        </div>
        <input type="submit" value="Suscribe" class="btn btn-warning send">
    </form>
  </div>
<?php
  $content=ob_get_clean();
  require("pages/Views/layout.php");
?>
