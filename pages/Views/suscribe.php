<?php
  $title="Suscribe";
?>
  <script type="text/javascript" src="js/checkusernameuniqueness.js"></script>
  <div class="container bg-info mt-5">
    <form method="post" class="px-4 py-3">
        <div class="form-group">
          <label>Username</label>
          <input id="username" type="text" class="form-control" name="username" placeholder="Enter your username" required>
        </div>
        <div class="form-group">
          <label>Name</label>
          <input id="name" type="text" class="form-control" name="name" placeholder="Enter your name" required>
        </div>
        <div class="form-group">
          <label>E-mail</label>
          <input id="email" type="text" class="form-control" name="email" placeholder="Enter your e-mail" required>
        </div>
        <div class="form-group">
          <label>Pasword</label>
          <input id="password" type="password" class="form-control" name="password" placeholder="Enter your password" required>
        </div>
        <input id="createUser" type="button" value="Suscribe" class="btn btn-warning send">
    </form>
  </div>
<?php
  $content=ob_get_clean();
  require("pages/Views/layout.php");
?>
