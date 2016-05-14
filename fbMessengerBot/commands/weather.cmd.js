
var sendMessage = require('../fbMessage/sendMessage');
var fbMessage = require('../fbMessage/fbMessage');
var _ = require('underscore');

module.exports = function (commandArguments) {
	
    var textReply = new fbMessage
        .PlainText("...calling weather command with arguments: " + commandArguments)
        .compose();

	return textReply; 

}