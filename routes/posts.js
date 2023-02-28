const express = require('express');

const router = express.Router();

const postsController = require('../contollers/postsController');

router.get('/post',postsController.posts);

module.exports = router;