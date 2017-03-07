/**
 * Created by jiajunhe on 2017/3/7.
 */
(function () {
  function middleware(fnName, isLog, originalFN, handler){
    isLog && console.warn(fnName+'方法成功修改', originalFN);
    var _handler = handler(originalFN);
    return function () {
      var isRunFunc = handler.cmd !== 'stop' && typeof _handler === 'function';
      if(isLog){
        arguments[0] && console.error(fnName+'_P_1= ',arguments[0]);
        arguments[1] && console.error(fnName+'_P_2= ',arguments[1]);
        console.error(fnName+'方法是否执行=> ', isRunFunc);
      }
      if(isRunFunc){
        handler.cmd = _handler.apply(this, arguments);
      }
    }
  }

  function changeMethod (fnName, handler, isLog) {
    var
      _fn1 = fnName.split('.')[0],
      _fn2 = fnName.split('.')[1],
      _intervalFn = setInterval(function (){
        if(window[_fn1]){
          if(_fn2 && window[_fn1][_fn2]){
            window[_fn1][_fn2] = middleware(fnName, isLog, window[_fn1][_fn2], handler);
            clearInterval(_intervalFn);
          }else{
            window[_fn1] = middleware(fnName, isLog, window[_fn1], handler);
            clearInterval(_intervalFn);
          }
        }
      }, 30);
  }

  // 存储在信息在document.title
  document.title = '';
  var _exposeMsgObj = {};
  function exposeMsg (key, value) {
    _exposeMsgObj[key] = value;
    document.title = JSON.stringify(_exposeMsgObj);
  }

  changeMethod('enterRoomTipsModule.showEnterRoomTips',
    function (originalFunc) {
      var $tips = $('.enter_tips');
      console.warn('立即执行, 查看tips是否显示', $tips.is(':visible'));
      if($tips.is(':visible')){
        exposeMsg('showEntry', $tips.text().trim());
      }else{
        return function (socket) {
          if (socket.content && socket.content.nickname) {
            exposeMsg('showEntry', socket.content.nickname);
            console.error('执行原方法');
            originalFunc.apply(this, arguments);
            return 'stop';
          }
        }
      }
    }, true);

  changeMethod('showRide',
    function(originalFunc){
      return function (extMount, tips) {
        if (typeof extMount.s != undefined && extMount.s != 1) {
          exposeMsg('showRide', tips);
        }else{exposeMsg('notShowRide', tips)}
        originalFunc.apply(this, arguments);
        return 'stop';
      }
    }, true);
})();

// 测试座驾flash动画
// showRide({
//   bi:"/fxmountimg/20160927104057624501.png",
//   id :"9",
//   n:"路过",
//   p:"3000",
//   s:1, // 1表示不显示
//   si:"/fxmountimg/20130411173417594831.png",
//   swf:"/fxmountswf/20130411173411555181.swf",
// }, '没有神人')
