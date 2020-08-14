var mongoose = require("mongoose");

// Schema for note/comment

var Schema = mongoose.Schema;
// Schema constructor
var NoteSchema = new Schema({
    body: {
        type: String,
        required: true
    },
})

// create article
var Note = mongoose.model("Note", NoteSchema);

// Export the Article model
module.exports = Note;