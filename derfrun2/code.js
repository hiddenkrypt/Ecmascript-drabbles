"use strict";

var core = new (function(){	
	this.physics = {
		friction: 0.8,
		gravity: 0.098,
		airfriction: .9999
	};
	this.camera = {
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
		
		setInterval(Update, 1000/30);
		renderUpdate();
	}

	function Update(){
		eventUpdate();
		logicUpdate();
		debugUpdate();
	}

	function renderUpdate(){
		ctx.fillStyle = "#ffffff";
		ctx.fillRect( 0, 0, core.camera.WIDTH, core.camera.HEIGHT );
		terrain.forEach( function( piece ){
			piece.draw(ctx);
		});
		player.draw(ctx);
		requestAnimationFrame(renderUpdate);
	}

	function logicUpdate(){
		player.tick();
		terrain.forEach(e=>{
			e.collision(player);
		})
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
		if (keys[39]) {// right arrow
			player.right();
		}          
		if (keys[37]) { // left arrow                  
			player.left();
		}
	}
	function debugUpdate(){
		document.getElementById( "debug1" ).innerHTML = "X: "+Math.floor(player.x()) + "  DX: "+Math.floor(player.dx());
		document.getElementById( "debug2" ).innerHTML = "Y: "+Math.floor(player.getY()) + "  DY: "+Math.floor(player.dy());
		document.getElementById( "debug3" ).innerHTML = "inAir: "+player.inAir();
		document.getElementById( "debug4" ).innerHTML = "collide:  ";
	}

	function TerrainPiece(inX,inY,inW,inH){
		var x = inX,
			y = inY,
			w = inW,
			h = inH;
		this.draw = function(ctx){
			ctx.fillStyle = "#323232";
			ctx.fillRect(x,y,w,h);
		};
		this.collision = function(player){
			var playerTemporalAABB = {
				x: Math.min(player.previousPosition().x, player.position.x),
				y: Math.min(player.previousPosition().y, player.position.y),
				w: Math.Max(player.previousPosition().x, player.position.x)+player.size.width
				h: Math.Max(player.previousPosition().y, player.position.y)+player.size.height
			};
			if(
				
			)
		}
	}

	function loadTerrain(){
		terrain.push( new TerrainPiece(5,5,15,15));
		terrain.push( new TerrainPiece(0, 0, 2, core.camera.HEIGHT) ); //left
		terrain.push( new TerrainPiece(0, 0, core.camera.WIDTH, 2) ); //ceiling
		terrain.push( new TerrainPiece( core.camera.WIDTH-2, 0, 3, core.camera.HEIGHT) );//right
		terrain.push( new TerrainPiece( -1, core.camera.HEIGHT-10, core.camera.WIDTH+1, 10) ); // floor
	};	
})();