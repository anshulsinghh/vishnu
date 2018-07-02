var express = require('express');
var app = express();
var http = require('http');

app.get('/', function(request, response) {
  console.log(Date.now() + " Ping Received");
  response.sendFile(__dirname + '/website/about.html');
});

app.get('/commands.html', function(request, response) {
  response.sendFile(__dirname + '/website/commands.html');
});

app.get('/memeleaderboard.html', function(request, response) {
  response.sendFile(__dirname + '/website/memeleaderboard.html');
});

app.get('/courses.html', function(request, response) {
  response.sendFile(__dirname + '/website/courses.html');
});


app.use(express.static('website'));

var listener = app.listen(process.env.PORT, function () {
  console.log('Bot is listening for requests on port ' + listener.address().port);
});
var io = require('socket.io')(listener);
var jsonfile = require('jsonfile');
var file = './storage/memeData.json';
io.on('connection', function(socket){
  console.log('a user connected');
  //io.emit('testMessage', msg); broadcasts GLOBALLY
  
  var i = 1;
	jsonfile.readFile(file, function(err, obj) {    
    var points = [];
    var test = [];
    var usernames = [];
    var icons = [];
    for(var x in obj) {
      let guild = client.guilds.find('name', config.botserver);
      if(guild === null) {
        //prevent errors during asynchronous startup
        return;
      }
      let member = guild.members.find('id', x);
      usernames.push(member.nickname);
      icons.push(member.user.avatarURL);
      test.push(obj[x].memelevel);
    }
    var result = Array.from(Array(test.length).keys()).sort((a, b) => test[a] < test[b] ? -1 : (test[b] < test[a]) | 0);
    //this creates an array with the indexes of originals
    for(var i = 0; i < test.length; i++) {
      var originalIndex = result[i];
      var name = usernames[originalIndex];
      var pointnum = test[originalIndex];
      var url = icons[originalIndex];
      points.push(pointnum + " " + name + " " + url);
    }
    points.reverse();
    socket.emit('testMessage', points);
  });
  
  //COURSE LIST STUFF
  var newFile = './storage/courseList.json';
  jsonfile.readFile(newFile, function(err, obj) {
		var courses = [];
	    for(var x in obj) {
	    	courses.push(x);
		}
    socket.emit('courseList', courses);
	});
  
  var massage = client.channels.size + " " + client.users.size;
  socket.emit('statusInfo', massage);
});
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 90000);

//This section of code declares the constants I need for my Discord bot
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./util/config.json');

//This code loads up the eventLoader.js file
require('./util/eventLoader')(client);

//This code logs in the discord bot
client.login(process.env.TOKEN);

//This code snippet takes care of setting the bot's gaming tag to "Watching/Listening/Playing/Streaming <message>"
//randName can be anyone on the discord server
var firstRun = true;
var gamingFunction = setInterval(setGaminTag, 5000);
function setGaminTag() {
  let guild = client.guilds.find('name', config.botserver);
  var members = guild.members.array();
  var index = -1;
  if(firstRun) {
    index = Math.floor(Math.random()*members.length);
    firstRun = false;
  }
  else {
    var oldIndex = index;
    index = index = Math.floor(Math.random()*members.length);
    while(index == oldIndex || members[index].user.bot || !members[index].nickname) {
      index = index = Math.floor(Math.random()*members.length);
    }
  }
  if(members[index].nickname === null) {
    return;
  }
  var randName = toTitleCase(members[index].nickname);
  var activityType = config.gamingMessage.substr(0, config.gamingMessage.indexOf(" ")).toUpperCase();
  var strWithoutActivity = config.gamingMessage.substr(config.gamingMessage.indexOf(" ") + 1);
  var finalStr = strWithoutActivity.replace("randName", randName);
  client.user.setActivity(finalStr, { type: activityType});
}
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}