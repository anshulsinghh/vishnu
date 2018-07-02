const colors = require('../util/colorConfig.json');
const config = require('../util/config.json');
var Discord = require('discord.js');

exports.commandType = "dumb";
exports.commandName = config.prefix + "ratemygay";
exports.commandDescription = "find out how gay you are";

exports.run = (client, message, args, adminperms) => {
		var roll = Math.floor(Math.random()*100) + 1;

    const embed = new Discord.RichEmbed()
      .setAuthor("@" + message.member.nickname, message.author.avatarURL)
      .setColor(colors.defaultColor)
      .setDescription("You are `" + roll + "%` gay")
    message.channel.send({embed});
}