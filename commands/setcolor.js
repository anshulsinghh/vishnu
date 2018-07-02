const config = require('../util/config.json');
const color = require('../util/colorConfig.json');
const Discord = require('discord.js');

exports.commandType = "utility";
exports.commandName = config.prefix + "setcolor";
exports.commandDescription = "change your username color (Red, Orange, Yellow, Green, Blue, Purple, LightBlue, SkyBlue, Pink, White)";

var colors = ["Red", "Orange", "Yellow", "Green", "Blue", "Purple", "LightBlue", "SkyBlue", "Pink", "White"];

exports.run = (client, message, args, adminPerms) => {
	for(var i = 0; i < colors.length; i++) {
		if(args[0] == colors[i]) {
			for(var t = 0; t < colors.length; t++) {
				let currentRoles = message.member.roles.find('name', colors[t]);
				if (currentRoles) {
					message.member.removeRole(currentRoles);
				}
			}

			let role = message.guild.roles.find('name', colors[i]);
			if(role) {
				message.member.addRole(role);
			}

			const embed = new Discord.RichEmbed()
  				.setAuthor("@" + message.member.nickname, message.author.avatarURL)
  				.setColor(color.yesColor)
  				.setDescription("Switched your color to: " + args[0]);
  			message.channel.send({embed});
  			return;
		}
	}
	const embed = new Discord.RichEmbed()
      .setTitle('Set Color:')
      .setColor(color.noColor)
      .setThumbnail('https://color.adobe.com/build2.0.0-buildNo/resource/img/kuler/color_wheel_730.png')
      .setDescription('Your specified color does not exist... \r\n**Colors (Case Sensitive):** \r\nRed, Orange, Yellow, Green, Blue, Purple, LightBlue, SkyBlue, Pink, White')
    message.channel.send({embed}); 
}