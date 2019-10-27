const express = require('express');
const router = express.Route()

const authUtil = require('../modules/authUtil');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');

router.get('/', (req, res) => {

})

// CREATE
router.post('/', (req, res) => {
    const {title, content} = req.body;

    // TODO 1: 제목과 작성 여부 확인
    if (!title || !content) {
        res.status(statusCode.BAD_REQUEST)
            .send(authUtil.successFalse(responseMessage.NULL_VALUE));
    }
})

router.put('/', (req, res) => {
    
})

router.delete('/', (req, res) => {
    
})


module.exports = router