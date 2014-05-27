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
      }
    },
    board: {
      width: 100,
      height: 100
    },
    paddles: {
      playerOne: 0.5,
      playerTwo: 0.5
    },
    score: {
      playerOne: 0,
      playerTwo: 0
    },
  };
}

GameState.prototype.getBallPosition = function() {
  return this._state.ball.position;
};

GameState.prototype.getBallVelocity = function() {
  return this._state.ball.velocity;
};

GameState.prototype.getBoard = function() {
  return this._state.board;
};

GameState.prototype.resize = function(options) {
  this._state.board.width = options.width;
  this._state.board.height = options.height;
};

window.pong.GameState = GameState;

}());
