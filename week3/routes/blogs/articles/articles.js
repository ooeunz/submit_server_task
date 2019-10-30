const express = require('express');
const router = express.Router({mergeParams: true});

const au = require('../../../modules/util/authUtil');
const rm = require('../../../modules/util/responseMessage');
const sc = require('../../../modules/util/statusCode');

const Article = require('../../../models/Article');


router.post('/', async (req, res) => {
    const {title, content} = req.body;
    const {blogIdx} = req.params;
        
    // TODO 1: body, path 값 확인하기
    if (!title || !content || !blogIdx) res.status(sc.BAD_REQUEST).send(au.successFalse(rm.NULL_VALUE));

    // TODO 2: 작성하기
    try {
        const {code, json} = await Article.insert(title, content, blogIdx);
        res.status(code).send(json);
    } catch (err) {
        console.log(err);
        res.status(sc.INTERNAL_SERVER_ERROR).send(au.successFalse(rm.BOARD_CREATE_FAIL));
    }
});

// READ_ALL
router.get('/', async (req, res) => {
    // TODO 1: 읽어오기
    try {
        const {code, json} = await Article.selectAll();
        res.status(code).send(json);
    } catch (err) {
        console.log(err);
        res.status(sc.INTERNAL_SERVER_ERROR).send(au.successFalse(rm.BOARD_READ_ALL_FAIL));
    }
});

// READ_ONE
router.get('/:articleIdx', async (req, res) => {
    const {blogIdx, articleIdx} = req.params;

    // TODO 1: blogIdx 값 확인하기
    if (!blogIdx) res.status(sc.BAD_REQUEST).send(au.successFalse(rm.NULL_VALUE));

    // TODO 2: 읽어오기
    try {
        const {code, json} = await Article.selectOne(blogIdx, articleIdx);
        res.status(code).send(json);
    } catch (err) {
        console.log(err);
        res.status(sc.INTERNAL_SERVER_ERROR).send(au.successFalse(rm.BOARD_READ_ALL_FAIL));
    }
});

// UPDATE
router.put('/:articleIdx', async (req, res) => {
    const {title, content} = req.body;
    const {blogIdx, articleIdx} = req.params;

    // TODO 1: title, content, blogIdx 값 확인하기
    if (!title || !content || !blogIdx) res.status(sc.BAD_REQUEST).send(au.successFalse(rm.NULL_VALUE));
    
    // TODO 2: 수정하기
    try {
        const {code, json} = await Article.update(title, content, blogIdx, articleIdx);
        res.status(code).send(json);
    } catch (err) {
        console.log(err);
        res.status(sc.INTERNAL_SERVER_ERROR).send(au.successFalse(rm.BOARD_UPDATE_FAIL));
    }
});

// DELETE
router.delete('/:articleIdx', async (req, res) => {
    const {blogIdx, articleIdx} = req.params;

    // TODO 1: blogIdx 값 확인하기
    if (!blogIdx) res.status(sc.BAD_REQUEST).send(au.successFalse(rm.NULL_VALUE));

    // TODO 2: 삭제하기
    try {
        const {code, json} = await Article.delete(blogIdx, articleIdx);
        res.status(code).send(json);
    } catch (err) {
        console.log(err);
        res.status(sc.INTERNAL_SERVER_ERROR).send(au.successFalse(rm.BOARD_DELETE_FAIL));
    }
});

module.exports = router;