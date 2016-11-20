// message.js

var request = require('request');

module.exports = function(app, models) {
  app.post('/message', function(req, res) {

    models.Profile.find({
      where: {
        magnetid: req.body.magnetid
      },
      include: [{
        model: models.ProfileDevice,
        include: [{
          model: models.Profile
        }]
      }]
    })
    .then(function(device) {
      
    })

    console.log(req.body.deviceId);
    console.log(req.body.message);

    request({
      url: 'https://fcm.googleapis.com/fcm/send',
      method: 'post',
      headers: {
        "Authorization": 'key=AAAAeIQERUc:APA91bGEKsiM-04ISYYVfVv0wIgUIkmq50C4aGmxRclhX1oqEmbla-H8DBtWQON1LcKMJnpShjNohyXRTIicsOHRqzDuTVFQ6TuMluDJIT46Thl6GyO_2KKRDBFR_b--zot9mdxKoMd2TjMmS3R-Mp64BYaP66ZjAA',
        "Content-Type": 'application/json'
      },
      json: {
        'to': req.body.deviceId,
        'notification':   {
          'body': req.body.message
        }
      }
    }, function(err, response, body) {
      // console.log(response);
      res.json({
        response
      });
    });

  });
};