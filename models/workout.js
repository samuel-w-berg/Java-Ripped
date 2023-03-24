const mongoose = require('mongoose');


// Define exercise schema
const exerciseSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    intensity: String,
    volume: String,
    comments: String
})


// Define workout schema
const workoutSchema = new mongoose.Schema({
    name: {
        type: String,
        enum: ['Push Day', 'Pull Day']
    },
    date: Date,
    exercises: [exerciseSchema]
})


module.exports = mongoose.model("Workout", workoutSchema);