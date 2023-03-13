const express = require('express');

const router = express.Router();

const commentsController = require('../contollers/commentsController');
const passport = require('passport');
router.post('/create',passport.checkAuthentication,commentsController.create);
router.get('/destory/:id',passport.checkAuthentication,commentsController.destory);
module.exports = router;