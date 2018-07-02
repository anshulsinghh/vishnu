module.exports = (oldMember, newMember) => {
  if(newMember.user.bot) return;

  let guild = newMember.guild;
  let playRole = guild.roles.find("name", "In Game");

  let blackRole = guild.roles.find("name", "Colored Section");
  if(newMember.roles.has(blackRole.id)) return;

  if(!playRole) return;

  if(newMember.user.presence.game && newMember.user.presence.game.name !== "Spotify") {
    newMember.addRole(playRole);
  } else if (!newMember.user.presence.game || newMember.user.presence.game.name === "Spotify") {
    newMember.removeRole(playRole);
  }

  let onlineRole = guild.roles.find("name", "Online");
  let awayRole = guild.roles.find("name", "Away");
  let dndRole = guild.roles.find("name", "DND");
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
};