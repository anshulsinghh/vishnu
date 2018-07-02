const Discord = require('discord.js');
const config = require('../util/config.json');
const colors = require('../util/colorConfig.json');

exports.commandType = "dumb";
exports.commandName = config.prefix + "memeleaderboard";
exports.commandDescription = "see who the best memers are";

var jsonfile = require('jsonfile')
var file = './storage/memeData.json'

exports.run = (client, message, params, adminPerms) => {
  var i = 1;
	jsonfile.readFile(file, function(err, obj) {    
    var points = [];
    var test = [];
    var usernames = [];
    for(var x in obj) {
      let guild = client.guilds.find('name', config.botserver);
      let member = guild.members.find('id', x);
      usernames.push(member.nickname);
      test.push(obj[x].memelevel);
    }
    var result = Array.from(Array(test.length).keys()).sort((a, b) => test[a] < test[b] ? -1 : (test[b] < test[a]) | 0);
    //this creates an array with the indexes of originals
    for(var i = 0; i < test.length; i++) {
      var originalIndex = result[i];
      var name = usernames[originalIndex];
      var pointnum = test[originalIndex];
      points.push(pointnum + " " + name);
    }
    points.reverse();
    
    var finalStr = "";
    var lastPointCount = 0;
    var place = 1;
    var strLength = config.lengthofmemeleaderboardmessage;
    for (var i = 0; i < points.length; i++) {
      var initialString = points[i];
      var pointNumber = initialString.substr(0,initialString.indexOf(" "));
      var userName = initialString.substr(initialString.indexOf(" ") + 1);
      if(i > 0) {
        var lastString = points[i-1];
        var lastPointNumber = lastString.substr(0,lastString.indexOf(" "));
        if(lastPointNumber === pointNumber) {
          var tempStr = place + ". " + userName + "-" + pointNumber + "pts\r\n";
          if(tempStr.length < strLength) {
            var firstPartOfStr = tempStr.substring(0,tempStr.indexOf("-"));
            var secondPartOfStr = tempStr.substring(tempStr.indexOf("-"));
            var dashString = "";
            for(var x = 0; x < (strLength-tempStr.length); x++) {
              dashString = dashString + "-";
            }
            tempStr = firstPartOfStr + dashString + secondPartOfStr;
          }
          finalStr = finalStr + tempStr;
        }
        else {
          place++;
          var tempStr = place + ". " + userName + "-" + pointNumber + "pts\r\n";
          if(tempStr.length < strLength) {
            var firstPartOfStr = tempStr.substring(0,tempStr.indexOf("-"));
            var secondPartOfStr = tempStr.substring(tempStr.indexOf("-"));
            var dashString = "";
            for(var x = 0; x < (strLength-tempStr.length); x++) {
              dashString = dashString + "-";
            }
            tempStr = firstPartOfStr + dashString + secondPartOfStr;
          }
          finalStr = finalStr + tempStr;
        }
      }
      else {
        tempStr = place + ". " + userName + "-" + pointNumber + "pts\r\n";
        if(tempStr.length < strLength) {
            var firstPartOfStr = tempStr.substring(0,tempStr.indexOf("-"));
            var secondPartOfStr = tempStr.substring(tempStr.indexOf("-"));
            var dashString = "";
            for(var x = 0; x < (strLength-tempStr.length); x++) {
              dashString = dashString + "-";
            }
            tempStr = firstPartOfStr + dashString + secondPartOfStr;
          }
        finalStr = tempStr;
      }
    }
    message.channel.send("<@" + message.author.id + ">" + "```Markdown\r\n#Meme Leaderboard\r\n"+finalStr+"```");
	})
}
