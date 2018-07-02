/*
  This file runs when the bot is fully ready.
*/
const config = require('../util/config.json'); //Loading the config.json file...
module.exports = client => {
  console.log(`Ready for ${client.channels.size} channels on ${client.guilds.size} servers, for a total of ${client.users.size} users.`);
  
  //In this section of code, we are loading messages with old memes, so we can still register upvotes on them.
  let guild = client.guilds.find('name', config.botserver);
  let channel = guild.channels.find('name', config.memechannel);
  channel.fetchMessages({limit: 100, around: config.lastmeme})
    .then(messages => console.log(`Loaded ${messages.array().length} messages`))
    .catch(console.error);
  
  //In this section of code, we look to see if there is a muted channel - and create one if it's not there
  var channels = guild.channels.array();
  for (var i = 0; i < channels.length; i++) {
    if(channels[i].type == "voice") {
      var members = channels[i].members.array();
      if(members.length > 0) {
        let muteRole = guild.roles.find("name", "mutes");
        for(var x = 0; x < members.length; x++) {
          members[x].addRole(muteRole);
        }

        console.log("there is still a call with people in it.");
        let samplechannel = guild.channels.find('name', 'muted');
        if(samplechannel == null) {
          console.log("creating muted channel");
          guild.createChannel('muted', 'text', [{id: guild.defaultRole, deny: ['VIEW_CHANNEL']},{id: muteRole, deny: [], allow: ['SEND_MESSAGES', 'READ_MESSAGES']}]);
        }
        return;
      }
    }
  }
  let samplechannel = guild.channels.find('name', 'muted');
  if(samplechannel !== null) {
    console.log("deleting existing channel");
    samplechannel.delete();
  }
  
  require(`../commands/rolereset.js`).run(client, "", "", true, true);
};