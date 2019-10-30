const express = require('express');
const router = express.Router({mergeParams: true})

const au = require('../../modules/util/authUtil');
const rm = require('../../modules/util/responseMessage');
const sc = require('../../modules/util/statusCode');

const Blog = require('../../models/Blog');

router.post('/', async (req, res) => {
    const {blogName} = req.body;

    // TODO 1: blogName 값 확인하기
    if (!blogName) res.status(sc.BAD_REQUEST).send(au.successFalse(rm.NULL_VALUE));

    // TODO 2: 작성하기
    try {
        const {code, json} = await Blog.insert(blogName);
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
        const {code, json} = await Blog.selectAll();
        res.status(code).send(json);
        
    } catch (err) {
        console.log(err);
        res.status(sc.INTERNAL_SERVER_ERROR).send(au.successFalse(rm.BOARD_READ_ALL_FAIL));
    }
});

// READ_ONE
router.get('/:blogIdx', async (req, res) => {
    const blogIdx = req.params.blogIdx;

    // TODO 1: blogIdx 값 확인하기
    if (!blogIdx) res.status(sc.BAD_REQUEST).send(au.successFalse(rm.NULL_VALUE));

    // TODO 2: 읽어오기
    try {
        const {code, json} = await Blog.selectOne(blogIdx);
        res.status(code).send(json);
    } catch (err) {
        console.log(err);
        res.status(sc.INTERNAL_SERVER_ERROR).send(au.successFalse(rm.BOARD_READ_ALL_FAIL));
    }
});

// UPDATE
router.put('/:blogIdx', async (req, res) => {
    const {blogIdx} = req.params;
    const {blogName} = req.body;

    // TODO 1: blogIdx, blogName 값 확인하기
    if (!blogIdx || !blogName) res.status(sc.BAD_REQUEST).send(au.successFalse(rm.NULL_VALUE));
    
    // TODO 2: 수정하기
    try {
        const {code, json} = await Blog.update(blogIdx, blogName);
        res.status(code).send(json);
    } catch (err) {
        console.log(err);
        res.status(sc.INTERNAL_SERVER_ERROR).send(au.successFalse(rm.BOARD_UPDATE_FAIL));
    }
});

// DELETE
router.delete('/:blogIdx', async (req, res) => {
    const {blogIdx} = req.params;

    // TODO 1: blogIdx 값 확인하기
    if (!blogIdx) res.status(sc.BAD_REQUEST).send(au.successFalse(rm.NULL_VALUE));

    // TODO 2: 삭제하기
    try {
        const {code, json} = await Blog.delete(blogIdx);
        res.status(code).send(json);
    } catch (err) {
        console.log(err);
        res.status(sc.INTERNAL_SERVER_ERROR).send(au.successFalse(rm.BOARD_DELETE_FAIL));
    }
});

module.exports = router;