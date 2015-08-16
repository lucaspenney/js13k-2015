var EventManager = require('./eventmanager');
var Stars = require('./stars');
var Sprite = require('./sprite');

function Screen(client) {
    this.client = client;
    this.xOffset = 0;
    this.yOffset = 0;
    this.targetXOffset = 0;
    this.targetYOffset = 0;
    this.width = 800;
    this.height = 600;
    this.focusedEntity = null;
    this.eventManager = new EventManager();
    this.stars = new Stars(this);
}

Screen.prototype.update = function() {

};

Screen.prototype.scroll = function() {
    this.move(0, 0);
};

Screen.prototype.move = function(x, y) {
    this.xOffset += x;
    this.yOffset += y;
};

Screen.prototype.setXOffset = function(x) {
    this.xOffset = x;
};

Screen.prototype.setYOffset = function(y) {
    this.yOffset = y;
};

Screen.prototype.setFocusedEntity = function(ent) {
    this.focusedEntity = ent;
    this.targetXOffset = ent.pos.x - (this.width / 2);
    this.targetXOffset = ent.pos.y - (this.height / 2);
    this.eventManager.dispatch('focus');
    this.xOffset = this.targetXOffset;
    this.yOffset = this.targetYOffset;
}

Screen.prototype.render = function(ctx, screen) {
    var lookAheadFactor = 6;
    if (this.focusedEntity) {
        this.targetXOffset = this.focusedEntity.pos.x + this.focusedEntity.physics.vel.clone().scale(lookAheadFactor).x - (this.width / 2);
        this.targetYOffset = this.focusedEntity.pos.y + this.focusedEntity.physics.vel.clone().scale(lookAheadFactor).y - (this.height / 2);
        this.targetXOffset = this.focusedEntity.pos.x - (this.width / 2);
        this.targetyOffset = this.focusedEntity.pos.y - (this.height / 2);
        //this.xOffset += (this.targetXOffset - this.xOffset) * 0.25;
        //this.yOffset += (this.targetYOffset - this.yOffset) * 0.25;
    }

    this.xOffset = this.targetXOffset;
    this.yOffset = this.targetYOffset;
    this.stars.render(ctx, screen);
}

module.exports = Screen;