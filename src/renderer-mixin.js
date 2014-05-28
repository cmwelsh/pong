;(function() {
'use strict';

window.pong = window.pong || {};

// The renderer mixin provides shared functions between the regular renderer
// and the particle renderer.
var RendererMixin = {};

// Draws a rectangle as provided in game coordinates, translating game
// coordinates to viewport coordinates given the expected matrix
RendererMixin._fillRect = function(x, y, width, height) {
  var board = this._gameState.getBoard();
  this._context.fillRect(board.width / -2 + x, board.height / -2 + y, width, height);
};

// Always draws text so it's right-side up when viewed on the emulator
RendererMixin._fillText = function(text, x, y) {
  var board = this._gameState.getBoard();

  // Save the old drawing context
  this._context.save();

  if (board.orientation) {
    // Center the canvas on the text location
    this._context.translate(board.width / -2 + x, board.height / -2 + y);
    // Rotate drawing 90 degrees
    this._context.rotate(Math.PI / 2);
  } else {
    this._context.translate(board.width / -2 + x, board.height / -2 + y);
  }

  this._context.fillText(text, 0, 0);

  this._context.restore();
};

window.pong.RendererMixin = RendererMixin;

}());
