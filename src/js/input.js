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
		this.keys = [];
		var _this = this;
		//Disable browser scrolling with arrow keys functionality
		document.onkeydown = function(evt) {
			_this.keys[evt.keyCode] = true;
			return evt.keyCode != 38 && evt.keyCode != 40 && evt.keyCode != 32;
		};
		document.onkeyup = function(evt) {
			_this.keys[evt.keyCode] = false;
			//Disable browser scrolling with arrow keys functionality
			return evt.keyCode != 38 && evt.keyCode != 40 && evt.keyCode != 32;
		};
	},
	getInput: function() {
		return {
			up: this.keys[38] || this.keys[87], //W or Up
			left: this.keys[37] || this.keys[65], //A or Left
			right: this.keys[39] || this.keys[68], //D or Right
			down: this.keys[40] || this.keys[83], //S or Down
			fire: this.keys[32], //Spacebar
		}
	},
	on: function(key, func) {
		this.eventManager.addEventListener(key, func);
	}
});
module.exports = InputManager;