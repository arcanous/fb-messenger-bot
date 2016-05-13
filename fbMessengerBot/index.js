var handleMessages = require('./handleMessages');
var handlePostbacks = require('./handlePostbacks');
var handleOptins = require('./handleOptins');

module.exports = function (req, res) {

  messaging_events = req.body.entry[0].messaging;
  
  for (i = 0; i < messaging_events.length; i++) {
    
    event = req.body.entry[0].messaging[i];
    sender = event.sender.id;
    recipient = event.recipient.id;


    //messages
    if (event.message && event.message.text) {
      
        handleMessages(sender, event.message);

    }


    //messaging_postbacks
    if (event.postback && event.postback.payload) {

        handlePostbacks(sender, event.postback);

    }

    //messaging_optins
    if (event.optin && event.optin.ref) {

        handleOptins(sender, event.optin);

    }


    //message_deliveries
    if (event.delivery && event.delivery.watermark) {



    }


  }

  res.sendStatus(200);

};