//player.js
"use strict";

var player = (function(startX, startY){
	var position = { x: startX || core.camera.WIDTH/2, y: startY || core.camera.HEIGHT/2 },
		size = { width: 5, height: 10 },
		velocity = { 
			dx: 0, 
			dy: 0
		},
		speed = {	
			ddx:.05,
			max: {
				dx:3,
				dy:5
			}
		};
	var previousPositions = [];
	
	var state = {
		inAir: true,
		grindLeft: false,
		grindRight: false
	};
return {
	draw: function( ctx ){
		ctx.fillStyle = '#FF0000';
		ctx.fillRect(position.x, position.y, size.width, size.height);
		previousPositions.forEach( (p, i) => {
			ctx.fillStyle = "rgba(255,0,0," + i/previousPositions.length + ")";
			ctx.fillRect(position.x, position.y, size.width, size.height);
		});
	}
	,tick: function(){
		console.log(position);
		console.log(velocity);
		previousPositions.push(position);
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
	}
	,jump: function(){
		if(!state.inAir){
			state.inAir = true;
			velocity.dy = -speed.max.dy*2;
		}				
	}
	,right: function(){          
		console.log("right");
		if (velocity.dx+speed.ddx < speed.max.dx){
			velocity.dx += speed.ddx;
		}
	}
	,left: function(){             
		console.log("left");
		if (velocity.dx-speed.ddx > -speed.max.dx){
			velocity.dx -= speed.ddx;
		}
	}
	,x : ()=>position.x
	,getY : function(){return position.y}
	,dx : ()=>velocity.dx
	,dy : ()=>velocity.dy
	,inAir :	()=>state.inAir
}
})();