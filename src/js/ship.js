var Entity = require('./entity');
var Sprite = require('./sprite');
var Physics = require('./physics');
var Trail = require('./trail');
var ParticleSystem = require('./particlesystem');
var Weapon = require('./weapon');
var BoundingBox = require('./boundingbox');
var BoundingCircle = require('./boundingcircle');
var Vector = require('./vector');
var Angle = require('./angle');
var Planet = require('./planet');
var Explosion = require('./explosion');
var Item = require('./item');

var Ship = Entity.extend({
	init: function(game, x, y) {
		this.width = 32;
		this.height = 42;
		this._super(game, x, y);
		this.game = game;
		this.rotation = new Angle();
		this.sprite = new Sprite(this, "img/ship1.png");
		this.physics = new Physics(this.game, this, new BoundingCircle(this.game, this, 20));
		this.physics.collidesWith = function(e) {
			if (e instanceof Planet || e instanceof Item) {
				return true;
			}
		};
		var _this = this;
		this.physics.on('post-collide', function(entity) {
			if (entity instanceof Planet) {
				new Explosion(this.game, this.pos.x, this.pos.y);
				this.destroy();
			}
		});
		this.physics.on('pre-collide', function(entity) {
			if (entity instanceof Item) {
				this.fuel += 30;
				this.power += 10;
				entity.destroy();
				return false;
			}
		})
		this.physics.mass = 10;
		this.physics.maxVelocity = 16;
		this.layer = 100;
		this.trail = new Trail(this.game, this, 10, new Vector(-10, 10));
		this.trail2 = new Trail(this.game, this, 10, new Vector(-10, -10));
		this.turnThrust = 0.4;
		this.mainThrust = 0.20;
		this.fuel = 500;
		this.power = 100;
		this.engineParticles = new ParticleSystem(this.game, this.x, this.y, {
			r: 70,
			g: 70,
			b: 70,
			a: 1,
			vel: function(v) {
				v.x += (Math.random() * 6) - 3;
				v.y += (Math.random() * 6) - 3;
			},
			step: function() {
				this.a *= 0.8;
				this.r += 5;
				this.g += 5;
				this.b += 5;
			},
		});
		this.engineParticles.setParent(this);
		this.weapon = new Weapon(this);
		this.landed = false;
		this.health = 100;
		this.lastFireTime = 0;
	},
	update: function(input) {
		this._super();
		this.engineParticles.update();
		//Scale thrust down towards 0 as speed approaches maxvelocity
		this.mainThrust = 0.2;
		this.physics.antigravity = false;
		this.engineParticles.turnOff();
		if (input.space) {
			if (this.usePower(1)) {
				this.physics.antigravity = true;
			}
		}
		if (input.up) {
			if (this.useFuel(2)) {
				this.engineParticles.turnOn();
				var x = Math.cos(this.rotation.clone().subtract(90).toRadians()) * this.mainThrust;
				var y = Math.sin(this.rotation.clone().subtract(90).toRadians()) * this.mainThrust;
				this.physics.addAcceleration(x, y, 0);
			}
		}
		if (input.left) { //Left Arrow
			this.useFuel(1);
			this.physics.addAcceleration(0, 0, this.turnThrust * -1);
		}
		if (input.right) { //Right Arrow
			this.useFuel(1);
			this.physics.addAcceleration(0, 0, this.turnThrust);
		}
		if (input.fire) {
			this.weapon.fire();
		}

		if (this.landed) {
			this.landed = false;
		}
		this.physics.update();
	},
	render: function(ctx, screen, audio) {
		//this.trail.render(ctx, screen);
		//this.trail2.render(ctx, screen);
		this.engineParticles.render(ctx, screen);
		this._super(ctx, screen);
		this.physics.bounds.render(ctx, screen);
	},
	takeDamage: function(damage) {
		this.health -= damage;
		if (this.health <= 0) {
			this.game.entityFactory.create('Explosion', this.game, this.pos.x, this.pos.y);
			this.destroy();
		}
	},
	useFuel: function(n) {
		if (n <= this.fuel) {
			this.fuel -= n;
			return true;
		}
		return false;
	},
	usePower: function(n) {
		if (n <= this.power) {
			this.power -= n;
			return true;
		}
		return false;
	},
	addFuel: function(n) {
		this.fuel += n;
		if (this.fuel > 100) this.fuel = 100;
	},
	addPower: function(n) {
		this.power += n;
		if (this.power > 100) this.power = 100;
	},
	getOwner: function() {
		if (this.owner) return this.owner;
		else return {};
	},
});

module.exports = Ship;