var sendMessage = require('./fbMessage/sendMessage');
var fbMessage = require('./fbMessage/fbMessage');

var debugMode = require('./config/debugMode');

module.exports = function (config) {
	
	var senderId = config.senderId;


    switch (config.command) {
        case 'debug on':
            
            debugMode.setDebugMode(senderId, true);
            
            var textReply = new fbMessage
                .PlainText("Debug turned on for sender: " + senderId)
                .compose();

            sendMessage(senderId, textReply);

        break;
        case 'debug off':
            
            debugMode.setDebugMode(senderId, false);

            var textReply = new fbMessage
                .PlainText("Debug turned off for sender: " + senderId)
                .compose();

            sendMessage(senderId, textReply);

        break;
        case 'reply with image':
            
            var imageReply = new fbMessage
                .Image("https://s-media-cache-ak0.pinimg.com/564x/fe/3f/87/fe3f8734980b5f0075a4221e20081520.jpg")
                .compose();


            sendMessage(senderId, imageReply);

        break;
        case 'reply with button template':
            
            var buttonTemplateReply = new fbMessage
                .ButtonTemplate("Which button would you like to press today?")
                .addButton({
                    type:   "web_url",
                    title:  "Visit www.nu.nl",
                    url:    "http://www.nu.nl"
                })
                .addButton({
                    type:       "postback",
                    title:      "Postback to bot",
                    payload:    "POSTBACK_SAMPLE_PAYLOAD"
                })
                .compose();

            sendMessage(senderId, buttonTemplateReply);

        break;

        case 'reply with generic template':
            
            var genericTemplateReply = new fbMessage
                .GenericTemplate()
                .addElement({
                    title:      "Classic White T-Shirt",
                    image_url:  "http://petersapparel.parseapp.com/img/item100-thumb.png",
                    subtitle:   "Soft white cotton t-shirt is back in style"
                })
                    .addButton({
                        "type": "web_url",
                        "url": "https://petersapparel.parseapp.com/view_item?item_id=100",
                        "title": "View Item"
                    })
                    .addButton({
                        "type": "web_url",
                        "url": "https://petersapparel.parseapp.com/buy_item?item_id=100",
                        "title": "Buy Item"
                    })
                    .addButton({
                        "type": "postback",
                        "title": "Bookmark Item",
                        "payload": "USER_DEFINED_PAYLOAD_FOR_ITEM1"
                    })
                .addElement({
                    "title": "Universal Infinity",
                    "image_url": "https://s-media-cache-ak0.pinimg.com/474x/a2/78/76/a27876a8c8742dd0487e9bd830b2d15c.jpg",
                    "subtitle": "Ye ye, all fancy n stuff"
                })
                    .addButton({
                        "type": "postback",
                        "title": "Postback for this item",
                        "payload": "USER_DEFINED_PAYLOAD_FOR_ITEM2"
                    })
                .addElement({
                    "title": "Some third option",
                    "image_url": "https://s-media-cache-ak0.pinimg.com/564x/fe/3f/87/fe3f8734980b5f0075a4221e20081520.jpg",
                    "subtitle": "Knight in mystic light"
                })   
                    .addButton({
                        "type": "web_url",
                        "url": "https://s-media-cache-ak0.pinimg.com/564x/fe/3f/87/fe3f8734980b5f0075a4221e20081520.jpg",
                        "title": "View Item"
                    })                              
                    .addButton({
                        "type": "postback",
                        "title": "Do a postback",
                        "payload": "ANOTHER_POSTBACK"
                    })                 
                    .addButton({
                        "type": "postback",
                        "title": "Or not",
                        "payload": "ANOTHER_POSTBACK1"
                    })                               
                .compose();


                sendMessage(senderId, genericTemplateReply);

        break;
        case 'reply with receipt template':
            
            var receiptTemplateReply = new fbMessage
                .ReceiptTemplate()
                .compose();


            sendMessage(senderId, receiptTemplateReply);

        break;

        default:

            //default case if nothing else applies....
    }





};