// profile.js

var uuid = require('uuid');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

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
      req.body.currency != undefined && req.body.email != undefined &&
      req.body.password != undefined) {

      bcrypt.hash(req.body.password, 10, function(err, hash) {

        if (err) {
          // error hashing password
          res.json({
            message: err.message
          });
        } else {

          // create profile and save to mysql database

          models.Profile.build({
            id: uuid.v1(),
            email: req.body.email,
            password: hash,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            imgurl: req.body.imgurl,
            accounttype: req.body.accounttype,
            magnetid: uuid.v1(),
            currency: req.body.currency
          })
          .save()
          .then(function(profile) {

            //successful login, make a token
            var token = jwt.sign(profile, app.get('secret'), {
              expiresIn: '1440m' // a day
            });

            res.json({
              message: 'Profile saved.',
              token: token
            });
          })
          .catch(function(err) {
            res.json({
              message: err.message
            });
          });
        }
      });
    } else {

      //some required parameter was not sent
      res.json({
        message: 'Missing parameters for profile creation.'
      });
    }
  });

}