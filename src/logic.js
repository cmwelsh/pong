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
  var position = this._gameState.ball.position;
  var velocity = this._gameState.ball.velocity;
  position.x += velocity.x;
  position.y += velocity.y;

  if (position.x > window.innerWidth) {
    position.x = window.innerWidth;
    velocity.x = -1;
  }
  if (position.x < 0) {
    position.x = 0;
    velocity.x = 1;
  }
  if (position.y > window.innerHeight) {
    position.y = window.innerHeight;
    velocity.y = -1;
  }
  if (position.y < 0) {
    position.y = 0;
    velocity.y = 1;
  }
};

window.pong.Logic = Logic;

}());
