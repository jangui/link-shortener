const mongoose = require('mongoose');

const schema = mongoose.Schema;

const linkSchema = new Schema({
    name: {
        type: String,
        minLength: 1,
        maxLength: 30,
        trim: true,
    },

    url: {
        type: String,
        minLength: 1,
        maxLength: 300,
        trim: true,
    },

    /*
    picture: {
        // TODO
    }
    */

});

const Link = mongoose.model('Link', linkSchema);

module.exports = Link;
