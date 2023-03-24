const WorkoutModel = require('../models/workout');


module.exports = {
    index,
    new: newWorkout,
    create,
    show
}

async function index(req, res){
    try {
        const allWorkouts = await WorkoutModel.find({})
        res.render('workouts/index', {workouts: allWorkouts});
    } catch (err){
        console.log(err);
        res.send(err);
    }
}

async function newWorkout(req, res){
    try{
        res.render('workouts/new');
    }catch(err){
        console.log(err);
        res.send(err);
    }
}

async function create(req, res){
try{
    const newWorkout = WorkoutModel.create(req.body)
    res.redirect(`/workouts`)
}catch(err){
    console.log(err);
    res.send(err);
}
}

async function show(req, res){
    try{
        const showExercise = WorkoutModel.findById(req.params.id)
        res.render('workouts/show', {workout: showExercise})
    }catch (err){
        console.log(err);
        res.send(err);
    }
}