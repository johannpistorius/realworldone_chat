<?php
  include '../login.php';
  $conn=mysqli_connect("$mysqlHost","$mysqlUsername","$mysqlPassword","$mysqlDatabase");
  // Check connection
  if (mysqli_connect_errno()){
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

  mysqli_query($conn,"SET NAMES UTF8");
  $username=$_POST['username'];
  $sql = "Select onlinestatus from users where username='$username'";
  $result= mysqli_query($conn,$sql);

  $row=mysqli_fetch_assoc($result);
	echo $row["onlinestatus"];

?>
