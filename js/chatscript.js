window.addEventListener("load",function(){
  checkOnlineStatus();
  setInterval(checkOnlineStatus,10000);
  document.getElementById("createConversation").addEventListener("click",createConversation);
});
function checkOnlineStatus(){
  console.log("hello");
}
function createConversation(){
  var username=$('#inputtext').val();
  $.ajax({
  url:'pages/ajax/userExistance.php',
  method:'post',
  data:{username:username},
  success:function(data){
    if(data=='1'){
      $('#conversationCollection').append('<div class="row bg-secondary border-bottom border-dark"><a href=# style="text-decoration:none; padding-left:5%;" class="text-light"><h5><i class="fas fa-circle disconnected"></i> '+username+'</h5></a></div>');
    }
  },error:function(data){
    console.log("error");
  }
  });
}
