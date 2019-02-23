var countConversations=0;

window.addEventListener("load",function(){
  checkOnlineStatus();
  getConversations();
  setInterval(refresh,2000);
  document.getElementById("createConversation").addEventListener("click",createConversation);
});
function refresh(){
  checkOnlineStatus();
  getConversations();
}

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
function getConversations(){
  var username=$("#sessionusername").text();
  $.ajax({
  url:'pages/ajax/getrecipient.php',
  method:'post',
  data:{username:username},
  success:function(data){
    var recipients = JSON.parse(data);
    for(i=0;i<recipients.length;i++){
      var recipient = recipients[i].username;
      var checkConversationExists=false;
      for(j=0;j<countConversations;j++){
        if($.trim($("#conversation"+j+" a h5").text())==recipient){
          checkConversationExists=true;
        }
      }
      if(checkConversationExists==false){
        $('#conversationCollection').append('<div id="conversation'+countConversations+'" class="row bg-secondary border-bottom border-dark"><a href=# style="text-decoration:none; padding-left:5%;" class="text-light"><h5><i class="fas fa-circle disconnected"></i> '+recipient+'</h5></a></div>');
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
    }
  },error:function(data){
    console.log("error");
  }
  });
}
function createConversation(){
  var username1=$("#sessionusername").text();
  var username2=$('#inputtext').val();
  var checkConversationExists=false;
  for(i=0;i<countConversations;i++){
    if($.trim($("#conversation"+i+" a h5").text())==username2){
      checkConversationExists=true;
    }
  }
  if(checkConversationExists==false){
    $.ajax({
    url:'pages/ajax/createconversation.php',
    method:'post',
    data:{username1:username1,username2:username2},
    success:function(data){
      countConversations++;
    },error:function(data){
      console.log("error");
    }
    });
  }
}
function getMessagesCurrentUserSelected(){
  console.log("getting messages");
}
