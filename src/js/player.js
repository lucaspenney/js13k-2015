var Entity = require('./entity');
var Sprite = require('./sprite');
var Physics = require('./physics');
var Trail = require('./trail');
var ParticleSystem = require('./particlesystem');
var BoundingCircle = require('./boundingcircle');
var Vector = require('./vector');
var Angle = require('./angle');
var Planet = require('./planet');
var Ship = require('./ship');

var Player = Entity.extend({
	init: function(game, x, y) {
		this.classname = "Player";
		this._super(game, x, y);
		this.game = game;
		this.input = {};
		this.client = false;
		this.needSpawn = true;
		this.radar = [{ //TODO: Fix this needing to be declared for syncing an array
			name: '',
			pos: {}
		}];
		this.layer = 999;
		this.ship = new Ship(this.game, x, y);
		this.target = new Vector(500, 500);
	},
	update: function(input) {
		this._super();
		if (this.ship) {
			this.pos = this.ship.pos.clone();
		}
	},
	render: function(ctx, screen) {
		screen.setFocusedEntity(this.ship);
		if (this.target) {

		}
	},
	getShip: function() {
		if (this.ship) return this.ship;
		else return {};
	},
});

module.exports = Player;