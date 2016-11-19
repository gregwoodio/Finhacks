var express    = require("express");
var app        = express();
var mongoose   = require("mongoose");
var bodyParser = require('body-parser');
var PORT       = process.env.port || 3000;
var config     = require('./config');

//setup body parser for when post requests are sent
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true,
	limit: '10mb',
})); // for parsing application/x-www-form-urlencoded

//connect to mongodb database
//make sure you run "use finhacks2016 in mongodb console"
mongoose.connect('mongodb://localhost/finhacks2016');

var models = require('./models.js');

require('./api/profile')(app, models);
require('./api/device')(app, models);
require('./api/uploads')(app, models);
require('./api/login')(app, models);

//secret for signing tokens
app.set('secret', config.secret);

// Configuration
app.use(express.static(__dirname + '/uploads'));

app.listen(PORT);

console.log("Server started and listening on port " + PORT);
