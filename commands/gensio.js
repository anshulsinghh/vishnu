const Discord = require('discord.js');
const config = require('../util/config.json');
const colors = require('../util/colorConfig.json');

exports.commandType = "utility";
exports.commandName = config.prefix + "gensio";
exports.commandDescription = "makes a new generals.io room";

exports.run = (client, message, params, adminPerms) => {
  const embed = new Discord.RichEmbed()
    .setAuthor("@" + message.member.nickname, message.author.avatarURL)
    .setColor(colors.defaultColor)
    .setTitle('New Generals.io Room:')
    .setDescription("http://generals.io/games/gaysonly")
    .setThumbnail("http://generals.io/icon.png")
  message.channel.send({embed});
}
