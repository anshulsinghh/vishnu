const config = require('../util/config.json');
var jsonfile = require('jsonfile');
const colors = require('../util/colorConfig.json');
const Discord = require('discord.js');

exports.commandType = "utility";
exports.commandName = config.prefix + "leavecourse";
exports.commandDescription = "leave a course in the discord server";

exports.run = (client, message, params, adminPerms) => {
	if(params.length < 1) {
    const embed = new Discord.RichEmbed()
        .setAuthor("@" + message.member.nickname, message.author.avatarURL)
        .setColor(colors.noColor)
        .setDescription("Please specify a course you want to leave. Check `" + config.prefix + "listcourses` for a course you can leave.")
    message.channel.send({embed});
		return;
	}
	if (message.member.roles.find('name', params[0]) === null) {
    const embed = new Discord.RichEmbed()
        .setAuthor("@" + message.member.nickname, message.author.avatarURL)
        .setColor(colors.noColor)
        .setDescription("You do not have this course. Check `" + config.prefix + "listcourses` for a course you can leave.")
    message.channel.send({embed});
    return;
	}
  jsonfile.readFile('./storage/courseList.json', function(err, obj) {
    var str = "";
	  for(var x in obj) {
	    str = str + x + "\r\n";
		}
		if(str.indexOf(params[0]) == -1) {
      const embed = new Discord.RichEmbed()
          .setAuthor("@" + message.member.nickname, message.author.avatarURL)
          .setColor(colors.noColor)
          .setDescription("This course does not exist. Check `" + config.prefix + "listcourses` for a course you can leave.")
      message.channel.send({embed});
		}
    else {
      message.member.removeRole(message.member.roles.find('name', params[0]));
      message.reply("you have left " + params[0]);
    }
	});
}