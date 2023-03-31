const WorkoutModel = require('../models/workout');
const ExerciseModel = require('../models/exercise');

module.exports = {
    delete: deleteExercise,
    progress,
    addToWorkout,
}


async function progress(req, res) {
    try {
    // check if there is a query parameter for the exercise 
    if(req.query){
        // find all exercise documents with the given name from the form and sort them
        const exerciseDocs = await ExerciseModel.find({name:req.query.name}).sort({date:-1})
        // render the 'workouts/progression' view with the sorted exercises
        res.render('workouts/progression', { exercises: exerciseDocs});
    };
    
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }
  

async function deleteExercise(req, res){
    try{
        // find the exercise document using the exercise ID from the request
        await ExerciseModel.findByIdAndDelete(req.params.id);

        res.redirect(`/workouts/${req.params.workout}`);
    }catch(err){
        console.log(err);
        res.send(err);
    }
}

async function addToWorkout(req, res){
    try{
        // find the workout document using the workout ID from the request parameters
        const workoutDoc = await WorkoutModel.findById(req.params.id);

        // set user properties on the new exercise document
        req.body.username = req.user.name;
        req.body.userId = req.user._id;
        req.body.userAvatar = req.user.avatar;

        // set date of new exercise document to date of workout
        req.body.date = workoutDoc.date
        
        // create a new exercise document using the data from the request body
        const newExercise = await ExerciseModel.create(req.body);

        // add the new exercise's ID to the workouts exercises array and save
        workoutDoc.exercises.push(newExercise._id);
        await workoutDoc.save();
        
        res.redirect(`/workouts/${req.params.id}`);
    }catch(err){
        console.log(err);
        res.send(err);
    }
}

