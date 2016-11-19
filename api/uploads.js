var multiparty           = require('connect-multiparty');
var multiPartyMiddleware = multiparty();
var path                 = require('path');
var fs                   = require('fs');

PROFILE_UPLOADS_PATH     = path.join(__dirname,"..","uploads");
ACCEPTED_FILE_EXTENSIONS = [".jpg",".jpeg",".png",".bmp"];

module.exports = function(app, models) {


  app.post('/uploadProfilePicture', multiPartyMiddleware,  function (req, res) {

      var file = req.files.file;
      var fileExtension = path.extname(file.originalFilename);

      if(file) {

        //generate new file name using the magnetid of a users profile
        var newFileName = req.body.magnetid + fileExtension;
        //generate new path to file name
        var newPath = path.join(PROFILE_UPLOADS_PATH, newFileName);

        fs.readFile(file.path, function (err, data) {

          fs.writeFile(newPath, data, function (err) {
            if(err)
              return res.status(500).json({success: false, message: err.message});

            return res.json({success: true, data: "http://localhost:3000/uploads/" + newFileName});
          });
        });
      }
    });

};
