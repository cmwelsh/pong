;(function () {
'use strict';

window.pong = window.pong || {};

function Logic(options) {
  if (typeof options !== 'object') {
    throw new Error('Must pass options into Renderer');
  }
  if (!options.gameState) {
    throw new Error('Must pass gameState into Renderer');
  }
  this._gameState = options.gameState;
}

Logic.prototype.tick = function() {
  var board = this._gameState.getBoard();
  var position = this._gameState.getBallPosition();
  var velocity = this._gameState.getBallVelocity();
  position.x += velocity.x;
  position.y += velocity.y;

  if (position.x > board.width - 2) {
    position.x = board.width - 2;
    velocity.x = -1;
  }
  if (position.x < 2) {
    position.x = 2;
    velocity.x = 1;
  }
  if (position.y > board.height - 2) {
    position.y = board.height - 2;
    velocity.y = -1;
  }
  if (position.y < 2) {
    position.y = 2;
    velocity.y = 1;
  }
};

window.pong.Logic = Logic;

}());
