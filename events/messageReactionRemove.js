const fs = require("fs");
var request = require('request');
var Discord = require('discord.js');
let memegame = JSON.parse(fs.readFileSync('./storage/memeData.json', 'utf8'));
const config = require('../util/config.json');
const colors = require('../util/colorConfig.json');

module.exports = (messageReaction, user) => {
    if(user.bot) return;
    if(messageReaction.message.author.username == user.username) return;
    if(messageReaction.message.channel.name != config.memechannel) return;
    if(messageReaction.message.author.bot) return;
    var str = messageReaction.message.content;
    if(messageReaction.message.channel.name == config.memechannel) {
      if(messageReaction.message.attachments.size > 0) {
        if(messageReaction.emoji.name == '👌') {
          if (!memegame[messageReaction.message.author.id]) memegame[messageReaction.message.author.id] = {
            memelevel: 0
          };
          let userData = memegame[messageReaction.message.author.id];
          userData.memelevel--;
          fs.writeFile('./storage/memeData.json', JSON.stringify(memegame), (err) => {
            if (err) console.error(err)
          });
          const embed = new Discord.RichEmbed()
            .setColor(colors.noColor)
            .setDescription("@" + messageReaction.message.member.nickname + " just got -1 meme levels because someone revoked their upvote")
          messageReaction.message.channel.send({embed});
        }  
      }
      if(messageReaction.message.content.indexOf(".com") + 3 == messageReaction.message.content.length - 1 || messageReaction.message.content.indexOf(".com") + 3 == messageReaction.message.content.length - 2) return;
      request(messageReaction.message.content, function (error, response, body) {
        if(response && typeof response.statusCode !== 'undefined') {
          if(messageReaction.emoji.name == '👌') {
            if (!memegame[messageReaction.message.author.id]) memegame[messageReaction.message.author.id] = {
              memelevel: 0
            };
            let userData = memegame[messageReaction.message.author.id];
            userData.memelevel--;
            fs.writeFile('./storage/memeData.json', JSON.stringify(memegame), (err) => {
              if (err) console.error(err)
            });
            const embed = new Discord.RichEmbed()
              .setColor(colors.noColor)
              .setDescription("@" + messageReaction.message.member.nickname + " just got -1 meme levels because someone revoked their upvote")
            messageReaction.message.channel.send({embed});
          }  
        }
      });
    }
};