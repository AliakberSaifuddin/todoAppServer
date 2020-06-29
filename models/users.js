var mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Schema

var userSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
});

var Users = mongoose.model('User', userSchema);
module.exports = Users;