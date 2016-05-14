var sendMessage = require('./fbMessage/sendMessage');
var fbMessage = require('./fbMessage/fbMessage');

var debugMode = require('./config/debugMode');

var _ = require('underscore');
var glob = require("glob")

var availableCommands = {};

// options is optional
glob("./fbMessengerBot/commands/**/*.cmd.js", { follow: true}, function (er, files) {

    _.each(files, function (file) {

        var path = file.split('/');
        var commandName = path[path.length - 1].replace('.cmd.js', '');


        availableCommands[commandName] = require('./commands/' + commandName + '.cmd');


    });

});




module.exports = function (config) {
	
	var senderId = config.senderId;
    var commands = config.command.split(' ');



    if (availableCommands[commands[0]]) {
        
        var restCommandParameters = _.rest(commands, 1).join(' ');
        availableCommands[commands[0]](restCommandParameters);

    } else {
        
        var textReply = new fbMessage
            .PlainText("Command '" + commands[0] + "' not found!")
            .compose();

        sendMessage(senderId, textReply); 
        
        if (_.size(availableCommands) > 0) {

            var availableCommandNames = _.keys(availableCommands).join(', ');

            textReply = new fbMessage
                .PlainText("Available commands: " + availableCommandNames)
                .compose();

            sendMessage(senderId, textReply); 
        }

    }



};