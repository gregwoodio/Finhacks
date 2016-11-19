// middleware.js

app = require('../index');
config = require('../config/config');

function verifyToken(req, res, next) {
  var token = req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        return res.status(403).json({
          success: false,
          message: "Failed to authenticate token."
        });
      } else {
        return next();
      }
    });
  } else {

    return res.status(403).json({
      success: false,
      message: "No token provided."
    });
  }
}

module.exports = {
  verifyToken: verifyToken
};