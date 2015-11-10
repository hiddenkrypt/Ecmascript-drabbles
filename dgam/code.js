"use strict";
var d = new Dice();
var c = {
	w:500, 
	h:300,
	canvas:{}, 
	x:{}
};
var cellsize= 18;

var map={
	land:[[]],
	width:400,
	height:290
};
var territories = [];
var cells = [
	{id:0, style:"#ffff33"},
	{id:1, style:"#a10000"},
	{id:2, style:"#ff0000"},
	{id:3, style:"#ff8100"},
	{id:4, style:"#ff6f00"},
	{id:5, style:"#ffff00"},
];

function init(){
	buildMap();
	buildTerritories();
	c.canvas = document.getElementById("c");
	c.x = c.canvas.getContext( '2d' );
	c.canvas.width = c.w;
	c.canvas.height = c.h;
	render();
}


function render(){
//	gen();
	c.x.fillStyle = "#ffffff";
	c.x.fillRect( 0, 0, c.w, c.h );
	// for( var i = 0; i < map.length; i++ ){
		// for( var j = 0; j < map[0].length; j++ ){
			// c.x.fillStyle = map[i][j].style;
			// c.x.fillRect( (i*cellsize), (j*cellsize), cellsize, cellsize );
		// }
	// }
	territories.forEach(t => {t.drawBorder(c.x, cellsize);} );
	requestAnimationFrame( render );
}

function buildTerritories(){
	territories.push( new Territory(4,5)); 
	
	for(let i=1; i < 5; i++){
		for(let j=1; j < 4; j++){
			console.log("new terr @ "+Math.floor( i*map.width/6 )+", "+Math.floor( j*map.width/5 ) ); 
			territories.push( new Territory( Math.floor(i*map.width/6), Math.floor(j*map.width/5) ) ); 
		}
	}
	
}



function Territory(startX, startY){
	
	var terr = {
		lands:[],
		drawBorder: function(x, cellSize){
			x.strokeStyle="#000000";
			x.lineWidth=.5;
			x.fillStyle="rgb("+d.roll("1d255")+","d.roll("1d255")+","d.roll("1d255"));
			terr.lands.forEach( e => {
				x.fillRect(e.x,e.y,cellSize,cellSize);
				if( !terr.lands.find( e2 => e2.x == e.x-cellsize && e2.y == e.y+0 ) ){ // left
					x.strokeRect(e.x, e.y, 1, cellSize);
				}
				if( !terr.lands.find( e2 => e2.x == e.x+cellsize && e2.y == e.y+0 ) ){ // right
					x.strokeRect(e.x+cellSize, e.y, 1, cellSize);
				}
				if( !terr.lands.find( e2 => e2.x == e.x+0 && e2.y == e.y-cellsize ) ){ // top
					x.strokeRect(e.x, e.y, cellSize, 1);
				}
				if( !terr.lands.find( e2 => e2.x == e.x+0 && e2.y == e.y+cellsize ) ){ // bottmn
					x.strokeRect(e.x, e.y+cellSize, cellSize, 1);
				}
			});
		}
	}
	
	
	terr.lands.push( {x:startX, y:startY} );
	map.land[startX][startY].owner = terr;
	
	terr.lands.push( { x:startX+1, y:startY+0} );
	map.land[startX+1][startY].owner = terr;
	
	terr.lands.push( { x:startX+0, y:startY+1} );
	map.land[startX][startY+1].owner = terr;
	
	terr.lands.push( { x:startX-1, y:startY+0 } );
	map.land[startX-1][startY].owner = terr;
	
	terr.lands.push( { x:startX+0, y:startY-1 } );
	map.land[startX][startY-1].owner = terr;
	
	return terr;
}

function territoryGeneration( territory ){
	territory.lands.forEach( e => {
		if( freeLand( e.x-1, e.y ) && d.roll("1d2") == 2 ){ // left
			territory.lands.push( {x: e.x-1, y: e.y } );
		}
		if( freeLand( e.x+1, e.y ) && d.roll("1d2") == 2 ){ // right
			territory.lands.push( {x: e.x+1, y: e.y } );
		}
		if( freeLand( e.x, e.y-1 ) && d.roll("1d2") == 2 ){ // top
			territory.lands.push( {x: e.x, y: e.y-1 } );
		}
		if( freeLand( e.x, e.y+1 ) && d.roll("1d2") == 2 ){ // botm
			territory.lands.push( {x: e.x, y: e.y+1 } );
		}
	});
}

function freeLand( x, y ){
	return (map.land[x][y].owner === null);
}


function buildMap(){
	map.land = [];
	for(let i=0; i < map.width; i++){
		let row = [];
		for(let j=0; j < map.height; j++){
			row.push( {owner:null} );
		}
		map.land.push( row );
	}
}
/**
function gen(){
	var  buffer = [];
	for(let i=0; i < map.length; i++){
		let row = [];
		for(let j=0; j < map[0].length; j++){
			row.push(1);
		}
		buffer.push(row);
	}
	for(let i=1; i < buffer.length-1; i++){
		for(let j=1; j < buffer[0].length; j++){
			buffer[i][j] = greatestNeighbor(map, i, j);
		}
	}
	map = buffer;
}


function buildMap(){
	var len = Math.floor(c.w/cellsize);
	var hig = Math.floor(c.h/cellsize);
	var oMap = [];
	for(let i=0; i < len; i++){
		let row = [];
		for(let j=0; j < hig; j++){
			row.push(cells[d.roll("1d6")-1]);
			rowBuffer.push(1);
		}
		oMap.push(row);
	}
	return oMap;
}



function greatestNeighbor(map, x, y){
	var scores = [0,0,0,0,0,0];
	if(map[x-1][y-1]) scores[map[x-1][y-1].id]++;
	if(map[x-1][y-0]) scores[map[x-1][y-0].id]++;
	if(map[x-1][y+1]) scores[map[x-1][y+1].id]++;
	if(map[x-0][y-1]) scores[map[x-0][y-1].id]++;
	if(map[x-0][y+1]) scores[map[x-0][y+1].id]++;
	if(map[x+1][y-1]) scores[map[x+1][y-1].id]++;
	if(map[x+1][y-0]) scores[map[x+1][y-0].id]++;
	if(map[x+1][y+1]) scores[map[x+1][y+1].id]++;
	var results = [];
	for( let i = 0; i < scores.length; i++){
		for(let e = 0; e < scores[i]; e++){
			results.push(i);
		}
	}
	return cells[results[d.roll("1d"+results.length)-1]];
}






*/





(function() {
    var requestAnimationFrame = 
		window.requestAnimationFrame 
		|| window.mozRequestAnimationFrame 
		|| window.webkitRequestAnimationFrame 
		|| window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();
