<?php
	echo '<nav class="navbar navbar-expand-lg navbar-light bg-light">';
	  echo '<a class="navbar-brand">Chatroom</a>';
	  echo '<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">';
	    echo '<span class="navbar-toggler-icon"></span>';
	  echo '</button>';
	  echo '<div class="collapse navbar-collapse" id="navbarSupportedContent">';
	    echo '<ul class="navbar-nav mr-auto">';
				if(ISSET($_SESSION["user"])){
					echo '<li class="nav-item">';
						echo '<span class="navbar-text">';
				      echo 'Hello, <span id="sessionusername">'.$_SESSION["user"].'</span> !';
				    echo '</span>';
		      echo '</li>';
		      echo '<li class="nav-item">';
		        echo '<a class="nav-link" href="index.php?action=logout"><i class="fas fa-power-off"></i></a>';
		      echo '</li>';
				}
				else{
					//need to float right
		      echo '<li class="nav-item">';
		        echo '<a class="nav-link" href="index.php?action=loginpage">Login</a>';
		      echo '</li>';
		      echo '<li class="nav-item">';
		        echo '<a class="nav-link" href="index.php?action=suscribepage">Suscribe</a>';
		      echo '</li>';
				}
	    echo '</ul>';
	  echo '</div>';
	echo '</nav>';
?>
