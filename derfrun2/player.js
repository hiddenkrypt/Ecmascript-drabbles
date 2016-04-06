//player.js
"use strict";

function Player(startX, startY, physics){
	var position = { x: startX, y: startY },
		size = { width: 5, height: 10 },
		velocity = { 
			dx: 0, 
			dy: 0
		},
		speed = {	
			ddx:.3,
			max: {
				dx:2.5,
				dy:1.4
			}
		};
	var previousPositions = [];
	
	var state = {
		inAir: true,
		grindLeft: false,
		grindRight: false
	};

	this.draw = function draw( ctx, camera ){
		previousPositions.forEach( (p, i) => {
			ctx.fillStyle = "rgba(0,0,0," + 1/(i+2) + ")";
			ctx.fillRect(p.x-camera.x, p.y-camera.y, size.width, size.height);
		});
		ctx.fillStyle = '#FF0000';
		ctx.fillRect(position.x-camera.x, position.y-camera.y, size.width, size.height);
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
		if(previousPositions.length>20){previousPositions.pop();}
		position = {
			x: position.x + velocity.dx,
			y: position.y + velocity.dy
		};
		if(state.inAir){
			velocity.dx *= physics.airfriction;
			velocity.dy *= physics.airfriction;
		}
		else{
			velocity.dx *= physics.friction;
		}
		velocity.dy += physics.gravity;
	};
	this.jump = function jump(){
		if(!state.inAir){
			state.inAir = true;
			velocity.dy = -speed.max.dy*2;
		}				
	};
	this.right = function right(){    
		if (velocity.dx+speed.ddx < speed.max.dx ){
			velocity.dx += state.inAir? speed.ddx*.7 : speed.ddx;
		}
	};
	this.left = function left(){      
		if (velocity.dx-speed.ddx > -speed.max.dx ){
			velocity.dx -=  state.inAir? speed.ddx*.7 : speed.ddx;
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
	function hitTop(box){ 
		return (previousPositions[0].y+size.height) < box.y 
			&& position.y+size.height >= box.y;
	} 
	function hitLeft(box){ 
		return (previousPositions[0].x+size.width) < box.x 
			&& (position.x+size.width) >= box.x;
	} 
	function hitRight(box){ 
		return previousPositions[0].x >= (box.x+box.w) 
			&& position.x < (box.x+box.w);
	} 
	function hitBottom(box){ 
		return previousPositions[0].y >= (box.y+box.h) 
			&& position.y < (box.y+box.h);
	} 
	this.collide = function collide(box){
		if(hitTop(box)){
			velocity.dy = 0; 
			position.y = box.y - size.height - .001;
			state.inAir = false;
		}
		if(hitRight(box)){
			velocity.dx = 0;
			position.x = box.x + box.w + .001
		}
		if(hitLeft(box)){
			velocity.dx = 0;
			position.x = box.x - size.width - .001;
		}
		if(hitBottom(box)){
			velocity.dy = 0;
			position.y = box.y + box.h + .001
		}
	};
};