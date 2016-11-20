var multiparty           = require('connect-multiparty');
var multiPartyMiddleware = multiparty();
var path                 = require('path');
var fs                   = require('fs');
var mw                   = require('../middleware');

PROFILE_UPLOADS_PATH     = path.join(__dirname,"..","uploads");
ACCEPTED_FILE_EXTENSIONS = [".jpg",".jpeg",".png",".bmp"];

module.exports = function(app, models) {


  app.post('/uploadProfilePicture', [multiPartyMiddleware, mw.verifyToken],  function (req, res) {


      //base 64 encoded image file
      var file = req.body.image;


      if(file) {

        //generate new file name using the magnetid of a users profile
        var newFileName = req.body.magnetid + ".jpg";
        var newPath = path.join(PROFILE_UPLOADS_PATH, newFileName);
        var bitmap = new Buffer(file, 'base64');

        fs.writeFile(newPath, bitmap, function (err) {
          if(err)
            return res.status(500).send("error " + err.message);

          return res.send("http://159.203.8.134:3000/" + newFileName + "-success");
        });
      } else {
        res.send("no image sent");
      }
    });
};
