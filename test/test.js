describe('配置信息测试',function(){
  it('测试站点信息', function(done){
    const CONFIG = require('../config/main');
    expect(CONFIG.site.port).toBe(8000);
    done()
  });
});
