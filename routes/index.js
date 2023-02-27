const express = require('express');

const router = express.Router();

const homeController = require('../contollers/homeController');

router.get('/',homeController.home);
router.get('/home2',homeController.home2);
console.log('router loaded');

module.exports = router;