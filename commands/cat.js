const Discord = require('discord.js');
const config = require('../util/config.json');
const colors = require('../util/colorConfig.json');
var request = require('request');

exports.commandType = "dumb";
exports.commandName = config.prefix + "cat";
exports.commandDescription = "get a random cat in the chat";

exports.run = (client, message, params, adminPerms) => {
request({
    uri: "http://thecatapi.com/api/images/get?format=xml&results_per_page=20"
}, function(error, response, body) {
    var start = body.indexOf("<url>");
    var end = body.indexOf("</url");
    var finalUrl = body.substring(start+5, end);
	
	message.channel.send("", {
    	file: finalUrl
	});
});
}
