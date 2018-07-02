const Discord = require('discord.js');
const config = require('../util/config.json');
const colors = require('../util/colorConfig.json');

exports.commandType = "server utility";
exports.commandName = config.prefix + "kick";
exports.commandDescription = "kicks the user mentioned in the command";

exports.run = (client, message, params, adminPerms) => {
  if(!adminPerms) {
    const embed = new Discord.RichEmbed()
        .setAuthor("@" + message.member.nickname, message.author.avatarURL)
        .setColor(colors.noColor)
        .setDescription('You do not have the permission to use this command. \r\nBecome a ' + config.adminRole + ' to use this.')
    message.channel.send({embed});   
    return;
  }
  if(params.length < 1) {
    const embed = new Discord.RichEmbed()
        .setAuthor("@" + message.member.nickname, message.author.avatarURL)
        .setColor(colors.noColor)
        .setDescription('Please mention a user to kick.')
    message.channel.send({embed});   
    return;
  }
  var member= message.mentions.members.first();
  // Kick
  member.kick().then((member) => {
      // Successmessage
      const embed = new Discord.RichEmbed()
        .setAuthor("@" + message.member.nickname, message.author.avatarURL)
        .setColor(colors.yesColor)
        .setDescription(":wave: " + member.displayName + " has been successfully kicked.")
      message.channel.send({embed});
  }).catch(() => {
       // Failmessage
      const embed = new Discord.RichEmbed()
          .setAuthor("@" + message.member.nickname, message.author.avatarURL)
          .setColor(colors.noColor)
          .setDescription('Failed to execute the !kick command.')
      message.channel.send({embed});   
      return;
  });
}