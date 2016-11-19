// device.js

var uuid = require('uuid');
var mw = require('../middleware');

module.exports = function(app, models) {

  app.get('/device/:id', function(req, res) {

    models.Device.find({
      where: {
        deviceid: req.params.id,
      }
    })
    .then(function(device) {
      res.json(device);
    })
    .catch(function(err) {
      res.json({
        message: err.message
      });
    });

  });

  // app.get('/device', function(req, res) {

  //   models.Device.findAll()
  //   .then(function(devices) {
  //     res.json(devices);
  //   })
  //   .catch(function(err) {
  //     res.json({
  //       message: err.message
  //     });
  //   });
  // });

  app.post('/device', mw.verifyToken, function(req, res) {

    if (req.body.devicetype != undefined && req.body.devicename != undefined) {

      models.Device.build({
        deviceid: undefined,
        devicetype: req.body.devicetype,
        devicename: req.body.devicename
      })
      .save()
      .then(function(device) {

        models.ProfileDevice.build({
          profileid: 
        }

        res.json({
          message: 'Device saved.'
        });
      })
      .catch(function(err) {
        res.json({
          message: err.message
        });
      });
    } else {

      res.json({
        message: 'Missing parameters for device creation.'
      });
    }
  });

  app.post("/device/updatefdi", mw.verifyToken, function (req, res) {
    models.Device.update({
      fdi: req.body.fdi
    }, {
      where: {
        deviceid: req.body.deviceId
      }
    }).then(function (device) {});
  });

}
