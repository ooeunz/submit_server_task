const express = require('express');
const router = express.Router()

const au = require('../modules/util/authUtil');
const rm = require('../modules/util/responseMessage');
const sc = require('../modules/util/statusCode');

const Blog = require('../models/Blog');


// CREATE
router.post('/', (req, res) => {
    const {title, content} = req.body;

    // TODO 1: title, content 값 확인하기
    if (!title || !content) res.status(sc.BAD_REQUEST).send(au.successFalse(rm.NULL_VALUE));

    // TODO 2: 작성하기
    try {
        const {code, json} = Blog.insert(title, content);
        // console.log(`code: ${code}, json: ${json}`);
        
        res.status(code).send(json);
    } catch (err) {
        console.log(err);
        res.status(sc.INTERNAL_SERVER_ERROR).send(au.successFalse(rm.BOARD_CREATE_FAIL));
    }
});

// READ
router.get('/', (req, res) => {
    // TODO 1: 읽어오기
    try {
        const {code, json} = Blog.insert(title, content);
        res.status(code).send(json);
    } catch (err) {
        console.log(err);
        res.status(sc.INTERNAL_SERVER_ERROR).send(au.successFalse(rm.BOARD_READ_ALL_FAIL));
    }
});

// UPDATE
router.put('/', (req, res) => {
    const {title, content, blogIdx} = req.body;

    // TODO 1: title, content, blogIdx 값 확인하기
    if (!title || !content || !blogIdx) res.status(sc.BAD_REQUEST).send(au.successFalse(rm.NULL_VALUE));
    
    // TODO 2: 수정하기
    try {
        const {code, json} = Blog.update(title, content, blogIdx);
        res.status(code).send(json);
    } catch (err) {
        console.log(err);
        res.status(sc.INTERNAL_SERVER_ERROR).send(au.successFalse(rm.BOARD_UPDATE_FAIL));
    }
});

// DELETE
router.delete('/', (req, res) => {
    const blogIdx = req.body;

    // TODO 1: blogIdx 값 확인하기
    if (!title || !content || !blogIdx) res.status(sc.BAD_REQUEST).send(au.successFalse(rm.NULL_VALUE));

    // TODO 2: 삭제하기
    try {
        const {code, json} = Blog.update(blogIdx);
        res.status(code).send(json);
    } catch (err) {
        console.log(err);
        res.status(sc.INTERNAL_SERVER_ERROR).send(au.successFalse(rm.BOARD_DELETE_FAIL));
    }
});


module.exports = router