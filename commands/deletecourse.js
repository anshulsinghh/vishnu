const fs = require("fs");
const Discord = require('discord.js');
const config = require('../util/config.json');
const colors = require('../util/colorConfig.json');
let courses = JSON.parse(fs.readFileSync("./storage/courseList.json", "utf8"));

exports.commandType = "server utility";
exports.commandName = config.prefix + "deletecourse";
exports.commandDescription = "delete a course from the course list";

exports.run = (client, message, params, adminPerms) => {
	if(!adminPerms) {
    const embed = new Discord.RichEmbed()
        .setAuthor("@" + message.member.nickname, message.author.avatarURL)
        .setColor(colors.noColor)
        .setDescription('You do not have the permission to use this command. \r\nBecome a ' + config.adminRole + ' to use this.')
    message.channel.send({embed});
    return;     
  }
  
	if(params.length < 1) {
    const embed = new Discord.RichEmbed()
        .setAuthor("@" + message.member.nickname, message.author.avatarURL)
        .setColor(colors.noColor)
        .setDescription('Please specify a course to delete.')
    message.channel.send({embed});
		return;
	}
  
  if (!courses[params[0]]) {
    const embed = new Discord.RichEmbed()
        .setAuthor("@" + message.member.nickname, message.author.avatarURL)
        .setColor(colors.noColor)
        .setDescription('This course does not exist')
    message.channel.send({embed});
		return;
  }
  else {
    delete courses[params[0]];
  }
  
	fs.writeFile("./storage/courseList.json", JSON.stringify(courses), (err) => {
		if (err) {
      console.error(err)
    }
	});
  
  //delete course role
	let guild = client.guilds.find('name', config.botserver);
  let deleteRole = guild.roles.find("name", params[0]);
	deleteRole.delete();
  
  const embed = new Discord.RichEmbed()
      .setAuthor("@" + message.member.nickname, message.author.avatarURL)
      .setColor(colors.yesColor)
      .setDescription("Removed course `" + params[0] + "`")
  message.channel.send({embed});
}