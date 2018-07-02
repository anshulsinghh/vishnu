const config = require('../util/config.json');
const colors = require('../util/colorConfig.json');
const Discord = require('discord.js');

exports.commandType = "dumb";
exports.commandName = config.prefix + "howbigsmydick";
exports.commandDescription = "find out how big your dick really is";

exports.run = (client, message, args, adminPerms) => {
		var roll = Math.floor(Math.random()*15) + 1;
    const embed = new Discord.RichEmbed()
      .setAuthor("@" + message.member.nickname, message.author.avatarURL)
      .setColor(colors.defaultColor)
      .setDescription("Your dick is " + roll + " inches long")
    message.channel.send({embed});
}