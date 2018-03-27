var mongoose = require('mongoose')
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
  useMongoClient: true
});
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({

    headline: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },

    summary: {
        type: String,
        trim: true,
        required: true,
    },

    URL: {
        type: String,
        trim: true,
        required: true,

    },

    image: {
        type: String,
        trim: true,
    },

    userCreated: {
        type: Date,
        default: Date.now
    }


})

var Article = mongoose.model('Article', ArticleSchema)

module.exports = Article