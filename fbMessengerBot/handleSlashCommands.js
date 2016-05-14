var sendMessage = require('./fbMessage/sendMessage');
var fbMessage = require('./fbMessage/fbMessage');

var debugMode = require('./config/debugMode');

var _ = require('underscore');

module.exports = function (config) {
	
	var senderId = config.senderId;
    var commands = config.command.split(' ');

    switch (commands[0]) {
        case 'weather':
            
            var location = _.rest(commands).join(' ');

            var textReply = new fbMessage
                .PlainText("Laicins " + commands + " ir jauks https://www.youtube.com/watch?v=PFjQd-sl_sU")
                .compose();

            sendMessage(senderId, textReply);            


        break;

    }





};