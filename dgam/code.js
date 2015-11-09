"use strict";
var c={}, x={};
var d = new Dice();
var w=500, h=300;
var map=[[]];
var cellsize= 5;
var cells = [
	{id:0, style:"#ffffff"},
	{id:1, style:"#a10000"},
	{id:2, style:"#ff0000"},
	{id:3, style:"#ff8100"},
	{id:4, style:"#ff6f44"},
	{id:5, style:"#ffff00"},
];
function init(){
	map=buildMap();
	c = document.getElementById("c");
	x = c.getContext( '2d' );
	c.width = w;
	c.height = h;
	render();
}




function render(){
	map = buildMap();
	x.fillStyle = "#ffffff";
	x.fillRect(0,0,w,h);
	for(var i=0; i < map.length; i++){
		for(var j=0; j < map[0].length; j++){
			x.fillStyle = map[i][j].style;
			x.fillRect(i*cellsize, j*cellsize, 5, 5);
		}
	}
	requestAnimationFrame( render );
}

(function() {
    var requestAnimationFrame = 
		window.requestAnimationFrame 
		|| window.mozRequestAnimationFrame 
		|| window.webkitRequestAnimationFrame 
		|| window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

function buildMap(){
	var len = Math.floor(w/cellsize);
	var hig = Math.floor(h/cellsize);
	var oMap = [], buffer = [];
	for(let i=0; i < len; i++){
		let row = [];
		let rowBuffer = [];
		for(let j=0; j < hig; j++){
			row.push(cells[d.roll("1d6")-1]);
			rowBuffer.push(1);
		}
		oMap.push(row);
		buffer.push(rowBuffer);
	}
	for(let runs=0; runs < 4; runs++){
		for(let i=1; i < len-1; i++){
			for(let j=1; j < hig-1; j++){
				oMap[i][j] = greatestNeighbor(oMap, i, j);
			}
		}
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
	var max = scores[0];
	var iMax= 0;
	for(let i=0; i < scores.length; i++){
		if(scores[i] > max){
			iMax = i; max = scores[i]; 
		}
	}
	return cells[iMax];
}