
var //game globals
	gameWidth = 300,
	ctx = {},
	gameHeight = 300,
	paddleSpeed = 4,
	paddleWidth = 120,
	balls = [],
	keyX = false,
	keyZ = false,
	keyLeft = false,
	keyRight = false;
	
function addBall(){
	balls.push(
		{ x:gameWidth/2, y:gameHeight/2,  w:10,  h:10, dx:(Math.random()-.5)*4, dy:(Math.random()-.5) < 0 ? (Math.random()*3)+1 : -(Math.random()*3)-1}
	);
}

var topPaddle    = { x:gameWidth/2, y:1, 			 w:paddleWidth,  h:10, score:0};
var bottomPaddle = { x:gameWidth/2, y:gameHeight-10, w:paddleWidth,  h:10, score:0};

function rectangleIntersect(rect1, rect2){
	return !(
		(rect2.x) > (rect1.x+rect1.w) ||
		(rect2.x+rect2.w) < (rect1.x) ||
		(rect2.y) > (rect1.y+rect1.h) ||
		(rect2.y+rect2.h) < (rect1.y)
	);
}


window.onload = init;

function init(){
	
//	for(var i =0; i < 20; i++){addBall();}
	addBall();
	var canvas = document.getElementById("c");
	ctx = canvas.getContext("2d");
	canvas.height = gameHeight;
	canvas.width = gameWidth;
	document.body.addEventListener("keydown", readInputDown);
	document.body.addEventListener("keyup", readInputUp);
	drawFrame();
	setInterval(logicUpdate,10);
	setInterval(addBall, 200);
}

function drawFrame(){
	
	ctx.fillStyle="#000010";
	ctx.fillRect(0, 0, gameWidth, gameHeight);
	balls.forEach(function(ball){
		drawRect(ball);
	});
	drawRect(topPaddle);
	drawRect(bottomPaddle);
	
	ctx.font="20px Courier";
	ctx.fillStyle = "#a10000";
	ctx.fillText(""+topPaddle.score, 10, gameHeight/2 - 30);
	ctx.fillText(""+bottomPaddle.score, 10, gameHeight/2 + 30);
	
	requestAnimationFrame(drawFrame);
}
function logicUpdate(){
	if(keyZ) topPaddle.x -= paddleSpeed;
	if(keyX) topPaddle.x += paddleSpeed;
	if(keyLeft) bottomPaddle.x -= paddleSpeed;
	if(keyRight) bottomPaddle.x += paddleSpeed;
	
	
	
	balls.forEach(function(ball, index, ballpit){
		ball.y += ball.dy;
		ball.x += ball.dx;
		if(ball.x <= 0 || ball.x >= gameWidth-ball.w){ 
			ball.dx = -ball.dx; 
			ball.x += ball.dx;
		}
		if(rectangleIntersect(ball, topPaddle)){
			ball.dy = Math.abs(ball.dy);
			ball.y+=ball.dy;
		}
		if(rectangleIntersect(ball, bottomPaddle)){
			ball.dy = -Math.abs(ball.dy);
			ball.y+=ball.dy;
		}
		if(ball.y <= 0-ball.h){
			bottomPaddle.score++;
			ballpit.splice(index, 1);
		}
		if(ball.y >= gameHeight){
			topPaddle.score++;
			ballpit.splice(index, 1);
		}
	});
	

}
function drawRect(rect, style){
	if(!style)ctx.fillStyle="#f0f0f0";
	else ctx.fillStyle = style;
	ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
}
function readInputDown(keyEvent){
	if(keyEvent.keyCode === 90)keyZ = true;
	if(keyEvent.keyCode === 88)keyX = true;
	if(keyEvent.keyCode === 37)keyLeft = true;
	if(keyEvent.keyCode === 39)keyRight = true;
}
function readInputUp(keyEvent){
	if(keyEvent.keyCode === 90)keyZ = false;
	if(keyEvent.keyCode === 88)keyX = false;
	if(keyEvent.keyCode === 37)keyLeft = false;
	if(keyEvent.keyCode === 39)keyRight = false;
}