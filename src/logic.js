;(function () {
'use strict';

window.pong = window.pong || {};

// The logic class checks the current state of the game and updates the state
// based on player input and time-based world logic
function Logic(options) {
  if (typeof options !== 'object') {
    throw new Error('Must pass options into Logic');
  }
  if (!options.gameState) {
    throw new Error('Must pass gameState into Logic');
  }
  this._gameState = options.gameState;
}

// Perform logic and update game state
Logic.prototype.tick = function() {
  this._tickPaddles();
  this._tickBall();
};

// Check if the ball is at the correct y position to collide with the specified
// player's paddle
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

// Check if the player is elligible for a speed hit. A speed hit is when they
// tap the screen just before the ball hits their paddle
Logic.prototype._isSpeedHit = function(playerSlug) {
  var lastTap = this._gameState.getLastTap(playerSlug);

  if (+new Date() - lastTap < 100) {
    return true;
  }

  return false;
};

// Update the ball position and check for collisions and scoring
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
      if (this._isSpeedHit('playerTwo')) {
        velocity.x *= -2;
      } else {
        velocity.x *= -1;
      }
    } else {
      this._gameState.increaseScore('playerOne');
      this._gameState.resetBall();
    }
  }
  if (position.x < ballRadius) {
    if (this._isPaddleHit('playerOne')) {
      position.x = ballRadius;
      if (this._isSpeedHit('playerOne')) {
        velocity.x *= -2;
      } else {
        velocity.x *= -1;
      }
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

// Update the specified player's paddle position every tick based on their
// previous touch actions
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

// Update the paddle position for each player
Logic.prototype._tickPaddles = function() {
  this._tickPaddle('playerOne');
  this._tickPaddle('playerTwo');
};

window.pong.Logic = Logic;

}());
