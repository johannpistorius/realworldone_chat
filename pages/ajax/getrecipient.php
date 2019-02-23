<?php
  include '../login.php';
  $conn=mysqli_connect("$mysqlHost","$mysqlUsername","$mysqlPassword","$mysqlDatabase");
  // Check connection
  if (mysqli_connect_errno()){
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

  mysqli_query($conn,"SET NAMES UTF8");
  $username=$_POST['username'];
  $sql = "select if(user1='$username',user2,user1) as userrecipient from conversation where user1='$username' or user2='$username'";
  $result= mysqli_query($conn,$sql);
  $res=array();
  while($row=mysqli_fetch_assoc($result)){
    $res[] =array('username'=> $row['userrecipient']);
  }
	echo json_encode($res);
?>
