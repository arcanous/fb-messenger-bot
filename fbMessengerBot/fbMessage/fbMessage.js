


function composeMessage () {
    return function () {
        return this.message;
    }
}



module.exports = {};


/***************************************
 * Plain text message
 ***************************************/

 /* Example output:
    {
        "text":"hello, world!"
    } 

  */

module.exports.PlainText = function (text) {
    var self = this;

    if (!text) { 
        throw Error('No message text provided');
    } 

    self.message = {
        text : text
    };

    self.compose = composeMessage();


    return self;
};



/***************************************
 * Image message
 ***************************************/

/* Example output: 
    {
        "attachment":{
          "type":"image",
          "payload":{
            "url":"https://petersapparel.com/img/shirt.png"
          }
        }
    }

*/
module.exports.Image = function (imageUrl) {
    var self = this;

    if (!imageUrl) { 
        throw Error('No image url provided');
    } 

    self.message = {
        "attachment":{
            "type":"image",
            "payload":{
                "url": imageUrl
            }
        }
    };

    self.compose = composeMessage();

};




/***************************************
 * Button template
 ***************************************/

/* Example output: 

  {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":"What do you want to do next?",
        "buttons":[
          {
            "type":"web_url",
            "url":"https://petersapparel.parseapp.com",
            "title":"Show Website"
          },
          {
            "type":"postback",
            "title":"Start Chatting",
            "payload":"USER_DEFINED_PAYLOAD"
          }
        ]
      }
    }
  }

*/
module.exports.ButtonTemplate = function (title) {
    var self = this;
    
    if (!title) { 
        throw Error('No template title provided');
    } 

    self.message =  {
         "attachment": {
             "type": "template",
             "payload": {
                 "template_type": "button",
                 "text": title,
                 "buttons": []
             }
         }
     };

     self.addButton = function (buttonConfig) {

        if (self.message.attachment.payload.buttons.length <= 2) {
            self.message.attachment.payload.buttons.push(buttonConfig);
        } else {
            console.warn('Can\'t add more than 3 buttons to ButtonTemplate');
        }

        

        return self;
     };

    self.compose = function () {

        if (self.message.attachment.payload.buttons.length === 0) {
            throw Error('You have to add at least 1 button to ButtonTemplate message');
        }


        return self.message;
    };

};




/***************************************
 * Generic template
 ***************************************/

/* Example output: 

  {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"generic",
        "elements":[
          {
            "title":"Classic White T-Shirt",
            "image_url":"http://petersapparel.parseapp.com/img/item100-thumb.png",
            "subtitle":"Soft white cotton t-shirt is back in style",
            "buttons":[
              {
                "type":"web_url",
                "url":"https://petersapparel.parseapp.com/view_item?item_id=100",
                "title":"View Item"
              },
              {
                "type":"web_url",
                "url":"https://petersapparel.parseapp.com/buy_item?item_id=100",
                "title":"Buy Item"
              },
              {
                "type":"postback",
                "title":"Bookmark Item",
                "payload":"USER_DEFINED_PAYLOAD_FOR_ITEM100"
              }              
            ]
          },
          {
            "title":"Classic Grey T-Shirt",
            "image_url":"http://petersapparel.parseapp.com/img/item101-thumb.png",
            "subtitle":"Soft gray cotton t-shirt is back in style",
            "buttons":[
              {
                "type":"web_url",
                "url":"https://petersapparel.parseapp.com/view_item?item_id=101",
                "title":"View Item"
              },
              {
                "type":"web_url",
                "url":"https://petersapparel.parseapp.com/buy_item?item_id=101",
                "title":"Buy Item"
              },
              {
                "type":"postback",
                "title":"Bookmark Item",
                "payload":"USER_DEFINED_PAYLOAD_FOR_ITEM101"
              }              
            ]
          }
        ]
      }
    }
  }

*/
module.exports.GenericTemplate = function () {
    var self = this;

    self.message = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": []
            }
        }
    };


    self.addElement = function (elementConfig) {

        elementConfig.buttons = [];

        if (self.message.attachment.payload.elements.length < 10) {
            self.message.attachment.payload.elements.push(elementConfig);
        } else {
            console.warn('Can\'t add more than 10 elements to a GenericTemplate');
        }

        return self;
    };


    self.addButton = function (buttonConfig) {

        if (self.message.attachment.payload.elements.length === 0) {
            throw Error('You have to add at least 1 element first to add buttons to it');
        }

        var lastElementId = self.message.attachment.payload.elements.length - 1;

        if (self.message.attachment.payload.elements[lastElementId].buttons.length <= 2) {
            self.message.attachment.payload.elements[lastElementId].buttons.push(buttonConfig);
        } else {
            console.warn('Can\'t add more than 3 buttons to element #' + lastElementId);
        }

        return self;
    };





    self.compose = function () {

        if (self.message.attachment.payload.elements.length === 0) {
            throw Error('You have to add at least 1 element to GenericTemplate message');
        }
        return self.message;
    };


};




/***************************************
 * Receipt
 ***************************************/

/* Example output: 

  {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"receipt",
        "recipient_name":"Stephane Crozatier",
        "order_number":"12345678902",
        "currency":"USD",
        "payment_method":"Visa 2345",        
        "order_url":"http://petersapparel.parseapp.com/order?order_id=123456",
        "timestamp":"1428444852", 
        "elements":[
          {
            "title":"Classic White T-Shirt",
            "subtitle":"100% Soft and Luxurious Cotton",
            "quantity":2,
            "price":50,
            "currency":"USD",
            "image_url":"http://petersapparel.parseapp.com/img/whiteshirt.png"
          },
          {
            "title":"Classic Gray T-Shirt",
            "subtitle":"100% Soft and Luxurious Cotton",
            "quantity":1,
            "price":25,
            "currency":"USD",
            "image_url":"http://petersapparel.parseapp.com/img/grayshirt.png"
          }
        ],
        "address":{
          "street_1":"1 Hacker Way",
          "street_2":"",
          "city":"Menlo Park",
          "postal_code":"94025",
          "state":"CA",
          "country":"US"
        },
        "summary":{
          "subtotal":75.00,
          "shipping_cost":4.95,
          "total_tax":6.19,
          "total_cost":56.14
        },
        "adjustments":[
          {
            "name":"New Customer Discount",
            "amount":20
          },
          {
            "name":"$10 Off Coupon",
            "amount":10
          }
        ]
      }
    }
  }

*/
module.exports.ReceiptTemplate = function () {
    var self = this;
    //not implemented

    self.message = {
        "attachment":{
          "type":"template",
          "payload":{
            "template_type":"receipt",
            "recipient_name":"Stephane Crozatier",
            "order_number":"12345678902",
            "currency":"USD",
            "payment_method":"Visa 2345",        
            "order_url":"http://petersapparel.parseapp.com/order?order_id=123456",
            "timestamp":"1428444852", 
            "elements":[
              {
                "title":"Classic White T-Shirt",
                "subtitle":"100% Soft and Luxurious Cotton",
                "quantity":2,
                "price":50,
                "currency":"USD",
                "image_url":"http://petersapparel.parseapp.com/img/whiteshirt.png"
              },
              {
                "title":"Classic Gray T-Shirt",
                "subtitle":"100% Soft and Luxurious Cotton",
                "quantity":1,
                "price":25,
                "currency":"USD",
                "image_url":"http://petersapparel.parseapp.com/img/grayshirt.png"
              }
            ],
            "address":{
              "street_1":"1 Hacker Way",
              "street_2":"",
              "city":"Menlo Park",
              "postal_code":"94025",
              "state":"CA",
              "country":"US"
            },
            "summary":{
              "subtotal":75.00,
              "shipping_cost":4.95,
              "total_tax":6.19,
              "total_cost":56.14
            },
            "adjustments":[
              {
                "name":"New Customer Discount",
                "amount":20
              },
              {
                "name":"$10 Off Coupon",
                "amount":10
              }
            ]
          }
        }
    };


    self.compose = composeMessage();

};
