
var gridSize = 10,
	bounds = 200,
	logicRate = 100,
	gridMax = bounds/gridSize,
	foodRate = 1,
	foodChance = 1,
	ctx =  {},
	food = [],
	keys = [],
	plant = true,
	up = {x:0,y:-1,name:"up",opposite:"down"},
	down = {x:0,y:1,name:"down",opposite:"up"},
	left = {x:-1, y:0,name:"left",opposite:"right"},
	right = {x:1, y:0,name:"right",opposite:"left"},
	snake = {},
	keyPressed = null;
	
bounds += gridSize - (bounds%gridSize);

function init(){
	document.getElementById("c").width = bounds;
	document.getElementById("c").height = bounds;
	ctx = document.getElementById("c").getContext("2d");
	document.body.addEventListener("keydown", function(e) {
		if (e.keyCode == 38) keyPressed = up;
		else if (e.keyCode == 40) keyPressed = down;
		else if (e.keyCode == 37) keyPressed = left;
		else if (e.keyCode == 39) keyPressed = right;
//		keys[e.keyCode] = true;
	});
	//document.body.addEventListener("keyup", function(e) {
	//	keys[e.keyCode] = false;
	//});
	start();
	setInterval(logicUpdate, logicRate);
	setInterval(spawnFood, foodRate);
	renderUpdate();
}
function start(){
	snake = {
		direction: left,
		bod: [],
		dBuffer: null
	};
	food = [{
			x: Math.floor(Math.random()*gridMax),
			y: Math.floor(Math.random()*gridMax)
		}];
	plant = true;
	snake.bod.push({x:Math.floor(gridMax/2), y:Math.floor(gridMax/2)});
	snake.bod.push({x:Math.floor(gridMax/2)+1, y:Math.floor(gridMax/2)});
	snake.bod.push({x:Math.floor(gridMax/2)+2, y:Math.floor(gridMax/2)});
	snake.bod.push({x:Math.floor(gridMax/2)+3, y:Math.floor(gridMax/2)});
}
(function() {
	var requestAnimationFrame = 
		window.requestAnimationFrame 
		|| window.mozRequestAnimationFrame 
		|| window.webkitRequestAnimationFrame 
		|| window.msRequestAnimationFrame;
	window.requestAnimationFrame = requestAnimationFrame;
})();

function renderUpdate(){
	ctx.fillStyle = "#000023";
	ctx.fillRect(0,0, bounds, bounds);
	ctx.fillStyle = "#008141";
	snake.bod.forEach(function(seg){
		ctx.fillRect(seg.x*gridSize, seg.y*gridSize, gridSize, gridSize);
	});
	ctx.fillStyle = "#a10000";
	food.forEach(function(bit){
		ctx.fillRect((bit.x*gridSize)+gridSize/4, (bit.y*gridSize)+gridSize/4, gridSize/2, gridSize/2);
	});
	requestAnimationFrame(renderUpdate);
}
function spawnFood(){
	if(plant && Math.random() < foodChance && food.length < gridMax*gridMax){
		if(food.length >= gridMax*gridMax *.9){ plant = false; }
		food.push({
			x: Math.floor(Math.random()*gridMax),
			y: Math.floor(Math.random()*gridMax)
		});
	}
}
function logicUpdate(){
	//eventUpdate();
	if( food.length <= 0 ){
		start();
	}
	if(keyPressed){
		if(keyPressed.name != snake.direction.opposite){
			snake.direction = keyPressed;
		}
		keyPressed = null;
	}
	debugUpdate();
	snake.bod.unshift(vectorAdd(snake.bod[0], snake.direction));
	snake.bod.forEach(function(seg){
		if(snake.bod[0].x > gridMax
		|| snake.bod[0].x < 0
		|| snake.bod[0].y > gridMax
		|| snake.bod[0].y < 0
		||(
			seg != snake.bod[0] 
			&& snake.bod[0].x == seg.x 
			&& snake.bod[0].y == seg.y)
		){start();}
	});
	var hungry = true;
	for(var i=0; i<food.length; i++){
		if(snake.bod[0].x == food[i].x && snake.bod[0].y == food[i].y){
			hungry = false;
			food.splice(i, 1);
		}
	}
	if(hungry)snake.bod.pop();
}
function vectorAdd(vector1, vector2){
	return {
		x: vector1.x + vector2.x,
		y: vector1.y + vector2.y
	};
}
function debugUpdate(){
	//document.getElementById("debug1").text("balls: "+balls.length);
}

function eventUpdate(){
	if (keys[38]) { // up arrow
		if(snake.direction != down){
			snake.dBuffer = up;
		}
	}	
	if (keys[40]) { // down arrow
		if(snake.direction != up){
			snake.dBuffer = down;
		}
	}
	if (keys[39]) {// right arrow
		if(snake.direction != left){
			snake.dBuffer = right;
		}    
	}      
	if (keys[37]) { // left arrow                  
		if(snake.direction != right){
			snake.dBuffer = left;
		}
	}
}