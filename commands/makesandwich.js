const config = require('../util/config.json');

exports.commandType = "dumb";
exports.commandName = config.prefix + "makesandwich";
exports.commandDescription = "get yourself a sandwich";

exports.run = (client, message, args, adminPerms) => {
	message.channel.send("", {
    	file: "http://www.pngpix.com/wp-content/uploads/2016/10/PNGPIX-COM-Sandwich-PNG-Transparent-Image-4.png"
	});
}