const Discord = require('discord.js');
const config = require('../util/config.json');
const colors = require('../util/colorConfig.json');

exports.commandType = "utility";
exports.commandName = config.prefix + "shouldistudy";
exports.commandDescription = "find out if you should really be studying";

exports.run = (client, message, args, adminPerms) => {
		var roll = Math.floor(Math.random()*2) + 1;
		if(roll == 1) {
  					const embed = new Discord.RichEmbed()
  						.setAuthor("@" + message.member.nickname, message.author.avatarURL)
  						.setColor(colors.noColor)
  						.setDescription('fuck studying')
  					message.channel.send({embed});
		}
		else{
    				const embed = new Discord.RichEmbed()
  						.setAuthor("@" + message.member.nickname, message.author.avatarURL)
  						.setColor(colors.yesColor)
  						.setDescription('how the fuck are you going to get a job you lazy bitch')
  					message.channel.send({embed});
		}
}