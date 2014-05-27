;(function () {
'use strict';

window.pong = window.pong || {};

function Renderer(options) {
  if (typeof options !== 'object') {
    throw new Error('Must pass options into Renderer');
  }
  if (!options.canvas) {
    throw new Error('Must pass canvas into Renderer');
  }
  if (!options.gameState) {
    throw new Error('Must pass gameState into Renderer');
  }
  this._canvas = options.canvas;
  this._context = this._canvas.getContext('2d');
  this._gameState = options.gameState;
}

Renderer.prototype.init = function() {
  this.resize();
};

Renderer.prototype.render = function() {
  this._setSize();

  this._drawBall();
};

Renderer.prototype.resize = function() {
  this._setSize();
};

Renderer.prototype._drawBall = function() {
  var position = this._gameState.ball.position;

  this._context.fillStyle = 'rgb(200,0,0)';
  this._context.fillRect(position.x, position.y, 5, 5);
};

Renderer.prototype._setSize = function() {
  this._canvas.width = window.innerWidth;
  this._canvas.height = window.innerHeight;
};

window.pong.Renderer = Renderer;

}());
