var socket = io();
var alreadyDisplayed = false;
socket.on('testMessage', function(msg) {
  if(alreadyDisplayed){
    console.log("returning");
    return;
  }
  for(var i = 0; i < msg.length; i++) {
    var pointNumber = msg[i].substring(0,msg[i].indexOf(" "));
    var nextPart = msg[i].substring(msg[i].indexOf(" ") + 1);
    var name = nextPart.substring(0,nextPart.lastIndexOf(" "));
    var url = nextPart.substring(nextPart.lastIndexOf(" ") + 1);
    console.log(pointNumber);
    console.log(name);
    console.log(url);
    console.log(" ");

    var table = document.getElementById("myTable");
    if(i+1 == 1) {
      table.deleteRow(1);
    }
    var row = table.insertRow(i+1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = i+1;
    if(url === 'null') {
      cell2.innerHTML = "<img class='img-rounded' style='height: 20px' src=" + "https://discordapp.com/assets/dd4dbc0016779df1378e7812eabaa04d.png" + "> " + name;
    }
    else {
      cell2.innerHTML = "<img class='img-rounded' style='height: 20px' src=" + url + "> " + name;
    }
    cell3.innerHTML = pointNumber;
  }
  alreadyDisplayed = true;
});