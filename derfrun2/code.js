"use strict";

var core = new (function(){	
	this.physics = {
		friction: .8,
		gravity: .098,
		airfriction: .9999
	};
	this.camera = {
		x:0,
		y:0,
		WIDTH: 300,
		HEIGHT: 200
	};
	var	canvas = {},
		ctx = {};
	
	var keys = [],
		terrain = [],
		jumpReleased = true;

	var physics = this.physics;
	this.screen = screen;
	this.init = function(){
		canvas = document.getElementById( 'c' );
		ctx = canvas.getContext( "2d" );
		canvas.style.width = canvas.width = core.camera.WIDTH;
		canvas.style.height = canvas.height = core.camera.HEIGHT;
		loadTerrain();
		
		window.addEventListener( "keydown", function( e ){ keys[e.keyCode] = true; } );
		window.addEventListener( "keyup",   function( e ){ keys[e.keyCode] = false; } );
		
		setInterval(Update, 1000/60);
		renderUpdate();
	}
this.u = Update
	function Update(){
		eventUpdate();
		logicUpdate();
		debugUpdate();
	}

	function renderUpdate(){
		ctx.fillStyle = "#ffffff";
		ctx.fillRect( 0, 0, core.camera.WIDTH, core.camera.HEIGHT );
		terrain.forEach( function( piece ){
			piece.draw(ctx, core.camera);
		});
		player.draw(ctx, core.camera);
		requestAnimationFrame(renderUpdate);
	}

	function logicUpdate(){
		player.tick();
		terrain.forEach(e=>{
			collision(player, e);
		})
	}
	function collision(player, box){
		var playerZone = player.getTemporalAABB();
		
		var footBelowBoxTop 	= box.y < playerZone.y + playerZone.h;
		var headAboveBoxBottom	= box.y + box.h > playerZone.y ;
		var leftBeforeBoxRight	= box.x + box.w > playerZone.x;
		var rightPastBoxLeft 	= box.x < playerZone.x + playerZone.w;
		
		if(footBelowBoxTop && headAboveBoxBottom && leftBeforeBoxRight && rightPastBoxLeft){
			player.collide(box); //fine grained collision response	
		}
	}
	function eventUpdate(){
		if (keys[key.UP] || keys[key.SPACE]) { // up arrow, space
			if(jumpReleased){
				player.jump();
				jumpReleased = false;
			}
		} else{
			jumpReleased = true;
		}
		if (keys[key.RIGHT]) {
			player.right();
		}          
		if (keys[key.LEFT]) {                 
			player.left();
		}
	}
	function debugUpdate(){
		document.getElementById( "debug1" ).innerHTML = "X: "+Math.floor(player.getStats().x) + "  DX: "+Math.floor(player.getStats().dx);
		document.getElementById( "debug2" ).innerHTML = "Y: "+Math.floor(player.getStats().y) + "  DY: "+Math.floor(player.getStats().dy);
		document.getElementById( "debug3" ).innerHTML = "inAir: "+player.getStats().state.inAir;
		document.getElementById( "debug4" ).innerHTML = "collide:  ";
	}

	function TerrainPiece(inX,inY,inW,inH){
		this.x = inX,
		this.y = inY,
		this.w = inW,
		this.h = inH;
		this.draw = function(ctx,camera){
			ctx.fillStyle = "#323232";
			ctx.fillRect(this.x-camera.x,this.y-camera.y,this.w,this.h);
		};
	}
	function loadTerrain(){
		terrain.push( new TerrainPiece(5,5,15,15) );
		terrain.push( new TerrainPiece(0, 0, 2, core.camera.HEIGHT) ); //left
		terrain.push( new TerrainPiece(0, 0, core.camera.WIDTH, 2) ); //ceiling
		terrain.push( new TerrainPiece( core.camera.WIDTH-2, 0, 3, core.camera.HEIGHT) );//right
		terrain.push( new TerrainPiece( -1, core.camera.HEIGHT-10, core.camera.WIDTH+1, 10) ); // floor
		terrain.push( new TerrainPiece( -1, core.camera.HEIGHT-60,30,30) );
		terrain.push( new TerrainPiece( 100, core.camera.HEIGHT-45,20,20) );
		terrain.push( new TerrainPiece( 100, core.camera.HEIGHT-85,20,20) );
		terrain.push( new TerrainPiece( 100, core.camera.HEIGHT-125,20,20) );
		terrain.push( new TerrainPiece( 100, core.camera.HEIGHT-165,20,20) );
	};	
})();