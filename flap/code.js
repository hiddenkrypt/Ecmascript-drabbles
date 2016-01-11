//2015-05-19
//16 minutes
//flap

var WIDTH = 300,
	HEIGHT = 200,
	canvas = {},
	ctx = {};
	
var GRAVITY = .98;
var SPEED = 8;
var wall = {};
var playing = true;

var player = {
	x: WIDTH/2,
	y: HEIGHT/2,
	w: 10,
	h: 20,
	dx: 0,
	dy: 0
}

function init(){
	canvas = document.getElementById( 'c' );
	canvas.style.width = canvas.width = WIDTH;
	canvas.style.height = canvas.height = HEIGHT;
	ctx = canvas.getContext( "2d" );
	window.addEventListener( "keydown", handleKeydown );
	window.addEventListener( "keyup", handleKeyup );
	canvas.addEventListener( "mousedown", handleMousedown );
	generateWall();
	setInterval( logicUpdate, 1000/20 );
	renderUpdate();
}

function renderUpdate(){
	if( !playing ){ return; }
	debugUpdate();
	ctx.fillStyle = "white";
	ctx.fillRect( 0, 0, WIDTH, HEIGHT );
	
	ctx.fillStyle = "#000";
	ctx.fillRect( player.x, player.y, player.w, player.h );
	ctx.fillRect( wall.x, wall.y, wall.w, wall.h );
	requestAnimationFrame( renderUpdate );
}

function logicUpdate(){	
	if( !playing ){ return; }
	//player.x += player.dx;
	player.y += player.dy;
	player.dy += GRAVITY;
	if( player.y >= HEIGHT-20 ){
		// player.y = HEIGHT-20;
		// player.dy = 0;
		gameover();
	}
	if( player.y <= 0 ){
		gameover();
	}
	if( wall.overlap( player ) ){
		gameover();
	}
	wall.x -= SPEED;
	if( wall.x + wall.w + 10 < 0 ){
		generateWall();
	}
}

function handleKeyup( event ){
	
}
function handleKeydown( event ){
	switch( event.keyCode ){
		case key.SPACE:
			player.dy = -10;
			break;
	}
}
function handleMousedown( event ){}

function debugUpdate(){
	debug1.innerHTML = "player position: "+player.x+","+player.y;
	debug2.innerHTML = "";
	debug3.innerHTML = "";
	debug4.innerHTML = "";
}

function generateWall(){
	wall = {
		x: WIDTH
		,y: Math.floor( Math.random() * HEIGHT )
		,h: HEIGHT/1.5
		,w: 5
		,overlap: function( player ){
			if( 
				player.x+player.w > wall.x 
				&& player.x < wall.x+wall.w 
				&& player.y+player.h > wall.y
				&& player.y < wall.y+wall.h
			){
				return true;
			}
			return false;
		}
	}
}
function gameover(){
	playing = false;
	ctx.font="10px Courier";
	ctx.fillStyle = "#000";
	ctx.fillText("gameover", HEIGHT/2-5, WIDTH/2-20);
	
}