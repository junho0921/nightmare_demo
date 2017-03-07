const nightmare = require('./nightmare');
// nightmare()
//   .goto('http://fanxing.kugou.com')
//   .wait(1000)
//   .click('#fxLogin')
//   .type('#loginSdk_loginUserName', 'momoka1')
//   .type('#loginSdk_loginPassWord', 'admin123')
//   .click('#loginSdk_loginBtn')
//   .wait(500)
//   .goto('http://fanxing.kugou.com/1024614')
//   .inject('js', './injectJS.js')
//   .wait(5* 1000)
//   .evaluate(function () {
//     return document.title;
//   })
//   .end()
//   .then(function(title){
//     console.log(111111111111);
//     if(title.length){
//       // done();
//     }
//   });

describe('++++++++', function () {
  this.timeout(25 * 1000);

  it('test', function (done) {
    nightmare()
      .goto('http://fanxing.kugou.com')
      .wait(1000)
      .click('#fxLogin')
      .type('#loginSdk_loginUserName', 'momoka1')
      .type('#loginSdk_loginPassWord', 'admin123')
      .click('#loginSdk_loginBtn')
      .wait(500)
      .goto('http://fanxing.kugou.com/1024614')
      .inject('js', './injectJS.js')
      .wait(5* 1000)
      .evaluate(function () {
        return document.title;
      })
      .end()
      .then(function(title){
        console.log('我的  ', title);
        if(title.length){
          done();
        }
      });
  });
})
