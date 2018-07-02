const fs = require("fs");
var jsonfile = require('jsonfile')
const config = require('../util/config.json');
const Discord = require('discord.js');
const colors = require('../util/colorConfig.json');

let courses = JSON.parse(fs.readFileSync("./storage/courseList.json", "utf8"));

exports.commandType = "utility";
exports.commandName = config.prefix + "joincourse";
exports.commandDescription = "join a course in the discord server";

exports.run = (client, message, params, adminPerms) => {
	if(params.length < 1) {
    const embed = new Discord.RichEmbed()
        .setAuthor("@" + message.member.nickname, message.author.avatarURL)
        .setColor(colors.noColor)
        .setDescription("Please specify a course you want to join. Check `" + config.prefix + "listcourses` for courses you can join.")
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
          .setDescription("This course does not exist. Check `" + config.prefix + "listcourses` for courses you can join.")
      message.channel.send({embed});
		}
		else {
			let role = message.guild.roles.find('name', params[0]);
			if(role) {
				message.member.addRole(role);
        const embed = new Discord.RichEmbed()
            .setAuthor("@" + message.member.nickname, message.author.avatarURL)
            .setColor(colors.yesColor)
            .setDescription("You are now a student of `" + params[0] + "`")
        message.channel.send({embed});
			}
		}
	});
}