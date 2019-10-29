var express = require('express');
var router = express.Router();


router.use('/blogs', require('./blogs'));
// router.use('/articles', require('./blogs/articles'));

module.exports = router;
