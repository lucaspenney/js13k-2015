var Vector = require('./vector');


function Particle(game, x, y, args) {
	this.game = game;
	this.x = x;
	this.y = y;
	this.props = {
		r: 255,
		g: 255,
		b: 255,
		a: 1,
		vel: new Vector(0, 0),
		size: 2,
		step: function(t) {
			//Default step function, called in context of props object
			this.a *= 0.9;
		},
	};
	this.parent = args.parent;
	var opts = args.opts;
	for (var prop in opts) {
		this.props[prop] = opts[prop];
	}
	this.lifeTime = 0;
	this.update();
}

Particle.prototype.render = function(ctx, screen) {
	ctx.fillStyle = "rgba(" + Math.floor(this.props.r) + "," + Math.floor(this.props.g) + "," + Math.floor(this.props.b) + "," + this.props.a + ")";
	ctx.fillRect(this.x - screen.xOffset, this.y - screen.yOffset, this.props.size, this.props.size);
};

Particle.prototype.update = function() {
	this.props.step.call(this.props, this.lifeTime);
	var pos = new Vector(this.x, this.y);
	this.props.vel(pos);
	this.x = pos.x;
	this.y = pos.y;
	if (this.props.r < 0) this.props.r = 0;
	if (this.props.g < 0) this.props.g = 0;
	if (this.props.b < 0) this.props.b = 0;
	this.lifeTime++;
}

module.exports = Particle;