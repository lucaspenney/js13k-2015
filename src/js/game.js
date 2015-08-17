var Class = require('./class');
var Player = require('./player');
var Stars = require('./stars');
var EventManager = require('./eventmanager');
var Planet = require('./planet');

var Game = Class.extend({
  entityId: 0,
  init: function() {
    this.entities = [];
    this.debugMode = false;
    this.lastTick = Date.now();
    this.tick = Date.now();
    this.tickRate = 60;
    this.eventManager = new EventManager();
    this.entities.push(new Player(this, -500, -50));
    for (var i = 0; i < 1; i++) {
      this.entities.push(new Planet(this, i * 700, i * 700));
    }

  },
  update: function(input) {
    this.tick = Date.now();
    for (var i = this.entities.length - 1; i >= 0; i--) {
      this.entities[i].update(input);
    }
    this.lastTick = this.tick;
  },
  render: function(ctx, screen) {
    if (!ctx || !screen) return;
    ctx.fillStyle = "#000000";
    ctx.clearRect(0, 0, screen.width, screen.height);
    screen.render(ctx, screen);
    this.entities.sort(function(a, b) {
      if (a === null) return 1;
      if (b === null) return -1;
      if (a.layer === undefined) a.layer = 0;
      if (b.layer === undefined) b.layer = 0;
      if (a.layer > b.layer)
        return -1;
      if (a.layer < b.layer)
        return 1;
      return 0;
    });
    for (var i = this.entities.length - 1; i >= 0; i--) {
      this.entities[i].render(ctx, screen);
    }
  },
  on: function(event, func) {
    this.eventManager.addEventListener(event, func);
  },
});
module.exports = Game;