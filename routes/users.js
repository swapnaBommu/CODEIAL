const express = require('express');

const router = express.Router();
const usersController = require('../contollers/usersController');

router.get('/profile',usersController.profile);
router.get('/name',usersController.name);
router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);

//posting the form data to the server

router.post('/create', usersController.create);


module.exports = router;