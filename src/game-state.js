;(function () {
'use strict';

window.pong = window.pong || {};

function GameState() {
  this._state = {
    ball: {
      position: {
        x: 50,
        y: 50
      },
      velocity: {
        x: Math.round(Math.random()) ? 1 : -1,
        y: Math.round(Math.random()) ? 1 : -1
      },
      radius: 3
    },
    board: {
      width: 100,
      height: 100,
      orientation: 0
    },
    paddles: {
      playerOne: 0.5,
      playerTwo: 0.5
    },
    score: {
      playerOne: 0,
      playerTwo: 0
    }
  };
}

GameState.prototype.getBallPosition = function() {
  return this._state.ball.position;
};

GameState.prototype.getBallRadius = function() {
  return this._state.ball.radius;
};

GameState.prototype.getBallVelocity = function() {
  return this._state.ball.velocity;
};

GameState.prototype.getBoard = function() {
  return this._state.board;
};

GameState.prototype.getScore = function() {
  return this._state.score;
};

GameState.prototype.resize = function(options) {
  var newWidth, newHeight;
  var oldWidth = this._state.board.width;
  var oldHeight = this._state.board.height;

  // Set "virtual" board width and height based on whichever value is larger
  if (options.width > options.height) {
    newWidth = options.width;
    newHeight = options.height;
    this._state.board.orientation = 0;
  } else {
    newWidth = options.height;
    newHeight = options.width;
    this._state.board.orientation = 90;
  }
  this._state.board.width = newWidth;
  this._state.board.height = newHeight;

  // Recalibrate ball position based on old board size
  this._state.ball.position.x *= newWidth / oldWidth;
  this._state.ball.position.y *= newHeight / oldHeight;
};

window.pong.GameState = GameState;

}());
