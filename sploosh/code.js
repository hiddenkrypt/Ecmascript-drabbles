var WIDTH = 300,
	HEIGHT = 200,
	canvas = {},
	ctx = {};

var GRAVITY = .98
	BOUNCE = .6,
	AIRFRICTION = .99,
	bitSize = 3,
	bitCount = 200,
	spawnRateLimit = 2,
	bounceLimit = 4,
	sourceX = 2,
	sourceY = 50,
	impulseX = 10,
	impulseY = 10,
	formX = -1.5,
	formY = -.5,
	ctx,
	bits=[];

	

	
function init(){
	canvas = document.getElementById( 'c' );
	ctx = canvas.getContext( "2d" );
	canvas.style.width = canvas.width = WIDTH;
	canvas.style.height = canvas.height = HEIGHT;
	// window.addEventListener( "keydown", handleKeydown );
	// window.addEventListener( "keyup", handleKeyup );
	// canvas.addEventListener( "mousedown", handleMousedown );
	setInterval( logicUpdate, 1000/30 );
	renderUpdate();
}

function renderUpdate(){
	ctx.fillStyle = "black";
	ctx.fillRect( 0, 0, WIDTH, HEIGHT );
	bits.forEach(function(bit){
		if( bit.bounced === 1){
			ctx.fillStyle = "#3333ff";
		} else if( bit.bounced > 1){
			ctx.fillStyle = "#0000ff";
		} else{
			ctx.fillStyle = "#aabbff";
		}
		ctx.fillRect(bit.x, bit.y, bitSize, bitSize);
	});
	requestAnimationFrame( renderUpdate );
}

function getNewBit(){
	return {
		x: sourceX,
		y: sourceY,
		dx: (Math.random()+formX)*impulseX,
		dy: (Math.random()+formY)*impulseY,
		bounced: 0
	}
}
function logicUpdate(){
	debugUpdate();
	for(var i=0; i<bits.length; i++){
		//motion
		bits[i].x += bits[i].dx;
		bits[i].y += bits[i].dy;
		bits[i].dy+= GRAVITY;
		bits[i].dx *= AIRFRICTION;
		
		if( bits[i].y >= HEIGHT && bits[i].bounced < bounceLimit ){ // floor bounce
			bits[i].y = HEIGHT-5;
			bits[i].dy = -bits[i].dy * BOUNCE;
			bits[i].bounced++;
		}
		if( bits[i].x >= WIDTH - bitSize || bits[i].x <= 0 ){ // wall bounce
			bits[i].dx = -bits[i].dx;
		}
		if( bits[i].y > HEIGHT && bits[i].bounced >= bounceLimit ){ //  bounce limit culling
			bits.splice(i, 1);
			console.log("cull "+bits.length);
		}
	}
	for( var i = 0; i < spawnRateLimit && bits.length < bitCount; i++ ){
		bits.push( getNewBit() );
	}
}

// function handleKeyup( event ){}
// function handleKeydown( event ){}
// function handleMousedown( event ){}

function debugUpdate(){
	debug1.innerHTML = "";
	debug2.innerHTML = "";
	debug3.innerHTML = "";
	debug4.innerHTML = "";
}