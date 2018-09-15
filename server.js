// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var logger = require("morgan");
var mongoose = require("mongoose");
//var Promise = require("bluebird");

var PORT = process.env.PORT || 8080;
var app = express();

process.env.MONGODB_URI = 'production';

// Models
var Comments = require("./models/Comments.js");
var News = require("./models/News.js");
var Users = require("./models/Users.js");

// Static directory
app.use(express.static("public"));

// Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));

// Database configuration with mongoose, errors, success
mongoose.Promise = Promise;
if (process.env.MONGODB_URI === 'production') {
    console.log('node env is', process.env.MONGODB_URI);
   
   mongoose.connect("mongodb://localhost/week18Populater");
} else {
    console.log('node env is', process.env.MONGODB_URI);
    mongoose.connect('mongodb://localhost/web-scraper');
}
var db = mongoose.connection;
db.on("error", function(error) { console.log("Mongoose Error: ", error); });
db.once("open", function() { console.log("Mongoose connection successful."); });

// Controllers
var routes = require("./controllers/controller.js");
app.use("/", routes);

app.listen(PORT, function() {
    console.log('Running on port: ' + PORT);
});