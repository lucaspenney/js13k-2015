var Class = require('./class');
var Vector = require('./vector');

var BoundingCircle = Class.extend({
	init: function(game, entity, radius) {
		this.type = 'circle';
		this.game = game;
		this.entity = entity;
		this.pos = new Vector(entity.pos.x, entity.y);
		this.radius = radius;
		this.xOffset = 0;
		this.yOffset = 0;
		this.update();
	},
	update: function() {
		this.pos.x = this.entity.pos.x + this.xOffset;
		this.pos.y = this.entity.pos.y + this.yOffset;
	},
	setOffset: function(x, y) {
		this.xOffset = x;
		this.yOffset = y;
	},
	setRadius: function(r) {
		this.radius = r;
	},
	wouldCollide: function(vector, e) {
		var wouldCollide = false;
		this.pos.add(vector);
		wouldCollide = this.isColliding(e);
		this.pos.subtract(vector);
		return wouldCollide;
	},
	isColliding: function(e) {
		if (!e.physics) return false;
		if (this.entity === e) return false;
		e = e.physics.bounds;

		var dist = this.pos.distance(e.pos);
		if (dist < this.radius + e.radius) {
			return true;
		}
		return false;
	},
	isPointIn: function(x, y) {
		var v = new Vector(x, y);
		if (this.pos.distance(v) <= this.radius) {
			return true;
		}
		return false;
	},
	render: function(ctx, screen) {
		//Debugging purposes
		ctx.strokeStyle = "#0F0";
		ctx.beginPath();
		ctx.arc(this.pos.x - screen.xOffset, this.pos.y - screen.yOffset, this.radius, 0, 2 * Math.PI, false);
		ctx.lineWidth = 5;
		ctx.stroke();
	},
});
module.exports = BoundingCircle;