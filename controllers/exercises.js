const WorkoutModel = require('../models/workout');

module.exports = {
    create,
    delete: deleteExercise,
}

async function deleteExercise(req, res){
    try{
        workoutDoc = await WorkoutModel.findOne({
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