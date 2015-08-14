var Class = require('./class');
var FPSManager = require('./fpsmanager');
var Screen = require('./screen');
var Stars = require('./stars');
var EventManager = require('./eventmanager');
var InputManager = require('./input');
var Player = require('./player');
var Entity = require('./entity');


var UI = Class.extend({
    init: function(client) {
        this.client = client;
        this.game = this.client.game;
        var _this = this;
        var screen = this.client.screen;


    },
    render: function(ctx, screen) {

    },
});

module.exports = UI;