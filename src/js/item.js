var Entity = require('./entity');
var Physics = require('./physics');
var Sprite = require('./sprite');
var BoundingCircle = require('./boundingcircle');
var Ship = require('./ship');

var Item = Entity.extend({
    init: function(game, x, y) {
        this._super(game, x, y);
        this.radius = 20;
        this.physics = new Physics(game, this, new BoundingCircle(this.game, this, this.radius));
        this.physics.static = true;
        this.physics.collidesWith = function(e) {
            return false;
        };
        this.physics.mass = 0;
    },
    update: function() {
        this.physics.update();
    },
    render: function(ctx, screen) {
        var x = this.pos.x - screen.xOffset,
            y = this.pos.y - screen.yOffset,
            // Radii of the white glow.
            innerRadius = this.radius / 4,
            // Radius of the entire circle.
            outerRadius = this.radius;

        ctx.arc(x, y, this.radius, 0, 2 * Math.PI);

        ctx.fillStyle = "#F00";;
        ctx.fill();
        this.physics.bounds.render(ctx, screen);
    },
});

module.exports = Item;