"use strict";
const mongoose = require('mongoose');
const Dao = require('../dao/Dao');
// 集合名称
const collection = 'user';
// schema config
const config = {
    // _id: {
    //     type: mongoose.Schema.Types.ObjectId
    // },
    account: {
        type: String,
        unique: true,
        required: true
    },
    nickname: {
        type: String,
        default: '匿名用户'
    },
    password: {
        type: String,
        required: true
    },
    last_login_time: {
        type: Date,
        default: new Date()
    },
    remark: {
        type: String
    },
    email: {
        type: String
    }
};
// schema options
const options = {};
const Schema = new mongoose.Schema(config, options);
// methods Model的实例方法
Schema.methods = {
    speak: function () {
        console.log(this.account);
    },
    findOtherByNickname: function () {
        return this.model(collection).find({nickname: this.nickname});
    }
};
// 定义Model 的类方法
Schema.statics = {
    findByAccount: function *(account) {
        try {
            const result = yield this.find({account: account})
            return result
        } catch (e) {
            console.error('根据账号查询用户失败：', e)
            return {
                type: 'error',
                err: e
            }
        }
    },
    addAccount: function *(account) {
        try {
            const result = yield this.create(account)
            return result
        } catch (e) {
            console.error('新增用户失败：', e)
            return {
                type: 'error',
                err: e
            }
        }
    }
};
// export
module.exports = Dao.connect.model(collection, Schema, collection);
