<?php
	echo '<header>';
		if(ISSET($_SESSION["user"])){
			echo '<a class="button"  href="index.php?action=logout">Logout</a>';
			echo '<p>Hello, '.$_SESSION["user"]. '!</p>';
		}
		else{
			echo '<a class="button"  href="index.php?action=loginpage">Login</a>';
			echo '<a class="button"  href="index.php?action=suscribepage">Suscribe</a>';
		}
	echo '</header>';
?>
