var countConversations=0;
var countMessages=0;
var currentRecipient="";
var sentiment;

window.addEventListener("load",function(){
  preloadSentimentAnalysisFile();
  checkOnlineStatus();
  getConversations();
  getMessagesCurrentUserSelected();
  setInterval(refresh,2000);
  document.getElementById("createConversation").addEventListener("click",createConversation);
  document.getElementById("sendMessage").addEventListener("click",sendMessage);
});
function preloadSentimentAnalysisFile(){
  $.ajax({
    url:'pages/ajax/parseafinn.php',
    method:'post',
    success:function(data){
      sentiment=JSON.parse(data);
    },error:function(data){
      console.log("error");
    }
    });
}
function refresh(){
  checkOnlineStatus();
  getConversations();
  getMessagesCurrentUserSelected();
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
          for(k=0;k<countConversations;k++){
            $("#conversation"+k).removeClass('bg-success').addClass('bg-secondary');
          }
          var $clicked=$(this);
          $clicked.removeClass('bg-secondary').addClass('bg-success');

          currentRecipient=$.trim($(this).find("h5").text());
          currentMessages=0;
          $('#messageCollection').contents(':not(form)').remove();
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
  var username1=$("#sessionusername").text();
  var username2=currentRecipient;
  if(!username2==""){
    $.ajax({
    url:'pages/ajax/getmessages.php',
    method:'post',
    data:{username1:username1,username2:username2},
    success:function(data){
      var content = JSON.parse(data);
      for(i=0;i<content.length;i++){
        var checkMessageExists=false;
        for(j=0;j<countMessages;j++){
          if($("#message"+j+" #message").text()==content[i].message && $("#message"+j+" #time").text()==content[i].time){
            checkMessageExists=true;
          }
        }
        if(checkMessageExists==false){
          //sentiment analysis
          var emotionscore=0;
          var s=content[i].message.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
          var stringwithoutpunctuation = s.replace(/\s{2,}/g," ");
          var messagewords=stringwithoutpunctuation.split(" ");
          for(j=0;j<messagewords.length;j++){
            for(k=0;k<sentiment.length;k++){
              if(sentiment[k].word==messagewords[j].toLowerCase()){
                emotionscore=emotionscore+parseInt(sentiment[k].weight);
              }
            }
          }
          emotionscore=emotionscore/(messagewords.length);
          if(emotionscore>-2 && emotionscore<2){
            console.log(":|");
          }else if(emotionscore<=-1){
            console.log(":(");
          }else{
            console.log(":(");
          }
          if(content[i].userSource==username1){
            $('#messageCollection').append('<div id="message'+countMessages+'" class="row no-gutters justify-content-end" style="padding-top:20px;padding-bottom:60px;"><div class="col-4 bg-primary" style="margin-right:2%; border-radius: 5px;"><div id="message" class="font-weight-bold">'+content[i].message+'</div><div id="time">'+content[i].time+'</div></div></div>');
          }else{
            $('#messageCollection').append('<div id="message'+countMessages+'" class="row no-gutters justify-content-start" style="padding-top:20px;padding-bottom:60px;"><div class="col-4 bg-secondary" style="margin-left:2%;border-radius: 5px;"><div id="message" class="font-weight-bold">'+content[i].message+'</div><div id="time">'+content[i].time+'</div></div></div>');
          }
          countMessages++;
        }
      }
    },error:function(data){
      console.log("error");
    }
    });
  }
}
function sendMessage(){
  var userSource=$("#sessionusername").text();
  $.ajax({
  url:'pages/ajax/getconversationid.php',
  method:'post',
  data:{username1:userSource,username2:currentRecipient},
  success:function(data){
    var conversationid=data;
    console.log(conversationid);
    var message=$('#messagetext').val();
    Number.prototype.padLeft = function(base,chr){
      var  len = (String(base || 10).length - String(this).length)+1;
      return len > 0? new Array(len).join(chr || '0')+this : this;
  }
    var d=new Date();
    var time = [d.getFullYear(),
               (d.getMonth()+1).padLeft(),
               d.getDate().padLeft()].join('-') +' ' +
              [d.getHours().padLeft(),
               d.getMinutes().padLeft(),
               d.getSeconds().padLeft()].join(':');
    console.log(time);
    $.ajax({
    url:'pages/ajax/sendmessage.php',
    method:'post',
    data:{conversationid:conversationid,message:message,time:time,userSource:userSource},
    success:function(data){
      $("#messagetext").val("");
    },error:function(data){
      console.log("error");
    }
    });
  },error:function(data){
    console.log("error");
  }
  });
}
