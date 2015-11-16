"use strict";
var code = (function newDrabbleCode() {
	var c = {
		settings : {},
		init : function () {},
		start : function () {},
	};

	c.settings = {
		debugLevel : drabble.settings.debugLevels.MAX,
		canvas : {
			MODE : drabble.settings.canvasModes.BOX,
			WIDTH : 600,
			HEIGHT : 400
		}
	};
	c.init = function () {
		drabble.loader.begin();
		var myID1 = drabble.loader.registerItem();
		setTimeout(function () {
			drabble.loader.clearItem(myID1);
		}, 10);
		engine.init();
	};
	c.start = function () {
		engine.postInit();
		engine.test();
		engine.start();
	};
	return c;
})();

var engine = engine || (function () {
		var settings = {
			MAP_WIDTH : 4098,
			MAP_HEIGHT : 4098
		};
		var bits = [];
		var keyStates = [];
		var player = {};
		var camera = {
			x: 0,
			y: 0,
			w: code.settings.canvas.width,
			h: code.settings.canvas.height,
			bounds: .2
		}
		var e = {
			init : function () {

				window.addEventListener("keydown", function (e) {
					keyStates[e.keyCode] = true;
				});
				window.addEventListener("keyup", function (e) {
					keyStates[e.keyCode] = false;
				});
				makePlayer();
				for (var i = 0; i < 299; i++) {
					addBit();
				}
			},
			postInit : function () {},
			test : function () {},
			start : function () {
				render();
			}
		};

		function render() {
			var ctx = drabble.ctx;
			ctx.fillStyle = "#f0f0ff";
			ctx.fillRect(0, 0, code.settings.canvas.WIDTH, code.settings.canvas.HEIGHT);
			bits.forEach(function (bit) {
				if (bit.size === 0) {
					//bits.remove(bit);
				}
				bit.tick();
				bit.draw(ctx);
			});
			player.tock();
			player.draw(ctx);
			requestAnimationFrame(render);
		}
		function makePlayer() {
			player = new Bit();
			player.size = 10;
			player.x = code.settings.canvas.WIDTH / 2;
			player.y = code.settings.canvas.HEIGHT / 2;
			player.dx = 0;
			player.dy = 0;
			player.MAX = 2;
			player.tock = function(){
				if (keyStates[drabble.key.UP]) {
					player.dy = -player.MAX;
				}
				if (keyStates[drabble.key.DOWN]) {
					player.dy = player.MAX;
				}
				if (keyStates[drabble.key.LEFT]) {
					player.dx = -player.MAX;
				}
				if (keyStates[drabble.key.RIGHT]) {
					player.dx = player.MAX;
				}
				player.dx -= player.dx * 0.05;
				player.dy -= player.dy * 0.05;
				player.dx = Math.abs(player.dx) < .01 ? 0: player.dx; 
				player.dy = Math.abs(player.dy) < .01 ? 0: player.dy; 
				player.tick();
			}
			player.draw = function( ctx ){
				ctx.fillStyle = "#ff5310";
				ctx.strokeStyle = "#ffff00";
				ctx.fillRect(player.x, player.y, player.size, player.size);
				ctx.strokeRect(player.x, player.y, player.size, player.size);			
			}
			
		}
		function addBit() {
			bits.push(new Bit());
		}
		function Bit() {
			return {
				size : (Math.random() * 3) + 6,
				x : Math.random() * settings.MAP_WIDTH,
				y : Math.random() * settings.MAP_HEIGHT,
				dx : Math.random() * 4 - 2,
				dy : Math.random() * 4 - 2,
				tick : function () {
					var me = this;
					me.x += me.dx;
					me.y += me.dy;
					if (me.x < 0 || me.x > settings.MAP_WIDTH) {
						me.x -= me.dx;
						me.dx = -me.dx;
					}
					if (me.y < 0 || me.y > settings.MAP_HEIGHT) {
						me.y -= me.dy;
						me.dy = -me.dy;
					}
					bits.forEach(function (bit) {
						if (collision(me, bit)) {
							eat(me, bit);
						}
					});
				},
				draw: function( ctx ){				
					ctx.fillStyle = "#696969";
					ctx.strokeStyle = "#000000";				
					ctx.fillRect(this.x, this.y, this.size, this.size);
					ctx.strokeRect(this.x, this.y, this.size, this.size);
				}
			};
		}
		function collision(bitA, bitB) {
			return (
				Math.sqrt(
					(bitA.x - bitB.x) * (bitA.x - bitB.x)
					 + (bitA.y - bitB.y) * (bitA.y - bitB.y)) <= bitA.size + bitB.size);
		}
		function eat(bitA, bitB) {
			if (collision(bitA, bitB)) {
				if (bitA.size == bitB.size) {}
				else if (bitA.size > bitB.size) {
					bitA.size += Math.ceil(bitB.size / 2);
					bitA.dx = bitA.dx * .9;
					bitA.dy = bitA.dy * .9;
					bitB.size = 0;
				} else if (bitA.size < bitB.size) {
					bitB.size += Math.ceil(bitA.size / 2);
					bitB.dx = bitB.dx * .9;
					bitB.dy = bitB.dy * .9;
					bitA.size = 0;
				}
			}
		}

		return e;
	})();
