var sendMessage = require('./fbMessage/sendMessage');


module.exports = function (senderId, postback) {
    

    sendMessage(senderId, {
        text : "Postback from " + senderId + ": " + JSON.stringify(postback)
    });



};