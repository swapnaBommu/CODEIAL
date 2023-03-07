const express = require('express');

const router = express.Router();

const homeController = require('../contollers/homeController');

router.get('/',homeController.home);
router.get('/home2',homeController.home2);
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));
console.log('router loaded');

module.exports = router;