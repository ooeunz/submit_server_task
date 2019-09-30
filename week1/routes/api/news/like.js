var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.send('This is news/like page.')
})

module.exports = router;