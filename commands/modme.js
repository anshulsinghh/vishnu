const config = require('../util/config.json');
const colors = require('../util/colorConfig.json');
const Discord = require('discord.js');

exports.commandType = "utility";
exports.commandName = config.prefix + "modme";
exports.commandDescription = "good luck at getting mod...";

exports.run = (client, message, params, adminPerms) => {
	var roll = Math.floor(Math.random()*10) + 1;
	var correct = Math.floor(Math.random()*10) + 1;

    //fix up names of server etc. (server mod)
    let guild = client.guilds.find('name', '<heaven>');
    let modRole = guild.roles.find("name", "Server Mod");
    if(roll == correct) {
    	message.member.addRole(modRole);
      var allMembers = modRole.members.array();
      var index = Math.floor(Math.random() * allMembers.length);
      allMembers[index].removeRole(modRole);
	    const embed = new Discord.RichEmbed()
  			.setAuthor("@" + message.member.nickname, message.author.avatarURL)
  			.setColor(colors.yesColor)
  			.setDescription("`YOU HAVE BEEN MODDED` and `" + allMembers[index].nickname + "`'s mod role has been removed.")
  		message.channel.send({embed})
    }
    else {
    	const embed = new Discord.RichEmbed()
  			.setAuthor("@" + message.member.nickname, message.author.avatarURL)
  			.setColor(colors.noColor)
  			.setDescription("You rolled `" + roll + "` and needed to get `" + correct + "` to get mod status.")
  		message.channel.send({embed})
    }
}