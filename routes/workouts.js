var express = require('express');
var router = express.Router();
const workoutsCtrl = require('../controllers/workouts');
const isLoggedIn = require('../config/auth');

router.get('/', workoutsCtrl.index);
router.get('/new', workoutsCtrl.new);
router.get('/:id', workoutsCtrl.show);
router.post('/',isLoggedIn, workoutsCtrl.create);
router.delete('/:id', workoutsCtrl.delete);


module.exports = router;