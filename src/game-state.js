;(function () {
'use strict';

window.pong = window.pong || {};

// The game state holds all of the state of the game and inputs. It provides
// translation between "real-world" browser coordinates and "game world" board
// coordinates.
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
  this._lastTap = {
    playerOne: 0,
    playerTwo: 0
  };
  this.resetBall();
}

// Clear assigned player's touch input history
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

// Record touch move event
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

// A touch was started, clear the assigned player's previous touch inputs and
// record the touch position
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
      this._lastTap.playerOne = +new Date();
      this._touches.playerOne = [y];
    } else {
      this._lastTap.playerTwo = +new Date();
      this._touches.playerTwo = [y];
    }
  } else {
    if (x < board.width / 2) {
      this._lastTap.playerTwo = +new Date();
      this._touches.playerTwo = [y];
    } else {
      this._lastTap.playerOne = +new Date();
      this._touches.playerOne = [y];
    }
  }
};

// Get the ball x and y position
GameState.prototype.getBallPosition = function() {
  return this._state.ball.position;
};

// Get the ball radius
GameState.prototype.getBallRadius = function() {
  return this._state.ball.radius;
};

// Get the ball x and y velocity
GameState.prototype.getBallVelocity = function() {
  return this._state.ball.velocity;
};

// Get the board width, height, and orientation
GameState.prototype.getBoard = function() {
  return this._state.board;
};

// Get the time in milliseconds of last finger tap by user
GameState.prototype.getLastTap = function(playerSlug) {
  return this._lastTap[playerSlug];
};

// Get paddle height in pixels
GameState.prototype.getPaddleHeight = function() {
  return this._state.board.height / 5;
};

// Get paddle positions for both players
GameState.prototype.getPaddles = function() {
  return this._state.paddles;
};

// Get score for both players
GameState.prototype.getScore = function() {
  return this._state.score;
};

// Get all recent touch events for the specified player
GameState.prototype.getTouches = function(playerSlug) {
  return this._touches[playerSlug];
};

// Increase the specified player's score by 1
GameState.prototype.increaseScore = function(playerSlug) {
  this._state.score[playerSlug] += 1;
};

// Reset the ball and paddles to their default positions in order to start a
// new round of pong.
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
    radius: 8
  };

  this._state.paddles = {
    playerOne: 0.5,
    playerTwo: 0.5
  };
};

// Respond to browser resize events by translating the current state of the
// game to the new viewport size, and rotate the display of the game based
// on either viewport width or height being larger.
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
