const config = require('../util/config.json');
const Discord = require('discord.js');
const colors = require('../util/colorConfig.json');

exports.commandType = "utility";
exports.commandName = config.prefix + "roll";
exports.commandDescription = "rolls a number on a die";

exports.run = (client, message, args, adminPerms) => {
    var roll = Math.floor(Math.random()*6) + 1;
            const embed = new Discord.RichEmbed()
              .setColor(colors.defaultColor)
              .setAuthor("@" + message.member.nickname, message.author.avatarURL)
              .setDescription("You rolled a " + roll)
            message.channel.send({embed});
}