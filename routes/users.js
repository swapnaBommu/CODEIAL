const express = require('express');

const router = express.Router();
const passport = require('passport');
const usersController = require('../contollers/usersController');

router.get('/profile/:id',passport.checkAuthentication,usersController.profile);
router.post('/update/:id',passport.checkAuthentication,usersController.update);
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

//below route check the user info in google
router.get('/auth/google',passport.authenticate('google', { scope: ['profile', 'email']}));
//google fetches data from the datatbase and sends backs to the below callback url
router.get('/auth/google/callback',passport.authenticate('google', { failureRedirect: '/users/sign-in'}),usersController.createSession);

module.exports = router;