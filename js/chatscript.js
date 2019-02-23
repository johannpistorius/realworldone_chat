var countConversations=0;

window.addEventListener("load",function(){
  checkOnlineStatus();
  setInterval(checkOnlineStatus,10000);
  document.getElementById("createConversation").addEventListener("click",createConversation);
});
//need to fix username issue asynchronous call
function checkOnlineStatus(){
  var count=$("#conversationCollection div").length;
  var username="";
  for(i=0;i<count;i++){
    username=$.trim($("#conversation"+i+" a h5").text());
    checkIndividualOnlineStatus(username,i);
  }
}
function checkIndividualOnlineStatus(username,i){
  $.ajax({
  url:'pages/ajax/onlinestatus.php',
  method:'post',
  data:{username:username},
  success:function(data){
    if(data=='1'){
      $("#conversation"+i+" a h5 i").removeClass('disconnected').addClass('connected');
    }else{
      $("#conversation"+i+" a h5 i").removeClass('connected').addClass('disconnected');
    }
  },error:function(data){
    console.log("error");
  }
  });
}
function createConversation(){
  var username=$('#inputtext').val();
  var checkConversationExists=false;
  for(i=0;i<countConversations;i++){
    if($.trim($("#conversation"+i+" a h5").text())==username){
      checkConversationExists=true;
    }
  }
  if(checkConversationExists==false){
    $.ajax({
    url:'pages/ajax/userExistance.php',
    method:'post',
    data:{username:username},
    success:function(data){
      if(data=='1'){
        $('#conversationCollection').append('<div id="conversation'+countConversations+'" class="row bg-secondary border-bottom border-dark"><a href=# style="text-decoration:none; padding-left:5%;" class="text-light"><h5><i class="fas fa-circle disconnected"></i> '+username+'</h5></a></div>');
        document.getElementById("conversation"+countConversations).addEventListener("click",function(){
          for(i=0;i<countConversations;i++){
            $("#conversation"+i).removeClass('bg-success').addClass('bg-secondary');
          }
          var $clicked=$(this);
          $clicked.removeClass('bg-secondary').addClass('bg-success');

          getMessagesCurrentUserSelected();
        });
        countConversations++;
      }
    },error:function(data){
      console.log("error");
    }
    });
  }
}
function getMessagesCurrentUserSelected(){
  console.log("getting messages");
}
