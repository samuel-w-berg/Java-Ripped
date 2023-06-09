const express = require('express');
const router = express.Router();
const exerciseCtrl = require('../controllers/exercises');

router.get('/workouts/progression', exerciseCtrl.progress);
router.post('/workouts/:id/exercises', exerciseCtrl.addToWorkout);
router.delete('/exercises/:id/:workout', exerciseCtrl.delete);

module.exports = router;

console.log('this is a test');