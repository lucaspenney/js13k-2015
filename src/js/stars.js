var Sprite = require('./sprite');

function Stars(screen) {
    this.screen = screen;
    this.xOffset = 0;
    this.yOffset = 0;
    this.stars = [];
    this.numStars = 400;
    this.stars = [];
    this.layers = [];
    var _this = this;
    _this.init(screen);
}

Stars.prototype.init = function(screen) {
    this.layers = [{
        stars: [],
        amount: 50,
        scale: 0.8,
        size: 0.1,
    }, {
        stars: [],
        amount: 100,
        scale: 0.6,
        size: 0.5,
    }, {
        stars: [],
        amount: 100,
        scale: 0.4,
        size: 1.3,
    }, {
        stars: [],
        amount: 100,
        scale: 0.2,
        size: 1.9,
    }, ];
    for (var l = 0; l < this.layers.length; l++) {
        var layer = this.layers[l];
        for (var i = 0; i < layer.amount; i++) {
            var x = Math.floor((Math.random() * screen.width) + (screen.xOffset * layer.scale));
            var y = Math.floor((Math.random() * screen.height) + (screen.yOffset * layer.scale));
            layer.stars.push({
                x: x,
                y: y,
                size: Math.floor(Math.random() * 3) + layer.size,
                flicker: 0,
                seed: Math.random() + 0.3
            });
        }
    }
}

Stars.prototype.render = function(ctx, screen) {
    if (this.layers.length == 0) {
        this.init(screen);
    }
    for (var l = 0; l < this.layers.length; l++) {
        var layer = this.layers[l];
        for (var i = 0; i < layer.stars.length; i++) {
            var xOffset = screen.xOffset * layer.scale;
            var yOffset = screen.yOffset * layer.scale;
            if (layer.stars[i].x - xOffset < 0) {
                //layer.stars[i].x = screen.width + xOffset + (Math.random() * 100);
                layer.stars[i].x += screen.width;
            } else if (layer.stars[i].x - xOffset > screen.width) {
                //layer.stars[i].x = xOffset - (Math.random() * 100);
                layer.stars[i].x -= screen.width;
            }

            if (layer.stars[i].y - yOffset < 0) {
                //layer.stars[i].y = screen.height + yOffset + (Math.random() * 100);
                layer.stars[i].y += screen.height;
            } else if (layer.stars[i].y - yOffset > screen.height) {
                //layer.stars[i].y = yOffset - (Math.random() * 100);
                layer.stars[i].y -= screen.height;
            }

            ctx.fillStyle = "#FFF";
            //ctx.fillRect(layer.stars[i].x - xOffset, layer.stars[i].y - yOffset, layer.stars[i].size, layer.stars[i].size);
            layer.stars[i].flicker += (Math.random() - 0.5) * 0.5;
            if (Math.abs(layer.stars[i].flicker) > 0.3) layer.stars[i].flicker = 0;
            this.drawStar(ctx, layer.stars[i].x - xOffset, layer.stars[i].y - yOffset, Math.floor(2 + layer.stars[i].size * 2), layer.stars[i].size + Math.random() + layer.stars[i].flicker, layer.stars[i].seed + layer.stars[i].flicker);
        }
    }
};

Stars.prototype.drawStar = function(ctx, cx, cy, spikes, outerRadius, innerRadius) {
    var rot = Math.PI / 2 * 3;
    var x = cx;
    var y = cy;
    var step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius)
    for (i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y)
        rot += step

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y)
        rot += step
    }
    ctx.lineTo(cx, cy - outerRadius)
    ctx.fill();
    ctx.closePath();
};

module.exports = Stars;