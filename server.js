var express = require('express');
var app = express();
var Article = require('./models/model.js');
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

// Sets up the Port
var PORT = 4020;
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });

//get routes
app.get('/', function(req, res){
    res.render('index');
})

app.get('/all', function(req, res){
    //scrape request
    request('https://www.theonion.com/', function(error, response, html){
        var $ = cheerio.load(html);
        var results = [];
        $('a.js_entry-link').each(function(i, element){
            var URL = $(element).attr("href");
            var title = $(element).text()
            var summary = $(element).parent('header').siblings('div.item_content').children('div').children('p')//.text()
            var image = $(element).parent('header').siblings('div.item_content').children('figure').children('a').children('div').children('picture').children('img').attr('src')
            results.push({
                title: title,
                URL: URL,
                summary: summary,
                image: image
            })
        })
        console.log(results)
        res.render('index', {
            results: results
        });
    });
})

