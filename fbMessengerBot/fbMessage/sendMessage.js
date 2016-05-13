var request = require('request');
var token = require('../config/appToken');

module.exports = function sendMessage(recipientId, messageData, notificationType) {

    if (!notificationType) {
        notificationType = 'REGULAR'; // alternatives: SILENT_PUSH, NO_PUSH
    }

    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {
            access_token: token
        },
        method: 'POST',
        json: {
            recipient: {
                id: sender
            },
            message: messageData,
            notification_type: notificationType
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    });
};