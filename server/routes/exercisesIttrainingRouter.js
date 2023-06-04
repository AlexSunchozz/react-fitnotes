const Router = require('express');
const router = new Router();
const exercisesItTrainingController = require('../controllers/exercisesItTrainingController');

router.post('/', exercisesItTrainingController.create);
router.post('/getexercisefordate', exercisesItTrainingController.getExercisesInTraining);
router.post('/getprevornextraining', exercisesItTrainingController.getPrevOrNextTraining);
router.post('/getallexercisesofuser', exercisesItTrainingController.getAllOfUser)
router.post('/:id', exercisesItTrainingController.remove);


module.exports = router;