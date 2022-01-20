const mongoose = require('mongoose');

const schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        trim: true,
        minLength: 3,
        maxLength: 30,
        required: true,
    },

    password: {
        type: String,
        required: true,
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
