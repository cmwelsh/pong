;(function () {
'use strict';

window.pong = window.pong || {};

var ParticleRenderer = window.pong.ParticleRenderer;
var RendererMixin = window.pong.RendererMixin;
var util = window.pong.util;

// Renders the game state to the provided canvas with orientation modifications
// applied to the scene.
function Renderer(options) {
  this._canvas = options.canvas;
  this._context = this._canvas.getContext('2d');
  this._gameState = options.gameState;
  this._particleRenderer = new ParticleRenderer({
    context: this._context,
    gameState: this._gameState
  });
  this._ballColor = util.randomColor();
}

util.extend(Renderer.prototype, RendererMixin);

// Renders the game scene
Renderer.prototype.render = function() {
  this._setSize();

  var board = this._gameState.getBoard();
  // Check device orientation
  if (board.orientation) {
    // Center the canvas on the rotated width and height
    this._context.translate(board.height / 2, board.width / 2);
    // Rotate game 90 degrees
    this._context.rotate(Math.PI / -2);
  } else {
    // Center the canvas on the regular width and height
    this._context.translate(board.width / 2, board.height / 2);
  }

  // Use these drawing styles for everything
  this._context.fillStyle = 'rgb(200,0,0)';
  this._context.font = '20px Georgia';

  // Draw center dividing line
  this._drawLine();
  // Draw player paddles
  this._drawPaddles();
  // Draw scoreboard
  this._drawScore();

  // Draw particles
  this._particleRenderer.render();

  // Draw ball
  this._drawBall();
};

// Notify the particle renderer that the world has changed size
Renderer.prototype.resize = function() {
  this._particleRenderer.resize();
};

// Draw the pong ball
Renderer.prototype._drawBall = function() {
  var ballRadius = this._gameState.getBallRadius();
  var position = this._gameState.getBallPosition();

  this._context.fillStyle = this._ballColor;
  this._fillRect(position.x - ballRadius, position.y - ballRadius, ballRadius * 2, ballRadius * 2);
};

// Draw the center divider line
Renderer.prototype._drawLine = function() {
  var board = this._gameState.getBoard();
  var lineWidth = 2;

  this._fillRect((board.width / 2) - (lineWidth / 2), 0, lineWidth, board.height);
};

// Draw the player paddles
Renderer.prototype._drawPaddles = function() {
  var board = this._gameState.getBoard();
  var paddles = this._gameState.getPaddles();
  // For display purposes only, the actual collision is against the far side
  var paddleWidth = 4;
  var paddleHeight = this._gameState.getPaddleHeight();

  this._fillRect(0, (paddles.playerOne * board.height) - (paddleHeight / 2), paddleWidth, paddleHeight);
  this._fillRect(board.width - paddleWidth, (paddles.playerTwo * board.height) - (paddleHeight / 2), paddleWidth, paddleHeight);
};

// Draws the current score of the game
Renderer.prototype._drawScore = function() {
  var board = this._gameState.getBoard();
  var score = this._gameState.getScore();

  if (board.orientation) {
    this._fillText(score.playerOne, board.width / 4, board.height / 2);
    this._fillText(score.playerTwo, board.width / 4 * 3, board.height / 2);
  } else {
    this._fillText(score.playerOne, board.width / 4, board.height / 2);
    this._fillText(score.playerTwo, board.width / 4 * 3, board.height / 2);
  }
};

// Clear the canvas and set the width and height to the provided dimensions
Renderer.prototype._setSize = function() {
  var board = this._gameState.getBoard();

  if (board.orientation) {
    this._canvas.height = board.width;
    this._canvas.width = board.height;
  } else {
    this._canvas.width = board.width;
    this._canvas.height = board.height;
  }
};

window.pong.Renderer = Renderer;

}());
