var Entity = require('./entity');
var Physics = require('./physics');
var Sprite = require('./sprite');
var BoundingCircle = require('./boundingcircle');

var Planet = Entity.extend({
    init: function(game, x, y) {
        this._super(game, x, y);
        this.radius = (Math.floor(Math.random() * 300)) + 300;
        this.physics = new Physics(game, this, new BoundingCircle(this.game, this, this.radius));
        this.physics.static = true;
        this.physics.collidesWith = function() {
            return true;
        };
        this.physics.mass = this.radius * 18;

        this.colors = [];

        function getRandomColor() {
            var letters = '0123456789ABCDEF'.split('');
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
        var colors = Math.floor(Math.random() * 10);
        for (var i = 0; i < colors; i++) {
            this.colors.push(getRandomColor());
        }
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

        var gradient = ctx.createRadialGradient(x, y, innerRadius, x, y, outerRadius);

        for (var i = 1; i <= this.colors.length; i++) {
            gradient.addColorStop(i / this.colors.length, this.colors[i - 1]);
        }

        ctx.arc(x, y, this.radius, 0, 2 * Math.PI);

        ctx.fillStyle = gradient;
        ctx.fill();
        this.physics.bounds.render(ctx, screen);
    },
});

module.exports = Planet;