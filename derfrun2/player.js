//player.js
"use strict";

var player = new (function(startX, startY){
	var position = { x: startX, y: startY },
		size = { width: 5, height: 10 },
		velocity = { 
			dx: 0, 
			dy: 0
		},
		speed = {	
			ddx:1,
			max: {
				dx:5,
				dy:5
			}
		};
	var previousPositions = [];
	
	var state = {
		inAir: true,
		grindLeft: false,
		grindRight: false
	};

	this.draw = function draw( ctx ){
		ctx.fillStyle = '#FF0000';
		ctx.fillRect(position.x, position.y, size.width, size.height);
		previousPositions.forEach( (p, i) => {
			ctx.fillStyle = "rgba(255,0,0," + i/previousPositions.length + ")";
			ctx.fillRect(position.x, position.y, size.width, size.height);
		});
	};
	this.getTemporalAABB = function getTemporalAABB(){
		return{
			x: Math.min(previousPositions[0].x, position.x),
			y: Math.min(previousPositions[0].y, position.y),
			w: Math.abs(previousPositions[0].x-position.x)+size.width,
			h: Math.abs(previousPositions[0].y-position.y)+size.height
		}
	};
	this.tick = function tick(){
		previousPositions.unshift(position);
		if(previousPositions.length>5){previousPositions.pop();}
		position = {
			x: position.x + velocity.dx,
			y: position.y + velocity.dy
		};
		if(state.inAir){
			velocity.dx *= core.physics.airfriction;
			velocity.dy *= core.physics.airfriction;
		}
		else{
			velocity.dx *= core.physics.friction;
		}
		velocity.dy += core.physics.gravity;
	};
	this.jump = function jump(){
		if(!state.inAir){
			state.inAir = true;
			velocity.dy = -speed.max.dy*2;
		}				
	};
	this.right = function right(){          
		console.log("right");
		if (velocity.dx+speed.ddx < speed.max.dx){
			velocity.dx += speed.ddx;
		}
	};
	this.left = function left(){             
		console.log("left");
		if (velocity.dx-speed.ddx > -speed.max.dx){
			velocity.dx -= speed.ddx;
		}
	};
	this.getStats = function getStats(){
		return {
			x : position.x,
			y : position.y,
			dx : velocity.dx,
			dy : velocity.dy,
			state : state
		};
	};
	this.collide = function collide(box){
		if(position.y+size.height >= box.y && previousPositions[0].y+size.height <= box.y){
			velocity.dy = 0; 
			position.y = box.y - size.height;
			state.inAir = false;
		}
	};
})(core.camera.WIDTH/2, core.camera.HEIGHT/2);