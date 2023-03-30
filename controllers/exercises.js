const WorkoutModel = require('../models/workout');
const ExerciseModel = require('../models/exercise');

module.exports = {
    delete: deleteExercise,
    progress,
    addToWorkout,
}


async function progress(req, res) {
    try {
    //     console.log(req.query.name, '<--- first apperance of req.body.name')
    //     const userId = req.user._id;
    //     console.log(userId, '<--- this is the userId in the progress function')
    // //   const exerciseName = req.body.name;
  
    //   // Find all workouts with the given userId
    //   const workouts = await WorkoutModel.find({ userId: userId, 'exercises.name':req.query.name });
    //     console.log(workouts, "<--- workouts that have the userID")
    //   const exercises = [];
  
    //   // Iterate through all workouts and find exercises with the given exerciseName
    // //   ExercizeModel.find()
      
    //   workouts.forEach(workout => {
    //     workout.exercises.forEach(exercise => {
    //         console.log(exercise,'<---- exercise in for each')
    //         console.log(req.query.name, '<---- req.query.name')
    //       if (exercise.name === req.query.name) {
    //         // Attach the workout date to the exercise object
    //         exercise.date = workout.date;
    //         console.log(exercise, "<--- exercise" )
    //         exercises.push(exercise);
    //       }
    //     });
    //   });
  
    //   // Sort exercises by date
    //   exercises.sort((a, b) => new Date(a.date) - new Date(b.date));
    //   console.log(exercises, '<---- exercises sorted by date');
    //   res.render('workouts/progression', { exercises: exercises });
    
    if(req.query){
        console.log(req.query.name);
        const exerciseDocs = await ExerciseModel.find({name:req.query.name}).sort({date:-1})
        console.log(exerciseDocs, "<---- this is the exerciseDocs");
        res.render('workouts/progression', { exercises: exerciseDocs});
    };
    // const exerciseDocs = await ExerciseModel.find({name:req.query.name})
    // console.log(exerciseDocs, "<---- this is the exerciseDocs");
    
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }
  

async function deleteExercise(req, res){
    try{
        console.log(req.params.id, '<--- what it is trying to delete')
        // deletes exercise from the workout
        // const workoutDoc = await WorkoutModel.findOne({
        //     exercises:{$elemMatch:{_id:req.params.id, userId:req.user._id}}
        //     //"exercises.userId": req.user._id,
        // })

        
        // console.log(workoutDoc, '<----this is workoutDoc in the delete exercise')
        // workoutDoc.exercises.remove(req.params.id);
        // await workoutDoc.save()
        await ExerciseModel.findByIdAndDelete(req.params.id);
        res.redirect(`/workouts/${req.params.workout}`);
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
        req.body.date = workoutDoc.date
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

