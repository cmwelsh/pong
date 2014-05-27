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
  var ballRadius = this._gameState.getBallRadius();
  var board = this._gameState.getBoard();
  var position = this._gameState.getBallPosition();
  var velocity = this._gameState.getBallVelocity();
  position.x += velocity.x;
  position.y += velocity.y;

  if (position.x > board.width - ballRadius) {
    position.x = board.width - ballRadius;
    velocity.x = -1;
  }
  if (position.x < ballRadius) {
    position.x = ballRadius;
    velocity.x = 1;
  }
  if (position.y > board.height - ballRadius) {
    position.y = board.height - ballRadius;
    velocity.y = -1;
  }
  if (position.y < ballRadius) {
    position.y = ballRadius;
    velocity.y = 1;
  }
};

window.pong.Logic = Logic;

}());
