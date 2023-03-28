const WorkoutModel = require('../models/workout');

module.exports = {
    create,
    delete: deleteExercise,
    progress
}

async function progress(req, res) {
    try {
        console.log(req.query.name, '<--- first apperance of req.body.name')
      const userId = req.user._id;
    //   const exerciseName = req.body.name;
  
      // Find all workouts with the given userId
      const workouts = await WorkoutModel.find({ userId: userId, 'exercises.name':req.query.name });
        console.log(workouts, "<--- workouts that have the userID")
      const exercises = [];
  
      // Iterate through all workouts and find exercises with the given exerciseName
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

async function create(req, res){
    try{
        const workoutDoc = await WorkoutModel.findById(req.params.id);
        console.log(req.user, "<---- This is the error");
        req.body.username = req.user.name;
        req.body.userId = req.user._id;
        req.body.userAvatar = req.user.avatar;

        workoutDoc.exercises.push(req.body);
        await workoutDoc.save();

        res.redirect(`/workouts/${req.params.id}`);
    }catch(err){
        console.log(err);
        res.send(err);
    }
}