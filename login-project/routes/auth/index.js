const express = require('express');
const router = express.Router();
const controller = require('./auth.controller');

router.post('/join', controller.join);
router.get('/emailAuthorization', controller.emailAuthorization);
router.post('/login', controller.login);

module.exports = router;