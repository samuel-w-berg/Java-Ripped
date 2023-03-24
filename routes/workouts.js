var express = require('express');
var router = express.Router();
const workoutsCtrl = require('../controllers/workouts');
const isLoggedIn = require('../config/auth');

router.get('/', workoutsCtrl.index);
router.get('/new', workoutsCtrl.new);
router.post('/',isLoggedIn, workoutsCtrl.create);


module.exports = router;