const au = require('../modules/util/authUtil');
const rm = require('../modules/util/responseMessage');
const sc = require('../modules/util/statusCode');
const pool = require('../modules/db/pool');

// global variable	
const table = 'articles';

// exports
module.exports = {
    insert: async (title, content, blogIdx) => {
        const fields = 'title, content';
        const questions = `'${title}', '${content}'`;
        const query = `INSERT INTO ${table} (${fields}) VALUES(${questions}, (SELECT blogIdx from blog WHERE blogIdx='${blogIdx}'))`;
        const result = await pool.queryParam_None(query);
        
        // running
        if (!result) {
            return {
                code: sc.BAD_REQUEST,
                json: au.successFalse(rm.BOARD_CREATE_FAIL)
            };
        }
        return {
            code: sc.OK,
            json: au.successTrue(rm.BOARD_CREATE_SUCCESS, result)
        };
    },
    selectOne: async (blogIdx) => {
        const query = `SELECT * FROM ${table} WHERE blogIdx = '${blogIdx}'`;
        const result = await pool.queryParam_None(query);

        if (!result) {
            return {
                code: sc.BAD_REQUEST,
                json: au.successFalse(rm.BOARD_READ_FAIL)
            };
        }
        return {
            code: sc.OK,
            json: au.successTrue(rm.BOARD_READ_SUCCESS, result)
        };
    },
    selectAll: async () => {
        const query = `SELECT * FROM ${table}`;
        const result = await pool.queryParam_None(query);

        // running
        if (!result) {
            return {
                code: sc.BAD_REQUEST,
                json: au.successFalse(rm.BOARD_READ_ALL_SUCCESS)
            };
        }
        return {
            code: sc.OK,
            json: au.successTrue(rm.BOARD_READ_ALL_FAIL, result)
        };
    },
    update: async (title, content, blogIdx) => {
        const query = `UPDATE ${table} SET title = ${title}, content = ${content} WHERE blogIdx = ${blogIdx}`;
        const result = await pool.queryParam_None(query);

        // running
        if (!result) {
            return {
                code: sc.BAD_REQUEST,
                json: au.successFalse(rm.BOARD_UPDATE_FAIL)
            };
        }
        return {
            code: sc.OK,
            json: au.successTrue(rm.BOARD_UPDATE_SUCCESS, result)
        };
    },
    delete: async (blogIdx) => {
        console.log(blogIdx);
        
        const query = `DELETE FROM ${table} WHERE blogIdx = ${blogIdx}`;
        const result = await pool.queryParam_None(query);

        // running
        if (!result) {
            return {
                code: sc.BAD_REQUEST,
                json: au.successFalse(rm.BOARD_DELETE_FAIL)
            };
        }
        return {
            code: sc.OK,
            json: au.successTrue(rm.BOARD_DELETE_SUCCESS, result)
        };
    }
}