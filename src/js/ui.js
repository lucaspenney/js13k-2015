var Class = require('./class');
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
		this.screen = this.client.screen;
	},
	render: function(ctx, screen) {

	},
});

module.exports = UI;