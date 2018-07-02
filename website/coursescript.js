var socket = io();
var alreadyDisplayed = false;
socket.on('courseList', function(courses) {
  if(alreadyDisplayed){
    console.log("returning");
    return;
  }
  for(var i = 0; i < courses.length; i++) {
    var courseName = courses[i];

    var table = document.getElementById("myTable");
    if(i+1 == 1) {
      table.deleteRow(1);
    }
    var row = table.insertRow(i+1);
    var cell1 = row.insertCell(0);
    cell1.innerHTML = courseName;
  }
  alreadyDisplayed = true;
});