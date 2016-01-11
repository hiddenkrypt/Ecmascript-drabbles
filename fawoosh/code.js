var WIDTH = 300,
	HEIGHT = 200,
	canvas = {},
	ctx = {};
	
var AIRFRICTION = .8,
	bitSize = 2,
	bitCount = 5000,
	spawnRateLimit = 25,
	sourceX = WIDTH/2,
	sourceY = HEIGHT-5,
	impulseX = 15,
	impulseY = 7,
	formX = -.5,
	formY = -1,
	meanDeathAge = 25,
	wind = false,
	windSpeed = 500,
	deathOdds = .89,
	ctx,
	bits=[];

function init(){
	canvas = document.getElementById( 'c' );
	ctx = canvas.getContext( "2d" );
	canvas.style.width = canvas.width = WIDTH;
	canvas.style.height = canvas.height = HEIGHT;
	window.addEventListener( "keydown", handleKeydown );
	// window.addEventListener( "keyup", handleKeyup );
	// canvas.addEventListener( "mousedown", handleMousedown );
	debug1.innerHTML = "press space";
	setInterval( logicUpdate, 1000/30 );
	renderUpdate();
}

function renderUpdate(){
	ctx.fillStyle = "white";
	ctx.fillRect( 0, 0, WIDTH, HEIGHT );
	bits.forEach(function(bit){
		ctx.fillStyle = getColor(bit); 
		ctx.fillRect(bit.x, bit.y, bitSize, bitSize); 
	});
	requestAnimationFrame( renderUpdate );
}

function logicUpdate(){
	
	// debugUpdate();
	for(var i=0; i<bits.length; i++){
		
		bits[i].x += bits[i].dx;
		bits[i].y += bits[i].dy;
		// bits[i].dy+= GRAVITY;
		bits[i].dx *= AIRFRICTION;
		bits[i].age++; 
		if( wind ){
			bits[i].x += windSpeed/(bits[i].y+50);
		}
		if( bits[i].age > meanDeathAge ){
			bits[i].dy = Math.min(bits[i].dy, -3);
			if( Math.random() > deathOdds ){
				bits[i].age = meanDeathAge*3; 
			}
		}
		if(bits[i].x < 0 || bits[i].x > WIDTH || bits[i].age > meanDeathAge*2){
			bits.splice(i, 1); 
		}
	}
	for( var i = 0; i < spawnRateLimit && bits.length < bitCount; i++ ){
		bits.push( getNewBit() );
	}
}

// function handleKeyup( event ){}
function handleKeydown( event ){
	if ( event.keyCode == key.SPACE ){
		wind = !wind;
	}
}
// function handleMousedown( event ){}

// function debugUpdate(){
	// debug1.innerHTML = "";
	// debug2.innerHTML = "";
	// debug3.innerHTML = "";
	// debug4.innerHTML = "";
// }

function getNewBit(){
	return {
		x: sourceX,
		y: sourceY,
		dx: (Math.random()+formX)*impulseX,
		dy: (Math.random()+formY)*impulseY,
		age: Math.floor(Math.random()*meanDeathAge/4)
	}
}
function getColor(bit){
	if(bit.age < meanDeathAge / 8)return Colors.newborn;
	if(bit.age > meanDeathAge / 8 && bit.age < meanDeathAge / 4)return Colors.kid;
	if(bit.age > meanDeathAge / 4 && bit.age < meanDeathAge / 3)return Colors.teen;
	if(bit.age > meanDeathAge / 3 && bit.age < meanDeathAge / 1.75)return Colors.adult;
	if(bit.age > meanDeathAge / 1.75 && bit.age < meanDeathAge / 1.1)return Colors.old;
	if(bit.age > meanDeathAge / 1.1 && bit.age < meanDeathAge)return Colors.elder;
	return Colors.dead;
}
var Colors = {
	newborn:"rgba(239, 171, 34, 1)", 
	kid:	"rgba(239, 120, 20, .8)", 
	teen:	"rgba(239, 0,0,.7)", 
	adult:	"rgba(200,0,0,.5)", 
	old:	"#550000", 
	elder:	"#110000", 
	dead:	"#929292" 
}
Object.freeze(Colors); 