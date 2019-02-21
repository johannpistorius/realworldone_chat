<?php
	class Manager extends Model {
		public function sendMessage($userSource,$userDest,$message, $time){
			$sql = "insert into chat values ('$userSource','$userDest','$message','$time')";
			$results = $this->executeRequest($sql);
		}
		public function createUser($username,$name,$email,$pass){
			$hash=md5($pass);
			$sql = "insert into users (username,name,email,password) values ('$username','$name','$email','$hash')";
			$results = $this->executeRequest($sql);
		}
		public function getAllUsers(){
			$sql = "Select * from users";
			$results= $this-> executeRequest($sql);
			return $results;
		}
		public function getPass($username,$pass){
			$sql = "Select password from users where username='$username' and password='$pass'";
			$results= $this-> executeRequest($sql);
			return $results;
		}
	}
?>
