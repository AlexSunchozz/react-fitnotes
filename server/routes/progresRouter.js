const Router = require('express');
const router = new Router();
const progress = require('../controllers/progressController');

router.post('/', progress.create);
router.post('/getprogress', progress.getExerciseProgress)
router.post('/deleteprogress', progress.deleteProgress)
router.post('/getfullprogressofexercise', progress.getFullProgressOfExercise)

module.exports = router;