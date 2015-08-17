var Class = require('./class');

var Trail = Class.extend({
	init: function(game, parent, maxLength, offset) {
		this.parent = parent;
		this.offset = offset;
		this.positions = [];
		this.maxLength = maxLength || 15;
	},
	render: function(ctx, screen) {
		ctx.strokeStyle = "#666";
		ctx.lineCap = "round";
		ctx.lineWidth = 1;
		//Update positions
		var x = this.offset.x;
		var y = this.offset.y;
		var angle = this.parent.rotation.clone().subtract(90).inverse().toRadians();
		this.x = (x * Math.cos(angle)) - (y * Math.sin(angle));
		this.y = (x * Math.sin(angle)) - (y * Math.cos(angle));
		this.x += this.parent.pos.x;
		this.y += this.parent.pos.y;

		this.positions.push({
			x: this.x,
			y: this.y,
		});
		for (var i = 0; i < this.positions.length - 1; i++) {
			ctx.beginPath();
			ctx.moveTo(this.positions[i].x - screen.xOffset, this.positions[i].y - screen.yOffset);
			ctx.lineTo(this.positions[i + 1].x - screen.xOffset, this.positions[i + 1].y - screen.yOffset);
			ctx.closePath();
			ctx.globalAlpha = i / this.positions.length;
			ctx.stroke();
		}


		if (this.positions.length > this.maxLength) {
			this.positions.shift();
		}
	},
});

module.exports = Trail;