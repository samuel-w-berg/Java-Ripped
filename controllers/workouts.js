const WorkoutModel = require('../models/workout');


module.exports = {
    index,
    new: newWorkout,
    create,
    show,
    delete: deleteWorkout
}

async function deleteWorkout(req, res){
    try{
        // await WorkoutModel.findOneAndDelete(
        //     {_id: req.params.id,
        //     userId: req.user._id,
        //     })
        // console.log(workoutDoc, '<--- this is the workoutDoc');
        // console.log(req.params.id, '<====This is the params ID');
        // console.log(req.user._id, "<--- this is the user _id");
        await WorkoutModel.findByIdAndDelete(req.params.id);
        // workoutDoc.save()
        res.redirect(`/workouts`);
    }catch(err){
        console.log(err, '<--- this is the error')
        res.send(err)
    }
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
    req.body.username = req.user.name;
    req.body.userId = req.user._id;
    req.body.userAvatar = req.user.avatar;
    const newWorkout = await WorkoutModel.create(req.body);
    res.redirect(`/workouts`)
}catch(err){
    console.log(err);
    res.send(err);
}
}

async function show(req, res){
    try{
        const showExercise = await WorkoutModel.findById(req.params.id)
        res.render('workouts/show', {workout: showExercise})
    }catch (err){
        console.log(err);
        res.send(err);
    }
}