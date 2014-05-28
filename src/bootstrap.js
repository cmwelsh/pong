;(function () {
'use strict';

// console.log shim
window.console = window.console || {
  log: function(){}
};

var Application = window.pong.Application;

// Wait until all page resources have loaded
window.addEventListener('load', function() {
  // Initialize application
  var app = new Application({
    // Provide canvas element on which game will be drawn
    canvas: document.getElementById('canvas')
  });
  // Start application
  app.run();
}, false);

}());
