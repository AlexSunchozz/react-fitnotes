const Router = require('express');
const router = new Router();
const exercisesController = require('../controllers/exercisesController');

router.post('/', exercisesController.create);
router.get('/', exercisesController.getAll);
router.get('/:id', exercisesController.getWithType);

module.exports = router;