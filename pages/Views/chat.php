<?php
	$title="Chatroom";
?>
	<script type="text/javascript" src="js/chatscript.js"></script>
	<div class="container-fluid" style="height: 94vh;">
		<div class="row no-gutters" style="height:100%;">
			<div class="col bg-info" id="conversationCollection">
				<nav class="navbar navbar-expand-lg navbar-light bg-light position-fixed fixed-bottom">
					<form action="?action=createConversation" method="post" class="form-inline my-2 my-lg-0">
						<input id="inputtext" class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" name="username">
						<button id="createConversation" class="btn btn-outline-success my-2 my-sm-0" type="button">Create</button>
					</form>
				</nav>
			</div>
			<div class="col-8 bg-dark" id="messageCollection">
				<form class="input-group input-group-lg position-absolute fixed-bottom bg-white">
					<input id="messagetext" type="text" class="form-control" placeholder="Enter you message" aria-label="text" aria-describedby="basic-addon2"></textarea>
					<div class="input-group-append">
				  	<button id="sendMessage" class="btn btn-outline-success" type="button">
					</div>
				</form>

			</div>
		</div>
	</div>
<?php
	$content=ob_get_clean();
  require("pages/Views/layout.php");
?>
