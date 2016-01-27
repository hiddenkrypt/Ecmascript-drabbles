var width = 400,
	height = 600,
	friction = .995,
	impactEntropy = .99,
	ballSize = 15,
	ctx = {},
	c = {},
	balls=[];
	walls = [];
		
function buildWalls(){
	walls.push( { position:{x: 0, y: 0},size:{width:0,height:height} } )
	walls.push( { position:{x: 0, y: 0},size:{width:width,height:0} } )
	walls.push( { position:{x: 0, y: height},size:{width:width,height:0} } )
	walls.push( { position:{x: 0, y: height},size:{width:0,height:height} } )
}
function newBall(positionX,positionY){
	return newBallWithVector(positionX,positionY,0,0);
}
function newBall(initialPosition, initialVelocity){
	var position = initialPosition;
	var velocity = initialVelocity || {dx: 0, dy:0}
	return {
		position : position,
		velocity : velocity,
		tick: function(){
			position.x += velocity.dx;
			position.y += velocity.dy;
			velocity.dy *= friction;
			velocity.dx *= friction;
			if(position.x < 0){
				position.x = 0;
				velocity.dx = - velocity.dx;
			}	
			if(position.y < 0 ){
				position.y = 0;
				velocity.dy *= -1;
			}
			if(position.y > height-(ballSize)){
				position.y = height - ballSize;
				velocity.dy *= -1;
			}
			if(position.x > width-(ballSize)){
				position.x = width - ballSize;
				velocity.dx *= -1;
			}
			balls.forEach( b => {
				var dx = this.position.x- b.position.x;
				var dy = this.position.y - b.position.y;
				var distance = Math.sqrt((dx*dx) + (dy*dy));
				if( this != b && distance < (ballSize*2) ){
					console.log("boop: " + distance + "   i:"+i+"  j:"+j);
					var diffX = balls[j].dx-balls[i].dx;
					var diffY = balls[j].dy-balls[i].dy;
					balls[j].dx -= diffX/2;
					balls[i].dx += diffX/2;
					balls[j].dy -= diffX/2;
					balls[i].dy += diffX/2;
				}
			});
		}
	}
}

function init(){
	document.getElementById("c").width = width;
	document.getElementById("c").height = height;
	ctx = document.getElementById("c").getContext("2d");
	balls.push( newBall( {x:50,y:50} ) );
	balls.push( newBall( {x:55+ballSize*2,y:50} ) );
	balls.push( newBall( {x:60+ballSize*4,y:50} ) );
	balls.push( newBall( {x:100,y:200}, {dx:10,dy:7} ) );
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
		ctx.arc(ball.position.x, ball.position.y, ballSize, 0, 2*Math.PI, false);
		ctx.fillStyle = "#fafaff";
		ctx.fill();
	});
	requestAnimationFrame(renderUpdate);
}

function logicUpdate(){
	debugUpdate();
	balls.forEach( b => b.tick() );
}

function debugUpdate(){
	//document.getElementById("debug1").text("balls: "+balls.length);
}