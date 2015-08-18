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
        this._super(game, x, y);
        this.game = game;
        this.rotation = new Angle();
        this.physics = new Physics(this.game, this, new BoundingCircle(this.game, this, 10));
        this.particles = new ParticleSystem(this.game, this.x, this.y, {
            r: 70,
            g: 70,
            b: 70,
            a: 1,
            step: function() {
                this.a *= 0.8;
                this.r += 5;
                this.g += 5;
                this.b += 5;
            },
        });
        this.particles.setParent(this);
        this.particles.turnOn();
        this.lifeTime = 0;
    },
    update: function(input) {
        this._super();
        this.lifeTime++;
        if (this.lifeTime > 150) {
            this.particles.turnOff();
            if (this.lifeTime > 300) {
                this.destroy();
            }
        }
    },
    render: function(ctx, screen, audio) {
        console.log(2);
        this.particles.update();
        this.particles.render(ctx, screen);
    },
});

module.exports = Ship;