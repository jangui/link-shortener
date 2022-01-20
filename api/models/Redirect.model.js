const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const redirectSchema = new Schema({
    shortUrl: {
        type: String,
        trim: true,
        required: true,
        minLength: 1,
        maxLength: 30,
    },

    redirectUrl: {
        type: String,
        trim: true,
        required: true,
        minLength: 1,
        maxLength: 300,
    },

});

const Redirect = mongoose.model('Redirect', redirectSchema);

module.exports = Redirect;
