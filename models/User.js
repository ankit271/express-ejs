const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    first_name: {
        type: String,
        required: [true,'Please enter the first name .']
    },
    last_name: {
        type: String,
        required: [true,'Please enter the last name .']
    },
    email: {
        type: String,
        required: [true,'Please enter the email id .']
    },
    password: {
        type: String,
        required: [true,'Please enter the password .']
    },
    salt: {
        type: String      
    },
    is_active:{
        type: Boolean,
        default: true
    },
    country:{
        type: String
    }
},
{
        timestamps: true
}

);

module.exports = mongoose.model('User', userSchema);




