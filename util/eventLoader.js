//This is an event loader, which offloads events to their own files in the events folder.
const reqEvent = (event) => require(`../events/${event}`)
module.exports = client => {
	client.on('ready', () => reqEvent('ready')(client));
  client.on('message', reqEvent('message'));
  client.on('presenceUpdate', reqEvent('presenceUpdate'));
  client.on('messageReactionAdd', reqEvent('messageReactionAdd'));
  client.on('messageReactionRemove', reqEvent('messageReactionRemove'));
  client.on('channelCreate', reqEvent('channelCreate'));
  client.on('voiceStateUpdate', reqEvent('voiceStateUpdate'));
};