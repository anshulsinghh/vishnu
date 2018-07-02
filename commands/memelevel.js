const config = require('../util/config.json');
const colors = require('../util/colorConfig.json');
const meme = require('../storage/memeData.json');
var jsonfile = require('jsonfile')
var file = './storage/memeData.json'
var Discord = require('discord.js');


exports.commandType = "dumb";
exports.commandName = config.prefix + "memelevel";
exports.commandDescription = "check where your memes are at";

exports.run = (client, message, params, adminPerms) => {
	jsonfile.readFile(file, function(err, obj) {
    console.log(obj);
  		let userData = obj[message.author.id];
  		if (typeof userData == 'undefined') {
  			const embed = new Discord.RichEmbed()
  				.setAuthor("@" + message.member.nickname, message.author.avatarURL)
  				.setColor(colors.noColor)
  				.setDescription("Post a meme to get meme levels...")
  			message.channel.send({embed});
  		}
  		else {
  			const embed = new Discord.RichEmbed()
  				.setAuthor("@" + message.member.nickname, message.author.avatarURL)
  				.setColor(colors.defaultColor)
  				.setDescription("You have `" + userData.memelevel + "` meme point(s)")
  			message.channel.send({embed});
  		}
	})
}