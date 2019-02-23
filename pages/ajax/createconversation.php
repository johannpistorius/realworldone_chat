<?php
  include '../login.php';
  $conn=mysqli_connect("$mysqlHost","$mysqlUsername","$mysqlPassword","$mysqlDatabase");
  // Check connection
  if (mysqli_connect_errno()){
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

  mysqli_query($conn,"SET NAMES UTF8");
  $username1=$_POST['username1'];
  $username2=$_POST['username2'];
  $hash=md5($pass);
  $sql = "insert into conversation (user1,user2) values ('$username1','$username2')";
  $result= mysqli_query($conn,$sql);
?>
