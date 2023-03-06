const express = require('express');

const router = express.Router();

const homeController = require('../contollers/homeController');

router.get('/',homeController.home);
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));

console.log('router loaded');

module.exports = router;