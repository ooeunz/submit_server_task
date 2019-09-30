var express = require('express');
var router = express.Router();

/* GET home page. */
/* GET home page. */

router.use('/api', require('./api'));

router.get('/', (req, res) => {
  res.send('api')
})

module.exports = router;
