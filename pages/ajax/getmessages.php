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
  $sql = "select Ct.userSource as userSource,Ct.message as message,Ct.time as time from conversation Cn, chat Ct where Cn.id=Ct.conversationid and ((Cn.user1='$username1' and Cn.user2='$username2')or(Cn.user1='$username2' and Cn.user2='$username1'))";
  $result= mysqli_query($conn,$sql);
  $res=array();
  while($row=mysqli_fetch_assoc($result)){
    $res[] =array('userSource'=> $row['userSource'], 'message'=> $row['message'], 'time'=> $row['time']);
  }
	echo json_encode($res);
?>
