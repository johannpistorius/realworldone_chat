<?php
  include '../login.php';
  $conn=mysqli_connect("$mysqlHost","$mysqlUsername","$mysqlPassword","$mysqlDatabase");
  // Check connection
  if (mysqli_connect_errno()){
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

  mysqli_query($conn,"SET NAMES UTF8");
  $username=$_POST['username'];
  $name=$_POST['name'];
  $email=$_POST['email'];
  $pass=$_POST['password'];
  $hash=md5($pass);
  $sql = "insert into users (username,name,email,password) values ('$username','$name','$email','$hash')";
  $result= mysqli_query($conn,$sql);
?>
