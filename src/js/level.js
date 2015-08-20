var Class = require('./class');
var Player = require('./player');

var Level = Class.extend({
    init: function(game, data) {
        this.game = game;
        this.data = data;
    },
    load: function() {
        for (var x = 0; x < this.data.length; x++) {
            if (data[i].t = 1) {
                new Planet(this.game, data[i].x, data[i].y);
            }
        }
    },
    start: function() {
        for (var i = 0; i < this.game.entities.length; i++) {
            //Spawn player at playerspawn
            if (this.game.entities[i] instanceof PlayerSpawn) {
                new Player(this.game, this.game.entities[i].x, this.game.entities[i].y);
            }
        }
    }
});

module.exports = Level;