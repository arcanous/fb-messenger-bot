var sendMessage = require('./fbMessage/sendMessage');
var fbMessage = require('./fbMessage/fbMessage');

var debugMode = require('./config/debugMode');

var _ = require('underscore');

module.exports = function (config) {
	
	var senderId = config.senderId;
    var commands = config.command.split(' ');

    switch (commands[0]) {
        case 'weather':
            
            var location = _.rest(commands, 1).join(' ');

            var textReply = new fbMessage
                .PlainText("Laicins " + commands + " ir jauks")
                .compose();

            sendMessage(senderId, textReply);            


        break;
        default:
            
            var textReply = new fbMessage
                .PlainText("Command '" + commands[0] + "' not found!")
                .compose();

            sendMessage(senderId, textReply); 

    }





};