module.exports = (oldMember, newMember) => {
  let guild = newMember.guild;
  let muteRole = guild.roles.find("name", "mutes");
  if(newMember.voiceChannel === undefined && newMember.roles.has(muteRole.id)) {
      console.log("removing mute role");
      newMember.removeRole(muteRole);
  }
  else {
    if(!newMember.roles.has(muteRole.id)) {
      console.log("giving mute role");
      newMember.addRole(muteRole);
      let samplechannel = guild.channels.find('name', 'muted');
      if(samplechannel == null) {
        console.log("creating muted channel");
        guild.createChannel('muted', 'text', [{id: guild.defaultRole, deny: ['VIEW_CHANNEL']},{id: muteRole, deny: [], allow: ['SEND_MESSAGES', 'READ_MESSAGES']}]);
      }
    }
  }
  var channels = guild.channels.array();
  for (var i = 0; i < channels.length; i++) {
    if(channels[i].type == "voice") {
      var members = channels[i].members.array();
      if(members.length > 0) {
        console.log("there is still a call with people in it.");
        return;
      }
    }
  }

  console.log("deleting muted channel because there are no more calls with people");
  let mutedchannel = guild.channels.find('name', 'muted');
  mutedchannel.delete();
};