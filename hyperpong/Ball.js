"use strict";

function Ball( gameWidth, gameHeight, topPaddle, bottomPaddle){
	//Private Variables
	var coords = {
		x: gameWidth/2,
		y: gameHeight/2
	};
	var shape = {
		h: 10, 
		w: 10
	};
	var speed = {
		dx: (Math.random()-.5)*4,
		dy: (Math.random()-.5) < 0 ? (Math.random()*3)+1 : -(Math.random()*3)-1
	};
	
	/*
	 * Public Function draw( CanvasContext )
	 * Draws this ball on the supplied Canvas Context
	 */
	this.draw = function ballDraw( ctx ){
		ctx.fillStyle='#ffffae';
		ctx.fillRect(coords.x, coords.y, shape.w, shape.h);
	}
	
	/* 
	 * Public Function tick()
	 * updates the ball's position and handles any collisions with walls or paddles. 
	 */
	this.tick = function ballTick(ball, index, ballpit){
		coords.y += speed.dy; //update position
		coords.x += speed.dx; //update position
		if(coords.x <= 0 || coords.x >= gameWidth-shape.w){ //wall bounce
			speed.dx = -speed.dx; 
			coords.x += speed.dx;
		}
		if(collisionCheck(topPaddle)){ //top Paddle bounce
			speed.dy = -speed.dy;
			coords.y += speed.dy;
		}
		if(collisionCheck(bottomPaddle)){ //bottom Paddle bounce
			speed.dy = -speed.dy;
			coords.y += speed.dy;
		}
		if(coords.y <= 0-shape.h){ //scoring on top
			bottomPaddle.score();
			ballpit.splice(index, 1);
		}
		if(coords.y >= gameHeight){ //scoring on bottom
			topPaddle.score();
			ballpit.splice(index, 1);
		}
	}
	
	/*
	 * Private function collisionCheck( Paddle )
	 * returns true if any part of this ball overlaps the supplied paddle.
	 */
	function collisionCheck( paddle ){
		var bounds = paddle.getBounds();		
		var footBelowBallTop 	= coords.y 			< bounds.coords.y + bounds.shape.h;
		var headAboveBallBottom	= coords.y + shape.h > bounds.coords.y ;
		var rightPastBallLeft 	= coords.x 			< bounds.coords.x + bounds.shape.w;
		var leftBeforeBallRight	= coords.x + shape.w > bounds.coords.x;
		return footBelowBallTop && headAboveBallBottom && rightPastBallLeft && leftBeforeBallRight;
	}
}
