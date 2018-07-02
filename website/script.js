var socket = io();
var alreadyDisplayed = false;
socket.on('statusInfo', function(msg) {
  if(alreadyDisplayed){
    console.log("returning");
    return;
  }
  var channelsNum = msg.substring(0, msg.indexOf(" "));
  var usersNum = msg.substring(msg.indexOf(" ") + 1);
  console.log(channelsNum + " " + usersNum);


  document.getElementById("statusPanel").innerHTML = '<div class="col-xs-9 row"><p>The bot is currently online, and is serving ' + channelsNum + ' channels and ' + usersNum + ' users on &lt;heaven&gt;.</p></div><div class="pull-right col-xs-3"><svg class="checkmark pull-right" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg></div>'
  
  alreadyDisplayed = true;
});