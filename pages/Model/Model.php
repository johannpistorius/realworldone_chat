<?php
	abstract class Model{
		// Exécute une requête SQL éventuellement paramétrée
		protected function executeRequest($sql) {
			include 'pages/login.php';
			$conn=mysqli_connect("$mysqlHost","$mysqlUsername","$mysqlPassword","$mysqlDatabase");
			// Check connection
			if (mysqli_connect_errno()){
			  echo "Failed to connect to MySQL: " . mysqli_connect_error();
			}

			mysqli_query($conn,"SET NAMES UTF8");
			$resultat= mysqli_query($conn,$sql);
			return $resultat;
		}
	}
?>
