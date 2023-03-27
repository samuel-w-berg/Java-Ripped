const express = require('express');
const router = express.Router();
const exerciseCtrl = require('../controllers/exercises');

router.post('/workouts/:id/exercises', exerciseCtrl.create);

module.exports = router;