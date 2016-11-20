// profile.js

var uuid = require('uuid');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var mw = require('../middleware');

module.exports = function(app, models) {

  app.get('/profile', mw.verifyToken, function(req, res) {

    models.Profile.find({
      where: {
        id: req.decoded.id,
      }
    })
    .then(function(profile) {
      delete profile.password;
      res.json(profile);
    })
    .catch(function(err) {
      res.json({
        message: err.message
      });
    });

  });

  app.post('/profile', function(req, res) {

    // console.log('firstname: ', req.body.firstname);
    // console.log('lastname: ', req.body.lastname);
    // console.log('imgurl: ', req.body.imgurl);
    // console.log('accounttype: ', req.body.accounttype);
    // console.log('currency: ', req.body.currency);
    // console.log('email: ', req.body.email);
    // console.log('password: ', req.body.password);

    if (req.body.firstname && req.body.lastname && //req.body.imgurl &&
      req.body.accounttype && req.body.currency && req.body.email &&
      req.body.password) {

      bcrypt.hash(req.body.password, bcrypt.genSaltSync(10), null, function(err, hash) {

        if (err) {
          // error hashing password
          res.json({
            message: err.message
          });
        } else {

          // create profile and save to mysql database

          var id = uuid.v1();
          var magnetid = req.body.firstname + ' ' + req.body.lastname + '-' + id.substring(0,8);

          models.Profile.build({
            id: id,
            email: req.body.email,
            password: hash,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            accounttype: req.body.accounttype,
            magnetid: magnetid,
            currency: req.body.currency
          })
          .save()
          .then(function(profile) {

            //successful login
            res.json({
              message: 'Profile saved.',
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


  app.put("/profile", mw.verifyToken, function (req, res) {

    var profile = req.decoded;

    models.Profile.find({id: req.decoded.id})
    .then(function (profile) {

      //if firstname or last name is passed through as an update field then update magnet id with new credentials
      var magnetid = req.body.firstname || profile.firstname;
      magnetid += " ";
      magnetid += req.body.lastname || profile.lastname;
      magnetid += "-";
      magnetid += profile.id.split("-")[0];

      profile.update({
        imgurl: req.body.imgurl || profile.imgurl,
        firstname: req.body.firstname || profile.firstname,
        lastname: req.body.lastname || profile.lastname,
        magnetid: magnetid
      }).then(function (updatedProfile) {
        //sign new token

        res.send(updatedProfile);
      });

    });





  });


}
