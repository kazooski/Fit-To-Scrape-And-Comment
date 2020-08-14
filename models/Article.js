var mongoose = require("mongoose");

// Schema for articles

var Schema = mongoose.Schema;
// Schema constructor
var ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
})

// create article
var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;