// message.js

var request = require('request');

module.exports = function(app, models) {
  app.post('/message', function(req, res) {

    // if (req.body.deviceId) {

    var response = undefined;

    request({
      // url: 'http://159.203.8.134:3000/login',
      url: 'https://fcm.googleapis.com/fcm/send',
      method: 'post',
      headers: {
        Authorization: 'key=AIzaSyAokS3NEjFMIWTtYXUZWMjmGog0vmLFulE',
        Content: 'application/json'
      },
      // json: {
      //   email: 'greg@email.com',
      //   password:'password'
      // }
      json: {
        data: { "collapse_key": "score_update",
          "time_to_live": 108,
          "data": {
            "score": "4x8",
            "time": "15:16.2342"
          },
          "to" : req.body.deviceId
        }
      }
    }, function(err, response, body) {
      console.log(response);
      res.json({
        success: true,
        data: response
      });
    });
    
    // } else {
    //   res.json({
    //     success: false,
    //     message: 'Device ID was not specified.'
    //   });
    // }

  });
};


//     request.post('', { 
//       json: {
//         to: req.body.deviceId,
//         data: "test message"
//       } 
//     },
//         function (error, response, body) {
//         if (!error && response.statusCode == 200) {
//           console.log(body);
//         }
//     }
// );