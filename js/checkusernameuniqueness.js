window.addEventListener("load",function(){
  document.getElementById("createUser").addEventListener("click",createUser);
});
/**
* Create a new user.
*
* Gets all values for username, name, email, password from inputs.
* The function first calls userExistance.php to check uniqueness of username.
* Then, if unique, the function calls createuser.php to create the user.
*
* @fires createuser.php
*
* @listens "click":"createUser"
*/
function createUser(){
  var username=$('#username').val();
  var name=$('#name').val();
  var email=$('#email').val();
  var password=$('#password').val();
  $.ajax({
  url:'pages/ajax/userExistance.php',
  method:'post',
  data:{username:username},
  success:function(data){
    if(data=='0'){
      $.ajax({
      url:'pages/ajax/createuser.php',
      method:'post',
      data:{username:username,name:name,email:email,password:password},
      success:function(data){
        $('#bodysection p').remove();
        $('#bodysection').prepend('<p class="bg-success text-center font-weight-bold text-white">User created</p>');
      },error:function(data){
        console.log("error");
      }
      });
    }
    else{
      $('#bodysection p').remove();
      $('#bodysection').prepend('<p class="bg-danger text-center font-weight-bold text-white">Username already in use</p>');
    }
  },error:function(data){
    console.log("error");
  }
  });
}
