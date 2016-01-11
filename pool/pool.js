var width = 400,
	height = 600,
	friction = .995,
	impactEntropy = .99,
	ballSize = 15,
	ctx,
	balls=[];
		
function newBall(positionX,positionY){
	return {
		x: positionX,
		y: positionY,
		dx: 0,
		dy: 0
	}
}
function newBallWithVector(positionX,positionY,deltaX, deltaY){
	return {
		x: positionX,
		y: positionY,
		dx: deltaX,
		dy: deltaY
	}
}

function init(){
	document.getElementById("c").width = width;
	document.getElementById("c").height = height;
	ctx = document.getElementById("c").getContext("2d");
	balls.push(newBall(50,50));
	balls.push(newBall(55+ballSize*2,50));
	balls.push(newBall(60+ballSize*4,50));
	balls.push(newBallWithVector(100,200, 10,7));
	setInterval(logicUpdate, 16);
	logicUpdate();
	renderUpdate();
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
	ctx.fillStyle = "#008141";
	ctx.fillRect(0,0, width, height);
	balls.forEach(function(ball){
		ctx.beginPath();
		ctx.arc(ball.x, ball.y, ballSize, 0, 2*Math.PI, false);
		ctx.fillStyle = "#fafaff";
		ctx.fill();
	});
	requestAnimationFrame(renderUpdate);
}

function logicUpdate(){
	debugUpdate();
	for(var i=0; i<balls.length; i++){
		balls[i].x += balls[i].dx;
		balls[i].y += balls[i].dy;
		balls[i].dy *= friction;
		balls[i].dx *= friction;
		
		if(balls[i].y+ballSize >= height){
			balls[i].y = height-ballSize;
			balls[i].dy = -balls[i].dy*impactEntropy;
		}
		if(balls[i].x+ballSize >= width){
			balls[i].x = width-ballSize;
			balls[i].dx = -balls[i].dx*impactEntropy;
		}
		if(balls[i].y-ballSize <= 0){
			balls[i].y = ballSize;
			balls[i].dy = -balls[i].dy*impactEntropy;
		}
		if(balls[i].x-ballSize <= 0){
			balls[i].x = ballSize;
			balls[i].dx = -balls[i].dx*impactEntropy;
		}
		
		
		for(var j=0; j<balls.length; j++){
			
			var distance = Math.sqrt((balls[i].x - balls[j].x)*(balls[i].x - balls[j].x) + (balls[i].y - balls[j].y)*(balls[i].y - balls[j].y));

			if(distance < (ballSize*2) && i!=j){
			console.log("boop: " + distance + "   i:"+i+"  j:"+j);
				//really dumb bounce
			/*	var jdx = balls[j].dx;
				var idx = balls[i].dx;
				var jdy = balls[j].dy;
				var idy = balls[i].dy;
				balls[i].dx = balls[i].dx/2;
				balls[i].dy = balls[i].dy/2;
				balls[j].dx = balls[j].dx/2;
				balls[j].dy = balls[j].dy/2;
				balls[i].dx += jdx/2;
				balls[i].dy += jdy/2;
				balls[j].dx += idx/2;
				balls[j].dy += idy/2;
			*/
				// ever so slightly less dumb bounce
				var diffX = balls[j].dx-balls[i].dx;
				var diffY = balls[j].dy-balls[i].dy;
				balls[j].dx -= diffX/2;
				balls[i].dx += diffX/2;
				balls[j].dy -= diffX/2;
				balls[i].dy += diffX/2;
			}
		}
	}
}

function debugUpdate(){
	//document.getElementById("debug1").text("balls: "+balls.length);
}