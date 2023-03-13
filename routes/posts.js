const express = require('express');

const router = express.Router();

const postsController = require('../contollers/postsController');
const passport = require('passport');
router.post('/create',passport.checkAuthentication,postsController.create);
router.get('/destroy/:id',passport.checkAuthentication,postsController.deletePost);
module.exports = router;