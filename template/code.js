var WIDTH = 300,
	HEIGHT = 200,
	canvas = {},
	ctx = {};

function init(){
	canvas = document.getElementById( 'c' );
	ctx = canvas.getContext( "2d" );
	canvas.style.width = canvas.width = WIDTH;
	canvas.style.height = canvas.height = HEIGHT;
	window.addEventListener( "keydown", handleKeydown );
	window.addEventListener( "keyup", handleKeyup );
	canvas.addEventListener( "mousedown", handleMousedown );
	debug1 = document.getElementById( "debug1" );
	debug2 = document.getElementById( "debug2" );
	debug3 = document.getElementById( "debug3" );
	debug4 = document.getElementById( "debug4" );
	setInterval( logicUpdate, 1000/20 );
	renderUpdate();
}

function renderUpdate(){
	ctx.fillStyle = "white";
	ctx.fillRect( 0, 0, WIDTH, HEIGHT );
	
	requestAnimationFrame( renderUpdate );
}

function logicUpdate(){}

function handleKeyup( event ){}
function handleKeydown( event ){}
function handleMousedown( event ){}

function debugUpdate(){
	debug1.innerHTML = "";
	debug2.innerHTML = "";
	debug3.innerHTML = "";
	debug4.innerHTML = "";
}