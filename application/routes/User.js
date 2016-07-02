'use strict';
const router = require('koa-router')();
const UserSchema = require('../schema/UserSchema');
const Err = require('../../config/error');

/**
 * 登录接口
 *
 * 1、验证请求参数是否合法： 不合法－return
 * 2、根据userName查询当前用户: 查不到-retrun
 * 3、对比查询出来的用户密码与请求参数中的密码是否相等
 * 4、完成
 */
router.post('/login', function *(next) {
    const userName = this.request.body.userName;
    const password = this.request.body.password;
    if (!userName) {
        this.body = {
            success: false,
            error: Err.E1001
        }
        return false;
    }
    if (!password) {
        this.body = {
            success: false,
            error: Err.E1002
        }
        return false;
    }

    // let user = yield UserSchema.findByAccount(userName);
    let user = [{
        account: 'admin',
        nickname: 'admin_system',
        password: 'D033E22AE348AEB5660FC2140AEC35850C4DA997',
        remark: '',
        email: ''
    }]
    if (user.length > 0) {
        user = user[0]
        if (user.password === password.toUpperCase()) {
            // create session
            this.session.user = user;
            this.body = {
                success: true,
                data: user
            }
            return false;
        }
    }

    this.body = {
        success: false,
        error: Err.E1005
    }
});


/**
 * 注销接口
 *
 * 1、清除session
 * 2、完成
 */
router.post('/logout', function *(next) {
    // create session
    this.session = null;
    this.body = {
        success: true
    }
});

/**
 * 新增用户
 */
router.get('/save', function *(next) {
    var user = {
        account: 'admin',
        nickname: 'admin_system',
        password: 'D033E22AE348AEB5660FC2140AEC35850C4DA997',
        remark: '',
        email: ''
    }
    const result = yield UserSchema.addAccount(user);

    if (result.type === 'error') {
        this.body = {
            success: false,
            error: {
                code: Err.E1004.code,
                text: result.err.toString()
            }
        };
        return false
    }

    this.body = {success: true}
});

module.exports = router;
