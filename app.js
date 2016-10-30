'use strict';

const app = require('koa')(),
    router = require('koa-router')(),
    logger = require('koa-logger'),
    json = require('koa-json'),
    session = require('koa-session');

const User = require('./application/routes/User');
const Config = require('./application/routes/Config');
const Err = require('./config/error');

// global middlewares
// app.use(views('views', {
//   root: __dirname + '/views',
//   default: 'jade'
// }));
app.keys = ['some secret hurr'];
app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());
app.use(session(app));

app.use(function *(next) {
    try {
        const start = new Date;
        yield next;
        const ms = new Date - start;
        console.log('%s %s - %s', this.method, this.url, ms);
    } catch (e) {
        console.error.call(console, e);
    }
});

// session filter
app.use(function *(next){
    // ignore
    const ignores = Object.freeze([/^\/$/, /\/user\/login$/, /\/config\/getConfig$/, /\.(html|jpg|png|gif|ico|js|css|mp4|eot|svg|ttf|woff|mp3|json|woff2)$/i]);

    // 如果当前请求的接口url在ignores数组中，或者当前用户已经存在session.user，则通过
    const some = ignores.some(item => item.test(this.request.url));

    if (some || this.session.user) {
        yield next;
    } else {
        this.body = {
            success: false,
            error: Err.E1003
        }
    }
})

// 权限过滤
app.use(function *(next){
    // role ignore
    const ignores = Object.freeze([/^\/$/, /^\/app/, /\.(html|jpg|png|gif|ico|js|css|mp4|eot|svg|ttf|woff|mp3|json|woff2)$/i]);

    // 如果当前请求的接口url在ignores数组中，或者当前用户拥有改接口权限，则通过
    const some = ignores.some(item => item.test(this.request.url));

    const roles = this.session.roles || []

    // 用户的权限信息放在session中  this.session.roles
    // this.session.roles 用户权限数组  item为正则表达式
    const roleTest = roles.some(item => item.test(this.request.url));
    if (some || roleTest) {

        yield next;
    } else {
        this.body = {
            success: false,
            error: Err.E2001
        }
    }
})

app.use(require('koa-static')(__dirname + '/static'));
// routes definition
router.prefix('/app');
router.use('/user', User.routes(), User.allowedMethods());
router.use('/config', Config.routes(), Config.allowedMethods());

// mount root routes
app.use(router.routes());

app.on('error', (err, ctx) => {
    logger.error('server error', err, ctx);
});

module.exports = app;
