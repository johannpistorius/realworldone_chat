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
  $sql = "Select id from conversation where (user1='$username1' and user2='$username2') or (user1='$username2' and user2='$username1')";
  $result= mysqli_query($conn,$sql);

  $row=mysqli_fetch_assoc($result);
	echo $row["id"];

?>
