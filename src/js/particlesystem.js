var Class = require('./class');
var Vector = require('./vector');
var Particle = require('./particle');

var ParticleSystem = Class.extend({
	init: function(game, x, y, type) {
		this.game = game;
		this.pos = new Vector(x, y);
		this.particles = [];
		this.type = type;
		this.active = false;
		this.pid = 0;
		this.rotationalOffset = 0;
		this.opts = this.particleTypes[type];
		this.update();
		this.update();
	},
	update: function() {
		if (!this.active) return;
		if (this.parent) {
			this.pos = this.parent.pos.clone();
			var x = this.xOffset + Math.cos(this.parent.rotation.clone().add(90).toRadians()) * this.rotationalOffset;
			var y = this.yOffset + Math.sin(this.parent.rotation.clone().add(90).toRadians()) * this.rotationalOffset;
			this.pos.x += x;
			this.pos.y += y;
		}

		if (this.particles.length >= this.opts.amount) {
			for (var i = 0; i < this.opts.refreshAmount; i++) {
				this.particles.shift();
				this.createParticle();
			}
		} else {
			for (var i = 0; i < this.opts.rate; i++) {
				this.createParticle();
			}
		}
	},
	setParent: function(entity, xOffset, yOffset, rOffset) {
		this.parent = entity;
		this.xOffset = xOffset;
		this.yOffset = yOffset;
		this.rotationalOffset = rOffset;
	},
	createParticle: function() {
		if (this.parent) {
			var pos = this.pos.clone();
			pos.add(this.parent.physics.vel.clone().scale(-5 * (Math.random())));
			var x = this.xOffset + Math.cos(this.parent.rotation.clone().add(90).toRadians()) * this.rotationalOffset;
			var y = this.yOffset + Math.sin(this.parent.rotation.clone().add(90).toRadians()) * this.rotationalOffset;
			var vel = new Vector(x, y).scale(0.075);
			var p = _.merge({}, {
				vel: vel
			}, this.opts);

			this.particles.push(new Particle(this.game, pos.x, pos.y, p));
		} else {
			var vel = new Vector((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 3);
			var pos = this.pos.clone();
			var p = _.merge({
				vel: vel
			}, this.opts);
			this.particles.push(new Particle(this.game, this.pos.x, this.pos.y, p));
		}
		this.pid++;
	},
	render: function(ctx, screen) {
		this.update();
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