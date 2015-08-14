var Entity = require('./entity');
var Sprite = require('./sprite');
var Physics = require('./physics');
var Trail = require('./trail');
var ParticleSystem = require('./particlesystem');
var BoundingBox = require('./boundingbox');
var BoundingCircle = require('./boundingcircle');
var Vector = require('./vector');
var Angle = require('./angle');
var Planet = require('./planet');

var Player = Entity.extend({
	init: function(game, id, x, y) {
		this.classname = "Player";
		this._super(game, id, x, y);
		this.game = game;
		this.input = {};
		this.client = false;
		this.needSpawn = true;
		this.radar = [{ //TODO: Fix this needing to be declared for syncing an array
			name: '',
			pos: {}
		}];
		this.layer = 999;
	},
	update: function() {
		this._super();
		if (this.ship) {
			this.pos = this.ship.pos.clone();;
			this.ship.setInput(this.input);
		}
	},
	render: function(ctx, screen) {

	},
	setInput: function(input) {
		this.input = input;
		if (this.ship) {
			this.ship.setInput(this.input);
		}
	},
	getShip: function() {
		if (this.ship) return this.ship;
		else return {};
	},
});

module.exports = Player;