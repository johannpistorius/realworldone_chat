<?php
	class Manager extends Model {
		public function getPass($username,$pass){
			$sql = "Select password from users where username='$username' and password='$pass'";
			$results= $this-> executeRequest($sql);
			return $results;
		}
		public function setOnlineStatus($username, $status){
			$sql = "Update users set onlinestatus='$status' where username='$username'";
			$results= $this-> executeRequest($sql);
		}
	}
?>
