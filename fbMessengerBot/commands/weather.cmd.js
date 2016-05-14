var fbMessage = require('../fbMessage/fbMessage');
var weather = require('weather-js');

module.exports = function (commandArguments) {


    weather.find({search: commandArguments, degreeType: 'C'}, function(err, result) {
          
        if (err) {
            
            var textReply = new fbMessage
                .PlainText("Couldn't find wather for " + commandArguments)
                .compose();

        } else {

            var textReply = new fbMessage
                .PlainText(JSON.stringify(result))
                .compose();

        }
        

        return textReply; 


    });

}