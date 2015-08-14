var Class = require('./class');
var Vector = require('./vector');

var Weapon = Class.extend({
	init: function(parent) {
		this.parent = parent;
		this.lastFireTime = Date.now();
		this.missileFireRate = 1000;
		this.bulletFireRate = 150;
		this.mode = "bullet";
		this.rotationalOffset = -10;
	},
	fire: function() {

	},
});

module.exports = Weapon;