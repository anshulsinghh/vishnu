const config = require('../util/config.json');
const colors = require('../util/colorConfig.json');
const Discord = require('discord.js');

exports.commandType = "server utility";
exports.commandName = config.prefix + "rolereset";
exports.commandDescription = "reinitializes everyone's roles after the bot has been offline";

exports.run = (client, message, params, adminPerms, ranFromReady) => {
  if(!adminPerms && !ranFromReady) {
    const embed = new Discord.RichEmbed()
        .setAuthor("@" + message.member.nickname, message.author.avatarURL)
        .setColor(colors.noColor)
        .setDescription('You do not have the permission to use this command. \r\nBecome a ' + config.adminRole + ' to use this.')
    message.channel.send({embed});  
    return;     
  }

	let guild = client.guilds.find('name', config.botserver);
  let onlineRole = guild.roles.find("name", "Online");
  let awayRole = guild.roles.find("name", "Away");
  let dndRole = guild.roles.find("name", "DND");
	var arr = guild.members.array();

  let blackRole = guild.roles.find("name", "Colored Section");
	for(var i = 0; i < arr.length; i++) {
		  if(!arr[i].user.bot && !arr[i].roles.has(blackRole.id)) {
			
      let newMember = arr[i];

      let playRole = guild.roles.find("name", "In Game");
      if(!playRole) return;

      if(newMember.user.presence.game && newMember.user.presence.game.name !== "Spotify") {
        newMember.addRole(playRole);
      } else if (!newMember.user.presence.game || newMember.user.presence.game.name === "Spotify") {
        newMember.removeRole(playRole);
      }
        
      let muteRole = guild.roles.find("name", "mutes");
      if(newMember.mute && !newMember.roles.has(muteRole.id)) {
        newMember.addRole(muteRole);
      } else if(!newMember.mute && newMember.roles.has(muteRole.id)) {
        newMember.removeRole(muteRole);
      }
      if(!newMember.voiceChannel && newMember.roles.has(muteRole.id)) {
        newMember.removeRole(muteRole);
      }

      if(newMember.user.presence.status === "online" && !newMember.roles.has(onlineRole.id)) {
        newMember.addRole(onlineRole);
        if(newMember.roles.has(awayRole.id)) {
          newMember.removeRole(awayRole);
        }
        if(newMember.roles.has(dndRole.id)) {
          newMember.removeRole(dndRole);
        }
      }
      if(newMember.user.presence.status === "idle" && !newMember.roles.has(awayRole.id)) {
        newMember.addRole(awayRole);
        if(newMember.roles.has(onlineRole.id)) {
          newMember.removeRole(onlineRole);
        }
        if(newMember.roles.has(dndRole.id)) {
          newMember.removeRole(dndRole);
        }
      }
      if(newMember.user.presence.status === "dnd" && !newMember.roles.has(dndRole.id)) {
        newMember.addRole(dndRole);
        if(newMember.roles.has(awayRole.id)) {
          newMember.removeRole(awayRole);
        }
        if(newMember.roles.has(onlineRole.id)) {
          newMember.removeRole(onlineRole);
        }
      }
        if(newMember.user.presence.status === 'offline') {
          if(newMember.roles.has(awayRole.id)) {
            newMember.removeRole(awayRole);
          }
          if(newMember.roles.has(onlineRole.id)) {
            newMember.removeRole(onlineRole);
          }
          if(newMember.roles.has(dndRole.id)) {
            newMember.removeRole(dndRole);
          }
        }
      }
    }
  if(ranFromReady) {
    return;
  }
  const embed = new Discord.RichEmbed()
    .setAuthor("@" + message.member.nickname, message.author.avatarURL)
    .setColor(colors.yesColor)
    .setDescription("updated the roles!");
  message.channel.send({embed});
};