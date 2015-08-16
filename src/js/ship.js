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

var Ship = Entity.extend({
	init: function(game, x, y) {
		this.width = 32;
		this.height = 42;
		this._super(game, x, y);
		this.game = game;
		this.rotation = new Angle();
		this.sprite = new Sprite(this, "img/ship1.png");
		this.physics = new Physics(this.game, this, new BoundingCircle(this.game, this, 20));
		this.physics.collidesWith = ['Asteroid', 'Planet', 'Ship'];
		this.physics.mass = 10;
		this.physics.maxVelocity = 16;
		this.layer = 100;
		this.trail = new Trail(this.game, this);
		this.turnThrust = 0.4;
		this.mainThrust = 0.20;
		this.engine = {
			fuel: 100,
			useFuel: function() {}
		};
		this.weapon = new Weapon(this);
		this.landed = false;
		this.health = 100;
		var _this = this;
		this.physics.on('post-collide', function(entity) {
			if (entity instanceof Planet) {
				var x = this.pos.x - entity.pos.x;
				var y = this.pos.y - entity.pos.y;
				var angle = new Angle().fromRadians(Math.atan2(y, x));
				var difference = this.rotation.clone().subtractAngle(angle);
				if (this.physics.vel.absoluteGreaterThan(2) || (difference.degrees < 55 || difference.degrees > 125)) {
					if (this.owner) this.owner.requestRespawn();
					this.game.entityFactory.create('Explosion', this.game, this.pos.x, this.pos.y);
					this.destroy();
				} else {
					this.rotation.set(angle.degrees + 90);
					this.physics.rv = 0;
					this.landed = true;
				}
			} else if (entity instanceof BlackHole) {
				this.destroy();
				this.owner.requestRespawn();
			}
		});
		this.lastFireTime = 0;
	},
	update: function(input) {
		this._super();
		//Scale thrust down towards 0 as speed approaches maxvelocity
		this.mainThrust = ((1 - (this.physics.vel.getAbsoluteMaxValue() / this.physics.maxVelocity)) * 0.2);
		this.engine.mainOn = false;
		if (input.up) {
			if (this.engine.useFuel(2) || true) {
				this.engine.mainOn = true;
				var x = Math.cos(this.rotation.clone().subtract(90).toRadians()) * this.mainThrust;
				var y = Math.sin(this.rotation.clone().subtract(90).toRadians()) * this.mainThrust;
				this.physics.addAcceleration(x, y, 0);
			}
		}
		if (input.left) { //Left Arrow
			this.engine.useFuel();
			this.physics.addAcceleration(0, 0, this.turnThrust * -1);
		}
		if (input.right) { //Right Arrow
			this.engine.useFuel();
			this.physics.addAcceleration(0, 0, this.turnThrust);
		}
		if (input.fire) {
			this.weapon.fire();
		}

		if (this.landed) {
			this.engine.addFuel(3);
			this.landed = false;
		}
		this.physics.update();
	},
	render: function(ctx, screen, audio) {
		//this.trail.render(ctx, screen);
		//this.engine.render(ctx, screen, audio);
		this._super(ctx, screen);
		//this.physics.bounds.render(ctx, screen);
	},
	takeDamage: function(damage) {
		this.health -= damage;
		if (this.health <= 0) {
			this.game.entityFactory.create('Explosion', this.game, this.pos.x, this.pos.y);
			this.destroy();
		}
	},
	getOwner: function() {
		if (this.owner) return this.owner;
		else return {};
	},
});

module.exports = Ship;