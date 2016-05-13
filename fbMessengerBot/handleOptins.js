var sendMessage = require('./fbMessage/sendMessage');


module.exports = function (senderId, optin) {
    

    sendMessage(senderId, {
        text : "Option from " + senderId + ": " + JSON.stringify(optin)
    });


};