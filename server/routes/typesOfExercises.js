const Router = require('express');
const router = new Router();
const typesOfExercises = require('../controllers/typesController');

router.post('/', typesOfExercises.create)
router.get('/', typesOfExercises.getAll)
router.post('/gettypes', typesOfExercises.getTypesOfexercises)
router.post('/getexwithtype', typesOfExercises.findExercisesWithType)

module.exports = router;