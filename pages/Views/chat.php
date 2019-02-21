<?php
	$title="Chatroom";

	echo'You are connected';
	
	$content=ob_get_clean();
  require("pages/Views/layout.php");
?>
