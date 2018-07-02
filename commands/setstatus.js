const fs = require('fs');
const config = require('../util/config.json');
const colors = require('../util/colorConfig.json');
const Discord = require('discord.js');

exports.commandType = "server utility";
exports.commandName = config.prefix + "setstatus";
exports.commandDescription = "changes the game message/status of the bot";

exports.run = (client, message, params, adminPerms) => {
  if(!adminPerms) {
    const embed = new Discord.RichEmbed()
        .setAuthor("@" + message.member.nickname, message.author.avatarURL)
        .setColor(colors.noColor)
        .setDescription('You do not have the permission to use this command. \r\nBecome a ' + config.adminRole + ' to use this.')
    message.channel.send({embed});
    return;     
  }

  if (typeof params[0] != 'undefined') {
    var str = "";
    for(var i = 0; i < params.length; i++) {
      if(i == params.length-1) {
        str+=params[i];
      }
      else {
        str+=(params[i] + " ");
      }
    }
    console.log(str);
    // change the configuration in memory
    config.gamingMessage = str;

    // Now we have to save the file.
    fs.writeFile('./util/config.json', JSON.stringify(config), (err) => {if(err) console.error(err)});
    const embed = new Discord.RichEmbed()
       .setTitle('Set Status:')
       .setColor(colors.yesColor)
       .setDescription('Vishnu\'s status message has been changed to `' + str + "`")
    message.channel.send({embed});
  }
  else {
    const embed = new Discord.RichEmbed()
      .setTitle('Prefix:')
      .setColor(colors.noColor)
      .setDescription('Please provide a status to change to.')
    message.channel.send({embed});
  }
}