const fs = require('fs');
const config = require('../util/config.json');
const colors = require('../util/colorConfig.json');
const Discord = require('discord.js');

exports.commandType = "server utility";
exports.commandName = config.prefix + "prefix";
exports.commandDescription = "changes the command prefix to the prefix mentioned in the command";

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
    const embed = new Discord.RichEmbed()
       .setTitle('Prefix:')
       .setColor(colors.yesColor)
       .setDescription('Vishnu\'s command prefix has been changed from ' + config.prefix + ' to ' + params[0])
    message.channel.send({embed});
    // change the configuration in memory
    config.prefix = params[0];

    // Now we have to save the file.
    fs.writeFile('./util/config.json', JSON.stringify(config), (err) => {if(err) console.error(err)});
    console.log(config.prefix);
  }
  else {
    const embed = new Discord.RichEmbed()
      .setTitle('Prefix:')
      .setColor(colors.noColor)
      .setDescription('Please provide a prefix to change to (ex. !prefix ?)')
    message.channel.send({embed});
  }
}