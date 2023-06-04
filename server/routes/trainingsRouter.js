const Router = require('express');
const router = new Router();
const trainingsController = require('../controllers/trainingsController');

router.post('/', trainingsController.create);
router.post('/:id', trainingsController.renameTraining);
router.post('/delete/:id', trainingsController.remove)
router.post('/trainingofuser/:id', trainingsController.getAll)
router.get('/:id', trainingsController.getExercisesInTraining);

module.exports = router;