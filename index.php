<?php
	session_start();
	require_once('pages/Model/Model.php');
	require_once('pages/Model/Manager.php');
	$manager = new Manager();

	if(isset($_GET["action"])){
		if($_GET["action"]=="login"){
			$pass=$_POST["password"];
			$result=$manager->getPass($_POST["username"],md5($pass));
			if(mysqli_fetch_assoc($result)>0){
				$_SESSION["user"]=$_POST["username"];
				require("pages/Views/chat.php");
			}
			else{
				require("pages/Views/login.php");
				echo '<p>Error: Wrong username or password</p>';
			}
		}
		else if($_GET["action"]=="logout"){
			$_SESSION=array();
			session_destroy();
			require("pages/Views/login.php");
		}
		else if($_GET["action"]=="suscribe"){
			$result=$manager->checkUsernames($_POST["username"]);
			if(mysqli_fetch_assoc($result)==0){
				$manager->createUser($_POST["username"],$_POST["name"],$_POST["email"],$_POST["password"]);
				require("pages/Views/login.php");
			}
			else{
				echo'<p class="bg-danger text-center font-weight-bold text-white">Username already in use</p>';
				require("pages/Views/suscribe.php");
			}
		}
		else if($_GET["action"]=="loginpage"){
				require("pages/Views/login.php");
		}
		else if($_GET["action"]=="suscribepage"){
			require("pages/Views/suscribe.php");
		}
	}
	else{
		require("pages/Views/login.php");
	}
?>
