;(function () {
'use strict';

window.pong = window.pong || {};

function GameState() {
  this._state = {
    board: {
      width: 100,
      height: 100,
      orientation: 0
    },
    score: {
      playerOne: 0,
      playerTwo: 0
    }
  };
  this._touches = {
    playerOne: [],
    playerTwo: []
  };
  this.resetBall();
}

GameState.prototype.touchEnd = function(touch) {
  var x, y;
  var board = this._state.board;

  if (!board.orientation) {
    x = touch.x;
    y = touch.y;
  } else {
    x = touch.y;
    y = touch.x;
  }

  if (!board.orientation) {
    if (x < board.width / 2) {
      this._touches.playerOne = [];
    } else {
      this._touches.playerTwo = [];
    }
  } else {
    if (x < board.width / 2) {
      this._touches.playerTwo = [];
    } else {
      this._touches.playerOne = [];
    }
  }
};

GameState.prototype.touchMove = function(touch) {
  var x, y;
  var board = this._state.board;

  if (!board.orientation) {
    x = touch.x;
    y = touch.y;
  } else {
    x = touch.y;
    y = touch.x;
  }

  if (!board.orientation) {
    if (x < board.width / 2) {
      this._touches.playerOne.push(y);
    } else {
      this._touches.playerTwo.push(y);
    }
  } else {
    if (x < board.width / 2) {
      this._touches.playerTwo.push(y);
    } else {
      this._touches.playerOne.push(y);
    }
  }
};

GameState.prototype.touchStart = function(touch) {
  var x, y;
  var board = this._state.board;

  if (!board.orientation) {
    x = touch.x;
    y = touch.y;
  } else {
    x = touch.y;
    y = touch.x;
  }

  if (!board.orientation) {
    if (x < board.width / 2) {
      this._touches.playerOne = [y];
    } else {
      this._touches.playerTwo = [y];
    }
  } else {
    if (x < board.width / 2) {
      this._touches.playerTwo = [y];
    } else {
      this._touches.playerOne = [y];
    }
  }
};

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

GameState.prototype.getPaddleHeight = function() {
  return this._state.board.height / 7;
};

GameState.prototype.getPaddles = function() {
  return this._state.paddles;
};

GameState.prototype.getScore = function() {
  return this._state.score;
};

GameState.prototype.getTouches = function(playerSlug) {
  return this._touches[playerSlug];
};

GameState.prototype.increaseScore = function(playerSlug) {
  this._state.score[playerSlug] += 1;
};

GameState.prototype.resetBall = function() {
  var board = this._state.board;

  var ballSpeed = 2;
  var ballAngle = Math.random() * (Math.PI / 4) + (Math.PI / 4);
  var velocityX = Math.sin(ballAngle) * ballSpeed;
  var velocityY = Math.cos(ballAngle) * ballSpeed;

  this._state.ball = {
    position: {
      x: board.width / 2,
      y: board.height / 2
    },
    velocity: {
      x: (Math.round(Math.random()) ? 1 : -1) * velocityX,
      y: (Math.round(Math.random()) ? 1 : -1) * velocityY
    },
    radius: 3
  };

  this._state.paddles = {
    playerOne: 0.5,
    playerTwo: 0.5
  };
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
