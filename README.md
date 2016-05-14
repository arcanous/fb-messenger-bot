# fb-messenger-bot

Super lightweight Node.js / Express application that serves webhook for Facebook Messenger API.


## Installing

Fork or clone the repo. 

Turn on appropriate background music on. [Uplink OST](https://www.youtube.com/watch?v=QliQ0livbeQ) is highly suggested.

Follow the guide at [Facebook Messenger Platform - Getting Started](https://developers.facebook.com/docs/messenger-platform/quickstart). You should have a Facebook page and App set up before continuing.

Set up web access to your appication. HTTPS is prefered. If you don't have a personal preference, [Heroku](https://www.heroku.com/) is well suited for quick deployment, development and experimentation.

Enter your app https address followed by ```/webhook``` in ![setup](https://scontent-amt2-1.xx.fbcdn.net/t39.2178-6/12057143_211110782612505_894181129_n.png)

Subscribe to messages and messaging_postbacks at least.
Then whatever you set as Verify Token change it accordingly in server.js
```
//server.js
app.get('/webhook', function (req, res) {
  if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
  ...
```

Commit, push... or whatever workflow you use to deploy. Click Verify and Save, it should proceed without error.

Select your page and obtain Page Access Token
![setup](https://scontent-amt2-1.xx.fbcdn.net/t39.2178-6/12995543_1164810200226522_2093336718_n.png)

Then copy it into:
```
//fbMessengerBot/config/appToken.js
module.exports = '<ACCESS TOKEN HERE>';
```

Save, commit, deploy.
You should be up and running.
Open up your Facebook page, click messages and start conversing with the bot...

## Architecture

Whenever you write a message to your bot in Facebook Messenger, a POST request is made to ```https://yourappurl.com/webhook```. App initially receives them in ```/fbMessengerBot/index.js```

Then based on message type they are passed onto different handlers 
- ```/fbMessengerBot/handleMessages.js``` - generic messages typed by users
- ```/fbMessengerBot/handlePostbacks.js``` - postbacks whenever user clicks a button with postback payload defined
- ```/fbMessengerBot/handleOptins.js``` - user optins


## Bot commands

Bot has few initial commands to play with

```@bot debug on``` Turns on debug mode on, should echo back every message you write with full JSON message data.

```@bot debug off``` Turns it off...

### Sample messages
```@bot reply with image```

```@bot reply with button template```

```@bot reply with generic template```

```@bot reply with receipt template```


## Composing Facebook Send API messages

Facebook API expects JSON messages in format described in [Send API reference](https://developers.facebook.com/docs/messenger-platform/send-api-reference).

For convenience you can use fbMessage class in ```/fbMessengerBot/fbMessage/fbMessage.js```
Sample messages are assembled in ```/fbMessengerBot/handleBotCommands.js```

Example:
```
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
```

don't forget to add .compose() at the end, because that will return the final JSON and assign to the variable.

Available message types:
- fbMessage.PlainText(text)
- fbMessage.Image(imageUrl)
- fbMessage.ButtonTemplate(title)
- fbMessage.GenericTemplate
- fbMessage.ReceiptTemplate (not implemented yet...)


