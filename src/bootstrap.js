;(function () {
'use strict';

window.console = window.console || {
  log: function(){}
};

var Application = window.pong.Application;

window.addEventListener('load', function() {
  var app = new Application({
    canvas: document.getElementById('canvas')
  });
  app.run();
});

}());
