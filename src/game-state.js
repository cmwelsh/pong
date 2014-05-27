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
        x: 1,
        y: 1
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
  if (options.width > options.height) {
    this._state.board.width = options.width;
    this._state.board.height = options.height;
    this._state.board.orientation = 0;
  } else {
    this._state.board.height = options.width;
    this._state.board.width = options.height;
    this._state.board.orientation = 90;
  }
};

window.pong.GameState = GameState;

}());
