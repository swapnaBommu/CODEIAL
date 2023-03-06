const express = require('express');

const router = express.Router();

const postsController = require('../contollers/postsController');

router.post('/create',postsController.create);

module.exports = router;