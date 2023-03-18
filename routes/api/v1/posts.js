const express = require('express');
const passport = require('passport');
const router = express.Router();
const postApi = require('../../../contollers/api/v1/posts_api');
router.get('/',postApi.index);
router.delete('/:id',passport.authenticate('jwt',{session : false}),postApi.deletePost);
module.exports = router;