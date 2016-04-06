
var pong = new (function(){
	var //game globals
		gameWidth = 300,
		ctx = {},
		gameHeight = 300,
		balls = [],
		keys = {
			x: false,
			z: false,
			l: false,
			r: false
		},
		topPaddle = {},
		bottomPaddle = {};


	this.init = function init(){
		var canvas = document.getElementById("c");
		ctx = canvas.getContext("2d");
		canvas.height = gameHeight;
		canvas.width = gameWidth;
		document.body.addEventListener("keydown", readInputDown);
		document.body.addEventListener("keyup", readInputUp);
		topPaddle = new Paddle( {x:gameWidth/2, y:1} );
		bottomPaddle = new Paddle( {x:gameWidth/2, y:gameHeight-10} );
		drawFrame();
		setInterval(logicUpdate,10);
		setInterval(function addBall(){
			balls.push( new Ball(gameWidth, gameHeight, topPaddle, bottomPaddle) );
		}, 200);
	}

	function readInputDown(keyEvent){
		if(keyEvent.keyCode === 90)keys.z = true;
		if(keyEvent.keyCode === 88)keys.x = true;
		if(keyEvent.keyCode === 37)keys.l = true;
		if(keyEvent.keyCode === 39)keys.r = true;
	}
	function readInputUp(keyEvent){
		if(keyEvent.keyCode === 90)keys.z = false;
		if(keyEvent.keyCode === 88)keys.x = false;
		if(keyEvent.keyCode === 37)keys.l = false;
		if(keyEvent.keyCode === 39)keys.r = false;
	}



	function drawFrame(){
		
		ctx.fillStyle="#000010";
		ctx.fillRect( 0, 0, gameWidth, gameHeight );
		balls.forEach( ball => ball.draw( ctx ) );
		topPaddle.draw( ctx );
		bottomPaddle.draw( ctx );
		
		ctx.font="20px Courier";
		ctx.fillStyle = "#a10000";
		ctx.fillText( ""+topPaddle.getScore(), 10, gameHeight / 2 - 30 );
		ctx.fillText( ""+bottomPaddle.getScore(), 10, gameHeight / 2 + 30 );
		
		requestAnimationFrame(drawFrame);
	}



	function logicUpdate(){
		topPaddle.tick( keys.z, keys.x );
		bottomPaddle.tick( keys.l, keys.r );
		balls.forEach((ball, index) => ball.tick(ball, index, balls));
	}
	function drawRect(rect, style){
		if(!style)ctx.fillStyle="#f0f0f0";
		else ctx.fillStyle = style;
		ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
	}
})();

window.onload = pong.init;
