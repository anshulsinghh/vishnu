const config = require('../util/config.json');
const Discord = require('discord.js');
const colors = require('../util/colorConfig.json');

exports.commandType = "dumb";
exports.commandName = config.prefix + "slots";
exports.commandDescription = "try your luck...";

exports.run = (client, message, args, adminPerms) => {
	var reel = [":watermelon:", ":seven:", client.emojis.find("name", "bar"),":lemon:", ":bell:"]
		var a = Math.floor(Math.random()*4);
		var b = Math.floor(Math.random()*4);
		var c = Math.floor(Math.random()*4);
	    const embed = new Discord.RichEmbed()
  			.setAuthor("@" + message.member.nickname, message.author.avatarURL)
  			.setColor(colors.defaultColor)
  			.setDescription(reel[a] + "," + reel[b] + "," + reel[c])
  		message.channel.send({embed})
}