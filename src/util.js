;(function() {
'use strict';

window.pong = window.pong || {};

// Shallow copy of properties from source object to destination object
var extend = function(destination, source) {
  Object.keys(source).forEach(function(key) {
    destination[key] = source[key];
  });
};

// Returns a random hex color in the form of the string 'rgb(r,g,b)'
var randomColor = function() {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  return 'rgb(' + r + ',' + g + ',' + b + ')';
};

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
  extend: extend,
  randomColor: randomColor,
  throttle: throttle
};

}());
