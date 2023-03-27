const express = require('express');
const router = express.Router();
const exerciseCtrl = require('../controllers/exercises');

router.post('/workouts/:id/exercises', exerciseCtrl.create);
router.delete('/exercises/:id', exerciseCtrl.delete);

module.exports = router;