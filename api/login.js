// login.js

var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

module.exports = function(app, models) {

  app.post('/login', function(req, res) {

    if (req.body.email != undefined && req.body.password != undefined) {
      
      bcrypt.hash(req.body.password, 10, function(err, hash) {

        models.Profile.find({
          where: {
            email: req.body.email
          }
        }).then(function(profile) {

          // no such email
          if (!profile) {
            res.json({
              message: 'No profile found.'
            });
            return;
          }

          // wrong password
          if (!bcrypt.compareSync(req.body.password, profile.dataValues.password)) {
            res.json({
              message: 'Incorrect username or password.'
            });
            return;
          }

          delete profile.dataValues.password;
          var token = jwt.sign(profile.dataValues, app.get('secret'), {
            expiresIn: '1440m' // a day
          });

          res.json({
            message: 'Successful login',
            token: token
          });

        });

      });

    } else {
      res.json({
        message: 'Missing email or password.'
      });
    }
  })
}