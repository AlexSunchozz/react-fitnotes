const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter');
const trainingsRouter = require('./trainingsRouter');
const exercisesRouter = require('./exercisesRouter');
const typeOfExerses = require('./typesOfExercises');
const musculs = require('./musculsRouter');
const exercisesInTraining = require('./exercisesIttrainingRouter');
const progressRouter = require('./progresRouter');
const customexercises = require('./customExerciseRouter')

router.use('/user', userRouter);
router.use('/exercises', exercisesRouter);
router.use('/trainings', trainingsRouter);
router.use('/types', typeOfExerses);
router.use('/musculs', musculs);
router.use('/exercisesintraining', exercisesInTraining);
router.use('/progress', progressRouter);
// router.use('/custom', customexercises)

module.exports = router;