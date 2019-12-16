var express = require('express');
var router = express.Router();

const { User } = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  obj = User.findAll();
  console.log(obj);
  
});

module.exports = router;
