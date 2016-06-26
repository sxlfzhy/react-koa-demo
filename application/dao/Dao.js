"use strict";
const CONFIG = require('../../config/main');
const mongoose = require('mongoose');
class Dao {
    constructor() {
        // init
    }
    // 获取数据库连接
    static get connect() {
        if (!Dao.db) {
            const db = mongoose.createConnection(CONFIG.mongo.url);

            db.on('error', console.error.bind(console, '数据库连接错误:'));

            Dao.db = db;
        }

        return Dao.db;
    }
    // 关闭数据库连接
    static destory() {
        if (Dao.db) {
            Dao.db.close()

            Dao.db = null
        }
    }
}
module.exports = Dao;

