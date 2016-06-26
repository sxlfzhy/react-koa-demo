var router = require('koa-router')();
router.get('/', function *(next) {
    this.body = 'Hello World Koa!';
    // yield this.render('koa', {
    //   title: 'Hello World Koa!'
    // });
});
module.exports = router;
