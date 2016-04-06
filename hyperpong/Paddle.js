"use strict";
function Paddle( initialCoords ){
	var PADDLE = {
		SPEED: 4,
		WIDTH: 120,
		HEIGHT: 10
	};
	Object.freeze(PADDLE);
	var coords = initialCoords;
	var shape = {h:PADDLE.HEIGHT, w:PADDLE.WIDTH};
	var score = 0;
	this.draw = function paddleDraw( ctx ){
		ctx.fillStyle = "#a0a0a0";
		ctx.fillRect(coords.x, coords.y, shape.w, shape.h);
	}
	this.score= function paddleScore(){ 
		score++; 
	};
	this.getScore = function(){ 
		return score 
	}; 
	this.getBounds = function(){ 
		return {coords:coords, shape:shape} 
	};
	this.tick = function paddleTick( left, right ){
		if(left){
			coords.x -= PADDLE.SPEED;
		}
		if(right){
			coords.x += PADDLE.SPEED;
		}
	}
}