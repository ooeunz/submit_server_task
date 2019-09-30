var express = require('express');
var router = express.Router();

/* GET home page. */
router.use('/cafe', require('./cafe'));
router.use('/blog', require('./blog'));
router.use('/news', require('./news'));

router.get('/', (req, res) => {
    res.send('nothing supported');
})

module.exports = router;
