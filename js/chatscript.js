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
    username=$.trim($(".conversation"+i+" a h5").text());
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
      $(".conversation"+i+" a h5 i").removeClass('disconnected').addClass('connected');
    }else{
      $(".conversation"+i+" a h5 i").removeClass('connected').addClass('disconnected');
    }
  },error:function(data){
    console.log("error");
  }
  });
}
function createConversation(){
  var username=$('#inputtext').val();
  $.ajax({
  url:'pages/ajax/userExistance.php',
  method:'post',
  data:{username:username},
  success:function(data){
    if(data=='1'){
      $('#conversationCollection').append('<div class="row bg-secondary border-bottom border-dark conversation'+countConversations+'"><a href=# style="text-decoration:none; padding-left:5%;" class="text-light"><h5><i class="fas fa-circle disconnected"></i> '+username+'</h5></a></div>');
      countConversations++;
    }
  },error:function(data){
    console.log("error");
  }
  });

}
