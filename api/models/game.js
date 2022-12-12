const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    }
})


module.exports = mongoose.model('Game', gameSchema);