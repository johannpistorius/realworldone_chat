<?php
  $title="Login";
?>
  <div class="container bg-info mt-5">
    <form action="?action=login" method="post" class="px-4 py-3">
        <div class="form-group">
          <label>Username</label>
          <input type="text" class="form-control" name="username" placeholder="Enter your username" required>
        </div>
        <div class="form-group">
          <label>Pasword</label>
          <input type="password" class="form-control" name="password" placeholder="Enter your password" required>
        </div>
        <input type="submit" value="Sign in" class="btn btn-warning send">
    </form>
  </div>
<?php
  $content=ob_get_clean();
  require("pages/Views/layout.php");
?>
