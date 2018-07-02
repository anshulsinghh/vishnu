const Discord = require('discord.js');
const fs = require("fs");
var jsonfile = require('jsonfile')
const config = require('../util/config.json');
const colors = require('../util/colorConfig.json');
var file = './storage/courseList.json';

let courses = JSON.parse(fs.readFileSync("./storage/courseList.json", "utf8"));

exports.commandType = "utility";
exports.commandName = config.prefix + "listcourses";
exports.commandDescription = "lists the courses in the discord server";

exports.run = (client, message, params, adminPerms) => {
	jsonfile.readFile(file, function(err, obj) {
		var str = "";
	    for(var x in obj) {
	    	str = str + x + "\r\n";
		}
    const embed = new Discord.RichEmbed()
        .setAuthor("@" + message.member.nickname, message.author.avatarURL)
        .setColor(colors.defaultColor)
        .setDescription('***Course List***\r\n' + str)
    message.channel.send({embed});
	});
}