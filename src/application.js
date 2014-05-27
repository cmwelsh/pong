;(function() {
'use strict';

window.pong = window.pong || {};

var GameState = window.pong.GameState;
var Logic = window.pong.Logic;
var Renderer = window.pong.Renderer;
var util = window.pong.util;

function Application(options) {
  if (typeof options !== 'object') {
    throw new Error('Must pass options into application');
  }
  if (!options.canvas) {
    throw new Error('Must pass canvas option into application');
  }
  this._canvas = options.canvas;
  this._gameState = new GameState();
  this._logic = new Logic({
    gameState: this._gameState
  });
  this._renderer = new Renderer({
    gameState: this._gameState,
    canvas: this._canvas
  });

  this.render = this.render.bind(this);
  this._resize = util.throttle(this._resize.bind(this), 100);
}

Application.prototype.render = function() {
  window.requestAnimationFrame(this.render);

  this._logic.tick();
  this._renderer.render();
};

Application.prototype._resize = function() {
  //console.log(window.orientation);
  this._gameState.resize({
    width: window.innerWidth,
    height: window.innerHeight
  });
  this._renderer.resize();
};

Application.prototype.run = function() {
  var mousedown = false;
  window.addEventListener('resize', this._resize, false);
  window.addEventListener('orientationchange', this._resize, false);
  document.addEventListener('mousedown', function(event) {
    event.preventDefault();
    mousedown = true;
  }.bind(this), false);
  document.addEventListener('mouseup', function(event) {
    event.preventDefault();
    mousedown = false;
  }.bind(this), false);
  document.addEventListener('mousemove', function(event) {
    event.preventDefault();
    if (mousedown) {
      this._gameState.addTouch({
        x: event.pageX,
        y: event.pageY
      });
    }
  }.bind(this), false);
  document.addEventListener('touchmove', function(event) {
    event.preventDefault();
    Array.prototype.forEach.call(event.touches, function(touch) {
      this._gameState.addTouch({
        x: touch.pageX,
        y: touch.pageY
      });
    }.bind(this));
  }.bind(this), false);

  this._resize();
  this.render();
};

window.pong.Application = Application;

}());
