var express = require('express');
var router = express.Router();

/* GET home page. */
router.use('/like', require('./like'));

router.get('/', (req, res) => {
    res.send('This is news page');
})

module.exports = router;
