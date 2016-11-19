// profile.js

var uuid = require('uuid');

module.exports = function(app, models) {

  app.get('/profile/:id', function(req, res) {

    models.Profile.find({
      where: {
        id: req.params.id,
      }
    })
    .then(function(profile) {
      res.json(profile);
    })
    .catch(function(err) {
      res.json({
        message: err.message
      });
    });

  });

  app.get('/profile', function(req, res) {

    models.Profile.findAll()
    .then(function(profiles) {
      res.json(profiles);
    })
    .catch(function(err) {
      res.json({
        message: err.message
      });
    });
  });

  app.post('/profile', function(req, res) {

    if (req.body.firstname != undefined && req.body.lastname != undefined &&
      req.body.imgurl != undefined && req.body.accounttype != undefined &&
      req.body.currency != undefined) {

      models.Profile.build({
        id: uuid.v1(),
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        imgurl: req.body.imgurl,
        accounttype: req.body.accounttype,
        magnetid: uuid.v1(),
        currency: req.body.currency
      })
      .save()
      .then(function(profile) {
        res.json({
          message: 'Profile saved.'
        });
      })
      .catch(function(err) {
        res.json({
          message: err.message
        });
      });
    } else {

      res.json({
        message: 'Missing parameters for profile creation.'
      });
    }
  });

}