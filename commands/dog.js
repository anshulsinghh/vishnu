const Discord = require('discord.js');
const config = require('../util/config.json');
const colors = require('../util/colorConfig.json');
const randomPuppy = require('random-puppy');

exports.commandType = "dumb";
exports.commandName = config.prefix + "dog";
exports.commandDescription = "get a random dog in the chat";

exports.run = (client, message, params, adminPerms) => {
randomPuppy()
    .then(url => {
	message.channel.send("", {
    	file: url
	});
    })
}
