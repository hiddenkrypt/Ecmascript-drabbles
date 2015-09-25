var WIDTH = 300,
	HEIGHT = 200,
	AIRFRICTION = 0.999,
	GROUNDFRICTION = 0.8,
	GRAVITY = 0.098,
	canvas = {},
	ctx = {};

var lastCollision = "";
	
var jumpReleased = true,
	keys = [],
	terrain = [],
	player = {
		x: WIDTH/2,
		y: HEIGHT/2,
		w: 5,
		h: 10,
		speed: 3,
		dx: 0,
		dy: 0,
		prevX: WIDTH/2,
		prevY: HEIGHT/2,
		inAir: true,
		grindLeft: false,
		grindRight: false,
		collisionCheck: function( block ){
			if( player.x+player.w < block.x || player.x > block.x+block.w ){
				return "none";
			}
			if( player.y+player.h < block.y || player.y > block.y+block.h ){
				return "none";
			}
			
			var distY = block.y - player.prevY + player.h
		}
	};
	
function init(){
	canvas = document.getElementById( 'c' );
	ctx = canvas.getContext( "2d" );
	canvas.style.width = canvas.width = WIDTH;
	canvas.style.height = canvas.height = HEIGHT;
	loadTerrain();
	
	window.addEventListener( "keydown", function( e ){ keys[e.keyCode] = false; } );
	window.addEventListener( "keyup",   function( e ){ keys[e.keyCode] = true; } );
	
	Update();
}

function Update(){
	eventUpdate();
	logicUpdate();
	debugUpdate();
	renderUpdate();
	requestAnimationFrame( Update );
}

function renderUpdate(){
	ctx.fillStyle = "white";
	ctx.fillRect( 0, 0, WIDTH, HEIGHT );
	ctx.fillStyle = "black";
	terrain.forEach( function( block ){
		ctx.fillRect( block.x, block.y, block.w, block.h );
	});
	ctx.fillStyle = "red";
	ctx.fillRect( player.x, player.y, player.w, player.h );
}

function logicUpdate(){
	player.prevX = player.x;
	player.prevY = player.y;
	player.y += player.dy; //move up or down
	player.x += player.dx; // move left or right
	
	
	terrain.forEach( function( block ){
		
		var collision = player.collisionCheck( block );
		if( collision === 'none' ){ 
			return; 
		} else if( collision === 'vertical' ){
			player.y = collision.y;
			player.grindLeft = false;
			player.grindRight = false;
			player.dy=0;
		} else if( collision === 'wall' ){		
			if(keys[key.LEFT]){
				player.grindLeft = true;
				player.inAir = false;
			}
			else if( player.grindLeft ){
				player.grindLeft = false;
				player.inAir = true;
			}
			if(keys[key.RIGHT]){
				player.grindRight = true;
				player.inAir = false;
			}
			else if( player.grindRight ){
				player.grindRight = false;
				player.inAir = true;
			}
			player.x = player.prevX;
			player.dx = 0;
		} 
		if ( collision != 'none' ){ lastCollision = collision;} 
		
	});
	
	//friction and speedlimits
	if(player.inAir){
		player.dx *= AIRFRICTION;
		player.dy *= AIRFRICTION;
	}
	else{
		player.dx *= GROUNDFRICTION;
	}
	player.dy += GRAVITY;
	if((player.grindLeft || player.grindRight) && player.dy > player.speed*.75){
		player.dy = player.speed*.75;
	}
	if(Math.abs(player.dy) > player.speed * 3){
		player.dy = (player.dy / Math.abs(player.dy)) * player.speed*3;
	}
	if(Math.abs(player.dx) > player.speed * 1){
		player.dx = (player.dx / Math.abs(player.dx)) * player.speed *1;
	}
	
}
function eventUpdate(){
	if (keys[key.UP] || keys[key.SPACE]) { // up arrow, space
		if(!player.inAir && jumpReleased){
			jumpReleased = false;
			player.inAir = true;
			if(player.grindLeft){
				player.dy = -player.speed;
				player.dx = player.speed *2;
			}
			else if(player.grindRight){
				player.dy = -player.speed;
				player.dx = -player.speed *2;
			}
			else{
				player.dy = -player.speed*2;
			}
		}		
	}
	else{
		jumpReleased = true;
	}
	if (keys[39]) {// right arrow
		if (player.dx < player.speed) {                         
			player.dx++;                  
		}          
	}          
	if (keys[37]) { // left arrow                  
		if (player.dx > -player.speed) {
			player.dx--;
		}
	}
}
function debugUpdate(){
	document.getElementById( "debug1" ).innerHTML = "X: "+Math.floor(player.x) + "  DX: "+Math.floor(player.dx);
	document.getElementById( "debug2" ).innerHTML = "Y: "+Math.floor(player.y) + "  DY: "+Math.floor(player.dy);
	document.getElementById( "debug3" ).innerHTML = "inAir: "+player.inAir;
	document.getElementById( "debug4" ).innerHTML = "collide:  "+lastCollision;
}



function loadTerrain(){
	terrain.push({ // left
		x:-1, y:-HEIGHT*10,
		w:2, h:HEIGHT*12
	});
	terrain.push({ // ceiling
		x:-HEIGHT*2, y:-1,
		w:WIDTH+1, HEIGHT:
	});
	terrain.push({ //right
		x:WIDTH-1, y:-HEIGHT*10,
		w:2, h:HEIGHT*12
	});
	terrain.push({ // floor
		x:-1, y:HEIGHT-10,
		w:WIDTH+1, h:100
	});
};