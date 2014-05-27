;(function() {
'use strict';

window.pong = window.pong || {};

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
  this._gameState = {
    paddles: {
      playerOne: 0.5,
      playerTwo: 0.5
    },
    score: {
      playerOne: 0,
      playerTwo: 0
    },
    ball: {
      position: {
        x: 50,
        y: 50
      },
      velocity: {
        x: 1,
        y: 1
      }
    }
  };
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
  this._renderer.resize();
};

Application.prototype.run = function() {
  window.addEventListener('resize', this._resize, false);
  document.ontouchmove = function(event) {
    event.preventDefault();
  };
  window.addEventListener('orientationchange', function() {
    console.log(window.orientation);
  }, false);

  this._renderer.init();
  this.render();
};

window.pong.Application = Application;

}());
