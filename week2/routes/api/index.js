const express = require('express');
const router = express.Router();

router.use('/group', require('./group'));
router.use('/mixer', require('./mixer'));



module.exports = router;