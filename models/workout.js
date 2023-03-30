const mongoose = require('mongoose');


// Define workout schema
const workoutSchema = new mongoose.Schema({
    name: {
        type: String,
        enum: ['Chest', 'Back', 'Arms', 'Legs']
    },
    date: Date,
    exercises: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Exercise'
        }
      ],
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    username: String,
    userAvatar: String
})


module.exports = mongoose.model("Workout", workoutSchema);