// device.js

var uuid = require('uuid');
var mw = require('../middleware');

module.exports = function(app, models) {

  app.get('/device/:id', function(req, res) {

    models.Device.find({
      where: {
        deviceid: req.params.id,
      },
      include: [{
        model: models.ProfileDevice,
        include: [{
          model: models.Profile,
          attributes: ['magnetid','imgurl']
        }]
      }]
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


    //CHECK if all fields are sent through
    if (req.body.devicetype && req.body.deviceid) {


      models.Device.build({
        deviceid: req.body.deviceid,
        devicetype: req.body.devicetype,
      })
      .save()
      .then(function(device) {
        //attach new device to profile
        models.ProfileDevice.build({
          profileid: req.decoded.id,
          deviceid: device.deviceid
        })
        .save()
        .then(function (obj) {
          res.send({success: true, message: "Device saved"});
        });
      })
      .catch(function(err) {
        res.json({success: false, message: err.message});
      });
    } else {

      res.json({success: false,message: 'Missing parameters for device creation.'});
    }
  });

  app.post("/device/updatefdi/:id/:fdi", mw.verifyToken, function (req, res) {
    //upon logging in
    //on Android side, get the firebase devce id and send it to this route
    //also pass in the phone's uuid and check if the fdi column has to be updated based on the device id

    var id = req.params.id;

    models.Device.find({
      where: {
        deviceid: id,
      },
      include: [{
        model: models.ProfileDevice,
        include: [{
          model: models.Profile,
          attributes: ['magnetid','imgurl']

        }]
      }]
    }).then(function (device) {

      if(device.profile_devices.profile.id != req.decoded.id)
        return res.send({success: false, message: "You cannot update this device"});


      console.log("old fdi is: " + device.fdi);
      console.log("new fdi is: " + req.params.fdi);
      //if the fdi was changed and they don't match up in database
      if(device.fdi != req.params.fdi) {
        //update the database with the new fdi.
        device.update({fdi: req.params.fdi}).then(function () {});
        res.send({success: true, message: "FDI updated"});
      }

      //otherwise do nothing
      return res.end("nothing happaned");
    })
    .catch(function (err) {
      res.json({success: false,message: err.message});
    });
  });

}
