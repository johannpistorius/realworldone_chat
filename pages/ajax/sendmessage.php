<?php
  include '../login.php';
  $conn=mysqli_connect("$mysqlHost","$mysqlUsername","$mysqlPassword","$mysqlDatabase");
  // Check connection
  if (mysqli_connect_errno()){
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

  mysqli_query($conn,"SET NAMES UTF8");
  $id=$_POST['conversationid'];
  $message=$_POST['message'];
  $time=$_POST['time'];
  $userSource=$_POST['userSource'];
  $hash=md5($pass);
  $sql = "insert into chat (conversationid,message,time,userSource) values ('$id','$message','$time','$userSource')";
  $result= mysqli_query($conn,$sql);
?>
