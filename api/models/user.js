const mongoose = require('mongoose');

const validateEmail = (email) => {
    return (/^\S+@\S+\.\S+$/
    ).test(email)
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Email invalid']
    },
    password: {
        type: String
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    }
})


module.exports = mongoose.model('User', userSchema);