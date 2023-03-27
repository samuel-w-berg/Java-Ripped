const WorkoutModel = require('../models/workout');

module.exports = {
    create
}

async function create(req, res){
    try{
        const workoutDoc = await WorkoutModel.findById(req.params.id);

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