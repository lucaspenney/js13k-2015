var Class = require('./class');
var Screen = require('./screen');
var Stars = require('./stars');
var InputManager = require('./input');
var Player = require('./player');
var Ship = require('./ship');
var Entity = require('./entity');
var UI = require('./ui');
var Game = require('./game');

var Client = Class.extend({
  init: function() {
    this.game = new Game();
    this.stage = document.getElementsByTagName("canvas")[0];
    this.ctx = this.stage.getContext('2d');
    this.input = new InputManager(this);
    this.screen = new Screen(this);
    this.ui = new UI(this);
    this.frameTime = 0;
    this.tickRate = 60;
    this.lastUpdate = 0;
    this.lastRender = 0;
    this.fps = 0;
    this.second = 0;
    this.loop(); //Begin the game render loop
  },
  loop: function() {
    var _this = this;
    _this.tick();
  },
  tick: function() {
    var _this = this;
    if (Date.now() - this.lastUpdate > (1000 / this.tickRate)) {
      _this.game.update(this.input.getInput());
      _this.render();
      _this.lastUpdate = Date.now();
    }
    requestAnimationFrame(function() {
      _this.tick();
    });
  },
  render: function() {
    this.lastRender = Date.now();
    if (Date.now() - this.second > 1000) {
      this.second = Date.now();
      this.fps = 0;
    }
    var curTime = Date.now();
    this.game.render(this.ctx, this.screen);
    this.ui.render(this.ctx, this.screen);
    this.debugOutput();
    this.fps++;
    this.frameTime = Date.now() - curTime;
  },
  debugOutput: function() {
    if (this.debug) {
      this.ctx.fillStyle = "#FFF";
      this.ctx.font = 'normal 8pt Monospace';
      this.ctx.textAlign = 'left';
      this.ctx.fillText("Client Frame Time (ms): " + this.frameTime, 10, 30);
      this.ctx.fillText("Client FPS: " + this.fps, 10, 40);
    }
  },
});

new Client();