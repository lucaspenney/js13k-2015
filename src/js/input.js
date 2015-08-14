//input.js
var Class = require('./class');
var EventManager = require('./eventmanager');

var InputManager = Class.extend({
	init: function(game) {
		this.game = game;
		this.eventManager = new EventManager();
		this.mouse = {
			x: 0,
			y: 0,
			down: false,
			lastClick: {
				x: 0,
				y: 0,
			}
		};
		//Disable browser scrolling with arrow keys functionality
		document.onkeydown = function(event) {
			if (document.activeElement.tagName === "INPUT") return; //Don't prevent key presses when typing in an input
			return event.keyCode != 38 && event.keyCode != 40 && event.keyCode != 32;
		};
	},
	on: function(key, func) {
		this.eventManager.addEventListener(key, func);
	}
});
module.exports = InputManager;