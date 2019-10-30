const au = require('../modules/util/authUtil');
const rm = require('../modules/util/responseMessage');
const sc = require('../modules/util/statusCode');
const pool = require('../modules/db/pool');

// global variable	
const table = 'comment';

// exports
comment = {
    insert: async (text, blogIdx, articleIdx) => {
        const fields = 'text, blogIdx, articleIdx';
        const questions = `'${text}', '${blogIdx}', '${articleIdx}'`;
        const query = `INSERT INTO ${table} (${fields}) VALUES(${questions})`;
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
    selectOne: async (blogIdx, articleIdx, commentIdx) => {
        const query = `SELECT * FROM ${table}\
        WHERE blogIdx = '${blogIdx}' \
        AND articleIdx = '${articleIdx}'\
        AND commentIdx = '${commentIdx}'`;

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
                json: au.successFalse(rm.BOARD_READ_ALL_FAIL)
            };
        }
        return {
            code: sc.OK,
            json: au.successTrue(rm.BOARD_READ_ALL_SUCCESS, result)
        };
    },
    update: async (text, blogIdx, articleIdx, commentIdx) => {
        const query = `UPDATE ${table} SET text = '${text}'\
        WHERE blogIdx = '${blogIdx}'\
        AND articleIdx = '${articleIdx}'\
        AND commentIdx = '${commentIdx}'`;

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
    delete: async (blogIdx, articleIdx, commentIdx) => {
        const query = `DELETE FROM ${table}\
        WHERE blogIdx = '${blogIdx}'\
        AND articleIdx = '${articleIdx}'\
        AND commentIdx = '${commentIdx}'`;
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

module.exports = comment;