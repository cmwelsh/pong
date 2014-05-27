;(function () {
'use strict';

window.pong = window.pong || {};

function Logic(options) {
  if (typeof options !== 'object') {
    throw new Error('Must pass options into Logic');
  }
  if (!options.gameState) {
    throw new Error('Must pass gameState into Logic');
  }
  this._gameState = options.gameState;
}

Logic.prototype.tick = function() {
  this._tickPaddles();
  this._tickBall();
};

Logic.prototype._isPaddleHit = function(playerSlug) {
  var ballPosition = this._gameState.getBallPosition();
  var ballRadius = this._gameState.getBallRadius();
  var board = this._gameState.getBoard();
  var paddles = this._gameState.getPaddles();
  var paddleY = board.height * paddles[playerSlug];
  var paddleHeight = this._gameState.getPaddleHeight();

  if (ballPosition.y - ballRadius < paddleY - (paddleHeight / 2)) {
    return false;
  }
  if (ballPosition.y + ballRadius > paddleY + (paddleHeight / 2)) {
    return false;
  }
  return true;
};

Logic.prototype._tickBall = function() {
  var ballRadius = this._gameState.getBallRadius();
  var board = this._gameState.getBoard();
  var position = this._gameState.getBallPosition();
  var velocity = this._gameState.getBallVelocity();

  position.x += velocity.x;
  position.y += velocity.y;

  if (position.x > board.width - ballRadius) {
    if (this._isPaddleHit('playerTwo')) {
      position.x = board.width - ballRadius;
      velocity.x *= -1;
    } else {
      this._gameState.increaseScore('playerOne');
      this._gameState.resetBall();
    }
  }
  if (position.x < ballRadius) {
    if (this._isPaddleHit('playerOne')) {
      position.x = ballRadius;
      velocity.x *= -1;
    } else {
      this._gameState.increaseScore('playerTwo');
      this._gameState.resetBall();
    }
  }
  if (position.y > board.height - ballRadius) {
    position.y = board.height - ballRadius;
    velocity.y *= -1;
  }
  if (position.y < ballRadius) {
    position.y = ballRadius;
    velocity.y *= -1;
  }
};

Logic.prototype._tickPaddle = function(playerSlug) {
  var board = this._gameState.getBoard();
  var touches = this._gameState.getTouches(playerSlug);
  var paddles = this._gameState.getPaddles();
  var paddleHeight = this._gameState.getPaddleHeight();
  var totalTouches = touches.length;
  if (totalTouches > 1) {
    var touch1 = touches[totalTouches - 1];
    var touch2 = touches[totalTouches - 2];
    var speed = touch1 - touch2;
    paddles[playerSlug] += speed / board.height;
    touches.shift();
    if ((paddles[playerSlug] * board.height) + (paddleHeight / 2) > board.height) {
      paddles[playerSlug] = (board.height - (paddleHeight / 2)) / board.height;
    } else if ((paddles[playerSlug] * board.height) - (paddleHeight / 2) < 0) {
      paddles[playerSlug] = (paddleHeight / 2) / board.height;
    }
  }
};

Logic.prototype._tickPaddles = function() {
  this._tickPaddle('playerOne');
  this._tickPaddle('playerTwo');
};

window.pong.Logic = Logic;

}());
