const express = require('express');

const router = express.Router();
const postApi = require('../../../contollers/api/v1/posts_api');
router.get('/',postApi.index);
router.delete('/:id',postApi.deletePost);
module.exports = router;