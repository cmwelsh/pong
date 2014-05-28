;(function() {
'use strict';

window.pong = window.pong || {};

var GameState = window.pong.GameState;
var Logic = window.pong.Logic;
var Renderer = window.pong.Renderer;
var util = window.pong.util;

// The application class is the top level class for the game, holding all
// functions and state for the game as encapsulated/composed data
function Application(options) {
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

// Update game state and render canvas
Application.prototype.render = function() {
  // Queue up next render
  window.requestAnimationFrame(this.render);

  // Update game logic
  this._logic.tick();

  // Render game state
  this._renderer.render();
};

// Initialize game state and start render loop
Application.prototype.run = function() {
  var mousedown = false;

  // Resize events
  window.addEventListener('resize', this._resize, false);
  window.addEventListener('orientationchange', this._resize, false);

  // Mouse/touch input events
  document.addEventListener('mousedown', function(event) {
    event.preventDefault();
    mousedown = true;
    this._gameState.touchStart({
      x: event.pageX,
      y: event.pageY
    });
  }.bind(this), false);
  document.addEventListener('mouseup', function(event) {
    event.preventDefault();
    mousedown = false;
    this._gameState.touchEnd({
      x: event.pageX,
      y: event.pageY
    });
  }.bind(this), false);
  document.addEventListener('mousemove', function(event) {
    event.preventDefault();
    if (mousedown) {
      this._gameState.touchMove({
        x: event.pageX,
        y: event.pageY
      });
    }
  }.bind(this), false);
  document.addEventListener('touchstart', function(event) {
    event.preventDefault();
    this._gameState.touchStart({
      x: event.pageX,
      y: event.pageY
    });
  }.bind(this), false);
  document.addEventListener('touchend', function(event) {
    Array.prototype.forEach.call(event.changedTouches, function(touch) {
      this._gameState.touchEnd({
        x: touch.pageX,
        y: touch.pageY
      });
    }.bind(this));
  }.bind(this), false);
  document.addEventListener('touchcancel', function(event) {
    Array.prototype.forEach.call(event.changedTouches, function(touch) {
      this._gameState.touchEnd({
        x: touch.pageX,
        y: touch.pageY
      });
    }.bind(this));
  }.bind(this), false);
  document.addEventListener('touchmove', function(event) {
    event.preventDefault();
    Array.prototype.forEach.call(event.touches, function(touch) {
      this._gameState.touchMove({
        x: touch.pageX,
        y: touch.pageY
      });
    }.bind(this));
  }.bind(this), false);

  // Initialize viewport
  this._resize();
  // Start render loop
  this.render();
};

// Update game state with new viewport geometry
Application.prototype._resize = function(event) {
  this._gameState.resize({
    width: window.innerWidth,
    height: window.innerHeight
  });
  this._renderer.resize();
};

window.pong.Application = Application;

}());
