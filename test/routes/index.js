var express = require('express');
var router = express.Router();
const jwt = require('../modules/jwt');

/* GET home page. */
router.get('/', function(req, res, next) {
  client.hmset('yuns994', "username", 'asdf', "email", 'yuns994', "password", '1234');
  console.log('save success');
});

router.get('/check', function(req, res, next) {
  client.hgetall('yuns994', (err, obj) => {
    console.log(obj.username);
  });
});

router.get('/token', async (req, res) => {
  const username = 'dbswkdl'
  const email = 'yusdf@dsafads';

  const token = await jwt.sign({ username, email });

  console.log(token);
  res.send(token);
});





module.exports = router;
