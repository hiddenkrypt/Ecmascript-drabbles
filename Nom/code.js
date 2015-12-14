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
		}, 100);
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
			MAP_WIDTH : 600,
			MAP_HEIGHT : 400,
			BIT_NUM : 10
		};
		var bits = [];
		var keyStates = [];
		var player = {};
		var camera = {};
		var e = {
			init : function () {

				window.addEventListener("keydown", function (e) {
					keyStates[e.keyCode] = true;
				});
				window.addEventListener("keyup", function (e) {
					keyStates[e.keyCode] = false;
				});
				makeCamera();
				makePlayer();
				for (var i = 0; i < settings.BIT_NUM; i++) {
					addBit();
				}
				//setInterval(reset, 10000 );
				player.size = 5;
			},
			postInit : function () {},
			test : function () {},
			start : function () {
				render();
			}
		};
		function reset(){
			bits = [];
			player = {};
			makePlayer();
			makeCamera();
			var num = (Math.random()*128)+settings.BIT_NUM;
			for (var i = 0; i < num; i++) {
				addBit();
			}
		}
		function render() {
			var ctx = drabble.ctx;
			ctx.fillStyle = "#f0f0ff";
			ctx.fillRect(0, 0, code.settings.canvas.WIDTH, code.settings.canvas.HEIGHT);
			ctx.fillStyle = "#D1D1FF";
			for(var i = 1;  i < 255; i++){
				ctx.fillRect((settings.MAP_WIDTH*2/i) - camera.x, 0, 1, code.settings.canvas.HEIGHT);
				ctx.fillRect(settings.MAP_WIDTH- (settings.MAP_WIDTH*2/i) - camera.x, 0, 1, code.settings.canvas.HEIGHT);
				ctx.fillRect(0, (settings.MAP_HEIGHT*2/i) - camera.y, code.settings.canvas.WIDTH, 1);
				ctx.fillRect(0,settings.MAP_HEIGHT- (settings.MAP_HEIGHT*2/i) - camera.y, code.settings.canvas.WIDTH, 1);
			}
			ctx.fillStyle = "#B1B1FF";
				ctx.fillRect(settings.MAP_WIDTH - camera.x, 0 - camera.y, 2, settings.MAP_HEIGHT);
				ctx.fillRect(0 - camera.x, 					0 - camera.y, 2, settings.MAP_HEIGHT);
				ctx.fillRect(0 - camera.x, 					0 - camera.y, settings.MAP_WIDTH, 2);
				ctx.fillRect(0 - camera.x, settings.MAP_HEIGHT- camera.y, settings.MAP_WIDTH, 2);
			
			bits.forEach(function (bit) {
				if (bit.size === 0) {
					bits.splice(bits.indexOf(bit),1);
				}
				bit.tick();
				bit.draw(ctx);
			});
			player.tock();
			camera.tick();
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
			player.MAX = 3;
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
					ctx.fillStyle = "#696969";
					ctx.strokeStyle = "#000000";		
				ctx.beginPath();
				ctx.arc(player.x-camera.x, player.y-camera.y, player.size, 0, 2*Math.PI, false);
				ctx.stroke();
				ctx.fill();				
				ctx.fillStyle= "#000000";
				ctx.fillRect(this.x-camera.x, this.y-camera.y, 2, 2);
			}
			
		}
		function makeCamera(){
			camera = {
				zoom:1,
				x: 0,
				y: 0,
				w: code.settings.canvas.WIDTH,
				h: code.settings.canvas.HEIGHT,
				bounds: .2,
				tick: function(){
					
					while( player.x+player.size > this.x+this.w*0.8 ){
						this.x++;
					}
					while( player.x < this.x+this.w*0.2 ){
						this.x--;
					}
					while( player.y+player.size > this.y+this.h*0.8 ){
						this.y++;
					}
					while( player.y < this.y+this.h*0.2 ){
						this.y--;
					}
				}
			};
		}
		function addBit() {
			bits.push(new Bit());
		}
		function Bit() {
			return {
				size : 1,
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
					ctx.beginPath();
					ctx.arc(this.x-camera.x, this.y-camera.y, this.size, 0, 2*Math.PI, false);
					ctx.stroke();
					ctx.fill();
					ctx.fillStyle= "#000000";
					ctx.fillRect(this.x-camera.x, this.y-camera.y, 2, 2);					
				}
			};
		}
		function collision(bitA, bitB) {
			return (
				Math.sqrt(
					(bitA.x - bitB.x) * (bitA.x - bitB.x)
					 + (bitA.y - bitB.y) * (bitA.y - bitB.y)
				) <= (bitA.size + bitB.size)*0.9
			);
		}
		function eat(bitA, bitB) {
			if (collision(bitA, bitB)) {
				if (bitA.size === bitB.size) {
					if( Math.random() < .5 ){
						bitA.size += (bitB.size / Math.PI )/ 10;
						bitA.dx = bitA.dx * 1;
						bitA.dy = bitA.dy * 1;
						bitB.size = 0;
					} else{
						bitB.size += (bitA.size / Math.PI )/ 10;
						bitB.dx = bitB.dx * 1;
						bitB.dy = bitB.dy * 1;
						bitA.size = 0;
					}
				} else if (bitA.size > bitB.size) {
					bitA.size += (bitB.size / Math.PI )/ 10;
					bitA.dx = bitA.dx * 1;
					bitA.dy = bitA.dy * 1;
					bitB.size = 0;
				} else if (bitA.size < bitB.size) {
					bitB.size += (bitA.size / Math.PI )/ 10;
					bitB.dx = bitB.dx * 1;
					bitB.dy = bitB.dy * 1;
					bitA.size = 0;
				}
			}
		}

		return e;
	})();
