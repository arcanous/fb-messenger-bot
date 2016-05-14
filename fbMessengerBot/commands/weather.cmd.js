var fbMessage = require('../fbMessage/fbMessage');
var weather = require('weather-js');

module.exports = function (commandArguments) {


    return new Promise(function (resolve, reject) {


        var a;

        weather.find({search: commandArguments, degreeType: 'C'}, function(err, result) {
             
            var result = result[0];
           
            if (err) {
                
                a = new fbMessage
                    .PlainText("Couldn't find wather for " + commandArguments)
                    .compose();

            } else {

                var temperature = parseInt(result.current.temperature) < 0 ? '-' + result.current.temperature : '+' + result.current.temperature + ' C';

                a = new fbMessage
                    .GenericTemplate()
                    .addElement({
                        title:      result.current.skytext,
                        image_url:  result.current.imageUrl,
                        subtitle:   temperature + ' Wind: ' + result.current.winddisplay
                    })
                    .addButton({
                        type:       "web_url",
                        url:        "http://www.msn.com/en-us/weather/weathersearch?q=" + result.current.observationpoint,
                        title:      result.current.day
                    })
                    .compose();

            }
            

            resolve(a);

        });




    });






}