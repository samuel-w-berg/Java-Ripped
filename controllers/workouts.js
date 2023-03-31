const WorkoutModel = require('../models/workout');
const ExerciseModel = require('../models/exercise');

module.exports = {
    index,
    new: newWorkout,
    create,
    show,
    delete: deleteWorkout
}

async function deleteWorkout(req, res){
    try{
        // fins and delete the workout with the specified ID
        await WorkoutModel.findByIdAndDelete(req.params.id);
        res.redirect(`/workouts`);
    }catch(err){
        console.log(err)
        res.send(err)
    }
}

async function index(req, res){
    try {
        // find all workouts in the workoutModel sorted by date
        const allWorkouts = await WorkoutModel.find({}).sort({date:-1})

        // render the 'workouts/index' view, passing the allWorkouts array to the template
        res.render('workouts/index', {workouts: allWorkouts});
    } catch (err){
        console.log(err);
        res.send(err);
    }
}

async function newWorkout(req, res){
    try{
        // render the 'workouts/new' view for creating a new workout
        res.render('workouts/new');
    }catch(err){
        console.log(err);
        res.send(err);
    }
}

async function create(req, res){
try{
    // attach the user's information to the request body
    req.body.username = req.user.name;
    req.body.userId = req.user._id;
    req.body.userAvatar = req.user.avatar;

    // create a new workout document using the request body
    const newWorkout = await WorkoutModel.create(req.body);
    res.redirect(`/workouts`)
}catch(err){
    console.log(err);
    res.send(err);
}
}

async function show(req, res){
    try{
        // find the workout document with the given ID and replace the reference ID with the exercise
        const workoutDoc = await WorkoutModel.findById(req.params.id).populate('exercises').exec();
        
        // the following line is for the drop down menu to select workouts - for future use
        // const exercisesNotInWorkout = await ExerciseModel.find({ _id: { $nin: workoutDoc.exercises } });
        
        // render the show page with the workoutDoc
        res.render('workouts/show', {workout: workoutDoc})
    }catch (err){
        console.log(err);
        res.send(err);
    }
}