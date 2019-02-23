<?php
	$title="Chatroom";
?>
	<script type="text/javascript" src="js/chatscript.js"></script>
	<div class="container-fluid" style="height: 94vh;">
		<div class="row no-gutters" style="height:100%;">
			<div class="col bg-info" id="conversationCollection">
				<!--Create new conversation with an existing user-->
				<nav class="navbar navbar-expand-lg navbar-light bg-light position-fixed fixed-bottom">
					<form action="?action=createConversation" method="post" class="form-inline my-2 my-lg-0">
						<input id="inputtext" class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" name="username">
						<button id="createConversation" class="btn btn-outline-success my-2 my-sm-0" type="button">Create</button>
					</form>
				</nav>
			</div>
			<div class="col-8 bg-dark" id="messageCollection">
				<!--Your message format
				<div class="row no-gutters justify-content-end" style="padding-top:5px">
			    <div class="col-4 bg-primary" style="margin-right:2%; border-radius: 5px;">
			      Your message
			    </div>
				</div>
				Their message format
				<div class="row no-gutters justify-content-start" style="padding-top:5px">
			    <div class="col-4 bg-secondary" style="margin-left:2%;border-radius: 5px;">
			      Their message
			    </div>
				</div>-->
				<form class="input-group input-group-lg position-absolute fixed-bottom bg-white" id="textmessarea">
					<input type="text" class="form-control" placeholder="Enter you message" aria-label="text" aria-describedby="basic-addon2"></textarea>
					<div class="input-group-append">
				  	<input class="btn btn-outline-success" type="submit">
					</div>
				</form>

			</div>
		</div>
	</div>
<?php
	$content=ob_get_clean();
  require("pages/Views/layout.php");
?>
