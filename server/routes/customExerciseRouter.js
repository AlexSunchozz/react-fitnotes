const Router = require('express');
const router = new Router();
const CustomExercisesController = require('../controllers/customExercisesController');

router.post('/', CustomExercisesController.create);
router.post('/getcustom', CustomExercisesController.getExesise)

module.exports = router;