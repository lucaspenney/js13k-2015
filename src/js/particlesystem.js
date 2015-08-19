var Class = require('./class');
var Vector = require('./vector');
var Particle = require('./particle');

var ParticleSystem = Class.extend({
	init: function(game, x, y, opts) {
		this.game = game;
		this.pos = new Vector(x, y);
		this.particles = [];
		this.active = false;
		this.pid = 0;
		this.rotationalOffset = 0;
		this.opts = {
			amount: 300,
			rate: 30,
		};
		for (var prop in opts) {
			this.opts[prop] = opts[prop];
		}
		this.xOffset = 0;
		this.yOffset = 0;
		this.update();
		this.update();
	},
	getParentPos: function() {
		//Get the vector for the parent attachment point
		var tx = -18;
		var ty = 0;
		var angle = this.parent.rotation.clone().subtract(90).toRadians();
		var x = (tx * Math.cos(angle)) - (ty * Math.sin(angle));
		var y = (tx * Math.sin(angle)) - (ty * Math.cos(angle));
		x += this.parent.pos.x;
		y += this.parent.pos.y;
		return new Vector(x, y);
	},
	update: function() {
		if (!this.active) return;
		if (this.parent) {
			this.pos = this.parent.pos.clone();
		}

		if (this.particles.length >= this.opts.amount) {
			for (var i = 0; i < this.opts.rate; i++) {
				var target = this.getParentPos().add(this.parent.physics.vel.clone().scale(2));
				var diff = target.clone().subtract(this.getParentPos());
				var p = i / this.opts.rate;
				var pos = this.getParentPos().clone();
				pos.x += (diff.x * p);
				pos.y += (diff.y * p);
				this.particles.shift();

				this.createParticle(pos.x, pos.y);
			}
		} else {
			for (var i = 0; i < this.opts.rate; i++) {
				var target = this.getParentPos().add(this.parent.physics.vel.clone().scale(2));
				var diff = target.clone().subtract(this.getParentPos());
				var p = i / this.opts.rate;
				var pos = this.getParentPos().clone();
				pos.x += (diff.x * p);
				pos.y += (diff.y * p);
				this.createParticle(pos.x, pos.y);
			}
		}
	},
	setParent: function(entity, xOffset, yOffset, rOffset) {
		this.parent = entity;
		this.xOffset = xOffset;
		this.yOffset = yOffset;
		this.rotationalOffset = rOffset;
	},
	createParticle: function(x, y) {
		x = x || this.pos.x;
		y = y || this.pos.y;
		if (this.parent) {
			this.particles.push(new Particle(this.game, x, y, {
				opts: this.opts,
				parent: this.parent
			}));
		}
	},
	render: function(ctx, screen) {

		for (var i = 0; i < this.particles.length; i++) {
			this.particles[i].render(ctx, screen);
			this.particles[i].update();
		}
	},
	toggle: function() {
		if (this.active) this.turnOn();
		else this.turnOff();
	},
	turnOn: function() {
		this.active = true;
	},
	turnOff: function() {
		this.active = false;
	},
});

module.exports = ParticleSystem;