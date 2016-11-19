var express    = require("express");
var app        = express();
var mongoose   = require("mongoose");
var bodyParser = require('body-parser');

//setup body parser for when post requests are sent
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//connect to mongodb database
//make sure you run "use finhacks2016 in mongodb console"
mongoose.connect('mongodb://localhost/finhacks2016');
