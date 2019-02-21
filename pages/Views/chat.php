<?php
	$title="Chatroom";
?>
	<div class="container-fluid" style="height: 94vh;">
		<div class="row no-gutters" style="height:100%;">
			<div class="col bg-info">
				<!--Unread message container-->
				<div class="row bg-warning border-bottom border-dark">
					<a href=# style="text-decoration:none; padding-left:5%;" class="text-dark"><h5><i class="fas fa-circle connected"></i> Username 1 <span class="badge badge-secondary badge-pill bg-light text-danger">20</span></h5></a>
				</div>
				<!--Read message container-->
				<div class="row bg-secondary border-bottom border-dark">
					<a href=# style="text-decoration:none; padding-left:5%;" class="text-light"><h5><i class="fas fa-circle disconnected"></i> Username 2</h5></a>
				</div>
				<!--Create new conversation with an existing user-->
				<nav class="navbar navbar-expand-lg navbar-light bg-light position-absolute fixed-bottom">
						<form class="form-inline my-2 my-lg-0">
							<input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
							<button class="btn btn-outline-success my-2 my-sm-0" type="submit">Create</button>
						</form>
				</nav>
			</div>
			<div class="col-8 bg-dark" id="messages">
				<!--Your message format-->
				<div class="row no-gutters justify-content-end" style="padding-top:5px">
			    <div class="col-4 bg-primary" style="margin-right:2%; border-radius: 5px;">
			      Your message
			    </div>
				</div>
				<!--Their message format-->
				<div class="row no-gutters justify-content-start" style="padding-top:5px">
			    <div class="col-4 bg-secondary" style="margin-left:2%;border-radius: 5px;">
			      Their message
			    </div>
				</div>
				<!--Need to add the textarea-->
				<form class="input-group input-group-lg position-absolute fixed-bottom" id="textmessarea">
				  <input type="text" class="form-control" placeholder="Enter you message" aria-label="text" aria-describedby="basic-addon2"></textarea>
				  <div class="input-group-append">
				    <input class="btn btn-outline-secondary" type="submit">
				  </div>
				</form>

			</div>
		</div>
	</div>
<?php
	$content=ob_get_clean();
  require("pages/Views/layout.php");
?>
