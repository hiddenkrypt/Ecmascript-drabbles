var color = {
		bg: "#ffffff",
		fg: "#000000"
	},
	c={}, 
	ctx={},
	cellsize=1;

var coords = [
	//r
	{x:0, y:0},
	{x:0, y:1},
	{x:0, y:2},
	{x:1, y:0},
	{x:1, y:1},
	{x:2, y:1},
	{x:2, y:2},
	//a
	{x:3, y:1},
	{x:3, y:2},
	{x:4, y:0},
	{x:4, y:2},
	{x:5, y:1},
	{x:5, y:2},
	//v
	{x:6, y:0},
	{x:6, y:1},
	{x:7, y:2},
	{x:8, y:0},
	{x:8, y:1},
	//t
	{x:9, y:0},
	{x:10, y:0},
	{x:10, y:1},
	{x:10, y:2},
	{x:11, y:0}
];

function init(){
	c = document.getElementById("c");
	cellsize = c.width/12;
	ctx = c.getContext("2d");
	coords = scramble(coords);
	paintArray(75);
}

function paintArray(interval){
	var i = 0;
	function f(){
		ctx.fillStyle = color.fg;
		ctx.fillRect(coords[i].x*cellsize, coords[i].y*cellsize, cellsize, cellsize);
		if(++i < coords.length){
			setTimeout(f, interval);
		}			
	}
	ctx.fillStyle = color.bg;
	ctx.fillRect(0,0,c.width, c.height);
	setTimeout(f, interval);
}
function sortLeftToRight(a, b){
	return a.x < b.x;
}
function sortTopToBottom(a, b){
	return a.y < b.y;
}

function scramble(array){
	var temp = [];
	while( array.length > 0){
		var index = Math.floor(Math.random()*array.length);
		temp = temp.concat( array.splice(index , 1) );
	}
	return temp;
}