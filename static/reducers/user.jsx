"use strict";

import {LOGIN_BEFORE, LOGIN_AFTER, LOGOUT, E1001, E1002} from '../constants';


/**
 * 开始登陆：信息校验
 */
const loginBefore = user => {
    if (!user.userName) {
        return {error: E1001}
    }

    if (!user.password) {
        return {error: E1002}
    }
    return {load: true}
}

/**
 * 登录接口返回成功
 * @type {[type]}
 */
const loginAfter = res => {
    if (res.success) {
        return {info: res.data}
    }else {
        return {error: res.error}
    }
}

export default (state = {}, action) => {
    switch (action.type) {
        case LOGIN_BEFORE:
            return loginBefore(action.user)
        case LOGIN_AFTER:
            return loginAfter(action.response)
        case LOGOUT:
            return {}

        default:
            return state
    }
}
