var topFloor = [[1,1,1,1,1,1,1,1],
				[1,2,0,0,0,1,2,1],
				[1,0,0,0,1,0,1,1],
				[1,0,0,0,0,1,0,1],
				[1,0,1,0,0,0,0,1],
				[1,0,0,1,0,0,0,1],
				[1,0,0,0,0,0,0,1],
				[1,1,1,1,1,1,1,1]];

var player = {x:1, y:1};
var camera = {
	x: 0, 
	y: 0,
	size: 14,
	sensitivity: 14 / 3
};
var logicRate = 30,
	offsetY = 10,
	spacing = 10,
	bounds = spacing*camera.size,
	mapSize = 128
	;
var maps = [];
maps.push(topFloor);
var currentMap = 0;

function init(){
	document.getElementById("c").width = bounds;
	document.getElementById("c").height = bounds;
	ctx = document.getElementById("c").getContext("2d");
	document.body.addEventListener("keydown", function(e) {
		react(interpretKeypress(e));
		//if(currentMap !== 0)
			updateCamera();
		renderUpdate();
	});	
	
	renderUpdate();
}
function interpretKeypress(keyEvent){
	code = keyEvent.keyCode;
//	console.log("code:"+code);
	if      (code === 38 || code === 104) 	  return "up";
	else if (code === 40 || code === 98) return "down";
	else if (code === 37 || code === 100) return "left";
	else if (code === 39 || code === 102) return "right";
	else if (code === 32 || code === 101) return "rest";
	else if (code === 97) return "downleft";
	else if (code === 99) return "downright";
	else if (code === 103) return "upleft";
	else if (code === 105) return "upright";
	else if (code === 190 && keyEvent.shiftKey) return "descend";
	else if (code === 188 && keyEvent.shiftKey) return "ascend";
	else return 'unknown';
}
function react(action){
	if(action === "up")					move(0,-1);
	else if (action === "down")			move(0,1);
	else if (action === "left")			move(-1,0);
	else if (action === "right")		move(1,0);
	else if (action === "upright")		move(1,-1);
	else if (action === "upleft")		move(-1,-1);
	else if (action === "downleft") 	move(-1,1);
	else if (action === "downright")	move(1,1);
	else if (action === "rest"){
		console.log("Player location: ("+player.x+","+player.y+","+currentMap+")  Currently standing on a :"+maps[currentMap][player.y][player.x]);
	}
	else if (action === "descend") changeFloor(-1);
	else if (action === "ascend") changeFloor(1);
}
function changeFloor(direction, override){
	if (!override){
		if(direction === -1 && maps[currentMap][player.y][player.x] !== 3) return false;
		if(direction === 1 && maps[currentMap][player.y][player.x] !== 2) return false;
	}
	if(maps[currentMap+direction] === undefined) {
		maps[currentMap+direction] = buildMap(currentMap, direction, "cellular caves");
	}
	currentMap += direction;
	camera.x = player.x - camera.size/2;
	camera.y = player.y - camera.size/2;
	
	console.log("welcome to level "+currentMap);
	
}

function move(dx,dy){
	if(!impassible(maps[currentMap][player.y+dy][player.x+dx]) ){
		player.x += dx;
		player.y += dy;
	}
}
function impassible(id){
	if(id === 1) return true;
	return false;
}

function renderUpdate(){
	ctx.fillStyle = "#000023";
	ctx.fillRect(0,0, bounds, bounds);
	ctx.save();
	ctx.translate(0, offsetY);
	ctx.font="12px Courier";
	ctx.fillStyle = "#ffffff";
	
	for(var i=0; i<camera.size; i++){	
		for(var j=0; j<camera.size; j++){
			if(maps[currentMap] === undefined) return;
			else if (maps[currentMap][j+camera.y] === undefined) break; 
			else if (maps[currentMap][j+camera.y][i+camera.x] === undefined) break; 
			else if(player.x==i+camera.x && player.y==j+camera.y){
				ctx.fillText("@", (i)*spacing, (j)*spacing);
			}
			else if(maps[currentMap][j+camera.y][i+camera.x] === 1){
				ctx.fillText("#", (i)*spacing, (j)*spacing);
			}
			else if(maps[currentMap][j+camera.y][i+camera.x] === 0){
				ctx.fillText(".", (i)*spacing, (j)*spacing);
			}
			else if(maps[currentMap][j+camera.y][i+camera.x] === 2){
				ctx.fillText("<", (i)*spacing, (j)*spacing);
			}
			else if(maps[currentMap][j+camera.y][i+camera.x] === 3){
				ctx.fillText(">", (i)*spacing, (j)*spacing);
			}
		}
	}
	ctx.restore();
}

function updateCamera(){
	if(player.x <= camera.x + camera.sensitivity) camera.x = Math.floor(player.x - camera.size/2 + camera.sensitivity - 1);
	else if(player.x >= camera.x + camera.size - camera.sensitivity - 1)camera.x = Math.floor(player.x - camera.size + camera.sensitivity + 1);
	if(player.y <= camera.y + camera.sensitivity)camera.y = Math.floor(player.y - camera.size/2 + camera.sensitivity - 1); 
	else if(player.y >= camera.y + camera.size - camera.sensitivity - 1)camera.y = Math.floor(player.y - camera.size + camera.sensitivity + 1); 
	if(camera.x+camera.size >= mapSize) camera.x = mapSize-camera.size;
	if(camera.y+camera.size >= mapSize) camera.y = mapSize-camera.size;
	if(camera.x < 0) camera.x = 0;
	if(camera.y < 0) camera.y = 0; 
}

function buildMap(callingFloor, direction, style){ 
//if(style !== undefined) style = undefined;
	//no style defaults to randomized, which is shitty but oh well
	var newMap = [];
	var buffer = [];
	if(style === undefined || style==="cellular caves"){
			
		for(var i=0; i<mapSize; i++){	
			var row = [];
			for(var j=0; j<mapSize; j++){
				row.push((j===0 || j===mapSize-1 || i===0 || i===mapSize-1)? 1 : (Math.random() < .45 ? 1 : 0));
			}
			newMap.push(row);
			buffer.push(row);
		}
		if(style==="cellular caves"){
			for(var k =0; k < 5; k++){
				for(var i=1; i<mapSize-1; i++){	
					for(var j=1; j<mapSize-1; j++){
						buffer[i][j] = (neighbors(newMap, i, j) > 4) ?  1 : 0;
					}
				}
				newMap = buffer;
			}
		}
		
		var x = Math.floor(Math.random()*127+2), y = Math.floor(Math.random()*127+2);
		
		while (newMap[x][y] == 1)	x = Math.floor(Math.random()*127+2), y = Math.floor(Math.random()*127+2);
		newMap[x][y] = 2; 
		
		
		while (newMap[x][y] !== 0)	x = Math.floor(Math.random()*127+2), y = Math.floor(Math.random()*127+2);
		player.x = x; player.y = y;
		direction > 0 ? newMap[player.y][player.x] = 3: newMap[player.y][player.x] = 2;
		console.log("way out:"+x+","+y);
	}
	
	return newMap;
	
}

function neighbors(map, x, y){
	var tot = 0;
	if(map[x-1][y-1] === 1) tot++;
	if(map[x-1][y-0] === 1) tot++;
	if(map[x-1][y+1] === 1) tot++;
	if(map[x-0][y-1] === 1) tot++;
	if(map[x-0][y+0] === 1) tot++;
	if(map[x-0][y+1] === 1) tot++;
	if(map[x+1][y-1] === 1) tot++;
	if(map[x+1][y-0] === 1) tot++;
	if(map[x+1][y+1] === 1) tot++;
	return tot;
}
