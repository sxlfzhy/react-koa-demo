'use strict';
module.exports = {
    // 站点设置
    site: {
        type: process.env.EVN_TYPE || 'development',
        port: process.env.PORT || 8000
    },
    // 数据库设置
    mongo: {
        url: 'mongodb://127.0.0.1:27017/activity'
    }
};
