var express = require('express');
var app = express();
var mongoose = require('mongoose');
var cheerio = require('cheerio');
var request = require('request');
var exphbs = require("express-handlebars");

//Use morgan logger for logging requests
var logger = require('morgan');
app.use(logger("dev"));

//handlebars set-up
var hbs = exphbs.create({
    // Specify helpers which are only registered on this instance.
    helpers: {
        foo: function (a) { return 'FOO!' + a; },
        bar: function (b) { return 'BAR!' + b; },
        inc: function (value) {return parseInt(value)+1},
        breaklines: function(text) {
            text = Handlebars.Utils.escapeExpression(text);
            text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
            return new Handlebars.SafeString(text);
        }
    },
    defaultLayout: "main"
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Use body-parser for handling form submissions
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
  useMongoClient: true
});

// Sets up the Port
var PORT = 4020;
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });

