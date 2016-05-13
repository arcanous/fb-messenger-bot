var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var fbMessengerBot = require('./fbMessengerBot/');


app.use(bodyParser.json());

app.get('/webhook', function (req, res) {
  if (req.query['hub.verify_token'] === 'writeButRememberAnythingHere') {
    res.send(req.query['hub.challenge']);
  } else {
    res.send('Error, wrong validation token');    
  }
});

app.post('/webhook', fbMessengerBot);



app.use(function(req, res){
   res.sendStatus(400);
});


app.listen(process.env.PORT || 8000, function () {});