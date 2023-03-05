const express = require('express');

const router = express.Router();
const passport = require('passport');
const usersController = require('../contollers/usersController');

router.get('/profile',passport.checkAuthentication,usersController.profile);
router.get('/name',usersController.name);
router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);

//posting the form data to the server

router.post('/create', usersController.create);

//use passport as middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
),usersController.createSession);


router.get('/sign-out',usersController.destroySession);

module.exports = router;