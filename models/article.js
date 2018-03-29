var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({

    title: {
        type: String,
        // trim: true,
        // required: true,
        unique: true
    },

    summary: {
        type: String,
        // trim: true,
        // required: false,
    },

    URL: {
        type: String,
        // trim: true,
        // required: true,
        

    },

    image: {
        type: String,
        // trim: true,
    },

    userCreated: {
        type: Date,
        default: Date.now
    },

    // note: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'note'
    // },

    notes: {
        type: Array,
        trim: true
    },

    saved: {
        type: Boolean,
        default: false
    },

    buttonId: {
        type: String,
        
    }


})

// ArticleSchema.methods.saveArticle = function() {
//     this.saved = true;
// }

var Article = mongoose.model('Article', ArticleSchema)

module.exports = Article