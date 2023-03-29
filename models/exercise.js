const mongoose = require('mongoose');


// Define exercise schema
const exerciseSchema = new mongoose.Schema({
    name: String,
    weight: Number,
    sets: Number,
    reps: Number,
    comments: String,
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    username: String,
    userAvatar: String
})

module.exports = mongoose.model("Exercise", exerciseSchema);