const express = require('express');
const router = express.Router();
const {getBugs,createBug,getBug,updateBug,deleteBugs} = require('../controllers/bugController');

router.route('/').get(getBugs);

router.route('/').post(createBug);

router.route('/:id').get(getBug);

router.route('/:id').put(updateBug);

router.route('/:id').delete(deleteBugs);

module.exports = router;