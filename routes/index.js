const express = require('express');

const router = express.Router();

const homeController = require('../contollers/homeController');

router.get('/',homeController.home);
router.get('/home2',homeController.home2);
router.use('/users',require('./users'));
router.use('/userpost',require('./posts'));

console.log('router loaded');

module.exports = router;