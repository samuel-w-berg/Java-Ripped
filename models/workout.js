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


// Define workout schema
const workoutSchema = new mongoose.Schema({
    name: {
        type: String,
        enum: ['Chest', 'Back', 'Arms', 'Legs']
    },
    date: Date,
    exercises: [exerciseSchema],
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    username: String,
    userAvatar: String
})


module.exports = mongoose.model("Workout", workoutSchema);