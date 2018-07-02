const Discord = require('discord.js');
const config = require('../util/config.json');
const colors = require('../util/colorConfig.json');

exports.commandType = "utility";
exports.commandName = config.prefix + "ping";
exports.commandDescription = "a useful command to see the delay between the bot and yourself";

exports.run = (client, message, params, adminPerms) => {
  const embed = new Discord.RichEmbed()
    .setAuthor("@" + message.member.nickname, message.author.avatarURL)
    .setColor(colors.defaultColor)
    .setDescription("pong!")
  message.channel.send({embed});
}
