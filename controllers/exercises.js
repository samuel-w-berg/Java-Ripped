const WorkoutModel = require('../models/workout');
const ExerciseModel = require('../models/exercise');

module.exports = {
    delete: deleteExercise,
    progress,
    addToWorkout,
}

async function progress(req, res) {
    try {
        console.log(req.query.name, '<--- first apperance of req.body.name')
      const userId = req.user._id;
    //   const exerciseName = req.body.name;
  
      // Find all workouts with the given userId
      const workouts = await WorkoutModel.find({ userId: userId, 'name':req.query.name });
        console.log(workouts, "<--- workouts that have the userID")
      const exercises = [];
  
      // Iterate through all workouts and find exercises with the given exerciseName
      ExercizeModel.find()
      
      workouts.forEach(workout => {
        workout.exercises.forEach(exercise => {
            console.log(exercise,'<---- exercise in for each')
            console.log(req.query.name, '<---- req.query.name')
          if (exercise.name === req.query.name) {
            // Attach the workout date to the exercise object
            exercise.date = workout.date;
            console.log(exercise, "<--- exercise" )
            exercises.push(exercise);
          }
        });
      });
  
      // Sort exercises by date
      exercises.sort((a, b) => new Date(a.date) - new Date(b.date));
      console.log(exercises, '<---- exercises sorted by date');
      res.render('workouts/progression', { exercises: exercises });
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }
  

async function deleteExercise(req, res){
    try{
        // deletes exercise from the workout
        const workoutDoc = await WorkoutModel.findOne({
            "exercises._id": req.params.id,
            "exercises.userId": req.user._id,
        })
        workoutDoc.exercises.remove(req.params.id);
        await workoutDoc.save()
        res.redirect(`/workouts/${workoutDoc._id}`);
    }catch(err){
        console.log(err);
        res.send(err);
    }
}

async function addToWorkout(req, res){
    try{
        const workoutDoc = await WorkoutModel.findById(req.params.id);
        
        req.body.username = req.user.name;
        req.body.userId = req.user._id;
        req.body.userAvatar = req.user.avatar;
        // this comes from the show.ejs page, it's the name of the select drop-down
        // const exerciseName = await ExerciseModel.findOne(req.body.exerciseId)
        console.log(req.body);
        const newExercise = await ExerciseModel.create(req.body);
        workoutDoc.exercises.push(newExercise._id);
        await workoutDoc.save();
        
        res.redirect(`/workouts/${req.params.id}`);
    }catch(err){
        console.log(err);
        res.send(err);
    }
}

