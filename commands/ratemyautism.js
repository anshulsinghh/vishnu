const config = require('../util/config.json');
const colors = require('../util/colorConfig.json');
const Discord = require('discord.js');

exports.commandType = "dumb";
exports.commandName = config.prefix + "ratemyautism";
exports.commandDescription = "find out how autistic you are";

exports.run = (client, message, params, adminPerms) => {
		var roll = Math.floor(Math.random()*100) + 1;

    const embed = new Discord.RichEmbed()
      .setAuthor("@" + message.member.nickname, message.author.avatarURL)
      .setColor(colors.defaultColor)
      .setDescription("You are `" + roll + "%` autistic")
    message.channel.send({embed});
}