// device.js

var uuid = require('uuid');

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

  app.get('/device', function(req, res) {

    models.Device.findAll()
    .then(function(devices) {
      res.json(devices);
    })
    .catch(function(err) {
      res.json({
        message: err.message
      });
    });
  });

  app.post('/device', function(req, res) {

    if (req.body.devicetype != undefined && req.body.devicename != undefined) {

      models.Device.build({
        deviceid: undefined,
        devicetype: req.body.devicetype,
        devicename: req.body.devicename
      })
      .save()
      .then(function(device) {
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

}