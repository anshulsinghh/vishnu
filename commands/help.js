const config = require('../util/config.json');
const colors = require('../util/colorConfig.json');
var fs = require( 'fs' );
var Discord = require('discord.js');

exports.commandType = "utility";
exports.commandName = config.prefix + "help";
exports.commandDescription = "get help with the bot";

exports.run = (client, message, args, adminPerms) => {
    if(args.length == 0) {
    fs.readdir( "./commands", function( err, files ) {
        if( err ) {
            console.error( "Could not list the directory.", err );
            process.exit( 1 );
        } 

        var serverutility = "";
        var utility = "";
        var dumb = "";
        var nsfw = "";

        files.forEach( function( file, index ) {
            if(file.indexOf("js") != -1) {
                let helpFile = require("./" + file);
                if(helpFile.commandType == "server utility") {
                    serverutility = serverutility + "\r\n" + helpFile.commandName;
                }
                if(helpFile.commandType == "utility") {
                    utility = utility + "\r\n" + helpFile.commandName;
                }
                if(helpFile.commandType == "dumb") {
                    dumb = dumb + "\r\n" + helpFile.commandName;
                }
                if(helpFile.commandType == "nsfw") {
                    nsfw = nsfw + "\r\n" + helpFile.commandName;
                }
            }
        });
        var commandList = "#" + config.botname + " Commands\r\n#Server Commands" + serverutility + "\r\n#Utility Commands" + utility + "\r\n#Dumb Commands" + dumb;
        //If NSFW commands are added back, bring back "+ "\r\n#NSFW Commands" + nsfw" this segment to the commandList string above
        message.channel.send("<@" + message.author.id + ">" + "```Markdown\r\n"+commandList+"```\r\nTo learn more about specific commands, type `!help` followed by the command's name.\r\n*Ex.* `!help help`");
    });
    }
    if(args.length == 1) {
        fs.readdir("./commands", function(err, files) {
            if(err) {
                console.error("Couldn't list directory.", err);
                process.exit(1);
            }
            files.forEach(function(file, index) {
                if(file == (args[0] + ".js")) {
                    let retFile = require("./" + file);
                    var desc = "*Command Name:* `" + retFile.commandName + "`\r\n" + "*Command Type:* `" + retFile.commandType + "`\r\n" + "*Command Description:* `" + retFile.commandDescription + "`";
                    const embed = new Discord.RichEmbed()
                        .setAuthor("@" + message.member.nickname, message.author.avatarURL)
                        .setColor(colors.defaultColor)
                        .setDescription(desc)
                    message.channel.send({embed});
                }
            });
        });
    }
    if(args.length > 1) {
        const embed = new Discord.RichEmbed()
            .setAuthor("@" + message.member.nickname, message.author.avatarURL)
            .setColor(colors.noColor)
            .setDescription("please specify only 1 command to learn about\r\nex. `!help sendnude`")
        message.channel.send({embed});
    }
}