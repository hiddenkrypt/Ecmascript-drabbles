function buildMap(callingFloor, direction, style){ 
if(style !== undefined) style = undefined;
	//no style defaults to randomized, which is shitty but oh well
	var newMap = [];

	if(style === undefined || style==="cellular caves"){
		for(var i=0; i<mapSize; i++){	
			var row = [];
			for(var j=0; j<mapSize; j++){
				row.push((j===0 || j===mapSize-1 || i===0 || i===mapSize-1)? 1 : (Math.random() < 2 ? 1 : 0));
			}
			newMap.push(row);
		}
		if(style==="cellular caves"){
			var buffer = [];
			for(var k =0; k < 5; k++){
				for(var i=1; i<mapSize-2; i++){	
					for(var j=1; j<mapSize-2; j++){
						(neighbors(newmap, i, j) < 3) ? buffer[i][j] = 0 : 1;
					}
				}
			}
			newMap = buffer;
		}
		direction > 0 ? newMap[player.y][player.x] = 3: newMap[player.y][player.x] = 2;
		
		var x=player.x,y=player.y;
		
		while (newMap[x][y] !== 1)	x = Math.floor(Math.random()*127+2), y = Math.floor(Math.random()*127+2);
		newMap[x][y] = 2; 
		console.log("way out:"+x+","+y);
	}
	
	return newMap;
	
}

neighbors(map, x, y){
	var tot = 0;
	if(newMap[x-1][y-1] === 1) tot++;
	if(newMap[x-1][y-0] === 1) tot++;
	if(newMap[x-1][y+1] === 1) tot++;
	if(newMap[x-0][y-1] === 1) tot++;
	if(newMap[x-0][y+1] === 1) tot++;
	if(newMap[x+1][y-1] === 1) tot++;
	if(newMap[x+1][y-0] === 1) tot++;
	if(newMap[x+1][y+1] === 1) tot++;
	return tot;
}