const fs = require("fs");
const Discord = require('discord.js');
const config = require('../util/config.json');
const colors = require('../util/colorConfig.json');
let courses = JSON.parse(fs.readFileSync("./storage/courseList.json", "utf8"));

exports.commandType = "server utility";
exports.commandName = config.prefix + "addcourse";
exports.commandDescription = "adds a course to the course list, which can be viewed with !listcourses";

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
        .setDescription('Please specify a course to add.')
    message.channel.send({embed});
		return;
	}
  
  if (!courses[params[0]]) courses[params[0]] = {
  }
  else {
    const embed = new Discord.RichEmbed()
        .setAuthor("@" + message.member.nickname, message.author.avatarURL)
        .setColor(colors.noColor)
        .setDescription('This course already exists.')
    message.channel.send({embed});
    return;
  }
  
	fs.writeFile("./storage/courseList.json", JSON.stringify(courses), (err) => {
		if (err) {
      console.error(err)
    }
	});

	let guild = client.guilds.find('name', config.botserver);
	guild.createRole({
	  name: params[0],
	  mentionable: true,
	})
  
  const embed = new Discord.RichEmbed()
      .setAuthor("@" + message.member.nickname, message.author.avatarURL)
      .setColor(colors.yesColor)
      .setDescription("Created course `" + params[0] + "`")
  message.channel.send({embed});
}