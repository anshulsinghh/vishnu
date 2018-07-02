const config = require('../util/config.json');
const fs = require("fs");
var request = require('request');
var Discord = require('discord.js');
const colors = require('../util/colorConfig.json');

var modmeUsers = [];
var modmeCounts = [];
var modmeThing = 0;
var ongoing = false;

module.exports = message => {  
  let client = message.client;
  
  //This adds a 👌 reaction to an image that is recognized as a meme
  if(message.channel.name == config.memechannel) {
    if(message.attachments.size > 0) {
      message.react('👌');
      config.lastmeme = message.id;
      fs.writeFile('./util/config.json', JSON.stringify(config), (err) => {if(err) console.error(err)});
      return;
    }
    if(message.content.indexOf(".com") + 3 == message.content.length - 1 || message.content.indexOf(".com") + 3 == message.content.length - 2) return;
    request(message.content, function (error, response, body) {
      if(response && typeof response.statusCode !== 'undefined') {
        message.react('👌');
        config.lastmeme = message.id;
        fs.writeFile('./util/config.json', JSON.stringify(config), (err) => {if(err) console.error(err)});
        return;
      }
    });
  }
  
  if(message.content == "!modme") {
    var userId = "" + message.author.id;
    var a = modmeUsers.indexOf(userId);
    if(!ongoing) {
      ongoing = true;
    }
    if(a == -1) {
      //user is not in system
      modmeUsers.push(userId);
      modmeCounts.push(2);
      modmeThing = setTimeout(function() {clearTime(a); }, 15000);
    }
    else {
      var userCounts = modmeCounts[a];
      if(userCounts >= 10) {
        const embed = new Discord.RichEmbed()
            .setAuthor("@" + message.member.nickname, message.author.avatarURL)
            .setColor(colors.noColor)
            .setDescription("\r\nYou have reached your rate limit for modding. Please wait `20secs` for it to reset.")
        message.channel.send({embed})
        clearTimeout(modmeThing);
        if(userCounts == 10) {
          setTimeout(function() {
             clearTime(a);
          }, 20000);
        }
        var count = userCounts+1;
        modmeCounts[a] = count;
        return;
      }
      else {
        if(ongoing) {
          clearTimeout(modmeThing);
          modmeThing = setTimeout(function() {clearTime(a); }, 5000);
        }
        var count = userCounts+1;
        modmeCounts[a] = count;
      }
    }
  }
  
  
  
  if (message.author.bot) return;
  if (!message.content.startsWith(config.prefix)) return;
  if(message.guild === null){
    const embed = new Discord.RichEmbed()
        .setAuthor("@" + message.author.username, message.author.avatarURL)
        .setColor(colors.noColor)
        .setDescription("Please only use commands in the `" + config.botserver + "` server.")
    message.channel.send({embed});
    return;
  }
  let command = message.content.split(' ')[0].slice(config.prefix.length);
  let params = message.content.split(' ').slice(1);
  var adminPerms;
  if(message.member.roles.find("name", config.adminRole)) { adminPerms = true } else { adminPerms = false }
  
  try {
    let commandFile = require(`../commands/${command}.js`);
    var comm = true;
    commandFile.run(client, message, params, adminPerms);
  } catch (err) {
    var str = err.toString();
    if(str.includes("Cannot find module")) {
      console.log("A user called a command not in the VishnuBot library.");
    }
    else {
      console.error(err);
    }
  }
};

function clearTime(a) {
  console.log("Resetting !modme priveledges for " + modmeUsers[a]);
  modmeCounts[a] = 1;
  ongoing = false;
}