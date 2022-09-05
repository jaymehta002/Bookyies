const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    quote:{
        type: String,
    },
    image:{
        data: Buffer,
        contentType: String
    },
    createdBy: String
},
{
    timestamps: true
}
);

module.exports = mongoose.model("Book", bookSchema);