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

Renderer.prototype.render = function() {
  this._setSize();

  this._drawBall();
};

Renderer.prototype.resize = function() {
  this._setSize();
};

Renderer.prototype._drawBall = function() {
  var ballRadius = this._gameState.getBallRadius();
  var position = this._gameState.getBallPosition();

  this._context.fillStyle = 'rgb(200,0,0)';
  this._context.fillRect(position.x - ballRadius, position.y - ballRadius, ballRadius * 2, ballRadius * 2);
};

Renderer.prototype._setSize = function() {
  var board = this._gameState.getBoard();
  this._canvas.width = board.width;
  this._canvas.height = board.height;
};

window.pong.Renderer = Renderer;

}());
