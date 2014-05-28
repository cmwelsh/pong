;(function() {
'use strict';

window.pong = window.pong || {};

// Throttle invokation of the provided function to at most `delay` milliseconds
// between calls. The function will be called immediately the first time, and
// subsequent invokations will be throttled/debounced.
var throttle = function(func, delay) {
  var timer;
  return function() {
    var instance = this;
    var args = arguments;
    // Check if throttling timer is inactive
    if (!timer) {
      // Immediately invoke function
      func.apply(this, arguments);
      // Set throttling timer
      timer = setTimeout(function() {
        timer = void 0;
      }, delay);
    } else {
      // Clear current throttling timer
      clearTimeout(timer);
      // Debounce the queued function call
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
