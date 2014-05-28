;(function() {
'use strict';

window.pong = window.pong || {};

var RendererMixin = window.pong.RendererMixin;
var util = window.pong.util;

// The particle renderer class draws the particle effects behind the ball
function ParticleRenderer(options) {
  this._context = options.context;
  this._gameState = options.gameState;

  var board = this._gameState.getBoard();
  this._oldWidth = board.width;
  this._oldHeight = board.height;

  this._initParticles();
}

util.extend(ParticleRenderer.prototype, RendererMixin);

// Update particle state and render particles
ParticleRenderer.prototype.render = function() {
  for (var i = 0; i < this._particles.length; i += 1) {
    this._particles[i].x += this._particles[i].xVelocity;
    this._particles[i].y += this._particles[i].yVelocity;
    this._particles[i].lifetime -= 1;
    if (this._particles[i].lifetime <= 0) {
      this._createParticle(this._particles[i]);
    }

    this._context.fillStyle = this._particles[i].color;
    this._fillRect(this._particles[i].x, this._particles[i].y, 1, 1);
  }
};

// Recalibrate the particle positions based on the new world size
ParticleRenderer.prototype.resize = function() {
  var board = this._gameState.getBoard();
  var widthRatio = board.width / this._oldWidth;
  var heightRatio = board.height / this._oldHeight;
  this._particles.forEach(function(particle) {
    particle.x *= widthRatio;
    particle.y *= heightRatio;
  });
  this._oldWidth = board.width;
  this._oldHeight = board.height;
};

// Create a new particle based on the current ball position and velocity. If
// an existing particle is passed in, it will be recycled.
ParticleRenderer.prototype._createParticle = function(existingParticle) {
  var particle = existingParticle || {};
  var ballPosition = this._gameState.getBallPosition();
  var ballVelocity = this._gameState.getBallVelocity();
  var ballAngle = Math.atan2(ballVelocity.y * -1, ballVelocity.x * -1);
  var angleAdjustment = (Math.random() * (Math.PI / 4));
  if (Math.floor(Math.random())) {
    angleAdjustment *= -1;
  }
  ballAngle += angleAdjustment;
  var xVelocity = Math.cos(ballAngle);
  var yVelocity = Math.sin(ballAngle);

  particle.x = ballPosition.x;
  particle.y = ballPosition.y;
  particle.xVelocity = xVelocity;
  particle.yVelocity = yVelocity;
  particle.lifetime = Math.floor(Math.random() * 300);
  particle.color = util.randomColor();

  return particle;
};

ParticleRenderer.prototype._initParticles = function() {
  var particleCount = 1000;
  this._particles = [];
  for (var i = 0; i < particleCount; i += 1) {
    this._particles.push(this._createParticle());
  }
};

window.pong.ParticleRenderer = ParticleRenderer;

}());
