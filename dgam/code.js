"use strict";
var d = new Dice();
var c = {
	w:500, 
	h:300,
	canvas:{}, 
	ctx:{},
	camera:{
		x:0,
		y:0
	}
};

function containedInBox(x, y, left, right, top, bottom){
	return x > left && x < right && y > top && y < bottom 
} 
var cellsize= 18;
var keyStates = [];
var map={
	land:[[]],
	width:50,
	height:35,
	registerLands: function(aTerritory){
		aTerritory.lands.forEach(function(l){
			map.land[l.x][l.y].owner = aTerritory
		});
	},
	isLandFree: function( x, y ){
		var onMap = containedInBox(x,y,0,map.width,0,map.height);
		var nulled = map.land[x] == null || map.land[x][y] == null;
		if(nulled){return false;}
		var owned = map.land[x][y].owner != null;
		return (onMap && !owned);
	}
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
	window.addEventListener("keydown", function (e) { keyStates[e.keyCode] = true; } );
	window.addEventListener("keyup", function (e) { keyStates[e.keyCode] = false; } );
	c.canvas = document.getElementById("c");
	c.ctx = c.canvas.getContext( '2d' );
	c.canvas.width = c.w;
	c.canvas.height = c.h;
	render();
}
function handleKeyInput(){
	if (keyStates[key.UP]) {
		c.camera.y -= 3;
	}
	if (keyStates[key.DOWN]) {
		c.camera.y +=  3;
	}
	if (keyStates[key.LEFT]) {
		c.camera.x -= 3;
	}
	if (keyStates[key.RIGHT]) {
		c.camera.x += 3;
	}
}

function render(){
	handleKeyInput();
	c.ctx.fillStyle = "#000000";
	c.ctx.fillRect( 0, 0, c.w, c.h );
	c.ctx.fillStyle = "#ffffff";
	c.ctx.fillRect( 0-c.camera.x, 0-c.camera.y, map.width * cellsize, map.height * cellsize );
	territories.forEach(t => {t.draw(c.ctx, cellsize);} );
	requestAnimationFrame( render );
}

function buildTerritories(){
	var tNum = 100;
	var rX = "1d" + ( map.width-1 );
	var rY = "1d" + ( map.height-1 );
	var x = d.roll(rX);
	var y = d.roll(rY);
	var collisions = 0;
	while(tNum > 0 && collisions < 1000){
		x = d.roll(rX);
		y = d.roll(rY);
		if(
			   map.isLandFree(x  ,y)
			&& map.isLandFree(x-1,y)
			&& map.isLandFree(x+1,y)
			&& map.isLandFree(x  ,y-1)
			&& map.isLandFree(x  ,y+1)

		){
			territories.push( new Territory( x, y ) ); 
			tNum--;
			collisions = 0;
		}
		else{
			collisions++;
		}
	}
	console.log(collisions);
	territories.forEach(t => territoryGeneration(t) );
	territories.forEach(t => territoryGeneration(t) );
	territories.forEach(t => territoryGeneration(t) );
}



function Territory(startX, startY){
	var myColor = "rgb(" + d.roll("1d255") + "," + d.roll("1d255") + "," + d.roll("1d255") + ")" ;
	var terr = {
		lands:[],
		draw: function(ctx, cellSize){
			ctx.strokeStyle="#000000";
			ctx.lineWidth=.5;
			ctx.fillStyle = myColor;
			terr.lands.forEach( e => {
				var canvasX = e.x*cellSize - c.camera.x;
				var canvasY = e.y*cellSize - c.camera.y;
				ctx.fillRect(canvasX, canvasY, cellSize, cellSize);
				
				if( !terr.lands.find( e2 => e2.x == e.x-cellsize && e2.y == e.y+0 ) ){ // left
					ctx.strokeRect(canvasX, canvasY, 1, cellSize);
				}
				if( !terr.lands.find( e2 => e2.x == e.x+cellsize && e2.y == e.y+0 ) ){ // right
					ctx.strokeRect(canvasX+cellSize, canvasY, 1, cellSize);
				}
				if( !terr.lands.find( e2 => e2.x == e.x+0 && e2.y == e.y-cellsize ) ){ // top
					ctx.strokeRect(canvasX, canvasY, cellSize, 1);
				}
				if( !terr.lands.find( e2 => e2.x == e.x+0 && e2.y == e.y+cellsize ) ){ // bottmn
					ctx.strokeRect(canvasX, canvasY+cellSize, cellSize, 1);
				}
			});
		}
	}
		
	terr.lands.push( {x:startX, y:startY} );
	terr.lands.push( { x:startX+1, y:startY+0} );
	terr.lands.push( { x:startX+0, y:startY+1} );
	terr.lands.push( { x:startX-1, y:startY+0 } );
	terr.lands.push( { x:startX+0, y:startY-1 } );
	map.registerLands( terr )
	return terr;
}

function territoryGeneration( territory ){
	territory.lands.forEach( e => {
		if( map.isLandFree( e.x-1, e.y ) && d.roll("1d2") == 2 ){ // left
			territory.lands.push( {x: e.x-1, y: e.y } );
		}
		if( map.isLandFree( e.x+1, e.y ) && d.roll("1d2") == 2 ){ // right
			territory.lands.push( {x: e.x+1, y: e.y } );
		}
		if( map.isLandFree( e.x, e.y-1 ) && d.roll("1d2") == 2 ){ // top
			territory.lands.push( {x: e.x, y: e.y-1 } );
		}
		if( map.isLandFree( e.x, e.y+1 ) && d.roll("1d2") == 2 ){ // botm
			territory.lands.push( {x: e.x, y: e.y+1 } );
		}
	});
	map.registerLands(territory);
}


function buildMap(){
	map.land = [];
	for(let i=0; i <= map.width; i++){
		let row = [];
		for(let j=0; j <= map.height; j++){
			row.push( {owner:null} );
		}
		map.land.push( row );
	}
}


(function() {
    var requestAnimationFrame = 
		window.requestAnimationFrame 
		|| window.mozRequestAnimationFrame 
		|| window.webkitRequestAnimationFrame 
		|| window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();
