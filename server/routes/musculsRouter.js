const Router = require('express');
const router = new Router();
const muscl = require('../controllers/musculsController');

router.post('/', muscl.create);
router.get('/:id', muscl.getAll)

module.exports = router;