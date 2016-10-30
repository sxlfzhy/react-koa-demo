'use strict';
const router = require('koa-router')();
const Err = require('../../config/error');

/**
 * 获取全局配置
 */
router.post('/getConfig', function *(next) {
    this.body = {
        success: true,
        data: {}
    }
})

module.exports = router;
