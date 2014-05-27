;(function() {
'use strict';

window.pong = window.pong || {};

var throttle = function(func, delay) {
  var timer;
  return function() {
    var instance = this;
    var args = arguments;
    if (!timer) {
      func.apply(this, arguments);
      timer = setTimeout(function() {
        timer = void 0;
      }, delay);
    } else {
      clearTimeout(timer);
      timer = setTimeout(function() {
        timer = void 0;
        func.apply(instance, args);
      }, delay);
    }
  };
};

window.pong.util = {
  throttle: throttle
};

}());
