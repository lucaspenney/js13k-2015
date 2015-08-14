var Class = require('./class');
var Player = require('./player');
var Stars = require('./stars');
var EventManager = require('./eventmanager');

var Game = Class.extend({
  entityId: 0,
  init: function() {
    this.entities = [];
    this.debugMode = false;
    this.lastTick = Date.now();
    this.tick = Date.now();
    this.eventManager = new EventManager();
  },
  update: function(tickRate) {
    this.tick = Date.now();
    for (var i = this.entities.length - 1; i >= 0; i--) {
      if (this.entities[i].active)
        this.entities[i].update();
    }
    this.lastTick = this.tick;
  },
  render: function(ctx, screen, audio) {
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
      this.entities[i].render(ctx, screen, audio);
    }
  },
  on: function(event, func) {
    this.eventManager.addEventListener(event, func);
  },
  newEntityId: function() {
    this.entityId++;
    return this.entityId;
  },
});
module.exports = Game;