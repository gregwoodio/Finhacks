// message.js

var request = require('request');

module.exports = function(app, models) {
  app.post('/message', function(req, res) {


    request.post('http://www.yoursite.com/formpage', { 
      json: {
        key: 'value' 
      } 
    },
        function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log(body);
        }
    }
);
  });
};