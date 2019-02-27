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
/**
* Load contents of AFINN-111.txt
*
* The contents of the file will be stored as a JSON.
*
* @fires parseafinn.php
*/
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
/**
* Calls different functions for the purpose of refreshing them.
*
* The refresh rate at which this function is called can be changed
* in the setInterval.
*
* @fires checkOnlineStatus
* @fires getConversations
* @fires getMessagesCurrentUserSelected
*/
function refresh(){
  checkOnlineStatus();
  getConversations();
  getMessagesCurrentUserSelected();
}
/**
* Check online status of users.
*
* @fires checkIndividualOnlineStatus
*/
function checkOnlineStatus(){
  var count=$("#conversationCollection div").length;
  var username="";
  for(i=0;i<count;i++){
    username=$.trim($("#conversation"+i+" a h5").text());
    checkIndividualOnlineStatus(username,i);
  }
}
/**
* Checks and updates online status.
*
* @fires onlinestatus.php
*
* @param {String} username
* @param {int} i number of the conversation.
*/
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
/**
* Get the different conversations with the other users.
*
* If a new conversation has been detected, this function will update the conversation list.
*
* @fires getrecipient.php
*/
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
        /**
        * Specifies what happens when a conversation is clicked.
        *
        * Highlight current conversation. Sets current recipient. Clears messages from
        * center console.
        *
        * @listens "click":"conversation"+id
        */
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
/**
* Get the messages corresponding to the selected conversation.
*
* If a new message has been detected, this function will update the message list.
* All new messages will go through sentiment analysis.
*
* @fires getmessages.php
*/
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
          var emotionscore=0.0;
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
          emotionscore=(emotionscore*2)/(messagewords.length);
          if(content[i].userSource==username1){
            $('#messageCollection').append('<div id="message'+countMessages+'" class="row no-gutters justify-content-end" style="padding-top:20px;padding-bottom:60px;"><div class="col-4 bg-primary" style="margin-right:2%; border-radius: 5px;"><div id="message" class="font-weight-bold">'+content[i].message+'</div><div id="time">'+content[i].time+'</div></div></div>');
          }else{
            $('#messageCollection').append('<div id="message'+countMessages+'" class="row no-gutters justify-content-start" style="padding-top:20px;padding-bottom:60px;"><div class="col-4 bg-secondary" style="margin-left:2%;border-radius: 5px;"><div id="message" class="font-weight-bold">'+content[i].message+'</div><div id="time">'+content[i].time+'</div></div></div>');
          }

          if(emotionscore>-0.5 && emotionscore<0.5){
            $("#message"+countMessages+" .col-4").append('<i class="fas fa-meh"></i>');
          }else if(emotionscore<=-0.5){
            $("#message"+countMessages+" .col-4").append('<i class="fas fa-frown"></i>');
          }else{
            $("#message"+countMessages+" .col-4").append('<i class="fas fa-smile"></i>');
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
/**
* Create new conversation.
*
* Gets username from input. Checks if a conversation already exists with this
* recipient. If not, create new conversation.
*
* @fires createconversation.php
*
* @listens "click":"createConversation"
*/
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
/**
* Send message to selected recipient.
*
* Get message from input. Send to appropriate conversation.
*
* @fires getconversationid.php
* @fires sendmessage.php
*
* @listens "click":"sendMessage"
*/
function sendMessage(){
  var userSource=$("#sessionusername").text();
  $.ajax({
  url:'pages/ajax/getconversationid.php',
  method:'post',
  data:{username1:userSource,username2:currentRecipient},
  success:function(data){
    var conversationid=data;
    var initmessage=$('#messagetext').val();
    var str=initmessage.split("'");
    if(str.length>1){
      var message="";
      for(i=0;i<str.length-1;i++){
        message=message+str[i]+"''"+str[i+1];
      }
    }else{
      message=initmessage;
    }

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
